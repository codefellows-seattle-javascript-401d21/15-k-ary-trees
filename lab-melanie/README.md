# 15 K-ary Trees

This app includes an `html-reader` module that reads an html file, parses through the data, and returns a tree based on the parent/child relationships of the elements and text. It then writes a new `json` file to the `assets` folder with the tree.

```json
{"root":
  {"type":"element",
    "val":"html",
    "children":
      [{"type":"element",
        "val":"head",
        "children":
          [{"type":"element",
            "val":"title",
            "children":
              [{"type":"text",
                "val":"minimal html to tree",
                "children":[]
                }]
              }]
            },
        {"type":"element",
        "val":"body",
        "children":
          [{"type":"element",
            "val":"header",
            "children":
              [{"type":"element",
                "val":"h2",
                "children":
                  [{"type":"text",
                    "val":"We're building a tree!",
                    "children":[]
                  }]
                },
              {"type":"element",
              "val":"nav",
              "children":[{...
```

---

## Installing and Getting Started
Fork and git clone this repository to your computer. From your terminal, navigate to `lab-melanie` and type `npm install` to install all necessary packages.

From your terminal, enter `node index.js`, this will create the new json file in the `assets` directory. 

---

## Data Structures

### HTML-Reader Module
This module contains two functions, `parser.readData` and `parser.htmlTree`. 

`parser.readData` - reads an html file and reaturns a buffer, converts the buffer to a string, removes the `<!DOCTYPE html>` tag from the file and passed the data to the `parser.htmlTree` function. It then writes a `results.json` file with the tree.

`parser.htmlTree` - a helper function, takes in the string data from `parser.readData`, creates a stack, and through a series of `if` statements, pushes and pops elements of the html file to/from a stack. It then takes those elements and passes them into a tree node with their proper `type`, `value`, and `parent`. This tree is then sent back to the `parser.readData` function.

---

## Tests

From your terminal, type `npm run test` to see results of Jest tests.