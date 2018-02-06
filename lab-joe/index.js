const fs = require('fs');
const util = require('util')

const karyTree = require('./lib/kary-tree')
const queue = require('./lib/queue')

const TreeNode = class {
  constructor(val,value) {
    this.val = val
    this.value = value
    this.children = [] // Scott haxored this! Feel free to stretch with the SLL! ;-)
  }
}

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

  cary.insert(1)

  arrr.forEach(function(item){
    if(item !== '') copy.push(item.trim())
  });


  let j = 2
  let k = 1


  let tagFinder = function(arrEntry){

if(arrEntry.length === 0){
    // console.log(util.inspect(cary, false, null))
    return
}
  if(arrEntry[0] === arrEntry[arrEntry.length - 1].replace('</','<')){

      let eleNameContent = arrEntry.slice()
      arrEntry.shift()
      arrEntry.pop()
      cary.insertInfo(j,k,{ eleName: eleNameContent[0]})
      j++
      k++
      tagFinder(arrEntry)

    }else if(arrEntry.indexOf(arrEntry[0].replace('<', '</'))){
      if(arrEntry.indexOf(arrEntry[0].replace('<', '</')) === -1){

          cary.insertInfo(j, k, { eleName: arrEntry[0]})

          arrEntry.shift()
          j++
          k++

          tagFinder(arrEntry)
        }else{

          let amountToSplice = arrEntry.indexOf(arrEntry[0].replace('<', '</'))
          let removedBit = arrEntry.splice(0,amountToSplice+1)
          cary.insertInfo(j,k,{ eleName: removedBit[0]})
          removedBit.shift()
          removedBit.pop()
          j++
          cary.insertInfo(j,k,{ eleName: arrEntry[0]})
          j++
          k++
          cary.insertInfo(j,k,{ eleName: removedBit})
          arrEntry.shift()
          arrEntry.pop()
          j++
          k++
          cary.insertInfo(j,k,{ eleName: arrEntry[0]})
          j++
          k++
          if(arrEntry.indexOf(arrEntry[0].replace('<', '</'))){

            eleNameContent = arrEntry.slice()
            arrEntry.shift()
            arrEntry.pop()
            j++
            k++
            cary.insertInfo(j,k,{ eleName: arrEntry[0]})
            j++
            cary.insertInfo(j,k,{ eleName: arrEntry[1]})
            j++
            k++
            cary.insertInfo(j,k,{ eleName: arrEntry[2]})
            j++

            k++
            k++
            cary.insertInfo(j,k,{ eleName: arrEntry[3]})
            j++
            cary.insertInfo(j,k,{ eleName: arrEntry[4]})
            j++
            cary.insertInfo(j,k,{ eleName: arrEntry[5]})
            j++
            cary.insertInfo(j,k,{ eleName: arrEntry[6]})



            arrEntry.splice(0,10)
            k--
            k--
            k--

            j++
            cary.insertInfo(j,k, { eleName: arrEntry[0]})
            j++
            k++
            k++
            k++
            cary.insertInfo(j,111, { eleName: arrEntry[1]})





          }







          console.log(util.inspect(cary, false, null))
          return cary


          tagFinder(arrEntry)
        }
    }

}


tagFinder(copy)
}
