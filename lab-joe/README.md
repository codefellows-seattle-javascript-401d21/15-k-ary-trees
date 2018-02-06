Joseph Waine - lab 15 - Feb 4 2018

run node index.js to see a console.log of the file parsed.



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
