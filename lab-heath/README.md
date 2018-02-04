
# LAB 15: Tree Data Structure


### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install`  after that you need to install fs, bluebird `npm i`. for devs its jest and eslint. do this with `nmp i -D`


next you need to have these scripts adjusted in your package.json file.

```javascript
  "scripts": {
    "test": "jest",
    "lint": "eslint"
  },
  ```

from there, you can go to your terminal and type, 

```javascript
node run index.js
```
 this will start up the function in and pass in a set of data that is from the assests folder. from there it will do its job and parse out the file into data that the function will process and return an k-ary tree with all the elements and childern on each node. it should look something like this in the terminal

 ```javascript
   { root:
       TreeNode {
         type: 'element',
         val: 'html',
         children: [ [TreeNode], [TreeNode] ] } }
         
```
## function that is doing the work.
```javascript
let treeify = (path) => {
  if (!path || Array.isArray(path)) return null;
  
  let data;
  try{
    data = fs.readFileSync(path).toString().split('<!DOCTYPE html>')[1];
  }catch(err){
    throw new Error('No file buddy');
  }

  let stack = [];
  let tree;
  let tag;
  let end = false;

  while (!end) {
    data = data.trim();
    if (data.startsWith('</html>')) {
      end = true;
    } 
      
    // </closing tag>
    if ( data[0] === '<' && data[1] === '/' ) {
      tag = '';

      for (var i = 2; data[i] !== '>'; i++) {
        tag += data[i];
      }

      data = data.slice(i + 1);
      stack.pop(tag);

    // <opening tag>
    } else if ( data[0] === '<' ) {
      tag = '';

      for (var y = 1; data[y] !== '>'; y++) {
        tag += data[y];
      }

      data = data.slice(y + 1);
      if (tree === undefined) tree = new Tree();
      tree.insert('element', tag, stack[stack.length - 1]);
      stack.push( tag );

    // content
    } else {
      tag = '';
      for (var k = 0; data[k] !== '<'; k++) {
        tag += data[k];
      }
      data = data.slice(k);
      tree.insert('text', tag, stack[stack.length - 1]);
    }
  }
  console.log(tree);
  return tree;
};
```

## Testing

run the command npm run test to start of the tests for this app.

#### Test for vaild inputs and right answers 

it #1 - checks to see if the root is HTML
it #2 - checks to see if the first child of HTML is HEAD
it #3 - checks to see if the 2nd child of HTML is body
it #4 - checks to see if the 2nd child of HTML 4 levels deep is the end with text


```javascript
describe('solution valid', () => {
  it('checking to see where the html elememt is at.', () => {
    expect(doThing(testData).root.val).toBe('html');
  });
  it('checking to make sure the head is in the right area.', () => {
    expect(doThing(testData).root.children[0].val).toBe('head');
  });
  it('checking to see if the body is on a different tree', () => {
    expect(doThing(testData).root.children[1].val).toBe('body');
  });
  it('checking to see if the text is at the end of a branch', () => {
    expect(doThing(testData).root.children[1].children[0].children[0].children[0].val).toBe('We\'re building a tree!');
  });
  ```

#### Test for invalid inputs 

it #1 - checks to see if we get a error from the FS file read.
it #2 - checks to see something was passed into the function
it #3 - checks to see if the right thing is passed in, this time we passed in an array.


```javascript
describe('solution invalid', () => {
    it('should return a error with bad path', () => {
      expect(() => {
        doThing(testD);
      }).toThrow();
    });
  });
  it('should return null if nothing is passed in', () => {
    expect(doThing()).toBe(null);
  });
  it('should return null if an array is passed in', () => {
    expect(doThing([1,4,7])).toBe(null);
  });
  ```

