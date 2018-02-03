'use strict'

const solution = module.exports = {}
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

solution.htmlTree = function() {
  let buffer = fs.readFileProm(`${__dirname}/../assets/minimal.html`)
  console.log(buffer)
  console.log(`${__dirname}/../assets/minimal.html`)
}