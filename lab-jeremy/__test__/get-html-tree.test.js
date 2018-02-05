'use strict';

const getHTMLTree = require('../lib/get-html-tree');

// getHTMLTree('../assets/minimal.html', console.log);
require('jest');


describe('Get-html-tree tests', () => {
  describe('Valid tests', () => {
    // let HTMLKaryTree;
    // it('minimal.html test - should return a first element and', (done) => {
    //   getHTMLTree('../../assets/minimal.html', HTMLKTree => {
    //     let HTMLKaryTree = HTMLKTree;
    //     expect(HTMLKaryTree.root.val).toContain('content');
    //     done();
    //   });

    //   // expect(HTMLKaryTree.root.val).toContain('content');
    //   // expect(HTMLKaryTree.root.val).toContain('type');
    // });
  });

  describe('Invalid tests', () => { 
    // it('Null test', (done) => {
    //   getHTMLTree('', HTMLKTree => {
    //     expect(HTMLKTree).toBeNull();
    //     done();
    //   });
    // });
  });
});