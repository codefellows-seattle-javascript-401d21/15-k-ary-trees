'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(val) {
    this.head = null;
    this.val = val;
    this.children = [];
  }
};

const K_ary = module.exports = class {
  constructor() {
    this.root = null;
  }

  //Traversal Methods
  breadthFirst(callback) { //its a algorithim for searching the databases starting with the root
    let current = null;
    let queue = new Queue();

    while(queue.back) {
      current = queue.dequeue();

      console.log('current', current);
      callback(current);
      current.val.children.map(c => queue.enqueue(c));
    }
  }

  //Insertiuons
  insert(val, parent) {
    let tn = new TreeNode(val);

    if(!this.root) {
      this.root = tn;
      return this;
    }
    this.breadthFirst(node => {
      if(parent === node.val.val); {
        node.val.children.push(tn);
        return;
      }
    });
    return this;
  }
};