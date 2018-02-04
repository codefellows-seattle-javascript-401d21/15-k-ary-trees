'use strict'

const solution = module.exports = {}
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

solution.htmlTree = function() {
  
  fs.readFileProm(`${__dirname}/../assets/minimal.html`)
    .then(buffer => buffer.toString())
    .then(buffer => {
      var html = buffer
      // get rid of all html that starts with </ and sort on whitespace
      var arr = html.split('\n').filter(ele => ele.match(/<\w/)).sort()
      console.log(arr)
    })  
}

