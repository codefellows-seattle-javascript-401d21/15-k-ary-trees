'use strict';

const tree = require('./kary-tree');

let testTree = new tree;

testTree.insert(1, 1);
testTree.insert(2, 1);
testTree.insert(3, 1);

console.log(testTree);