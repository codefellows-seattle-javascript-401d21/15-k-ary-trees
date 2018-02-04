'use strict';

require('jest');
const Stack = require('../lib/stack');

describe('Stack Module', function() {
  beforeEach(() => this.stack = new Stack());

  describe('Default Properties', () =>{
    it('should create a new instance of a stack', () =>{
      expect(this.stack).toBeInstanceOf(Stack);
    });
    it('should have a default value of null assigned to the top', () =>{
      expect(this.stack.top).toBeNull();
    });
    it('should have a default val 0 assigned to the size property', () => {
      expect(this.stack.size).toEqual(0);
    });
  });
  describe('Push method', () =>{
    it('should have a size of 20', () => {
      [...Array(20)].map((e, i) => this.stack.push(~~(Math.random() * i )));
      expect(this.stack.size).toEqual(20);
    });
    it('should add a new node with value of 1 to the top of the stack', () => {
      this.stack.push(1);
      expect(this.stack.top.value).toEqual(1);
    });
    it('throw an error when maxSize is met', () => {
      expect(() => {
        [...Array(1049)].map((e, i) => this.stack.push(~~(Math.random() * i)));
      }).toThrow();
    });

  });
  describe('Pop method', () =>{

    it('should remove a new node with value of 1 from the top of the stack', () => {
      this.stack.push(1);
      expect(this.stack.pop().value).toEqual(1);
    });


  });
  describe('Peek', () =>{

    it('should return the value of top of the stack', () => {
      this.stack.push(1);
      expect(this.stack.peek().value).toEqual(1);
    });


  });


});