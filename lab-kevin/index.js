
'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:index-file');
const Stack = require('./lib/stack');
const Tree = require('./lib/kary');

const asset =`${__dirname}/../assets/minimal.html`;

const parentStack = new Stack();
const htmlTree = new Tree();

fs.readFileProm(asset)
  .then(parseHtml)
  .catch(console.error);

function parseHtml(fileData) {

  let tempArr = [];
  let html = fileData.toString('utf8');

  let elements = html.replace(/\n/g,'').replace(/<([^>]+)>/g, '\n<$1>\n')
    .split('\n').filter(elm => elm.trim()).slice(1);

  elements.forEach(elm => {
    processElement(elm);
  });

  function processElement(data){

    if ( /^<\/[^<]+>$/.test(data) ){    //closing tag 
      console.log('closing', data);
      let val = parentStack.pop();
      let parent = parentStack.top ? parentStack.top.value : '';
      //tempArr.push([parent, val]);
      htmlTree.insertData(val, parent);
      return; 

    }


    if (/^<[^<]+>$/.test(data)){ //opening tag
      console.log('opening', data);
      let data_set = {eleName: data.replace(/([<</>])/g, ''), textContent: null};
      //htmlTree.insertData(data_set, parent)
      //tempArr.push([parent, data_set]);
      parentStack.push(data_set);
      return;
    }
    
    //return htmlTree.insert(data_set, parent); //tempArr.push([parent, data]); //opening
    ///parentStack.pop();  //text
    parentStack.top.value.textContent = data;
    console.log('text', parentStack.top.value);
    //tempArr.push([parent, data]);  //add as tex data
    return;
  }
  
  // function processElement(data){
  //   if ( /^<\/[^<]+>$/.test(data) ) return parentStack.pop(); //closing tag 

  //   let parent = parentStack.top ? parentStack.top.value : '';
  //   parentStack.push(data.replace(/([<</>])/g, ''));
  //   let data_set = {eleName: data, textContent: null};
    
  //   if (/^<[^<]+>$/.test(data)) return tempArr.push([parent, data]); //htmlTree.insert(data, parent); //tempArr.push([parent, data]); //opening
  //   parentStack.pop();  //text
  //   tempArr.push([parent, data]);  //add as tex data
  //   return;
  // }

  console.log('tempArr', tempArr );

} 