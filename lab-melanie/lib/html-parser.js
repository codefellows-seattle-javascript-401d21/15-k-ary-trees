'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const  parser = module.exports = {};

parser.readData = () => {
  fs.readFileProm('../assets/minimal.html')
    .then(res => res.toString())
    // .then(res => res.match(/<[^>]*>/))
    .then(res => console.log(res));
};

parser.readData();