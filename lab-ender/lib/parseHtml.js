'use strict';

const debug = require('debug')('kary:parse');
const debugV = require('debug')('karv:parse');

const parseHTML = function(htmlStr) {
  const html = htmlStr;
  const re = /<(\/)?([^\>]*)>/g;
  const matches = [];
  let match;

  while (match = re.exec(html)) {
    matches.push(match);
  }

  const process = function(current, index, matches, html) {
    let next = matches[++index];
    while (!next[1]) {
      const child = {
        value: {
          eleName: matches[index][0],
          textContent: ''
        },
        children: [],
      };
      current.children.push(child);
      index = process(child, index, matches, html);
      next = matches[index];
    }
    return ++index;
  };

  const top = {
    value: {
      eleName: matches[0][0],
      textContent: ''
    },
    children: [],
  };
  process(top, 0, matches, html);

  debug(`top: ${JSON.stringify(top)}`);
  return top;
};

module.exports = parseHTML;
