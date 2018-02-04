'use strict';

const htmlTree = require('../index.js');

describe('TURN HTML INTO OBJECT TREE', () => {
  it('should return an object', () => {
    expect( htmlTree.createTree('minimal.html') ).toBe('thing');
  })
})
