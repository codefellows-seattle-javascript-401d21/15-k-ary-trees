'use strict';
const Stack = require('./lib/stack.js');
const parser = require('./lib/parser.js');
// const moduleTwo = require('./lib/moduleTwo.js');
const ktree = require('./lib/kary-tree');
const fs = require ('fs');

fs.readFile('./assets/minimal.html', (err, data) => {
  if (err) throw err;

  let test = parser(data);
  // let tempData = data.toString().split(/\n/gi).map(x => x.trim());
  // let x =tempData.join('');
  // let splitData = x.match(/<\/?\w+>/gi);

  // console.log(splitData, splitData.length);
  // let stack = new Stack();
  // let tree = new ktree;
  // tree.insert(splitData[0], splitData[0]);
  // if (!stack.top) { stack.push(splitData[0]); }
  // console.log('split data 2', splitData[2]);
  // console.log('cat cat string', `/${stack.top.value}`)

  // for (let i = 0; i < splitData.length; i ++) {
  //   let parent = stack.top;
  //   console.log('stack top', stack.top.value);
  //   let check = `/${stack.top.value}`;
  //   if (splitData[i] === check) {
  //     console.log("_____", splitData[i]);
  //     tree.insert(splitData[i],  parent);
  //   }
  //   stack.push(splitData[i]);
    
  // }
  // console.dir(tree, {depth: null});
});
