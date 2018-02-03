## 15 K-ary Trees

in your README, write documentation for you data structures
your documentation should includes code block usage examples
provide instructions for:
installing and using your data structure
running any command line interface
accessing each method
running your tests
Feature Tasks
use the node fs module to read an HTML document into a buffer (minimal.html => found in the /assets dir)
parse the buffer and use the root <html> element, subsequent HTML tags, and their text content to build a tree data structure
hint: you will need to refactor your node to allow a different type of data to be stored in the .value property. The remainder of the node should not change
  Tree = Node {
    value: {
      eleName: 'xxx',
      textContent: 'yyy' (can be empty string??)
    },
      children: SLL [{Node}, {Node}, ...]
    }
  }
Stretch:
implement the ability to parse both classes & ids; and any other attribute nodes you would like to consider
there is a test file in /assets dir called stretch.html
Rubric:
Tests: 2pts
Passes linter: 1pts
Completed Data Structure: 3pts
Completed FP methods: 2pts
Big-O notation: 2pts
