const Nd = require('./nd');

'use strict';

module.exports = class {
  constructor(max_size=1048) {
    this.front = null;
    this.back = null;
    this.max_size = max_size;
    this.size = 0;
  }

  enqueue(val) {
    if(val === undefined) throw new Error('Invalid input: Value is undefined');
    if (this.size === this.max_size) throw new Error('Queue Overflow: Queue is at Max-size');
    let node = new Nd(val);
    this.back ? this.back.next = node : this.front = node;
    this.back = node;
    this.size++;
    return this;
  }

  dequeue() {
    if(!this.size) return null;
    if(!this.front && !this.back) return null;
    let temp = this.front;
    this.front = this.front.next;
    if(!this.front) this.back = null;
    temp.next = null;
    this.size--;
    return temp.value;
  }
};

