'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor (val) {
    this.val = val;
    this.children = [];
  }
};

module.exports = class Ktree {
  constructor () {
    this.root = null;
  }

  //Transverse the tree
  breadthFirst(callback) { //callback will be one of the methods defined below
    let current = null; //pointer
    let queue = new Queue();
    queue.enqueue(this.root); //put root in dequeue

    while (queue.back) { //while the queue exists
      current = queue.dequeue();// set pointer to root

      // console.log('current', current);
      callback(current); //perform method
        //Map over vals looking for children and put in queue if found
      current.val.children.map(c => queue.enqueue(c));
    }
  }

  //Insertions
  insert(val, parent) {
    //create node with value
    let tn = new TreeNode(val);

      //if no tree, set node as root
    if(!this.root) {
      this.root = tn;
      return this;
    }
      //call traversal method
    this.breadthFirst(node => {
      //check if node is at the parent level and push the new value into an array
      // console.log('node', node);
      // console.log('node.val', node.val);
      // console.log('node.val.val', node.val.val);
      if (parent === node.val.val) {
        node.val.children.push(tn);
        return;
      }
    });
    console.log(this);
    return this;
  }

  //Removals
  // removeByVal(val) {
  //
  // }
};
