'use strict';

const solution = require('../index');
const data = `${__dirname}/../assets/minimal.html`;

describe('solution valid', () => {
  it('checking to see where the html element is at.', () => {
    expect(solution(data).root.val).toBe('html');
  });
  it('checking to make sure the head is in the right area.', () => {
    expect(solution(data).root.children[0].val).toBe('head');
  });
  it('checking to see if the body is on a different tree', () => {
    expect(solution(data).root.children[1].val).toBe('body');
  });
  it('checking to see if the text is at the end of a branch', () => {
    expect(solution(data).root.children[0].children[0].children[0].val).toBe('minimal html to tree');
  });
  describe('solution invalid', () => {
    it('should return null if in an ivalid form is put in', () => {
      expect(solution(['not', 'valid', 'data'])).toBe(null);
    });
    it('should return null if nothing is passed in', () => {
      expect(solution()).toBe(null);
    });
    it('should return a error with bad path', () => {
      expect(() => solution('weird path')).toThrow();
    });
  });
});
  
  