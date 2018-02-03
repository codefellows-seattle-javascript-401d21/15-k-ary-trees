'use strict';

const karyT = require('./lib/kary-tree');
const htmlTree = require('./lib/solution');


let res = htmlTree('./assets/minimal.html');

console.log(res.findBottomNodes());
