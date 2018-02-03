const fs = require('fs');

const karyTree = require('./lib/kary-tree')
const queue = require('./lib/queue')


var content;

fs.readFile('./assets/minimal.html', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
    processFile();
});

function processFile() {

  let cary = new karyTree();
  let arrr = content.toString().split('\n');
  let copy = [];

  arrr.forEach(function(item){
    copy.push(item.trim())
  });
    copy.shift();
    copy.pop();


let tagArray = [];
  if(copy[0] === copy[copy.length - 1].replace('</','<')){
  tagArray.push(copy[0])

    // if(cary.root === null){
      // cary.insertInfo(null,1,null);
    // }
    // cary.insertInfo(2,1,{eleName: copy[0]});


    copy.shift();
    copy.pop();

    let amountToSplice = copy.indexOf(copy[0].replace('<','</'));

    tagArray.push(copy.splice(0, amountToSplice + 1))

    amountToSplice = copy.indexOf(copy[0].replace('<','</'));

    tagArray.push(copy.splice(0, amountToSplice + 1))
      // console.log(copy)
    // console.log(tagArray)

      copy = tagArray.reverse()[0]

      amountToSplice = copy.indexOf(copy[0].replace('<','</'));


      tagArray.push(copy.splice(0, amountToSplice + 1))

// console.log(tagArray)


copy = tagArray.reverse()[0]
amountToSplice = copy.indexOf(copy[0].replace('<','</'));
tagArray.push(copy.splice(0, amountToSplice + 1))

console.log(tagArray)


  }




}
