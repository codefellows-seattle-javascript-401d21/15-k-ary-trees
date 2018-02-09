# Lab 15 - K-Ary Trees
Joy Hou, Feb 4, 2017

## Problem Domain
Write a function that takes in the file path to an HTML document. Parse the elements and content of the HTML document into a k-Ary tree.

## Modules
### Tree
The tree module contains the constructor and methods for our tree objects.

### Queue
The tree module uses the queue module to build its methods.

### Index
The index module contains the parsing function that reads the HTML file, parses it, and creates the k-ary tree.

## Use
You can use the function by navigating to the lab-joy folder in your terminal, starting up node, and requiring: 
``` let reader = require('./index'); ```
You can parse HTML for file paths using:
``` reader.parseHTML(filePath) ```
.

## Example
We are using the file **minimal.html**, which contains the following code:

```
<!DOCTYPE html>
<html>
  <head>
    <title>minimal html to tree</title>
  </head>
  <body>
    <header>
      <h2>We're building a tree!</h2>
      <nav>
        <ul>
          <li>home</li>
          <li>about</li>
          <li>contact</li>
          <li>signin</li>
        </ul>
      </nav>
    </header>
    <main>
      <section>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ad consequuntur dolor quis laboriosam animi expedita, recusandae, illo? Omnis reiciendis veritatis iure debitis eos provident accusantium est molestiae commodi corrupti.</p>
        <p>Lorem ipsum dolor sit amet, <span>consectetur adipisicing elit, sed do eiusmod</span> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </section>
    </main>
    <footer>
      <p>&copy; Codefellows LLC 2017</p>
    </footer>
  </body>
</html>
```

In our parsing function, we split the stringified buffer that we get from the HTML document with the following regular expression **/\<(.*)\>/g** and trim the empty elements via the following line:

```let arr = str.split(/\<(.*)\>/g).filter(el => el.trim());```

This gives us the following array:

```
[ '!DOCTYPE html',
  'html',
  'head',
  'title>minimal html to tree</title',
  '/head',
  'body',
  'header',
  'h2>We\'re building a tree!</h2',
  'nav',
  'ul',
  'li>home</li',
  'li>about</li',
  'li>contact</li',
  'li>signin</li',
  '/ul',
  '/nav',
  '/header',
  'main',
  'section',
  'p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ad consequuntur dolor quis laboriosam animi expedita, recusandae, illo? Omnis reiciendis veritatis iure debitis eos provident accusantium est molestiae commodi corrupti.</p',
  'p>Lorem ipsum dolor sit amet, <span>consectetur adipisicing elit, sed do eiusmod</span> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p',
  '/section',
  '/main',
  'footer',
  'p>&copy; Codefellows LLC 2017</p',
  '/footer',
  '/body',
  '/html' ]
  ```

  We first iterate through the function to set up the tree structure, ignoring text content inside each element. After the tree structure is set up, we use the .breadthFirst method to find nodes with content, then separate the tags and content. A finished example node (the one containing the title element) would look like:

```
TreeNode {
  value: { tag: 'title', content: 'minimal html to tree' },
  children: [] }
```