'use strict';

const fs = require('fs');
const Tree = require('./treeBuilder');

let treeify = (path) => {
  if (!path || Array.isArray(path)) return null;
  
  let data;
  try{
    data = fs.readFileSync(path).toString().split('<!DOCTYPE html>')[1];
  }catch(err){
    throw new Error('No file buddy');
  }

  let stack = [];
  let tree;
  let tag;
  let end = false;

  while (!end) {
    data = data.trim();
    if (data.startsWith('</html>')) {
      end = true;
    } 
      
    // </closing tag>
    if ( data[0] === '<' && data[1] === '/' ) {
      tag = '';

      for (var i = 2; data[i] !== '>'; i++) {
        tag += data[i];
      }

      data = data.slice(i + 1);
      stack.pop(tag);

    // <opening tag>
    } else if ( data[0] === '<' ) {
      tag = '';

      for (var y = 1; data[y] !== '>'; y++) {
        tag += data[y];
      }

      data = data.slice(y + 1);
      if (tree === undefined) tree = new Tree();
      tree.insert('element', tag, stack[stack.length - 1]);
      stack.push( tag );

    // content
    } else {
      tag = '';
      for (var k = 0; data[k] !== '<'; k++) {
        tag += data[k];
      }
      data = data.slice(k);
      tree.insert('text', tag, stack[stack.length - 1]);
    }
  }
  console.log(tree);
  return tree;
};

module.exports = treeify;
