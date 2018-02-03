'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Tree = require('./kary-tree.js');

const  parser = module.exports = {};

parser.readData = () => {
  let tree = new Tree();
  fs.readFileProm('../assets/minimal.html')
    .then(res => res.toString())
    .then(htmldoc =>  htmldoc.split('>'))
    .then(data => data.map(e => e.trim()))
    .then(data => data.map(e => e.split('<').join('<')))
    .then(arr => {
      for(let i = 1; i < arr.length; i ++) {
        // console.log(arr[i]);
        if(arr[i] === arr[1]) {
          tree.insert('el', arr[i]);
        }
        // if(arr[i].startsWith('</')) {
        //   arr[i] = null;
        // }
        if(arr[i].startsWith('<')) {
          tree.insert('el', arr[i], arr[i - 1]);
        } else {
          tree.insert('txt', arr[i], arr[i - 1]);
        }
      }
      console.log(tree);
      // return tree;
    });
 
};

parser.readData();