'use strict';

const doThing = require('../lib/solution');
const testData = './assests/minimal.html';


describe('solution valid', () => {
  it('checking to see where the html elememt is at.', () => {
    expect(doThing(testData).root.val).toBe('html');
  });
  it('checking to make sure the head is in the right area.', () => {
    expect(doThing(testData).root.children[0].val).toBe('head');
  });
  it('checking to see if the body is on a different tree', () => {
    expect(doThing(testData).root.children[1].val).toBe('body');
  });
  it('checking to see if the text is at the end of a branch', () => {
    expect(doThing(testData).root.children[1].children[0].children[0].children[0].val).toBe('We\'re building a tree!');
  });
  
  describe('solution invalid', () => {
    it('should return a error with bad path', () => {
      expect(() => {
        doThing(testD);
      }).toThrow();
    });
  });
  it('should return null if nothing is passed in', () => {
    expect(doThing()).toBe(null);
  });
  it('should return null if an array is passed in', () => {
    expect(doThing([1,4,7])).toBe(null);
  });
});
  
