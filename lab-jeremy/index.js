'use strict';

const Promise = require('bluebird');
const KTree = require('./lib/kary-tree');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});



let readData = () => {
  let HTMLTree = new KTree();
  let currentParent; 
  fs.readFileProm('../assets/minimal.html')
    .then(res => res.toString())
    .then(htmldoc =>  htmldoc.split('>'))
    .then(data => data.map(e => e.trim()))
    .then(data => data.map(e => e.split('<').join('')))
    .then(data => {
      data.splice(0, 1);
      if(data[data.length-1]==='') data.splice(data.length-1, 1);
      return data;
    })
    .then(data => data.map(e => e.split('/')))
    // .then(data => {
    //   //if array length is 1, set the currentParent to the array element
    //   //if array length is 2 and first element is blank, do breadthFirst search and check if the current node has any children with the currentParent. (if yes return the current node, if no continue) set currentParent to returned node  
      
    // })
    .then(data => console.log('DATA: ', data));
    

};

readData();
