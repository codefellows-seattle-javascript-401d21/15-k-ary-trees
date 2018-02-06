'use strict'
const util = require('util')

const Queue = require('./queue')

const TreeNode = module.exports = class {
  constructor(val,value, depth) {
    this.val = val
    this.value = value
    this.children = [] // Scott haxored this! Feel free to stretch with the SLL! ;-)
    this.depth = depth
  }
}

const K_ary = module.exports = class {

  constructor() {
    this.root = null
  }

  // Traversal Methods
  breadthFirst(callback) {
    let current = null
    let queue = new Queue()
    queue.enqueue(this.root)


    while(queue.back) {
      current = queue.dequeue()

      // console.log('current', current)
      callback(current)

      current.val.children.map(c => queue.enqueue(c))
    }
  }

  insert(val, parent) {

if(typeof val !== 'number') return null

    let tn = new TreeNode(val)

    if(!this.root) {
      this.root = tn
      return this
    }

    this.breadthFirst(node => {
      if(parent === node.val.val) {
        node.val.children.push(tn)
        return
      }
    })
    return this
  }


  insertInfo(val, parent, text, childIndex) {

if(typeof val !== 'number') return null

    let tn = new TreeNode(val, text, parent)

    if(!this.root) {
      this.root = tn
      return this
    }

    this.breadthFirst(node => {
      if(parent === node.val.val) {
        node.val.children.push(tn)
        return
      }
    })

    return this
  }

  removeByVal(val) {
  }
}
