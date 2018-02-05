'use strict';

const KTree = require('./kary');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Tag = require('./tag');

// Parser class
module.exports = class {
  // BigO(1) to create a new Parser
  constructor() {
  }

  parseFile(path) {
    return fs.readFileProm(path)
      .then(buffer => buffer.toString())
      .then(str => this.parseStr(str))
      .catch(err => console.error(err));
  }


  /****************************************************************************/
  parseTagStr(tagStr, parentTag) {
    // BigO(n) to walk through the items in the string and parse them
    // Parse the tagStr elements and possibly add more textContext to the parent
    // if it is a closing tag (eg <p> tags have textContent defined before and
    // after <span> tags housed within them
    // Examples of tagStrs are the following:
    // 1) 'p>Lorem ipsum dolor sit amet,'         <--- Opening tag with textContent
    // 2) '/p>'                                   <--- Closing tag (simple)
    // 3) 'span class="brand-bold">consectetur'   <--- Opening tag with textContent
    // 4) '/span> tempor incididunt ut'           <--- Closing tag with textContent belonging to the parentTag
    //          |
    //           \-----------------------------------------
    //                                                     |
    // For these examples we are dividint the tagStr here /

    // Separate inside the tag from outside the tag
    // ["span class='brand-bold' id='foo'", "consectetur"]  <--- for opening tag
    // ["/span", " tempor incididunt ut"]          <--- for closing tag with parent text
    let tagItems = tagStr.replace(/"/g, '').split('>');

    // Handle closing tags and append text to the parent Tag
    // eg '/span> tempor incididunt ut'
    if (tagStr.startsWith('/')) {
      if (tagItems[1]) {
        if (!parentTag)
          throw new Error('Error: Must have parent tag when text follows the closing >');
        // append text if any to the parent tag
        parentTag.textContent += tagItems[1];
      }
      return null;
    }

    // Handle opening tags
    // insideTag <== ["span", "class="brand-bold""]      <--- 0th element is the eleName
    let insideTag = tagItems[0].split(' ');
    // splice the eleName out of tagItems and pass it to the Tag constructor
    let tag = new Tag(insideTag.splice(0, 1)[0]);
    tag.textContent = tagItems[1];

    // Extract ids and tags
    insideTag.map(s => {
      let attrs = s.split('=');

      // currently there is only support for 1 id and 1 class
      if (attrs.length === 1)
        throw new Error('Error: Incorrectly formatted tag attributes!');
      let classes;
      switch (attrs[0]) {
      case 'class':
        tag.classes.push(attrs[1]);
        classes = attrs[1].split(' ');
        classes.map(c => tag.classes.push(c));
        break;
      case 'id':
        tag._id = attrs[1];
        break;
      default:
        throw new Error('Error: Invalid tag class/id format');
      }
    });

    return tag;
  }

  /****************************************************************************/
  parseStr(str) {
    // BigO(n) to walk throug the string and generate a tree
    if (!str) throw new Error('Error: str is not valid');
    if (str.trim() === '') throw new Error('Error: File was empty');

    let tagStrings = str.split('<');
    // filter out empty strings
    tagStrings = tagStrings.filter(t => t !== '');
    // trim the fat
    tagStrings = tagStrings.map(t => t.trim());
    // Only support valid !DOCTYPE html prefixed HTML files
    if (tagStrings.splice(0, 1)[0] !== '!DOCTYPE html>')
      throw new Error('Error: No DOCSTRING prefix');

    let tree = new KTree();
    // pluck first parent
    let parentNode = null;
    tagStrings.map(tagString => {
      let parentTag = parentNode ? parentNode.value : null;
      let tag = this.parseTagStr(tagString, parentTag);
      if (tag) {
        // beginning of tag - nest
        parentNode = tree.insert(tag, parentTag);
      } else {
        // end of a tag - unnest
        parentNode = parentNode.parent;
      }
    });

    tree.breadthFirst(node => delete(node.parent));

    return tree;
  }
};
