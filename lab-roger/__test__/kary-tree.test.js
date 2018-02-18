'use strict';

const tree = require('../lib//kary-tree');

describe('K-ary tree constructor', function() {
  beforeAll(() => {
    this.tree = new tree; 
  });

  it('shoud be an instance of a tree', () => {
    expect(this.tree).toBeInstanceOf(tree);

  });

  it('should take in 2 parameters', ()  => {
    expect(this.tree.insert(1)).toBe(null);
  });

  it('create a valid tree with children', () => {
    expect(this.tree.insert(1, 1)).toEqual({'root': {'children': [], 'val': 1}});
    expect(this.tree.insert(2, 1)).toEqual({'root': {'children': [{'children': [], 'val': 2}], 'val': 1}});
  });




});