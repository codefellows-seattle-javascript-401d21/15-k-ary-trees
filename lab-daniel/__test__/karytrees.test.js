'use strict'; 'use strict';

const Tree = require('../lib/karytrees');
require('jest');

let testTree = new Tree();
testTree.insert(1);
testTree.insert(2, 1);
testTree.insert(3, 1);
testTree.insert(4, 3);




describe('Solution Tests', () => {
  describe('#insert', () => {
    it('Should insert nodes onto the correct parent', () => {
      expect(testTree.root.children.length).toBe(2);
    });
    it('Should return an instance of a Tree', () => {
      expect(testTree).toBeInstanceOf(Tree);
    });
    it('Should apply the correct value to nodes', () => {
      expect(testTree.root.children[1].val).toBe(3);
    });
  });
  describe('remove', () => {
    it('Should remove a node', () => {
      expect(testTree.root.children.length).toBe(2);
      testTree.removeByVal(3);
      expect(testTree.root.children.length).toBe(1);
    });
    it('Should remove the correct node', () => {
      expect(testTree.root.children[0].val).toBe(2);
    });
  });
});