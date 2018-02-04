'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const testData = './assests/minimal.html';
const treeify = require('./lib/solution');

fs.readFileProm(testData)
  .then( data => {
    data = data.toString().split('<!DOCTYPE html>')[1];
    return JSON.stringify(treeify(data));
  })
  .then( data => {
    fs.writeFileProm('./assests/results.json', data);
  })
  .catch(console.error);
