'use strict';

module.exports = class {
  constructor(val) {
    if(!val) return new Error('must be a valid value');
    this.val = val;
    this.next = null;
  }
};