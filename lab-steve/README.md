# Lab 15: Tree Data Structure - HTML Parser

**Author**: Steve Carpenter
**Version**: 1.0.0

## Overview
This is a program that reads in an HTML file and builds a k-ary tree from that
structure. It properly places all child nodes at the correct location in the
tree similar to how the DOM would represent the HTML structure.

## Getting Started
The user needs to do the following to use this HTML parser/Tree Builder
-Clone the repository from github [here](https://github.com/stevegcarpenter/15-k-ary-trees)
-Install all the necessary `npm` packages by executing `npm install`
-To run the `linter` check execute `npm run lint`
-Execute an `npm run test` command to run the test suite - it currently is about 90% coverage

## How to Use
If you wish to use this HTML parsing code, you should first know it's
limitations. It currently supports parsing both the _minimal.html_ as well as a
slightly modified version of the _stretch.html_ file. Due to time crunch, there
wasn't enough time to fully implement parsing multiple classes. However,
support exists to parse all the other HTML in the _stretch.html_ file. To use
the Parse library, do the following:

- Import and Create a Parser
```js
'use strict';

const Parser = require('/path/to/htmlparser');

let parser = new Parser();
```

- From here, you can use `parseFile` or `parseStr` to parse HTML and create a `KTree` (_NOTE_: `parseFile` is async)
```js
// parseFile
parser.parseFile('/path/to/stretch.html')
  .then(tree => JSON.stringify(tree))
  .then(console.log)
  .catch(err => console.log(err));
```

```js
let tree = parser.parseStr('<!DOCTYPE html><html><body></body></html>');
console.log(JSON.stringify(tree));
```

Both the methods shown above have their benefits and it's nice to have the option of either.


## Architecture
-NodeJS
-npm
-JavaScript

## Change Log

## Credits and Collaborations
[NodeJS](https://nodejs.org)
[npm](https://www.npmjs.com/)
[JavaScript](https://www.javascript.com/)
