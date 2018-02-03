'use strict';

const Queue = require('./queue');

const TreeNode = class {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

module.exports = class Tree {
    constructor() {
        this.root = null;
    }

    // Traversal: O(n) - traverses through each node in the tree once and uses queue O(1) methods on each node
    breadthFirst(callback = node => {
        console.log(node);
    }) {
        if (typeof callback !== 'function') return 'Argument must be a function.';

        let current = null;
        let queue = new Queue();
        queue.enqueue(this.root);

        while (queue.size) {
            current = queue.dequeue().value;
            callback(current);
            current.children.map(child => queue.enqueue(child));
        }
    }

    // Insertion: O(n) - uses breadthFirst method to traverse through each node
    insert(value, parent) {
        if (!value) return 'Must declare value.';
        let treeNode = new TreeNode(value);

        if (!this.root) {
            this.root = treeNode;
            return this;
        }

        if (!parent) return 'Must declare parent node value if the tree already has a root.'

        let added = false;
        this.breadthFirst(node => {
            if (parent === node.value) {
                node.children.push(treeNode);
                added = true;
            } 
        });

        return added ? 'Node has been added to tree' : 'Parent node value does not exist.';
    }

    // Removal: O(n) - uses breadthFirst method to traverse through each node
    remove(value) {
        if (!value) return 'Must declare value.';
        if (!this.root) return 'Nothing to remove.';
        if (this.root.value === value) {
            this.root = null;
            return 'Root removed.';
        }

        let removed = false;
        this.breadthFirst(node => {
            for (let i in node.children) {
                if (node.children[i].value === value) {
                    node.children.splice(i, 1);
                    removed = true;
                }
            }
        });
        return removed ? 'Node was removed from tree' : 'Value was not found in tree.';
    }
}

