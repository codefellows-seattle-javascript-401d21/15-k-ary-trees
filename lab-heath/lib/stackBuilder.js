'use strict';

const Node = require('./node.js');

module.exports = class {
  constructor(maxSize = 1048) {
    this.top = null;
    this.maxSize = maxSize;
    this.size = 0;
  }

  push(val) {
    if(this.size === this.maxSize) throw new Error('stack is too large');

    let node = new Node(val);
    node.next = this.top;
    this.top = node;
    this.size++;
    return this.top;
  }

  pop() {
    if(!this.top) throw new Error('nothing to remove');

    let temp = this.top;
    this.top = temp.next;
    temp.next = null;
    this.size--;

    return temp;
  }

  peek() {
    if(!this.top) throw new Error('nothing in stack');
    return this.top;
  }
};