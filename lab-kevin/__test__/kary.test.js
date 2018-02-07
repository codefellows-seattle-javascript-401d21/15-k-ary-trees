'use strict';

const KT = require('../lib/kary');
const Nd  = require('../lib/nd');
const Sll = require('../lib/sll');
const Queue = require('../lib/queue');


describe('Kary Tests', function(){
  describe('Dependencies exist', () =>{

    it('kary should exist', () => {
      expect(KT).toBeDefined();
    });
    it('sll should exist', () => {
      expect(Sll).toBeDefined();
    });
    it('queue should exist', () => {
      expect(Queue).toBeDefined();
    });
    it('nd should exist', () => {
      expect(Nd).toBeDefined();
    });
  });


  describe('valid input', () => {
    beforeAll(() => {
      this.kt = new KT();
      this.root = 17;
      this.kt.insert(17);
      let parent;
      [[1],[9,2],[8,3,7],[4,5]].forEach(val => {
        val.forEach((num, i) => {
          parent = val[0];
          if (i === 0) parent = this.root;
          this.kt.insert(num, parent);
        });
      });
  
    });
  
    it('Should be an object', () => {
      expect(this.kt).toBeInstanceOf(Object);
    });

    it('Should contain nodes with the keys of value and children', () => {
      expect(this.kt.hasOwnProperty('root')).toBe(true);
    });

    it('Should contain nodes with the keys of value and children', () => {
      expect(this.kt.root.hasOwnProperty('value')).toBe(true);
      expect(this.kt.root.hasOwnProperty('children')).toBe(true);
    });
    it('Should contain root value', () => {
      expect(this.kt.root.value).toEqual(this.root);
    });

    it('Should contain root nodes with a child', () => {
      console.log(this.kt);
      expect(this.kt.root.children.head.value.value).toEqual(4);
    });

    describe('find', () => {
      it('should find a value', () => {
        expect(this.kt.find(8).value).toEqual(8);
      });
    });

    describe('remove', () => {
      it('should remove a value', () => {
        this.kt.removeByVal(1);
        expect(this.kt.find(1)).toBeNull();
      });
    });

    describe('find in new kt', () => {
      it('should not find a value', () => {
        expect(new KT().find(8)).toBeNull();
      });
    });

    describe('remove', () => {
      it('should not remove a value from new ky', () => {
        expect(new KT().removeByVal(1)).toBeNull();
      });
    });

  });

  describe('Invalid input', () => {

    it('Should throw error if no value is passed', () => {
      expect(() => {
        this.kt.insert();
      }).toThrow();
    });

    it('Should throw error if no value is passed', () => {
      expect(() => {
        this.kt.find();
      }).toThrow();
    });

    it('Should throw error if no value is passed', () => {
      expect(() => {
        this.removeByVal.find();
      }).toThrow();
    });

  });

});