'use strict';

const node = require('./nd');


module.exports = class{
  constructor(maxLen = 1048){
    this.head = null;
    this.maxLen = maxLen;
    this.len = 0;
  }

  enqueue(val){
    if(this.len === this.maxLen) throw new Error('Queue overflow!');

    let nd = new node(val);

    // if head is null
    if(!this.head){
      this.len++;
      this.head = nd;
      return this.head;
    }

    // find tail node
    let current = this.head;
    while(current.next){
      current  = current.next;
    }

    // insert a new node in end
    current.next = nd;
    this.len++;
    
    // return new tail
    return nd;
  }

  dequeue(){
    if(this.len === 0) throw new Error('Queue is empty');

    let tempHead = this.head;
    this.head = tempHead.next;
    tempHead.next = null;
    this.len--;
    
    return tempHead;
  }
};
