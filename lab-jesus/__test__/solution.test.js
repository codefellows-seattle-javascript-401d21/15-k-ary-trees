'use strict';

const solution = require('../index');
require('jest');

describe('Solution Module', function() {
  describe('#Two Largest', function() {
    it('should take in a created SLL and return the correct value from the end', function() {
      expect(solution.htmlToKary('./assets/minimal.html')).toEqual(2);
    });
  });
});