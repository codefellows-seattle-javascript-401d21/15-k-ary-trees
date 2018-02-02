'use strict';

const dedupe = require('../solution.js');
const SLL = require('../lib/sll.js');

let testListA = new SLL;
let testListB = new SLL;
let nullList = new SLL;

testListA.insertEnd(1);
testListA.insertEnd(2);
testListA.insertEnd(3);
testListA.insertEnd(3);
testListA.insertEnd(4);

testListB.insertEnd(1);
testListB.insertEnd(2);
testListB.insertEnd(1);
testListB.insertEnd(1);
testListB.insertEnd(4);

let resultA = { 'head': { 'next': { 'next': { 'next': { 'next': null, 'value': 4 }, 'value': 3 }, 'value': 2 }, 'value': 1 } };
let resultB = { 'head': { 'next': { 'next': { 'next': { 'next': null, 'value': 4 }, 'value': 1 }, 'value': 2 }, 'value': 1 } };
1;

describe('DEDUPE', () => {
  it('should return the list without any consecutive duplicates', () => {
    expect(dedupe(testListA.head)).toEqual(resultA);
  });
  it('should return null if the input list has no values', () => {
    expect(dedupe(nullList)).toEqual(null);
  });
  it('should return the list without consecutive duplicates, but still spaced duplicates', () => {
    expect(dedupe(testListB.head)).toEqual(resultB);
  });
});