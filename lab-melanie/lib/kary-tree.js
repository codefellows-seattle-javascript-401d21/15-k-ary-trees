'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(type, content) {
    this.type = type;
    this.content = content;
    this.children = [];
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
  insert(val, content, parent) {
    let tn = new TreeNode(val, content);

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

  // // Removals
  // removeByVal(val) {
  //   // Remove the first node you find that matches val
  // }
};

module.exports = K_ary;