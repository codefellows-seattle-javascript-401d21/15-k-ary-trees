'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(element) {
    this.element = element;
    this.content = '';
    this.children = [];
  }
}

const K_ary = module.exports = class {
  constructor() {
    this.root = null;
    this.mostRecent = null;
  }

  // Traversal Methods
  breadthFirst(callback) {
    let current = null;
    let queue = new Queue();
    queue.enqueue(this.root);

    while(queue.back) {
      current = queue.dequeue()
      callback(current)
      current.children.map(c => queue.enqueue(c))
    }
  }

  // Insertions
  insert(element, parent) {
  // insert(element, parent, contentFlag) {

    var tn = new TreeNode(element)

    if(!this.root) {
      this.root = tn
      return this
    }


    this.breadthFirst(node => {
      if(parent === node.element) {
        // contentFlag ? node.content = element
        node.children.push(tn);
        return;
      }
    })
    this.mostRecent = tn;
    return this
  }
}
