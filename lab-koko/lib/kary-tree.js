'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.noChildren = [];
  }
};

const k_ary = module.exports = class {
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
      current.value.children.map(c => queue.enqueue(c));
    }
  }
  insert(value, parent) {
    let tn = new TreeNode(value);
    if (!this.root) {
      this.root = tn;
      return this;
    }
    this.breadthFirst(node => {
      if (parent === node.value.value) {
        node.value.children.push(tn);
        return;
      }

    });
    return this;
  }
  removeByVal(value) {

  }
};
