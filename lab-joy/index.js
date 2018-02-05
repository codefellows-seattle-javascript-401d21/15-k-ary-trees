'use strict';

const Tree = require('./lib/tree');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
let path = `${__dirname}/data/minimal.html`;

exports.parseHTML = path => {
    try { fs.accessSync(path); } catch (err) { throw new Error(err); }
    let tree = new Tree();
    fs.readFileProm(path)
        .then(buffer => buffer.toString())
        .then(str => {
            // set up tree structure
            let arr = str.split(/\<(.*)\>/g).filter(el => el.trim()); //eslint-disable-line
            arr.shift();
            tree.insert(arr[0]);
            for (let i = 1; i < arr.length; i++) {
                let current = arr[i], tempArr = arr.slice(0, i), parent;
                for (let j = i - 1; j >= 0; j--) {
                    if (tempArr[j] && tempArr[j].indexOf('/') === -1) {
                        parent = tempArr[j];
                        if (current[0] !== '/') tree.insert(current, parent);
                        break;
                    }
                    else if (tempArr[j][0] === '/') {
                        let temp = tempArr[j].slice(1), openIndex;
                        for (let x in tempArr)
                            if (tempArr[x] === temp) openIndex = x;

                        for (let k = 0; k < tempArr.length; k++)
                            if (k >= openIndex && k <= j) tempArr[k] = '';
                    }
                }
            }
        })
        .then(() => {
            // modify node values to separate tags and content
            return tree.breadthFirst(node => {
                let firstBracket = node.value.tag.indexOf('>');
                if (firstBracket > -1) {
                    let secondBracket = node.value.tag.indexOf('<');
                    node.value.content = node.value.tag.slice(firstBracket + 1, secondBracket);
                    node.value.tag = node.value.tag.slice(0, firstBracket);
                }
            });
        })
        .then(tree => {
            console.log('## inside the .then: ', tree);
            return tree;
        })
        .catch(err => new Error(err));
    return tree;
};
console.log('## return value: ', exports.parseHTML(path));

/* Why is this happening?:

## return value:  Tree { root: null }
## inside the .then:  Tree {
  root:
   TreeNode {
     value: { tag: 'html', content: '' },
     children: [ [TreeNode], [TreeNode] ] } }


*/