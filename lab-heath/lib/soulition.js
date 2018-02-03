'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Tree = require('./treeBuilder');


let readData = () => {
  let title =[];
  return fs.readFileProm('../assests/minimal.html')
    .then(res => res.toString())
    .then(res => res.replace(/>/g, '|'))
    .then(res => res.replace(/</g, '|'))
    .then(res => res.replace(/\//g, ''))
    .then(res => res.split('\n'))
    .then(res => res.map(i => i.trim()))
    .then(res => res.map(i => i.split('|').filter(val => val)))
    .then(res => {
      for(var i = 0; i < res.length; i++){
        for(var j = 0; j < res[i].length; j++){
    
          title.push(res[i][j]);
        }
      }
    })

    
    // .then(res => res.split('<>'))
    // .then(res => res.map(i => i.split('>')))
    // .then(res => res.map(i => i.filter(i => i.length > 0)))
    // .then(res => res.map(i => i.splice(0,1)))
    // .then(res  => {
    //   res.splice(0, 1);
    //   res.splice(res.length - 1, 1);
    //   return res;
    // })

       
    // .then(res => res.match(/<[^>]*>/))
    // .then(res => console.log(res))
    .then(res => answer(title));
};

readData();

let answer = function(data) {
  let build = new Tree();
  build.insert();
  data.splice(0, 1);
  console.log(data);
};

