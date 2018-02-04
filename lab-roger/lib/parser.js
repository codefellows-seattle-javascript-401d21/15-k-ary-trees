'use strict';


module.exports = function(data) {
  if(!data) return null;
  if(! Buffer.isBuffer(data)) return null;


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


 
  
  
  