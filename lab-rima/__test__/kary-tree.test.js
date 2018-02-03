'use strict';

const kTree = require('../lib/kary-tree');


describe('Kary tree module', () => {

  describe('constructor', () => {
    describe('Valid input', () => {
      test('should initialize root as a TreeNode instance with null value', () => {
        let KT = new kTree();
        expect(KT.root.val).toBeNull();
      });
    });
  });

  describe('breadthFirst function', () => {

    describe('Valid input', () => {
      test('should go through every node', () => {
        let KT = new kTree();
        KT.insert(1);
        KT.insert(2,1);
        KT.insert(3,1);
        KT.insert(4,1);
        KT.insert(5,4);
        KT.insert(6,2);

        let valArr = [];
        KT.breadthFirst(node => {
          valArr.push(node.val);
        });

        expect(valArr).toEqual([1,2,3,4,6,5]);
      });
    });
  });

  describe('insert function', () => {

    describe('Valid input', () => {
      test('should insert in a correct location', () => {
        let KT = new kTree();
        KT.insert(1);
        KT.insert(2,1);

        expect(KT.root.children[0].val).toEqual(2);
      });
    });

    describe('Invalid input', () => {
      test('should not insert and return itself if parent val does not exist', () => {
        let KT = new kTree();
        KT.insert(1);
        KT.insert(2,1);
        KT.insert(3,1);
        KT.insert(4,1);
        KT.insert(5,4);
        KT.insert(6,2);

        KT.insert(5,0);

        let valArr = [];
        KT.breadthFirst(node => {
          valArr.push(node.val);
        });

        expect(valArr).toEqual([1,2,3,4,6,5]);
      });
    });
  });

  describe('removeByVal function', () => {

    describe('Valid input', () => {
      test('should remove itself and all children', () => {
        let KT = new kTree();
        KT.insert(1);
        KT.insert(2,1);
        KT.insert(3,1);
        KT.insert(4,1);
        KT.insert(5,3);
        KT.insert(2,3);

        KT.removeByVal(5);

        let valArr = [];
        KT.breadthFirst(node => {
          valArr.push(node.val);
        });

        expect(valArr).toEqual([1,2,3,4,null,2]);
      });
    });

    describe('Invalid input', () => {
      test('should not remoev any and return itself if val does not exist', () => {
        let KT = new kTree();
        KT.insert(1);
        KT.insert(2,1);
        KT.insert(3,1);
        KT.insert(4,1);
        KT.insert(5,3);
        KT.insert(2,3);

        KT.removeByVal(0);

        let valArr = [];
        KT.breadthFirst(node => {
          valArr.push(node.val);
        });

        expect(valArr).toEqual([1,2,3,4,5,2]);
      });
    });
  });

});
