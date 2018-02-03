// 'use strict';

// const Promise = require('bluebird')
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})
// const solution = module.exports = {};

// fs.readFileProm(`${__dirname}/../assets/minimal.html`)
// .then(data => solution.htmlToKary(data.toString()))
// .catch(console.log)

// solution.htmlToKary = function(data){
//   // console.log(data.to)
//   data = data.replace(/[\r\n]+/g, "")

//   let regNav = /.*?<title>(.*?)<\/title>.*/i;
//   let title = data.match(regNav)
//   console.log(title)
//   // console.log(`${__dirname}/../assets/mininal.html`)
// }

// solution.htmlToKary();
// solution.nthNode = function (SLL, n) {
//   if (!SLL || typeof SLL !== 'object' || typeof n !== 'number') return null;
//   let counter = 1;
//   for (var itr = SLL.head; itr.next; itr = itr.next) {
//     counter ++;
//   }
//   let diff = counter - n;
//   if (diff < 0) return 'nth value from end is greater than length of list';
//   if (diff < 1 || typeof diff !== 'number') return null;
//   let curr = SLL.head;
//   for (let i = 1; i < diff; i++) {
//     curr = curr.next;
//     if (!curr) return 'this node does not exist';
//   }
//   return curr;
// };


///stuff
'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Tree = require('./lib/tree.js');

let treeify = (data) => {
  let stack = [];
  let tree;
  let tag;
  let end = false;

  while (!end) {
    data = data.trim();
    if (data.startsWith('</html>')) end = true;
    console.log(tree);

    // </closing tag>
    if ( data[0] === '<' && data[1] === '/' ) {
      tag = '';
      for (var i = 2; data[i] !== '>'; i++) {
        tag += data[i];
      }
      data = data.slice(i + 1);
      stack.pop( tag );
      //console.log('</add>:', stack);

    // <opening tag>
    } else if ( data[0] === '<' ) {
      tag = '';
      for (var j = 1; data[j] !== '>'; j++) {
        tag += data[j];
      }
      data = data.slice(j + 1);
      // tree === undefined ? tree = new Tree (tag)
      //   : tree.insert(tag, stack[0]);
      // stack.push( tag );
      // console.log('<add>:', stack);

    // content
    } else {
      tag = '';
      for (var k = 0; data[k] !== '<'; k++) {
        tag += data[k];
      }
      data = data.slice(k);
      console.log('add:', stack);
      tree.insert(tag, stack[0]);
    }
  }
  return tree;
};

fs.readFileProm('./assets/minimal.html')
  .then( data => {
    data = data.toString().split('<!DOCTYPE html>')[1];
    treeify(data);
  })
  .catch(console.error);