'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Stack = require('./lib/stack');
const Queue = require('./lib/queue');
const Tree = require('./lib/kary');

//const asset =`${__dirname}/../assets/minimal.html`;
const asset =`${__dirname}/../assets/stretch.html`;

const parentStack = new Stack();
const htmlTree = new Tree();

fs.readFileProm(asset, 'utf8').then(parseHtml).catch(console.error);

function parseHtml(html) {  

  
// 	el = html.match(/<[^</]+>/)[0]
// 	elRgx = new RegExp(`${el}(.+)<\/${el.substr(1)}`)
// 	node = html.match(elRgx)
// 	clearRgx = new RegExp(`${el} | <\/${el.substr(1)}`)
// 	node = node[1].replace(clearRgx, '')
// 	tempArr.push([el, node]);
	
// 	tempArr.forEach(text => process(node))
	
// function process(html){
// 	if (!html) return
// 	el = html.match(/<[^</]+>/)[0]
// 	elRgx = new RegExp(`${el}(.+)<\/${el.substr(1)}`)
// 	node = html.match(elRgx)
// 	tempArr[].push([el, node[1]]);
// 	html = html.replace(elRgx, '')
// 	process(htm)
// }

  var tempArr = []; 

  //html = html.replace(/<!DOCTYPE html>\n/, '').split('\n', '');

  html  = html.split('\n').map(elm => elm.trim()).filter(val => val).slice(1).join('');
  

  //console.log('html', html);

  let el = html.match(/<[^</]+>/)[0];
  let elRgx = new RegExp(`${el}(.+)</${el.substr(1)}`);
  let tag_node = html.match(elRgx);
  let clearRgx = new RegExp(`${el} | </${el.substr(1)}`);
  let html_node = tag_node[1].replace(clearRgx, '');

  let childrenQue = new Queue();
  childrenQue.enqueue(html_node);
     
  
  //console.log('html', html_node);

  breadthFirst( (node, el) => {
    tempArr.push([el, node]);
    console.log(JSON.stringify(tempArr));
  });


  function breadthFirst(callback) {
   // let childrenQue = new Queue();
   // childrenQue.enqueue(html_node);
    let node; 
    while(childrenQue.back){
      node = childrenQue.dequeue();
    //  console.log('node', node);
      while(node){
        let parse_node;
        el = node.match(/<[^</]+>/);
        if (el) {
          el = el[0];
          let closeTag = el.replace(/\s[^>]+/, '');
          elRgx = new RegExp(`${el}(.+)</${closeTag.substr(1)}`);
          console.log(el, closeTag, elRgx, node);
          console.log(JSON.stringify(node.match(elRgx)));
    
          parse_node = node.match(elRgx)[1];
          
          callback(parse_node, el); 
          
          //node = node.replace(elRgx, '');
          childrenQue.enqueue(parse_node);
          node = node.replace(elRgx, '');
         // console.log('next node', node);
        }
        if (!el) node = null;
      }
    }
  }
}
//   // let elements = html.replace(/\n/g,'').replace(/</g, '\n<').split('\n').map(elm => elm.trim()).filter(val => val).slice(1);

//   let elements = html.replace(/\n/g,'').replace(/</g, '\n<').replace(/(<\/[^>]+>)/g, '$1\n').split('\n').map(elm => elm.trim()).filter(val => val).slice(1);

//   console.log(elements);

//   elements.forEach(elm => {
//     processElement(elm);
//   });
 

//   function processElement(data){
//     if ( /^<\/[^<]+>$/.test(data) ) return parentStack.pop(); //closing tag 

//     // let dataArray = data.split('>');
//     // let el = dataArray[0].substr(1);
//     // let txt_node = dataArray[1];

//     //tag name
//     let eleName = data.match(/<([^\s>]+)/);
//     eleName = eleName ? eleName[1] : '';

//     //class name
//     let className = data.match(/class="([^"]+)/);
//     className = className ? className[1] : '';

//     //id name
//     let idName = data.match(/id="([^"]+)/);
//     idName = idName ? idName[1] : '';

//     //text
//     let text = data.match(/>(.*)$/);
//     text = text ? text[1] : '';

//     let data_set = {
//       eleName: eleName,
//       textContent: text,
//       class: className,
//       id: idName,
//     };

//     // let el_name = data.match(/([^<\s]+)/)[1];
    
//     // let idName = data.match(/id="([^\s]+)"/g);
//     // idName = idName ? idName[0].replace(/id="([^"]+)"/, '$1') : '';

//     // let className = data.match(/class="([^\s]+)"/g);
//     // className = className ? className[0].replace(/class="([^"]+)"/, '$1') : '';
    
//     // let data_set = {eleName: data.replace(/<([^\s]+).*>/g, '$1'), textContent: null, class: className, id: idName};

//     let parent = parentStack.top ? parentStack.top.value : '';

//     if (!eleName) {
//       parent.value.textContent += data;
//       return;
//     }

//     parentStack.push(data_set);

//     // if (! /^<[^<]+>$/.test(data)) { //open tag with text
//     //   let dataArray = data.split('>');
//     //   data_set.textContent = dataArray[1];
//     // }

//     htmlTree.insertData(data_set, parent);
//   }

//   console.log('htmlTree',  JSON.stringify(htmlTree));
// } 