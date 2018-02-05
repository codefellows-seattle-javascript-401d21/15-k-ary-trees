'use strict';

const Queue = require('./qeueuBuilder');

const TreeNode = class {
  constructor(type, val) {
    this.type = type;
    this.val = val;
    this.children = []; // Scott haxored this! Feel free to stretch with the SLL! ;-)
  }
};

const K_ary = module.exports = class {
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

      // console.log('current', current);
      callback(current);

      current.val.children.map(c => queue.enqueue(c));
    }
  }

  // Insertions
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

  // Removals
  removeByVal(val) {
    // Remove the first node you find that matches val
  }
};