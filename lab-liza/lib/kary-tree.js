'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
};

const Kary = module.exports = class {
  constructor() {
    this.root = null;
  }

  // Traversal Methods
  breadthFirst(callback) {
    let current = null;
    let queue = new Queue();
    queue.enqueue(this.root);


    while(queue.back) {
      current = queue.dequeue();

      console.log('current', current);
      callback(current);

      current.value.children.map(c => queue.enqueue(c));
    }
  }

  // Insertions
  insert(value, parent) {
    let tn = new TreeNode(value);

    if(!this.root) {
      this.root = tn;
      return this;
    }

    this.breadthFirst(node => {
      if(parent === node.value.value) {
        node.value.children.push(tn);
        return;
      }
    });

    return this;
  }

  // Removals
  // removeByVal(value) {
  //   if(!this.root) return null;

  // }
};