'use strict';

class Node {
    constructor(val) {
        if (!val) return new Error('Value must be passed as argument');
        this.value = val;
        this.next = null;
    }
};

module.exports = class Queue {
    constructor() {
        this.front = null;
        this.back = null;
        this.size = 0;
    }

    // Like Array.prototype.push(): O(1) as it inserts the new node directly without iterating through the list 
    enqueue(val) {
        let node = new Node(val);
        this.back ? this.back.next = node : this.front = node;
        this.back = node;
        this.size++;
        return node;
    }

    // Like Array.prototype.shift(): O(1) as it only modifies the previous node in the list and does not iterate through the whole list.
    dequeue() {
        if (!this.size) throw new Error('Nothing to shift!');
        let temp = this.front;
        this.front = this.front.next;
        if (!this.front) this.back = null;
        temp.next = null;
        this.size--;
        return temp;
    }
};