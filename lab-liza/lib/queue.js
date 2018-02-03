'use strict';

const Node = require('./node');

module.exports = class {
  constructor() {
    this.first = null; //front
    this.last = null; //back
    this.maxSize = 1048;
    this.size = 0;
  }

  enqueue(value) {
    if (this.size === this.maxSize) throw new Error ('This is an error');

    let node = new Node (value);

    this.last ? this.last.next = node : this.first = node;
    this.last = node;

    this.size++;

    return this.first;
    //Big-O: O(1)
  }

  dequeue() {
    let temp = this.first;
    this.first = this.first.next;

    temp.next = null;
    this.size --;

    return temp;
    //Big-O: O(1)
  }
};
