'use strict';
const Nd = require('./nd');

class SLL {
  constructor() {
    this.head = null;
  }
  insertHead(val) { 
    if (!val) return null;
    let nd = new Nd(val);
    nd.next = this.head;
    this.head = nd;
    return this;
  }
  insertEnd(val) {
    if (!val) return null;
    let nd = new Nd(val);
    if (!this.head) {
      this.head = nd;
      this.listLength++;
      return this;
    }
    for (var itr = this.head; itr.next; itr = itr.next);
    itr.next = nd;
    return this;
  }
  findNthNodeFromEnd(n) { 
    if (n < 1 || typeof n !== 'number') return null;
    let curr = this.head;
    for (let i = 1; i < n; i++) {
      curr = curr.next;
      if (!curr) return 'this node does not exist';
    }
    return curr;
  }
}
module.exports = SLL;