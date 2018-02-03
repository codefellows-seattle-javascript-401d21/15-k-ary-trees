'use strict';

const Nd = require(`${__dirname}/nd`);

module.exports = class {

  constructor(max_size=1048){
    this.top = null;
    this.max_size = max_size;
    this.size = 0;
  }

  push(val){
    if(val === undefined) throw new Error('Invalid input: Value is undefined');
    if (this.size === this.max_size) throw new Error('Stack Overflow: Stack is at Max-size');
    let nd = new Nd(val);
    nd.next = this.top;
    this.top = nd;
    this.size++;
    return true;
  }
  //  Big-O: O(1) 
  
  
  pop(){
    if(this.size === 0) return null;
    let cur_top = this.top;
    let top_next = cur_top.next;
    this.top = top_next;
    this.size--;
    return cur_top.val;
  }
  //  Big-O: O(1) 
  

  peek(){
    return this.top.value;
  }
  //  Big-O: O(1) 

};