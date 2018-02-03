'use strict';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

module.exports = class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }

  enqueue(value) {
    let node = new Node(value);

    this.back ? this.back.next = node : this.front = node;
    this.back = node;
    return this;
  }

  dequeue() {
    if(!this.front && !this.back) throw new Error('Queue is empty.');

    let temp = this.front;
    this.front = this.front.next;
    if(!this.front) this.back = null;
    temp.next = null;
    return temp;
  }
};