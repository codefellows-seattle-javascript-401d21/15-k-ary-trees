'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Tree = require('./lib/tree.js');

const htmlFile = module.exports = {};

htmlFile.createTree = function (fileName) {
  let data;

  if(typeof fileName !== 'string') return null;

  try {
    data = fs.readFileSync(`./assets/${fileName}`)
      .toString()
      .split('<!DOCTYPE html>')[1];
    return htmlFile.treeify(data);
  } catch (err) {
    throw new Error('Error');
  }
};

htmlFile.treeify = (data) => {
  let stack = [], tree, tag, end = false;

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

    // <opening tag>
    } else if ( data[0] === '<' ) {
      tag = '';
      for (var j = 1; data[j] !== '>'; j++) {
        tag += data[j];
      }
      data = data.slice(j + 1);
      if (tree === undefined) tree = new Tree ();
      tree.insert(tag, stack[stack.length - 1]);
      stack.push( tag );

    // content
    } else {
      tag = '';
      for (var k = 0; data[k] !== '<'; k++) {
        tag += data[k];
      }
      data = data.slice(k);
      tree.mostRecent.content = tag;
    }
  }
  delete tree.mostRecent;
  return tree;
};

htmlFile.createTree('minimal.html');