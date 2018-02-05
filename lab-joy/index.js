'use strict';

const Tree = require('./lib/tree');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

(function() {
    let tree = new Tree();
    fs.readFileProm(`${__dirname}/data/minimal.html`)
        .then(buffer => buffer.toString())
        .then(str => {
            // /\<(.*?)\>/g
            let arr = str.split(/\<(.*)\>/g).filter(el => el.trim()); //eslint-disable-line
            arr.shift();
            // console.log(arr);

            /*
            Iterate through arr.
                1. tree.insert(html)
                2. iterate through arr[0] to current index
                    a. if element begins with /, iterate thru again and splice out from el containing same name after / to the /.
                    b. iterate thru again and find the first element not beginning with /. this is the parent. 
            */
            // get element tree structure first

            tree.insert(arr[0]);
            for (let i = 1; i < arr.length; i++) {
                let current = arr[i];
                let tempArr = arr.slice(0, i);
                let parent;
                for (let j = i - 1; j >= 0; j--) {
                    if (tempArr[j] && tempArr[j].indexOf('/') === -1) {
                        parent = tempArr[j];
                        if (current[0] !== '/') {
                            // console.log(current, parent);
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
            console.log(tree.root.children[0].children);
            // check for text content second

        });
})();