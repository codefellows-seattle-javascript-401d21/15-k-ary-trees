'use strict';
const Stack = require('./lib/stack.js');
const parser = require('./lib/parser.js');
// const moduleTwo = require('./lib/moduleTwo.js');
const ktree = require('./lib/kary-tree');
const fs = require ('fs');

var elArray;

elArray = fs.readFileSync('./assets/minimal.html', (err, data) => {
  if (err) throw err;
  //console.log(elArray);
});

let newarray = parser(elArray);

let stack = new Stack();
let tree = new ktree;


tree.insert(newarray[0], newarray[0]);
if (!stack.top) { stack.push(newarray[0]); }



for (let i = 1; i < newarray.length; i ++) {
  let parent = stack.top.value;
 
 
  if (newarray[i] != stack.top.value) {
    // console.log('_____', newarray[i]);
    tree.insert(newarray[i],  parent);
    stack.push(newarray[i]);
    
  } else  {
    stack.pop();
   
  }
  
    
}
console.dir(tree, {depth: null});
