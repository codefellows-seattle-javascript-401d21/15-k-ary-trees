'use strict';

const parser = require('../lib/parser');
require('jest');
require('fs');
const testString = '<html><head><head><html>';
let testData;

describe('Parser Module', function() {
  beforeAll(() => {
    testData = Buffer.from(testString);
  });

  describe('parser testing', () => {
  
    it('should return valid data', () => {
      expect(parser(testData)).toEqual(['<html>','<head>','<head>','<html>']);
    });

    it('should return null if no data', () => {
      expect(parser()).toBeNull();
    });

    it('should return null if no data', () => {
      expect(parser('hello')).toBeNull();
    });
  });

});
