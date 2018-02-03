'use strict';

//const Tree = require('./lib/tree.js');
const treeify = require('../index.js');

let test =  {
  'root': {
    'element': 'html',
    'content': '',
    'children': [
      {
        'element': 'head',
        'content': '',
        'children': [
          {
            'element': 'title',
            'content': 'minimal html to tree',
            'children': [
            ],
          },
        ],
      },
    ],
  },
};
describe('Index Module', function () {

  describe('#treeify', () => {


});