'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
};

// K-ary tree
module.exports = class {
  constructor() {
    this.root = null;
  }

  breadthFirst(callback) {
    if (!callback) throw new Error('Error: callback not defined');
    if (typeof callback !== 'function')
      throw new Error('Error: callback is not a function');
    if (!this.root) return;

    let q = new Queue();
    q.enqueue(this.root);

    while (q.len) {
      let ele = q.dequeue();
      callback(ele);
      ele.children.map(child => q.enqueue(child));
    }
  }

  insert(value, parentVal) {
    if (!value && value !== 0)
      throw new Error('Error: value is falsey and non-zero');

    let tn = new TreeNode(value);

    if (!this.root) {
      this.root = tn;
      return this;
    }

    if (!parentVal && parentVal !== 0)
      throw new Error('Error: parentVal is falsey and non-zero');

    // push it or do a no-op
    this.breadthFirst(node => node.value === parentVal ? node.children.push(tn) : null);

    return this;
  }

  removeByVal(value) {
    if (!value && value !== 0) throw new Error('Error: value is falsey and non-zero');
    if (!this.root) return null;

    if (this.root.value === value) {
      console.log('Snipping root');
      this.root.value = null;
      return this;
    }

    // This is a snip - any children are effectively removed along with the node in question
    this.breadthFirst(node => node.children = node.children.filter(n => n.value !== value));

    return this;
  }
};
