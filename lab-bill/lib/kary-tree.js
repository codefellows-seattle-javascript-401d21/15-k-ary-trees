'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(val) {
    this.val = {eleName : val.ele, textContent: val.text};
    this.children = []; 
  }
};

const Kary = module.exports = class {
  constructor() {
    this.root = null;
  }
  breadthFirst(callback) {
    let current = null;
    let queue = new Queue();
    queue.enqueue(this.root);


    while(queue.back) {
      current = queue.dequeue();

    //   console.log('current', current);
      callback(current);

      current.val.children.map(c => queue.enqueue(c));
    }
  }

  insert(val, parent) {
    let tn = new TreeNode(val);

    if(!this.root) {
      this.root = tn;
      return this;
    }

    this.breadthFirst(node => {
      if(parent === node.val.val) {
        node.val.children.push(tn);
        return;
      }
    });

    return this;
  }

  removeByVal(val) {
  }
};

let tree = new Kary;
tree.insert(1);
tree.insert(2, 1);
tree.insert(3, 2);
tree.insert(4, 1);
tree.breadthFirst(console.log);
// console.dir(tree, {depth: null});

// {  new parent new node
// {} new node append to current parent
// } find old parent