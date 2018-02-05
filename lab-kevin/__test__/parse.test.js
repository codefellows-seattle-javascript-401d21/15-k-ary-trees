'use strict';

const parse = require('../lib/parse');

describe('parse test', function() {

  //this.asset =`${__dirname}/../../assets/minimal.html`;
  this.asset =`${__dirname}/../../assets/stretch.html`;

  describe('Valid input', () => {
    beforeAll(() => { 
      return  parse.parseHtml(this.asset)
        .then(tree => this.tree = tree);
    });


    it('should return an object with a property of root invoked with a file path that contains html', () => {
      console.log(JSON.stringify(this.tree));
      let root = this.tree.hasOwnProperty('root');
      expect(root).toBe(true);
    });

    it('should return an object with html as the root value', () => {
      expect(this.tree.root.value.eleName).toEqual('html');
    });

    it('should return an object with a root with children', () => {
      expect(this.tree.root.children).not.toBeNull();
    });

    it('should return an object with a root with children with value of head', () => {
      this.children = [this.tree.root.children.head.value.value.eleName, this.tree.root.children.head.next.value.value.eleName];
      expect(this.children).toEqual(expect.arrayContaining(['head', 'body']));
    });
    
  });

  describe('Valid input', () => {
    

    it('should throw an error for undefined argument', () => {
      expect(() => {
        parse.parseHtml();
      }).toThrow();
    });

    it('should throw an error for non html file', () => {
      this.index =`${__dirname}/../index.js`;
      return  parse.parseHtml(this.index)
        .catch( err => {
          expect(err.message).toMatch(/html/i);
        });
    });

    it('should throw an error for a bad path', () => {
      this.index =`${__dirname}/../is`;
      return  parse.parseHtml(this.index)
        .catch( err => {
          expect(err.message).toMatch(/enoent/i);
        });
    });
  });
  
});