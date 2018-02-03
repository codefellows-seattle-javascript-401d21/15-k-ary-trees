'use strict'; 

const Queue = require('../lib/queue.js');

describe('Queue Module', function() {
  beforeEach(() => this.queue = new Queue());
  
  describe('#Queue constructor', () => {
    it('should create an object', () => {
      expect(this.queue).toBeInstanceOf(Object);
    });
    it('should have a null value', () => {
      expect(this.queue.front).toBeNull();
    });
  });
  describe('#Enqueue', () => {
    it('should add a new node to front of queue', () => {
      this.queue.enqueue(10);
      expect(this.queue.front.val).toEqual(10);
    });
    it('should throw an error when max size is met', () => {
      expect(() => {
        [...Array(1050)].map((e, i) => this.stack.push(~~(Math.random() * i)));
      }).toThrow();
    });
  });
  describe('#Dequeue', () => {
    it('should remove the last node from queue', () => {
      this.queue.enqueue(1);
      this.queue.enqueue(2);
      this.queue.dequeue();
      expect(this.queue.front.next).toBeNull();
    });
    it('should throw an error if there is nothing to remove', () => {
      expect(() => {
        this.queue.dequeue();
      }).toThrow();
    });
  });
});