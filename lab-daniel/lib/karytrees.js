'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(type, data, _id) {
    this.type = type;
    this.data = data;
    this.val = _id;
    this.children = [];
  }

};

const K_ary = module.exports = class {
  constructor() {
    this.root = null;
  }

  breadthFirst(callback) {
    let current;
    let q = new Queue();
    q.enqueue(this.root);
    while(q.front) {
      current = q.dequeue();
      
      callback(current.val);
      current.val.children.map(c => q.enqueue(c));
    }
  }

  insert(type, data, id, parent) {
    let tn = new TreeNode(type, data, id);

    if(!this.root) {
      this.root = tn;
      return;
    }

    this.breadthFirst(node => {
      if(parent === node.val) {
        node.children.push(tn);
        return;
      }
    });
  }

  removeByVal(val) {
    if(this.root.val === val) {
      this.root = null;
      return;
    }
    this.breadthFirst(node => {
      node.children.map((c, i) => {
        if(c.val === val) node.children.splice(i, 1);
      });
      return;
    });
        
  }

};