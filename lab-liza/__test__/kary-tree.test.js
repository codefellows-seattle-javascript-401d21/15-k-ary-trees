'use strict';

const Queue = require('../lib/queue');

describe('Queue Data Structure Module', function () {
  beforeEach(() => this.queue = new Queue());

  describe('default properties', () => {
    it('should create a new instance of a queue', () => {
      expect(this.queue).toBeInstanceOf(Queue);
    });
    it('should have a default value of null assigned to the first property', () => {
      expect(this.queue.first).toBeNull();
    });
    it('should have a default value of null assigned to the last property', () => {
      expect(this.queue.last).toBeNull();
    });
    it('should have a default value of 0 assigned to the size property', () => {
      expect(this.queue.size).toEqual(0);
    });
    it('should have a maxSize property with a default value of 1048', () => {
      expect(this.queue.maxSize).toEqual(1048);
    });
  });

  describe('#enqueue', () => {
    it('should add a new node with the value of 1 to the back of the queue', () => {
      this.queue.enqueue(1);
      expect(this.queue.last.value).toEqual(1);
    });
    it('should have the correct size', () => {
      [1, 2, 3, 4, 5, 6, 7, 8].map((x, y) => this.queue.enqueue(~~(Math.random() * y)));
      expect(this.queue.size).toEqual(8);
    });
    it('throw an error when maxSize is met', () => {
      expect(() => {
        [...Array(2000)].map((x, y) => this.queue.enqueue(~~(Math.random() * y)));
      }).toThrow('This is an error');
    });
  });

  describe('#dequeue', () => {
    it('should remove the node from the queue', () => {
      this.queue.enqueue(10);
      this.queue.enqueue(20);
      expect(this.queue.first.value).toEqual(10);
      expect(this.queue.dequeue().value).toEqual(10);
      expect(this.queue.first.value).toEqual(20);
    });
  });
});