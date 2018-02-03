
'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:index-file');
const Stack = require('./lib/stack');

const asset =`${__dirname}/../assets/minimal.html`;

const parentStack = new Stack();
//const tempStack = new Stack();

fs.readFileProm(asset)
  .then(parseHtml)
  .catch(console.error);

function parseHtml(data) {

  let tempArr = []
  let html = data.toString('utf8');

  let elements = html.replace(/\n/g,'').replace(/<([^>]+)>/g, '\n<$1>\n')
    .split('\n').filter(elm => elm.trim()).slice(1);
let tempElm;
let cleanParent
  var parent = elements[0] //.substr(1);
  console.log(parent);
  elements.forEach(elm => {
    //if the element does not n=match its closing element
   
    if (elm.indexOf('</') === -1 ){ 
    if (elm !== parent){ 
      debug(elm, parent );
      //get element name
      tempElm = elm;
      tempElm.replace(/([<</>])/g, '');
      //inset the item in the tree at the parents value
      //treeInsert.insert(elm. parentStack.head.value);
      tempArr.push([parent, tempElm]);
      //push
      cleanParent = parent;
      parentStack.push(cleanParent.replace(/([<</>])/g, ''));
      debug('parent', parent);
      debug('parentStack', parentStack);
      if (elm.indexOf('<') !== -1) parent = elm;
      debug('parent', parent);
    }
    } else {
      debug('element is closing', elm );
      parentStack.pop();
      parent = parentStack.top.value;
    }
  });

  console.log('tempArr', tempArr );

} 