'use strict'

const solution = module.exports = {}
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

solution.htmlTree = function(tree) {
  var arr = []
  
  fs.readFileProm(`${__dirname}/../assets/minimal.html`)
    .then(buffer => buffer.toString())
    .then(buffer => {
      var html = buffer
      // get rid of all html that starts with </
      arr = html.split('\n').filter(ele => ele.match(/<\w/))
      console.log(arr)
      
      for (let i = 0; i < arr.length; i++) {
        //get the root element
        if (arr[i].charAt(0) === '<' ) tree.insert(arr[i])
        //get element at 2 indent
        if (arr[i].charAt(2) === '<' ) tree.insert(arr[i], arr[0])
        //get element at 4 indent
        if (arr[i].charAt(4) === '<' ) {
          var four = ''
          var fourText = ''
          for (var j = 0; arr[i][j] !== '>'; j++) {
            four += arr[i][j]
          }
          four += arr[i][j]
          //get text if any
          j++
          getText(j, i, arr)
          
          tree.insert(four, arr[2])
          console.log(four)
        }
        //get element at 6 indent
        if (arr[i].charAt(6) === '<' ) {
          var six = ''
          for (var l = 0; arr[i][l] !== '>'; l++) {
            six += arr[i][l]
          }
          six += arr[i][l]
          l++
          getText(l, i, arr)
          tree.insert(six, four)
          console.log(six)
        }
        //get element at 8 indent
        if (arr[i].charAt(8) === '<' ) {
          var eight = ''
          for (var m = 0; arr[i][m] !== '>'; m++) {
            eight += arr[i][m]
          }
          eight += arr[i][m]
          m++
          getText(m, i, arr)
          tree.insert(eight, four)
          console.log(eight)
        }
        //get element at 10 indent
        if (arr[i].charAt(10) === '<' ) {
          var ten = ''
          for (var n = 0; arr[i][n] !== '>'; n++) {
            ten += arr[i][n]
          }
          ten += arr[i][n]
          n++
          getText(n, i, arr)
          tree.insert(ten, four)
          console.log(ten)
        }
      }
      console.log(tree)
    })
  return tree
}


function getText(eleIndex, arrIndex, arr) {
  if (eleIndex < arr[arrIndex].length) {
    var text = ''
    for (eleIndex; arr[arrIndex][eleIndex] !== '<'; eleIndex++) {
      text += arr[arrIndex][eleIndex]
    }
    console.log(text)
  }
}
