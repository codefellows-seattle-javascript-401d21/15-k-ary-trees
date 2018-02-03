'use strict';
// const module = require('./lib/module.js');
// const moduleOne = require('./lib/moduleOne.js');
// const moduleTwo = require('./lib/moduleTwo.js');

const fs = require ('fs');

fs.readFile('./assets/minimal.html', (err, data) => {
  if (err) throw err;
  let tempData = data.toString().split(/\n/gi).map(x => x.trim());
  let x =tempData.join('');
  // split('<' || '>');
  
  console.log(x);

  // let splitData =tempData.split(/<\w+>/);
  let splitData = x.match(/<\/?\w+>/gi || />(\D+)</gi);
  console.log(splitData, splitData.length);

  // let finalArray = splitData.filter(x => x[0] != '/');
  // console.log('final array', finalArray);
  // let finalFinal = finalArray.map(x => x.split(/>/));
  
 
  // console.log(finalFinal);
});
