># Lab 15 K-ary Trees


Read an HTML document.  Using the &lt;html&gtt; as the root element, parse the rest of the HTML tags and content into a tree data structure.  Create an object to insert into the value property of each node

```JAVASCRIPT
  Tree = Node {
    value: {
      eleName: 'xxx',
      textContent: 'yyy' (can be empty string??)
    },
      children: SLL [{Node}, {Node}, ...]
    }
  }
```


>## Install

```BASH
    npm i
```

### Dependencies 

- This project has the following dependencies:

```JSON
    "devDependencies": {
    "debug": "^3.1.0",
    "jest": "^22.1.4"
  },
  "dependencies": {
    "bluebird": "^3.5.1"
  }
```

### npm scripts

- The following npm scripts are available:

```JSON
   "scripts": {
    "lint": "eslint .",
    "test": "jest --verbose -i",
    "test:debug": "DEBUG=* jest --verbose -i",
    "start:debug": "DEBUG=http* node index.js"
  }
```

#### Run the tests!

Normal mode

```BASH
    npm test
```

Debug mode

```BASH
    npm run test:debug
```

>## Usage Kary Class

The k-ary class has 3 methods:

1. insert()

  - Use this method to insert a value onto the tree.

  - This takes one argument to set the root

  - Inserting  additional values requires two arguments, a value and a parent value
  

### Create a tree

Use the new syntax to crete a new instance of a k-ary tree

```JAVASCRIPT
    const KT = require('../lib/kary');    
    
    let kt = new KT();
```
```
    { root: null }
```

### Insert a value

Use the insert value method to add a value to the tree

```JAVASCRIPT
    const KT = require('../lib/kary');    
    
    let kt = new KT();
    kt.insert(17);
```
```
    { root: Tn { value: 17, children: null } }
```

```JAVASCRIPT
    const KT = require('../lib/kary');    
    
    let kt = new KT();
    kt.insert(17);
    kt.insert(3,17);
```
```JSON
    '{"root":{"value":17,"children":{"head":{"value":{"value":3,"children":null},"next":null}}}}'
```

```JAVASCRIPT
    const KT = require('../lib/kary');    
    
    let kt = new KT();;
    kt.insert(17);;
    kt.insert(3,17);;
    kt.insert(21, 3);;  
```
```JSON
    '{"root":{"value":17,"children":{"head":{"value":{"value":3,"children":{"head":{"value":{"value":17,"children":null},"next":null}}},"next":null}}}}'
```

 2. RemoveByVal

  - The remove by val removes the node with that value

  - This has an airty of one

```JAVASCRIPT
    const KT = require('../lib/kary');    
    
    let kt = new KT();
    kt.insert(17);
    kt.insert(3,17);
    kt.removeByVal(3);
```
```JSON
    '{"root":{"value":17,"children" :null}}'
```

3. Find

  - Find has an arity of one

  - Find uses the value passed as an argument and returns the node with that value


```JAVASCRIPT
    const KT = require('../lib/kary');    
    
    let kt = new KT();
    kt.insert(17);
    kt.insert(3,17);
    kt.insert(21, 3);
    kt.find(3);
    
```
```JSON
    '{"value":{"value":3,"children":{"head":{"value":{"value":17,"children":null},"next":null}}}}'
```

>## Parse Module

The parse.parseHtml method has an airity of one.  It accepts the file path to an html.  The module pareses the html file into a k-ary tree.  The module will throw an error if the file path does not exist or if the file is not an html file

This is an example of the result as JSON

