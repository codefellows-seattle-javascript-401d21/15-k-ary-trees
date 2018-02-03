'use strict';

module.exports = class {
  constructor (val) {
    if (!val) return null; // BigO: O(1) Invalid Operation (all cases)
    this.val = val;
    this.next = null;
    return this; // BigO: O(1) Normal Operation (all cases)
  }
};