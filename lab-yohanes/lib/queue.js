'use strict';

class Node {
  constructor(val) { //value  being  the argument of mulitple instances
    this.head = null; //default
    this.val = val; //passing in the arg
  }
}

module.exports = class Queue {
  constructor() {
    this.front = null; //
    this.back = null;
  }

  enqueue(val) {
    let node = new Node(val);

    this.back ? this.next = node : this.front = node; //if (this.back) this.next = node } else { this.front = node}
    this.back = node;
    return this;
  }

  dequeue() {
    if(!this.front && !this.back) throw new Error('Queue is empty.'); //error first

    let temp = this.front; //first in last out
    this.front = this.front.next; //FILO
    if(!this.front) this.back = null;
    temp.next = null;
    return temp;
  }
};