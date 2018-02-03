'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Tree = require('./lib/tree.js');

let stack = [];

let words;

let treeify = (data) => {
  let tree;
  let tag;
  let end = false;

  data = data
    .toString()
    .split('<!DOCTYPE html>')[1]

  while (!end) {
    data = data.trim()
    if (data.startsWith('</html>')) end = true;
    if ( data[0] === '<' && data[1] === '/' ) {
      tag = '';
      for (var i = 2; data[i] !== '>'; i++) {
        tag += data[i];
      }
      data = data.slice(i + 1);
      stack.pop( tag );
      console.log('</add>:', stack);

    } else if ( data[0] === '<' ) {
      tag = '';
      for (var j = 1; data[j] !== '>'; j++) {
        tag += data[j];
      }
      data = data.slice(j + 1);
      // !stack[0] ? tree = new Tree (tag)
      //   : tree.insert(tag, `${stack[0]}`);
      stack.push( tag );
      console.log('<add>:', stack)

    } else {
      tag = '';
      for (var k = 0; data[k] !== '<'; k++) {
        tag += data[k];
      }
      data = data.slice(k);
      console.log('add:', stack);
      // tree.insert(tag, `${stack[0]}`);
      // console.log('data', data[1])
    }
  }
  return tree;
}




//   while (stop < 10) {
//     data = data.trim()
//     if ( data[1] === '<' && data[2] === '/' ) {
//       tag = '';
//       for (var i = 3; data[i] !== '>'; i++) {
//         tag += data[i];
//       }
//       data = data.slice(i + 1);
//       stack.pop( tag );
//       console.log('</add>:', stack);
//
//     } else if ( data[1] === '<' ) {
//       tag = '';
//       for (var j = 2; data[j] !== '>'; j++) {
//         tag += data[j];
//       }
//       data = data.slice(j + 1);
//       // !stack[0] ? tree = new Tree (tag)
//       //   : tree.insert(tag, `${stack[0]}`);
//       stack.push( tag );
//       console.log('<add>:', stack)
//
//     } else {
//       tag = '';
//       for (var k = 1; data[k] !== '<'; k++) {
//         tag += data[k];
//       }
//       data = data.slice(k);
//       console.log('add:', stack);
//       // tree.insert(tag, `${stack[0]}`);
//       // console.log('data', data[1])
//     }
//     stop++;
//   }
//   return tree;
// }


// switch (true) {
//   case data.startsWith('</'):
//     console.log('</data>');
// capture name from </ to >
// pop name from stack
// remove from data
// case data.startsWith('<') && !data.startsWith('</'):
//   console.log('<data>')
// capture name from < to >
// make root or child of stack top
// push to stack
// remove from data
// default:
// console.log('data');
// capture
// make child of stack top
// remove from data
// }
// }
// console.log(data);


fs.readFileProm('./assets/minimal.html')
  .then( data => {
    treeify(data);
  }).catch( console.error )

// file = file.toString().split('').join('')


// file
//   .toString() // parse it into a string
//   .split('') // split each section into an array
//   .map(
//     (tag) => {
//       // switch (page item)
//       // case '<stuff>':
//         // empty stack ? set tag to root
//           // : set tag to child of the item on the top of the stack
//         // add stuff to the stack
//       // case 'stuff':
//         // add stuff as a child to the current top of stack
//       // case '</stuff>':
//         // pop stuff off of the stack
//     }
//   )
