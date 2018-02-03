'use strict';

const solution = require('./lib/solution');


try{
  let res = solution.htmlTree(process.argv[2]); //'./assets/minimal.html');
  console.log(res);
  console.log('\n<Here is the result when you breadth-first-traverse a html tree.>\n\n');

  res.breadthFirst(node => {
    console.log('-----Node.Val\n', node.val);
    console.log('-----Node.Children\n', node.children, '\n');
  });

  console.log('\n<End traversing>\n');
}catch(err){
  console.log(err.message);
}
