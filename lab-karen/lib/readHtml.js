'use strict'

const Ktree = require('./kary-tree');
const doc = require('../assets/minimal.html');
const debug = require('debug')('readHtml');
const Promise = require('bluebird')//promisifying the fs module
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

 let record = fs.readFileProm(doc)
 .then(res => resolve(res.toString()))
 .then(console.log(res))
 .catch(reject);

 console.log(record);

 const readHtml = module.exports = {};
