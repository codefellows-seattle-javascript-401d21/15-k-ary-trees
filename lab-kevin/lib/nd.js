'use strict';

module.exports = class {
  constructor(value) {
    if (value === undefined) value = null;
    this.value = value;
    this.next = null;
  }
};

