'use strict';

const Queue = require('./queue');

const TreeNode = class {
  constructor(eleName, textContent) {
    this.val = {eN: eleName, tC: textContent};
    this.children = [];
  }
};

const karyTree = class {
  constructor() {
    this.root = new TreeNode(null, null);
  }

  // Traverse tree
  breadthFirst(callback) {
    let q = new Queue();
    q.enqueue(this.root);
    let currentTN;

    while(q.len > 0){
      currentTN = q.dequeue().value;
      callback(currentTN);

      if(currentTN.children.length > 0){
        currentTN.children.map(c => q.enqueue(c));
      }
    }
  }

  insert(eN, tC, parentVal) {
    let newTN = new TreeNode(eN, tC);
    
    if(this.root.val.eN === null && this.root.val.tC === null) {
      this.root = newTN;
      return this;
    }

    this.breadthFirst(currentTN => {
      if(parentVal.eN === currentTN.val.eN && parentVal.tC === currentTN.val.tC){
        currentTN.children.push(newTN);
        return;
      }
    });

    return this;
  }

  removeByVal(eN, tC){
    if(this.root.val.eN === null && this.root.tC === null){
      return this;
    }

    this.breadthFirst(currentTN => {
      if(currentTN.children.length > 0){
        for(let i = 0; i < currentTN.children.length; i++){
          if(currentTN.children[i].val.eN === eN && currentTN.children[i].val.tC === tC){
            currentTN.children[i].val = {eN: null, tC: null};
            currentTN.children[i].children = [];
          }
        }
        return;
      }
    });

    return this;
  }


  // look for the very bottom leaf
  findBottomNodes() {
    if(this.root.val === null){
      return null;
    }

    let resArr = [];
 
    this.breadthFirst(currentTN => {
      if(currentTN.children.length === 0 && currentTN.val !== null) {
        resArr.push(currentTN);
      }
    });

    return resArr;
  }

};

module.exports = {TreeNode, karyTree};
