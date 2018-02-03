'use strict';

const SLL = require('./sll');
const Queue = require('./queue');

class Tn {
  constructor(val) {
    this.value = val;
    this.children = null;
  }
}

module.exports = class {
  constructor(){
    this.root = null;
  }

  insert(val, parent) {
    let tn = new Tn(val);
    if (!this.root){
      this.root =  tn;
      return this;
    }
    console.log('parent', tn);
    if (parent === undefined) throw new Error('Validation Error: Parent value is undefined.');
    console.log('parent', tn);
    if (!this.root.children){
      this.root.children =  new SLL();
      this.root.children.insertHead(tn);
      return this;
    }
    this.breadthFirst( node => {
      console.log('parent', tn);
      if( parent === node.value.value) {
      
        if (!node.value.children) node.value.children = new SLL();
        node.value.children.insertHead(tn);
        console.log('node.value.children', node.value.children);
        return this;
      } 
    });
    return this;
  }

  find(val){
    if (val === undefined) throw new Error('Validation Error: value is undefined.');
    if (!this.root) return this;
    if (!this.root.children) return this;

    this.breadthFirst( node => {
      if( val === node.value.value) {
        return node.value;
      } 
    });
  }

  removeByVal(val){
    if (val === undefined) throw new Error('Validation Error: value is undefined.');
    if (!this.root) return null;
    if (this.root.value === val){
      this.root = null;
      return this;
    }

    let previous_node;

    this.breadthFirst( node => {
      if( val === node.value.value) {
        previous_node.next = node.next;
        return this;
      } 
      previous_node = node;
    });
  }
   

  breadthFirst(callback){
    let childrenQue = new Queue();
    //if (!this.root.children) this.root.children =  new SLL();
    console.log('this.root', this.root)
    childrenQue.enqueue(this.root.children.head);
    //childrenQue.enqueue(this.root.children.head);
    let node = childrenQue.dequeue();
    console.log('node', node);
    while(node){
      callback(node);
      childrenQue.enqueue(node.value.children.head);
      node = node.next;
    }
  }

};
