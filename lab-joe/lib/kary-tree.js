'use strict'

const Queue = require('./queue')

const TreeNode = class {
  constructor(val,value) {
    this.val = val
    this.children = [] // Scott haxored this! Feel free to stretch with the SLL! ;-)
    this.value = value
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

  // Insertions
  insert(val, parent) {

if(typeof val !== 'number') return null

// console.log(this)
    // console.log(parent)
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
    // console.log(this)
    return this
  }


  insertInfo(val, parent, text) {

if(typeof val !== 'number') return null

// console.log(this)
    // console.log(parent)
    let tn = new TreeNode(val, text)

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
    // console.log(this)
    return this
  }



  // Removals
  removeByVal(val) {
    // Remove the first node you find that matches val
  }
}
