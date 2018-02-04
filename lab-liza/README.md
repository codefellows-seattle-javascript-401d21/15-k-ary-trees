# Lab 15: 15-k-ary-trees

This lab uses the node fs module to read an HTML document into a buffer. Parses the buffer and use the root <html> element, subsequent HTML tags, and their text content to build a tree data structure

## Getting Started

Fork this repo
npm init
npm i jest bluebird eslint fs


## Running the tests
In the following example tests I am using the createTree function that takes in an html file as as argument and returns correct element tag.

```javascript
htmlFile.createTree('minimal.html').root.element).toBe('html');
htmlFile.createTree('minimal.html').root.children[0].element).toBe('head');
htmlFile.createTree('minimal.html').root.children[0].element).toBe('head');
```


## Built With

* [Javascript](https://www.javascript.com/)
* [npm](https://www.npmjs.com/)
* [jest](https://www.npmjs.com/package/jest)
* [bluebird](https://www.npmjs.com/package/bluebird)
* [fs](https://www.npmjs.com/package/file-system)


## Authors

* **Liza Oh** -

## Acknowledgments
* Jordan Van Ness!!!!