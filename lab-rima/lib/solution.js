'use strict';

const fs = require('fs');
const kTree = require('../lib/kary-tree');
const Stack = require('../lib/stack');


const TreeNode = class {
  constructor(eleName, textContent) {
    this.val = {eN: eleName, tC: textContent};
    this.children = [];
  }
}



function htmlTree(filePath){
  const dataStr = fs.readFileSync(filePath).toString();
//console.log(dataStr);
  let parentStack = new Stack();
  let tree = new kTree();
  let root = new TreeNode('html', '');
  tree.root = root;
  parentStack.push(tree.root);
  
  let closed = true;
  let tag = '';
  let text = '';

  for(let i = 15; i < dataStr.length; i++){
    // tag starts
    if(dataStr[i] === '<') {
//console.log('TAG STARTED');
      closed = false;
      if(text.length > 0){
//console.log('STACK PEEK ', parentStack.peek());
        parentStack.peek().value.val.tC = text;
        text = '';
      }
    }
    // tag ends
    else if(dataStr[i] === '>'){
//console.log('TAG ENDED');
      closed = true;
      if(tag.includes('/')){
//console.log('CLOSING TAG ', parentStack.peek());
        if(tag.includes(parentStack.peek().value.val.eN)) parentStack.pop();
      }
      else{
        let newTag = new TreeNode(tag, '');
//console.log('tag: ', newTag.val.eN);
//console.log(parentStack.peek().value.children);
        (parentStack.peek().value.children).push(newTag);
        parentStack.push(newTag);
      }
      tag = '';
    }
    // char: if tag ended, it is for text. if tag not ended, it is for tag.
    else if(dataStr[i] !== ' '){
      if(dataStr[i] + dataStr[i+1] === '\n'){
        i++;
      }
      else if(!closed){
        tag += dataStr[i];
      }
      else{
        text += dataStr[i];
      }
    }
  }

//  console.log(dataStr.split('<'));
  return tree;
}



module.exports = htmlTree;
