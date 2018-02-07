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
  
    if (parent === undefined) throw new Error('Validation Error: Parent value is undefined.');
    if (!this.root.children){
      this.root.children =  new SLL();
      this.root.children.insertHead(tn);
      return this;
    }

    if( parent === this.root.value ) {
      if (!this.root.children) this.root.children = new SLL();
      this.root.children.insertHead(tn);
      return this;
    }

    this.breadthFirst( node => {
      if( parent === node.value.value) {
        if (!node.value.children) node.value.children = new SLL();
        node.value.children.insertHead(tn);
        return this;
      } 
    });
    return this;
  }   //Big-O O(n)


  find(val){
    if (val === undefined) throw new Error('Validation Error: value is undefined.');
    if (!this.root) return null;
    if (!this.root.value) return null;

    let  nodeVal = null;
    this.breadthFirst( node => {
      if( val === node.value.value) {
        console.log('node', node);
        nodeVal = node.value;
        return;
      } 
    });
    return nodeVal;
  } //Big-O O(n)

  removeByVal(val){
    if (val === undefined) throw new Error('Validation Error: value is undefined.');
    if (!this.root) return null;
    if (this.root.value === val){
      this.root = null;
      return this;
    }

    let previous_node = null;

    this.breadthFirst( node => {
      if( val === node.value.value) {
        if( !previous_node) {
          this.root.children.head = node.next;
          return this;
        }
        previous_node.next = node.next;
        return this;
      } 
      previous_node = node;
    });
  } //Big-O O(n)

  insertData(val, parent) {
    let tn = new Tn(val);
    if (!this.root){
      this.root =  tn;
      return this;
    }
   
    if (parent === undefined) throw new Error('Validation Error: Parent value is undefined.');
    if (!this.root.children){
      this.root.children =  new SLL();
      this.root.children.insertHead(tn);
      return this;
    }

    if( parent.eleName === this.root.value.eleName ) {
      if (!this.root.children) this.root.children = new SLL();
      this.root.children.insertHead(tn);
      return this;
    }

    this.breadthFirst( node => {
      if( parent.eleName === node.value.value.eleName) {
        if (!node.value.children) node.value.children = new SLL();
        node.value.children.insertHead(tn);
        return this;
      } 
    });
    return this;
  } //Big-O O(n)
   
  breadthFirst(callback){
    let childrenQue = new Queue();
    childrenQue.enqueue(this.root.children.head);
    let node; 
    while(childrenQue.back){
      node = childrenQue.dequeue();
      while(node){
        callback(node);
        if (node.value.children) childrenQue.enqueue(node.value.children.head);
        node = node.next;
      }
    }
  } //Big-O O(n)

};
