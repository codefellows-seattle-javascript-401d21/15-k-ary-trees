'use strict';

const karyT = require('./lib/kary-tree');
const solution = require('./lib/solution');


let res = solution.htmlTree('./assets/minimal.html');

res.breadthFirst(node => {
  console.log('NODE.VAL -> ',node.val);
//  console.log('NODECHILDREN -> ',node.children);
});

//console.log(res.findBottomNodes());
