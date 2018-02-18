'use strict';

const Queue = require('../lib/queue');
require ('jest');


describe('Queue Module', function() {

  beforeEach(() => this.queue = new Queue());


  describe('Default Properties', () =>{

    it('should create a new instance of a queue', () =>{
      expect(this.queue).toBeInstanceOf(Queue);
    });
  });

  describe('enQueue', () =>{

    it('should create a new placeholder in queue', () =>{
      expect(this.queue.enqueue(1).front.val).toEqual(1);
    });
    
    

  });
  describe('enDequeue', () =>{

    it('should remove a placeholder in the front of thequeue', () =>{
      this.queue.enqueue(1);
      this.queue.enqueue(2);
      this.queue.enqueue(25);
      expect(this.queue.dequeue().val).toEqual(1);
      

    });
    
  });

  



});