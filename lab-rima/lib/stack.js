'use strict';

const nd = require('./nd');


module.exports = class{
  constructor(maxLen = 1048){
    this.top = null;
    this.maxLen = maxLen;
    this.len = 0;
  }

  push(val){
    if(this.len === this.maxLen) throw new Error('Stack overflow!');

    let node = new nd(val);

    node.next = this.top;
    this.top = node;
    this.len++;
    
    return this.top;
  }

  pop(){
    if(this.len === 0) throw new Error('Stack is empty');

    let tempTop = this.top;
    this.top = tempTop.next;
    tempTop.next = null;
    this.len--;
    
    return tempTop;
  }

  peek(){
    if(this.len === 0) throw new Error('Stack is empty');

    return this.top;
  }
};
