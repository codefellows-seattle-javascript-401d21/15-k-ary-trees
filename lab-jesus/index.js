'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Tree = require('./lib/tree.js');

const solution = module.exports = {};

solution.htmlToKary = function(path){
  let data;
  try{
    data = fs.readFileSync(path).toString().split('<!DOCTYPE html>')[1];
  }catch(err){
    throw new Error('No file buddy');
  }    
  let stack = [], tree, tag, end = false;
        
  while (!end) {
    data = data.trim();
    if (data.startsWith('</html>')) end = true;
            
    // </closing tag>
    if ( data[0] === '<' && data[1] === '/' ) {
      tag = '';
      for (var i = 2; data[i] !== '>'; i++) {
        tag += data[i];
      }
      data = data.slice(i + 1);
      stack.pop( tag );
        
      // <opening tag>
    } else if ( data[0] === '<' ) {
      tag = '';
      for (var j = 1; data[j] !== '>'; j++) {
        tag += data[j];
      }
      data = data.slice(j + 1);
      if (tree === undefined) tree = new Tree ();
      tree.insert(tag, stack[stack.length - 1]);
      stack.push( tag );
        
      // content
    } else {
      tag = '';
      for (var k = 0; data[k] !== '<'; k++) {
        tag += data[k];
      }tree;
      data = data.slice(k);
      tree.insert(tag, stack[stack.length - 1]);
    }
  }
  return tree;
//   return fs.readFileProm('./assets/minimal.html')
//     .then( data => {
//       data = data.toString().split('<!DOCTYPE html>')[1];
//       console.log(data);
//       return JSON.stringify(treeify(dat,"childrena));
//     })
//     .then(x => {
//       return x;
//     });
  // .catch({stuff: 'stuff'});
};
