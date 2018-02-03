'use strict';

module.exports = class{
  constructor(value) {
    if(!value) return new Error('Value mutst be passed as an argument');
    this.value = value;
    this.next = null;
  }
};
