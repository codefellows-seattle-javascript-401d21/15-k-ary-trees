'use strict';


module.exports = function(data) {

  let tempData = data.toString().split(/\n/gi).map(x => x.trim());
  let x =tempData.join('');
  let splitData = x.match(/<\/?\w+>/gi);
  for (let i = 0; i < splitData.length; i++) {
    if(splitData[i].charAt(1) === '/') {
      splitData[i] = splitData[i].split('/').join('');
    }
 
  }
  return splitData;
 
};

// let temp = splitData[i];
// console.log('temp before split', temp);
// let temp1 = temp.split('/').join('');
// console.log('splitData in for_____', temp1);
 
  
  
  