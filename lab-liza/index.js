'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Tree = require('./lib/tree.js');

let treeify = (data) => {
  let stack = [];
  let tree;
  let tag;
  let end = false;

  while (!end) {
    data = data.trim();
    if (data.startsWith('</html>')) end = true;

    // </closing tag>
    if ( data[0] === '<' && data[1] === '/' ) {
      tag = '';
      for (var i = 2; data[i] !== '>'; i++) {
        tag += data[i];
      }
      data = data.slice(i + 1);
      stack.pop( tag );
      console.log('</add>:', stack);

    // <opening tag>
    } else if ( data[0] === '<' ) {
      tag = '';
      for (var j = 1; data[j] !== '>'; j++) {
        tag += data[j];
      }
      data = data.slice(j + 1);
      // !stack[0] ? tree = new Tree (tag)
      //   : tree.insert(tag, `${stack[0]}`);
      stack.push( tag );
      console.log('<add>:', stack);

    // content
    } else {
      tag = '';
      for (var k = 0; data[k] !== '<'; k++) {
        tag += data[k];
      }
      data = data.slice(k);
      console.log('add:', stack);
      // tree.insert(tag, `${stack[0]}`);
      // console.log('data', data[1])
    }
  }
  return tree;
};

fs.readFileProm('./assets/minimal.html')
  .then( data => {
    data = data.toString().split('<!DOCTYPE html>')[1];
    treeify(data);
  }).catch( console.error );