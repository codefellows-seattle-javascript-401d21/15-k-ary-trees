'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:index-file');
const Stack = require('./lib/stack');
const Tree = require('./lib/kary');

const asset =`${__dirname}/../assets/minimal.html`;

const parentStack = new Stack();
const htmlTree = new Tree();

fs.readFileProm(asset, 'utf8').then(parseHtml).catch(console.error);

function parseHtml(html) {  
  let elements = html.replace(/\n/g,'').replace(/</g, '\n<').split('\n').map(elm => elm.trim()).filter(val => val).slice(1);

  elements.forEach(elm => {
    processElement(elm);
  });
 

  function processElement(data){
    if ( /^<\/[^<]+>$/.test(data) ) return parentStack.pop(); //closing tag 
    
    let data_set = {eleName: data.replace(/([<</>])/g, ''), textContent: null};
    let parent = parentStack.top ? parentStack.top.value : '';
    parentStack.push(data_set);
  
    if (! /^<[^<]+>$/.test(data)) { //open tag with text
      let dataArray = data.split('>');
      data_set = {eleName: dataArray[0].replace(/([<</>])/g, ''), textContent: dataArray[1]};
    }

    htmlTree.insertData(data_set, parent);
  }

  console.log('htmlTree',  JSON.stringify(htmlTree));
} 