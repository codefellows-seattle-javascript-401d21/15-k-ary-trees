'use strict';

const Promise = require('bluebird');
const uuid = require('uuid/v4');
const KTree = require('./lib/kary-tree');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const getHTMLTree = require('./lib/get-html-tree');

getHTMLTree('../assets/minimal.html', console.log)
