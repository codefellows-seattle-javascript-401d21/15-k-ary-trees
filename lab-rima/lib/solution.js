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

  let dataStr;
  try{
    dataStr = fs.readFileSync(filePath).toString().split(/\r?\n/);
  }catch(err){
    throw new Error('No such file');
  }


  for(let i = 0; i < dataStr.length; i++){
    dataStr[i] = dataStr[i].trim();
  }

  // if html file doesn't start with <!DOCTYPE html> and <html>, thrwo error
  if(dataStr[0] !== '<!DOCTYPE html>' || dataStr[1] !== '<html>'){
    throw new Error('Invalid html');
  }

  let parentStack = new Stack();
  let tree = new kTree();
  let root = new TreeNode('html', '');
  tree.root = root;
  parentStack.push(tree.root);


  for(let j = 2; j < dataStr.length; j++){
  
    let closed = true;
    let tag = '';
    let text = '';

    let currentStr = dataStr[j];
    for(let i = 0; i < currentStr.length; i++){
      // tag starts
      if(currentStr[i] === '<') {
        closed = false;
        if(text.length > 0){
          parentStack.peek().value.val.tC += text;
          text = '';
        }
      }
      // tag ends
      else if(currentStr[i] === '>'){
        closed = true;
        if(tag.includes('/')){
          if(tag.includes(parentStack.peek().value.val.eN)) parentStack.pop();
        }
        else{
          let newTag = new TreeNode(tag, '');
          (parentStack.peek().value.children).push(newTag);
          parentStack.push(newTag);
        }
        tag = '';
      }
      // char: if tag ended, it is for text. if tag not ended, it is for tag.
      else{// if(currentStr[i] !== ' '){
        if(!closed){
          tag += currentStr[i];
        }
        else{
          text += currentStr[i];
        }
      }
    }
  }
  return tree;
}


module.exports = {TreeNode, htmlTree};
