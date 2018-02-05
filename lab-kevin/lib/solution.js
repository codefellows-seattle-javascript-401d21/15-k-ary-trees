'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Stack = require('./stack');
const Tree = require('./kary');

const parentStack = new Stack();
const htmlTree = new Tree();

const solution = module.exports = {};

solution.parseHtml = (asset) => {
  if(!asset) throw new Error('Invalid input: expecting file path');
  return fs.readFileProm(asset, 'utf8')
    .then(this.parsefile)
    .catch(console.error);
};
//Big-O O(1)

this.parsefile = (html) => {  
  let isHtml = html.match(/<!DOCTYPE html>/gi) ? true : false;
  if (!isHtml) throw new Error('Invalid input: expecting html file');
  //split document up into lines and tags
  let elements = html.replace(/\n/g,'').replace(/</g, '\n<').replace(/(<\/[^>]+>)/g, '$1\n').split('\n').map(elm => elm.trim()).filter(val => val).slice(1);

  //process each line, one at a time
  elements.forEach(elm => {
    solution.processElement(elm);
  });
  // big-O O(n)

  return htmlTree;
};

solution.processElement = (data) => { 
  // the tag is a closing tag, an element off the stack
  if ( /^<\/[^<]+>$/.test(data) ) return parentStack.pop(); //closing tag 

  //get the tag name
  let eleName = data.match(/<([^\s>]+)/);
  eleName = eleName ? eleName[1] : '';

  //get tte class name
  let className = data.match(/class="([^"]+)/);
  className = className ? className[1] : '';

  //get the id name
  let idName = data.match(/id="([^"]+)/);
  idName = idName ? idName[1] : '';

  //get the text if it exists
  let text = data.match(/>(.*)$/);
  text = text ? text[1] : '';

  //create an object literal to hold the values
  let data_set = {
    eleName: eleName,
    textContent: text,
    class: className,
    id: idName,
  };

  //if the stack is empty, the item should be the root element(html)
  let parent = parentStack.top ? parentStack.top.value : '';
  //if the data is text add it to the data_set 
  if (!eleName) {
    parent.textContent += data;
    return;
  }

  //add the data_set to the stack
  parentStack.push(data_set);
  //insert the data into the tree
  htmlTree.insertData(data_set, parent);
};
//big-O O(1)
  
