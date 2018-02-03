'use strict';

const Promise = require('bluebird');
const uuid = require('uuid/v4');
const KTree = require('./lib/kary-tree');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});



let readData = () => {
  let HTMLTree = new KTree();
  let emulatedStack = [];
  fs.readFileProm('../assets/minimal.html')
    .then(res => res.toString())
    .then(htmldoc =>  htmldoc.split('>'))
    .then(data => data.map(e => e.trim()))
    .then(data => data.map(e => e.split('<').join('')))
    .then(data => {
      data.splice(0, 1);
      if(data[data.length-1]==='') data.splice(data.length-1, 1);
      return data;
    })
    .then(data => data.map(e => e.split('/')))
    .then(data => {
      for(let i in data){
        if(data[i].length===1) {
          data[i].push(uuid());
        } else {
          data[i].push('');
        }
      }
      return data;
    })
    .then(data => {
      for(let i in data){
        if(data[i].length===2) {
          //push all opening elements
          //pop off last opening when closing is found, write uuid from popped off element last element in closing element array
          emulatedStack.push(data[i]);
        } else {
          data[i][data[i].length-1] = emulatedStack.pop()[1];
        }
      }
      return data;
    })
    .then(data => {
      for(let i in data){
        if(data[i].length===2) {
          //push all opening elements
          //pop off last opening when closing is found, write uuid from popped off element last element in closing element array
          emulatedStack.push(data[i]);
        }
      }
      return data;
    })
    .then(data => {
      // console.log(emulatedStack)
      console.log('DATA: ', data)
    });
    

};

readData();
