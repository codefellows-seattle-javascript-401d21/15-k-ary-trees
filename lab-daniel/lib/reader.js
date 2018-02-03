'use strict';

const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'), { suffix: 'Prom' });
const Tree = require('./karytrees');
const uuid = require('uuid');

let pageTree = new Tree();

module.exports = (filePath) => 
  fs.readFileProm(`${__dirname}/../../assets/minimal.html`)
    .then(buffer => buffer.toString())
    .then(text => text.split('>').map(v => {
      if (!v) return undefined;
      let e = v.trim();
      if (e[0] !== '<') {
        e = e.split('<');
        if (!e[1].includes('/')) e[1] = '<' + e[1];
        e = e.join('>');
      }      
      return e;
    }))
    .then(arr => {
      arr = arr.join('>').split('>');
      let p = [], lp;
      arr.map((v, i) => {
        let _id = uuid('v4');
        lp = p[0] || _id;
        if (v[0] === '/' || v[1] === '/') {
          p.shift();
          return;
        }
        else if (v[0] === '<') {
          p.unshift(_id);
          return pageTree.insert('HTML', v.slice(1), _id, lp);
        }
        else {
          if (arr[i-1][0] !== '<') p.unshift(_id);
          return pageTree.insert('Text', v, _id, lp);
        }
      });
      return pageTree;
    });


