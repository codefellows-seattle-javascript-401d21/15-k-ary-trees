'use strict';

let Parser = require('../../lib/htmlparser');
let Tag = require('../../lib/tag');
let KTree = require('../../lib/kary');

describe('HTML Parser Module', () => {
  let parser = new Parser();

  describe('#parseTagStr', () => {
    describe('Success', () => {
      it('should return a tag with the eleName and textContent set for simple tags', () => {
        let tag = parser.parseTagStr('html>');
        expect(tag.eleName).toBe('html');
        tag = parser.parseTagStr('p>The cat jumped over the wall');
        expect(tag.eleName).toBe('p');
        expect(tag.textContent).toBe('The cat jumped over the wall');
        expect(tag).toBeInstanceOf(Tag);
      });

      // success opening tag
      it('should successfully create and return a new Tag with all fields assigned', () => {
        let tag = parser.parseTagStr('li class="nav-secondary" id="signin-id">signin');
        expect(tag.textContent).toBe('signin');
        expect(tag.eleName).toBe('li');
        expect(tag.classes[0]).toBe('nav-secondary');
        expect(tag._id).toBe('signin-id');
      });

      // success closing tag
      it('should return null for a closing tag and no parent', () => {
        expect(parser.parseTagStr('/li>')).toBe(null);
      });

      // success closing tag with trailing text and parent tag provided
      it('should properly append trailing text following a closing tag to the parent tag', () => {
        let parentTag = new Tag('parent');
        expect(parser.parseTagStr('/li>Special trailing text', parentTag)).toBe(null);
        expect(parentTag.textContent).toBe('Special trailing text');
      });
    });

    describe('Failure', () => {
      // failure too many ids
      it('should throw an Error when the HTML has > 1 id', () => {
        expect(() => {
          parser.parseTagStr('li class="nav-secondary" id="signin badclass">signin');
        }).toThrow('Error: Incorrectly formatted tag attributes!');
      });

      // failure closing tag with text that belongs to the parent tag and no parent
      it('should throw an Error when trailing text exists for a tag, but no parent tag to place it on', () => {
        expect(() => parser.parseTagStr('/span> remaining paragraph text'))
          .toThrow('Error: Must have parent tag when text follows the closing >');
      });
    });
  });

  describe('#parseStr', () => {
    describe('Success', () => {
      let tree = parser.parseStr('<!DOCTYPE html><html><body></body></html>');
      it('should properly parse a string of HTML', () => {
        expect(tree).toBeInstanceOf(KTree);
      });

      it('should return a tree with the correct structure', () => {
        expect(tree.root.value.eleName).toBe('html');
        expect(tree.root.children[0].value.eleName).toBe('body');
      });
    });

    describe('Failure', () => {
      it('should throw an Error when the str argument is falsey', () => {
        expect(() => parser.parseStr(null)).toThrow('Error: str is not valid');
      });

      it('should throw an Error if the string is just empty spaces', () => {
        expect(() => parser.parseStr('       ')).toThrow('Error: File was empty');
      });
    });
  });

  describe('#parseFile', () => {
    it('should properly parse the minimal file and output a tree', () => {
      parser.parseFile(`${__dirname}/../../assets/minimal.html`)
        .then(tree => {
          expect(tree).toBeInstanceOf(KTree);
          expect(tree.root.value.eleName).toBe('html');
          expect(tree.root.children[0].children[0].value.eleName).toBe('title');
        });
    });

    it('should properly parse the stretch file and output a tree', () => {
      parser.parseFile(`${__dirname}/../../assets/minimal.html`)
        .then(tree => expect(tree).toBeInstanceOf(KTree));
    });
  });
});
