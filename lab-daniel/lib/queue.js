'use strict';

let Nd = require('./nd');

module.exports = class {
  constructor(maxSize=1000) {
    this.front = null;
    this.maxSize = maxSize;
    this.size = 0;
    return this; // BigO: O(1) Normal Operation (all cases)
  }

  enqueue(val) {
    if (val !== 0 && !val) return null; // BigO: O(1) Invalid Operation (best case)
    let node = new Nd(val);
    if (!this.front) {
      this.front = node;
      this.size++;
      return this; // BigO: O(1) Normal Operation (best case)
    }
    for (var itr = this.front; itr.next; itr = itr.next);
    itr.next = node;
    this.size++;
    return this; // BigO: O(n) Normal Operation (worst case)
  }

  dequeue() {
    let desociated = this.front;
    this.front = this.front.next;
    desociated.next = null;
    this.size--;
    return desociated; // BigO: O(1) Normal Operation (all cases)
  }
};