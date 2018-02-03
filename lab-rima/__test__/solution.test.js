'use strict';

const kTree = require('../lib/kary-tree');
const solution = require('../lib/solution');
const htmlTree = solution.htmlTree;
const treeNode = solution.TreeNode;
const minimalHtmlFilePath = './assets/minimal.html';

// test data
const span = new treeNode('span', 'consectetur adipisicing elit, sed do eiusmod');
const li4 = new treeNode('li', 'signin');
const li3 = new treeNode('li', 'contact');
const li2 = new treeNode('li', 'about');
const li1 = new treeNode('li', 'home');
const p3 = new treeNode('p', 'Lorem ipsum dolor sit amet,  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
const p2 = new treeNode('p', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ad consequuntur dolor quis laboriosam animi expedita, recusandae, illo? Omnis reiciendis veritatis iure debitis eos provident accusantium est molestiae commodi corrupti.');
const ul = new treeNode('ul', '');
const p1 = new treeNode('p', '&copy; Codefellows LLC 2017');
const section = new treeNode('section', '');
const nav = new treeNode('nav', '');
const h2 = new treeNode('h2', 'We\'re building a tree!');
const footer = new treeNode('footer', '');
const main = new treeNode('main', '');
const header = new treeNode('header', '');
const title = new treeNode('title', 'minimal html to tree');
const body = new treeNode('body', '');
const head = new treeNode('head', '');
const html = new treeNode('html', '');

p3.children = [span];
ul.children = [li1, li2, li3, li4];
section.children = [p2, p3];
nav.children = [ul];
footer.children = [p1];
main.children = [section];
header.children = [h2, nav];
body.children = [header, main, footer];
head.children = [title];
html.children = [head, body];

const tags = [html, head, body, title, header, main, footer, h2, nav, section, p1, ul, p2, p3, li1, li2, li3, li4, span];

describe('Solution module', () => {

  describe('htmlTree function', () => {

    describe('Valid input', () => {
      test('should return htmlTree instanceof k-ary Tree', () => {
        expect(htmlTree(minimalHtmlFilePath) instanceof kTree).toBe(true);
      });

      test('should return a correct result', () => {
        let res = htmlTree(minimalHtmlFilePath);
        let i = 0;
        res.breadthFirst(node => {
          expect(node).toEqual(tags[i]);
          i++;
        });
      });

    });

    describe('Invalid input', () => {

    });
  });
});
