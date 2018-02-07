'use strict';

const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const kT = require('../lib/kary-tree');
const kTree = kT.karyTree;
const TreeNode = kT.TreeNode;
const Stack = require('../lib/stack');


// O(n) - n is a total number of characters in a file. it checks each character so O(n)
function htmlTree(filePath){

  return readFile(filePath)
    .then(res => {
      res.toString().split(/\r?\n/);

      for(let i = 0; i < res.length; i++){
        res[i] = res[i].trim();
      }
      return res;
    })
    .then(res => parseHtml(res))
    .catch(() => { throw new Error('Invalid input'); });
}

function parseHtml(htmlData){
  // if html file doesn't start with <!DOCTYPE html> and <html>, thrwo error
  if(htmlData[0] !== '<!DOCTYPE html>' || htmlData[1] !== '<html>'){
    throw new Error('Invalid html');
  }

  let parentStack = new Stack();
  let tree = new kTree();
  let root = new TreeNode('html', '');
  tree.root = root;
  parentStack.push(tree.root);


  for(let j = 2; j < htmlData.length; j++){
  
    let closed = true;
    let tag = '';
    let text = '';

    let currentStr = htmlData[j];
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
      else{
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
