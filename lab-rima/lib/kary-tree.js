'use strict';

const Queue = require('./queue');
/*
const TreeNode = class {
  constructor(eleName, textContent) {
    this.val = {eN: eleName, tC: textContent};
    this.children = [];
  }
};
*/
const karyTree = module.exports = class {
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
        //console.log(currentTN);
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
      //console.log('currentTN ', currentTN);
      if(currentTN.children.length > 0){
        //console.log('currentTN children has some TN');
        for(let i = 0; i < currentTN.children.length; i++){
          //console.log('i ', i);
          if(currentTN.children[i].val.eN === val.eN && currentTN.children[i].val.tC === val.tC){
            //console.log('Found val!! currentTN.children[i].val ', currentTN.children[0].val);
            //            currentTN.children.filter(e => {console.log('EEEEEE: ', e); e.val !== val});
            currentTN.children[i].val = {eN: null, tC: null};
            currentTN.children[i].children = [];
            //console.log('after filtered ', currentTN.children);
            //            break;
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

    let currentTN = this.root;
    let resArr = [];
 
    this.breadthFirst(currentTN => {
      if(currentTN.children.length === 0 && currentTN.val !== null) {
        resArr.push(currentTN);
      }
    });

    return resArr;
  }

};
