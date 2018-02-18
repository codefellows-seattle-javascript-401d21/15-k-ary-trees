'use strict';

module.exports = class {
  constructor(value) {
    if(!value) return new Error('Value must be passed in');
    this.value = value;
    this.next = null;

  }

};