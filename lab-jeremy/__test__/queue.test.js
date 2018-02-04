'use strict';

const Queue = require('../lib/queue');
require('jest');

describe('Queue Data Structure Module', function () {
  beforeEach(() => this.Queue = new Queue());

  describe('default properties', () => {
    it('should create a new instance of a Queue', () => {
      expect(this.Queue).toBeInstanceOf(Queue);
    });
    it('should have a default val of null assigned to the front property', () => {
      expect(this.Queue.front).toBeNull();
    });
  });
  describe('#enqueue', () => {
    it('should add a new node with the val of 1 to the bottom of the Queue', () => {
      this.Queue.enqueue(1);
      expect(this.Queue.front.val).toEqual(1);
    });
  });
  describe('#dequeue', () => {
    it('should return an error', () => {
      expect(this.Queue.dequeue()).toBeInstanceOf(Error);

    });
    it('should remove the front node from the Queue', () => {
      this.Queue.enqueue(1);
      expect(this.Queue.front.val).toEqual(1);
      expect(this.Queue.dequeue().val).toEqual(1);

    });
  });
});