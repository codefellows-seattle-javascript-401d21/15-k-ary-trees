'use strict';
const htmlFile = require('../index');



describe('Valid', () => {
  it('Should return the root element of minima.html', () => {
    expect(htmlFile.createTree('minimal.html').root.element).toBe('html');
  });
  it('Should return head as children index 0', () => {
    expect(htmlFile.createTree('minimal.html').root.children[0].element).toBe('head');
  });
  it('Should return head as children index 1', () => {
    expect(htmlFile.createTree('minimal.html').root.children[1].element).toBe('body');
  });
});

describe('Invalid', () => {
  it('Should return an error with bad path', () => {
    expect(() => {
      htmlFile(testD);
    }).toThrow();
  });
  it('should return null if numberial values is passed in', () => {
    expect(htmlFile.createTree(123)).toBe(null);
  });
  it('Should return null if an array is passed in', () => {
    expect(htmlFile.createTree([1,4,7])).toBe(null);
  });
});