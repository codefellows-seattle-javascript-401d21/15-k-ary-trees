'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(type, val) {
    this.type = type;
    this.val = val;
    this.children = []; 
  }
};

const K_ary = module.exports = class {
  constructor() {
    this.root = null;
  }
  breadthFirst(callback) {
    let current = null;
    let queue = new Queue();
    queue.enqueue(this.root);
    while(queue.back) {
      current = queue.dequeue();
      callback(current);
      current.val.children.map(c => queue.enqueue(c));
    }
  }
  insert(type, val, parent) {
    let tn = new TreeNode(type, val);

    if(!this.root) {
      this.root = tn;
      return this;
    }
    this.breadthFirst(node => {
      if(parent === node.val.val) {
        node.val.children.push(tn);
        return;
      }
    });
    return this;
  }
};