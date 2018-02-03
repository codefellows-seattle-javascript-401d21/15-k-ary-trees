const Nd = require('./nd');

module.exports = class {
  
  constructor(max_size=1048) {
    this.head = null;
    this.tail = null;
    this.max_size = max_size;
    this.size = 0;
  }

  enqueue(val) {
    //if val is undefined then return null
    if(val === undefined) throw new Error('Invalid input: Value is undefined');
    if (this.size === this.max_size) throw new Error('Queue Overflow: Queue is at Max-size');
    let nd = new Nd(val);
    nd.next = this.head;
    this.head = nd;
    //if tail is empty set nd as the tail; 
    if(!this.tail) this.tail = nd;
    this.size++;
    return this;
  }
  //  Big-O: O(1) 

  dequeue() {
    //if this.head is undefined, return this
    if(!this.size) return null;
    //iterate the link list until you find the first from end
    for(var node = this.head; node.next.next; node = node.next);
    //remove the last node before adding updating the tail
    let last_value = node.next.value;
    node.next = null;
    //set the last item to the tail
    this.tail = node;
    this.size--;
    return last_value;
  }
//  Big-O: O(n) 

};
