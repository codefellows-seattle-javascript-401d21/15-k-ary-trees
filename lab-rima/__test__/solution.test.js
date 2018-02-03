'use strict';

const kTree = require('../lib/kary-tree');
const fbn = require('../lib/solution');


describe('Solution module', () => {

  describe('findBottomNodes function', () => {

    describe('Valid input', () => {
      test('should return an array', () => {
        let KT = new kTree();
        KT.insert(1);
        KT.insert(2,1);
        KT.insert(3,1);
        KT.insert(4,1);
        KT.insert(5,4);
        KT.insert(6,2);

        expect(fbn(KT) instanceof Array).toBe(true);
      });

      test('should return a correct answer', () => {
        let KT = new kTree();
        KT.insert(1);
        KT.insert(2,1);
        KT.insert(3,1);
        KT.insert(4,1);
        KT.insert(5,4);
        KT.insert(6,2);

        expect(fbn(KT)[0].val).toEqual(3);
        expect(fbn(KT)[1].val).toEqual(6);
        expect(fbn(KT)[2].val).toEqual(5);
      });

      test('should return tree node instance in array', () => {
        let KT = new kTree();
        KT.insert(1);
        KT.insert(2,1);
        KT.insert(3,1);
        KT.insert(4,1);
        KT.insert(5,4);
        KT.insert(6,2);

        expect(fbn(KT)[0].val).toEqual(3);
        expect(fbn(KT)[1].val).toEqual(6);
        expect(fbn(KT)[2].val).toEqual(5);
      });
    });

    describe('Invalid input', () => {

      test('should throw an error if input type is wrong', () => {
        expect(() => fbn('')).toThrow('Input needs to be tree instance');
      });

      test('should return null if root is null', () => {
        let KT = new kTree();
        expect(fbn(KT)).toBeNull();
      });
    });
  });
});
