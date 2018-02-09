'use strict';

const Promise = require('bluebird');
const uuid = require('uuid/v4');
const KTree = require('./kary-tree');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});



let getHTMLTree = module.exports = (filepath = '../assets/minimal.html', callback) => {

  let HTMLTree = new KTree();
  let emulatedStack = []; //fake stack using an array
  fs.readFileProm(`${filepath}`)
    .then(res => res.toString())
    .then(htmldoc =>  htmldoc.split('>'))// splits elements on closing tag
    .then(data => data.map(e => e.trim()))//removes empty spaces and new lines
    .then(data => data.map(e => e.split('<').join('')))//removes opening <
    .then(data => { // remove DOCTYPE HTML tag and ending tag if there is an empty space at the end.
      if(data[0] !== 'html') data.splice(0, 1);
      if(data[data.length-1] === '') data.splice(data.length-1, 1);
      return data;
    })
    .then(data => data.map(e => e.split('/'))) //splits closing tags into 2 element arrays
    .then(data => { //gives the opening tag a UUID and the closing tags an extra element
      for(let i in data){
        if(data[i].length===1) {
          data[i].push(uuid());
        } else {
          data[i].push('');
        }
      }
      return data;
    })
    .then(data => { //puts matching UUID in last element on the closing tag array
      for(let i in data){
        if(data[i].length===2) {
          emulatedStack.push(data[i]);
        } else {
          data[i][data[i].length-1] = emulatedStack.pop()[1];
        }
      }
      return data;
    })
    .then(data => {
      for(let i in data){
        if(data[i].length===2) {
          if(emulatedStack[emulatedStack.length-1]) {
            data[i].push(emulatedStack[emulatedStack.length-1][1]);
          }
          emulatedStack.push(data[i]);
        } else {
          data[i].push(uuid());
          emulatedStack.pop();
        }
      }
      return data;
    }) 
    // 3 element arrays are opening tags [(tag name), (UUID for reference with closing tag), (UUID to reference elements parent)]
    // 4 element arrays are closing element  tags [(text within the node), (closing tag name), (UUID to opening tag), (UUID TO REPLACE IN TREE)]
    .then(data => {
      for(let i in data) {
        if(data[i].length === 2) { //primary HTML node
          let htmlEluuid = data[i][1];
          HTMLTree.insert(htmlEluuid);
        } else if (data[i].length === 3) { //opening tags
          let htmlEluuid = data[i][1];
          let parentuuid = data[i][2];
          HTMLTree.insert(htmlEluuid, parentuuid);
        } else if (data[i].length === 4 && data[i][0] !== '') { //closing tags with text
          let textEluuid = data[i][3];
          let parentuuid = data[i][2];
          HTMLTree.insert(textEluuid, parentuuid);
        }
      }
      return data; // returns the array of arrays again. 
    })
    .then(data => {
      //after all UUIDs are in the kary tree, we need to replace them respective elements
      for (let i in data) {
        if (data[i].length === 2) { //primary html element
          HTMLTree.breadthFirst(currentNode => {
            if(currentNode.val.val === data[i][1]) currentNode.val.val = {type: 'HTML tag', content: data[i][0]}; // replace UUID if matches with element 
          });
        } else if (data[i].length === 3) { //opening html element
          HTMLTree.breadthFirst(currentNode => {
            if(currentNode.val.val === data[i][1]) currentNode.val.val = {type: 'HTML tag', content: data[i][0]}; // replace UUID if matches with element 
          });
        } else if (data[i].length === 4) { //text element
          HTMLTree.breadthFirst(currentNode => {
            if(currentNode.val.val === data[i][3]) currentNode.val.val = {type: 'text', content: data[i][0]}; // replace UUID if matches with element 
          });
        }
      }
      return data; //returning the arrays for debug purproses
    }) //comma left out so I can uncomment the next .then
    .then(data => { // debugging .then, comment out in final product
      // console.log(emulatedStack);
      // console.log(HTMLTree);
      // console.log(HTMLTree.root.val);
      // console.log(HTMLTree.root.children[1]);
      // console.log('DATA: ', data);
      callback(HTMLTree);
    });
    
};