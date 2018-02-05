'use strict'

const TreeNode = require('../lib/kary-tree')
const solution = require('../lib/solution')

describe('Solution Module', function() {
  describe('#HtmlTree', function() {
    let treeNode = new TreeNode()
    it('should return an object', function() {
      expect(treeNode).toBeInstanceOf(TreeNode)
    })
  })
  describe('#HtmlTree', function() {
    let tree = new TreeNode()
    it('should return tree', function() {
      expect(solution.htmlTree(tree)).toEqual({'root': null})
    })
  })
})