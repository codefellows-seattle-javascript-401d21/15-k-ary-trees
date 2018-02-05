'use strict'

const solution = module.exports = {}
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

solution.htmlTree = function(tree) {
  var arr = []
  
  fs.readFileProm(`${__dirname}/../assets/minimal.html`)
    .then(buffer => buffer.toString())
    .then(buffer => {
      var htmlString = buffer
      //remove <span> and </span>
      var repl = htmlString.replace(/<span>/, '')
      var html = repl.replace(/<\/span>/, '')
      //get rid of all html that starts with </
      arr = html.split('\n').filter(ele => ele.match(/<\w/))
      console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        //get the root element
        if (arr[i].charAt(0) === '<' ) tree.insert(arr[i])
        //get element at 2 indent
        if (arr[i].charAt(2) === '<' ) tree.insert(arr[i], arr[0])
        //get element at 4 indent
        if (arr[i].charAt(4) === '<' ) getElement(i, arr, tree)
        //get element at 6 indent
        if (arr[i].charAt(6) === '<' ) getElement(i, arr, tree)
        //get element at 8 indent
        if (arr[i].charAt(8) === '<' ) getElement(i, arr, tree)
        //get element at 10 indent
        if (arr[i].charAt(10) === '<' ) getElement(i, arr, tree)
      }
      console.log(tree)
    })
  return tree
}

function getElement(arrindex, arr, tree) {
  var element = ''
  for (var x = 0; arr[arrindex][x] !== '>'; x++) {
    element += arr[arrindex][x]
  }
  element += arr[arrindex][x]
  x++
  getText(x, arrindex, arr)
  tree.insert(element, arr[x])
  console.log(element)
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
