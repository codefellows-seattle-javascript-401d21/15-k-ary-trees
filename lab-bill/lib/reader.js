'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Kary = require('./kary-tree');

let parent;
let tree = new Kary;
// console.log(tree);
fs.readFileProm(`${__dirname}/../assets/minimal.html`)
  .then((item)=> item.toString().trim().split('\n'))
//   .then(console.log)
  .then((arr) => arr.map(i => i.trim()))
  .then((arr) => arr.forEach(i => {
    // i.split('>')
    let arr = (i.split('>'));
    // console.log(arr.length,arr);
    if (!i.includes('</')) {
      tree.insert({ele: arr[0], text: arr[1]}, parent);
      parent = arr[0];
    }
    if (arr.length === 3) {
    //   console.log('BOTH',i);
      tree.insert({ele: arr[0], text: arr[1]}, parent);
    }
    if (i.includes('</')) {
    //   console.log('END',i);
      parent = tree.breadthFirst(findParent);
    }

  }))
  .then(console.log(tree))
  .catch(err => console.log(err));

function findParent(current) {
  if (current.val.children.includes(parent)) {
    return current;
  }
}

