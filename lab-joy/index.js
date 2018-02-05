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
            console.log(arr);

            /*
            Iterate through arr.
                1. tree.insert(html)
                2. iterate through arr[0] to current index
                    a. if element begins with /, iterate thru again and splice out from el containing same name after / to the /.
                    b. iterate thru again and find the first element not beginning with /. this is the parent. 
            */
            // get element tree structure first

            tree.insert(arr[0]);
            // console.log(tree);

            // let openTags = arr.filter(el => el[0] !== '/');
            for (let i = 1; i < arr.length; i++) {
                let current = arr[i];
                let tempArr = arr.slice(0, i);



                // for (let j = 0; j < i; j++) {
                //     if (tempArr[j][0] === '/') {
                //         let closeTag = tempArr[j].slice(1);
                        
                //         for (let k = 0; k < j; k++ ) {
                //             if (tempArr[k].indexOf(closeTag) === 0)
                //                 tempArr = tempArr.slice(0, k).concat(tempArr.slice(j + 1));
                //             console.log(tempArr);
                //         }

                //     }
                // }



                // tree.insert(openTags.shift(), parent);
            }

            // check for text content second

        });
})();