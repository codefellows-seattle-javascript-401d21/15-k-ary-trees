'use strict';

const Queue = require('./queue');
// const { debug, debugV } = require('./debug');
const debug = require('debug')('kary:const');
const debugV = require('debug')('karv:const');

const TreeNode = class {
  constructor(eleName, textContent) {
    debugV(`TreeNode() : eleName : ${eleName} ; textContent: ${textContent}`);
    this.val = {};
    if (!eleName || typeof eleName !== 'string' || eleName.length < 1) {
      throw new Error('Invalid input: eleName is required and must be a string of length > 0.');
    }
    this.val.eleName = eleName;
    this.val.textContent = textContent || '';
    this.children = [];
    debug(`TreeNode() : output : ${JSON.stringify(this)}`);
  };
};

const Kary = class {
  constructor() {
    debugV(`Kary() : called`);
    this.root = null;
    debug(`Kary() : output : ${JSON.stringify(this)}`);
  };

  breadthFirst(callback, allowStop) {
    debugV(`Kary.breadthFirst() : callback : ${callback}`)
    let current = null;
    let queue = new Queue();
    queue.enqueue(this.root);
    let stop = false;
    debug(`Kary.breadthFirst() : start while`);
    while(queue.back && (!allowStop || !stop)) {
      current = queue.dequeue();
      debugV(`Kary.breadthFirst() : current : ${JSON.stringify(current)}`);
      stop = callback(current);
      current.val.children.map(children => queue.enqueue(children));
      debugV(`Kary.breadthFirst() : current.val.children = ${JSON.stringify(current.val.children)}`);
      debugV(`Kary.breadthFirst() : queue: ${JSON.stringify(queue)}`);
    }
    debug(`Kary.breadthFirst() : end while`);
    return allowStop && stop;
  };

  insert(eleName, parent, textContent) {
    debugV(`Kary.insert() : eleName: ${eleName} ; parent : ${parent}) ; textContent : ${textContent}`);
    let tn = new TreeNode(eleName, textContent);
    if (!this.root) {
      this.root = tn;
      debug(`Kary.insert() : added root`)
      return this.root;
    }
    if (!parent || !(parent instanceof TreeNode)) {
      throw new Error('Invalid input: parent is required and must an instance of TreeNode.');
    }
    const found = this.breadthFirst(node => {
      if (parent.val === node.val.val) {
        node.val.children.push(tn);
        debug(`Kary.insert() : Kary.breadthFirst() : output : ${JSON.stringify(this)}`);
        return true;
      }
    }, true);

    debug(`Kary.insert() : found ${JSON.stringify(parent.val.eleName)} : ${found}`);
  };

  removeByVal (val) {
    return null;
  };
};

module.exports = Kary;
