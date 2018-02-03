'use strict';

const Ktree = require('./lib/kary-tree');
// const doc = require('./assets/minimal.html');
const debug = require('debug')('readHtml');
const Promise = require('bluebird')//promisifying the fs module
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

   fs.readFileProm('./assets/minimal.html')
   .then(buffer => buffer.toString())
   .then(console.log)
   .catch(err => console.error(err));
