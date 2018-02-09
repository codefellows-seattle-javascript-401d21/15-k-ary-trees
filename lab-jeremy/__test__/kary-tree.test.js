'use strict';

const KTree = require('../lib/kary-tree');
require('jest');

describe('K-ary tree testing', () => {
  beforeEach(() => this.KTree = new KTree());

  it('should be an instance of k-ary tree', () => {
    expect(this.KTree).toBeInstanceOf(KTree);
  });
  it('should have a value of one.', () => {
    this.KTree.insert(1);
    expect(this.KTree.root.val).toEqual(1);
  });
  it('should be an array of nodes and have the values 5 and 6.', () => {
    this.KTree.insert(1);
    this.KTree.insert(5, 1);
    this.KTree.insert(6, 1);
    expect(this.KTree.root.children).toBeInstanceOf(Array);
    expect(this.KTree.root.children).toEqual([{"children": [], "val": 5}, {"children": [], "val": 6}])
  });
  it('should be an array of nodes with no children (values 20, 10)', () => {
    this.KTree.insert(1);
    this.KTree.insert(5, 1);
    this.KTree.insert(6, 1);
    this.KTree.insert(10, 5);
    this.KTree.insert(15, 6);
    this.KTree.insert(20, 15);
    let results = [];
    this.KTree.breadthFirst((currentNode) => {

      //check each node for .children property to be and empty array and push to results array if it is
      if(!currentNode.val.children[0]) results.push(currentNode.val);
    });
    expect(results).toEqual([{"children": [], "val": 10}, {"children": [], "val": 20}]);
  });
});