'use strict';

const Tree = require('./lib/tree');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

(function() {
    let tree = new Tree();
    fs.readFileProm(`${__dirname}/data/minimal.html`)
        .then(buffer => buffer.toString())
        .then(str => {
            // set up tree structure
            let arr = str.split(/\<(.*)\>/g).filter(el => el.trim()); //eslint-disable-line
            arr.shift();
            tree.insert(arr[0]);
            for (let i = 1; i < arr.length; i++) {
                let current = arr[i];
                let tempArr = arr.slice(0, i);
                let parent;
                for (let j = i - 1; j >= 0; j--) {
                    if (tempArr[j] && tempArr[j].indexOf('/') === -1) {
                        parent = tempArr[j];
                        if (current[0] !== '/') {
                            tree.insert(current, parent);
                        }
                        break;
                    }
                    else if (tempArr[j][0] === '/') {
                        let temp = tempArr[j].slice(1);
                        let openIndex;
                        for (let x in tempArr) 
                            if (tempArr[x] === temp) openIndex = x;
                        
                        for (let k = 0; k < tempArr.length; k++) {
                            if (k >= openIndex && k <= j) tempArr[k] = '';
                        }
                    }
                }
            }
        })
        .then(() => {
            // modify tree value to separate tags and content
            tree.breadthFirst(node => {
                let firstBracket = node.value.tag.indexOf('>');
                if (firstBracket > -1) {
                    let secondBracket = node.value.tag.indexOf('<');
                    let content = node.value.tag.slice(firstBracket + 1, secondBracket);
                    node.value.tag = node.value.tag.slice(0, firstBracket);
                    node.value.content = content;
                }
            });
        })
        .catch(err => console.error(err));
})();