```JSON
{
   "root":{
      "value":{
         "eleName":"html",
         "textContent":"",
         "class":"",
         "id":""
      },
      "children":{
         "head":{
            "value":{
               "value":{
                  "eleName":"body",
                  "textContent":"",
                  "class":"",
                  "id":""
               },
               "children":{
                  "head":{
                     "value":{
                        "value":{
                           "eleName":"footer",
                           "textContent":"",
                           "class":"container primary-footer",
                           "id":""
                        },
                        "children":{
                           "head":{
                              "value":{
                                 "value":{
                                    "eleName":"p",
                                    "textContent":"&copy; Codefellows LLC 2017",
                                    "class":"",
                                    "id":""
                                 },
                                 "children":null
                              },
                              "next":null
                           }
                        }
                     },
                     "next":{
                        "value":{
                           "value":{
                              "eleName":"main",
                              "textContent":"",
                              "class":"container primary-main",
                              "id":""
                           },
                           "children":{
                              "head":{
                                 "value":{
                                    "value":{
                                       "eleName":"section",
                                       "textContent":"",
                                       "class":"",
                                       "id":""
                                    },
                                    "children":{
                                       "head":{
                                          "value":{
                                             "value":{
                                                "eleName":"p",
                                                "textContent":"Lorem ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                                "class":"",
                                                "id":""
                                             },
                                             "children":{
                                                "head":{
                                                   "value":{
                                                      "value":{
                                                         "eleName":"span",
                                                         "textContent":"consectetur adipisicing elit, sed do eiusmod",
                                                         "class":"brand-bold",
                                                         "id":""
                                                      },
                                                      "children":null
                                                   },
                                                   "next":null
                                                }
                                             }
                                          },
                                          "next":{
                                             "value":{
                                                "value":{
                                                   "eleName":"p",
                                                   "textContent":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ad consequuntur dolor quis laboriosam animi expedita, recusandae, illo? Omnis reiciendis veritatis iure debitis eos provident accusantium est molestiae commodi corrupti.",
                                                   "class":"",
                                                   "id":"primary-text"
                                                },
                                                "children":{
                                                   "head":{
                                                      "value":{
                                                         "value":{
                                                            "eleName":"span",
                                                            "textContent":"consectetur adipisicing elit, sed do eiusmod",
                                                            "class":"brand-bold",
                                                            "id":""
                                                         },
                                                         "children":null
                                                      },
                                                      "next":null
                                                   }
                                                }
                                             },
                                             "next":null
                                          }
                                       }
                                    }
                                 },
                                 "next":null
                              }
                           }
                        },
                        "next":{
                           "value":{
                              "value":{
                                 "eleName":"header",
                                 "textContent":"",
                                 "class":"container primary-header",
                                 "id":""
                              },
                              "children":{
                                 "head":{
                                    "value":{
                                       "value":{
                                          "eleName":"nav",
                                          "textContent":"",
                                          "class":"",
                                          "id":""
                                       },
                                       "children":{
                                          "head":{
                                             "value":{
                                                "value":{
                                                   "eleName":"ul",
                                                   "textContent":"",
                                                   "class":"",
                                                   "id":""
                                                },
                                                "children":{
                                                   "head":{
                                                      "value":{
                                                         "value":{
                                                            "eleName":"li",
                                                            "textContent":"signin",
                                                            "class":"nav-secondary",
                                                            "id":"signin"
                                                         },
                                                         "children":null
                                                      },
                                                      "next":{
                                                         "value":{
                                                            "value":{
                                                               "eleName":"li",
                                                               "textContent":"contact",
                                                               "class":"nav-primary",
                                                               "id":"contact"
                                                            },
                                                            "children":null
                                                         },
                                                         "next":{
                                                            "value":{
                                                               "value":{
                                                                  "eleName":"li",
                                                                  "textContent":"about",
                                                                  "class":"nav-primary",
                                                                  "id":"about"
                                                               },
                                                               "children":null
                                                            },
                                                            "next":{
                                                               "value":{
                                                                  "value":{
                                                                     "eleName":"li",
                                                                     "textContent":"home",
                                                                     "class":"nav-primary",
                                                                     "id":"home"
                                                                  },
                                                                  "children":null
                                                               },
                                                               "next":null
                                                            }
                                                         }
                                                      }
                                                   }
                                                }
                                             },
                                             "next":null
                                          }
                                       }
                                    },
                                    "next":{
                                       "value":{
                                          "value":{
                                             "eleName":"h2",
                                             "textContent":"We're building a tree!",
                                             "class":"",
                                             "id":""
                                          },
                                          "children":null
                                       },
                                       "next":null
                                    }
                                 }
                              }
                           },
                           "next":null
                        }
                     }
                  }
               }
            },
            "next":{
               "value":{
                  "value":{
                     "eleName":"head",
                     "textContent":"",
                     "class":"",
                     "id":""
                  },
                  "children":{
                     "head":{
                        "value":{
                           "value":{
                              "eleName":"title",
                              "textContent":"minimal html to tree",
                              "class":"",
                              "id":""
                           },
                           "children":null
                        },
                        "next":null
                     }
                  }
               },
               "next":null
            }
         }
      }
   }
}
```


## Tests

  ### Parse

  #### Valid

- Validate that it should return an object with a property of root when invoked with a file path that contains html

- Validate that it should return an object with html as the root value

- Validate that it should return an object with a root with children

- Validate that it should return an object with a root and with children elements with the value of head and body

  #### Invalid

  - Validate that it should throw an error for undefined argument

  - Validate that it should throw an error for non html file

  - Validate that it should throw an error for a bad path
 

  ### K-ary

  #### Valid

  - Validate that i should be an object

  - Validate that it should contain a root node

  - Validate that it should contain nodes with the keys of value and children

  - Validate that it should contain root value

  - Validate that is should contain a root node with a child

  - Validate that find returns a value

  - Validate that removeByVal removes a value
  
  - Validate that find returns null for an empty tree 

  - Validate that removeByVal returns null on an empty tree
  
#### Invalid

- Validate that insert throws an error when val is undefined

- Validate that find throws an error when val is undefined

- Validate that removeByVal throws an error when val is undefined
   