'use strict';

require('jest');
let reader = require('../index');
let path = `${__dirname}/../data/minimal.html`;

describe('#parseHTML Function', () => {
    it('should not throw an error for valid file paths', () => {
        expect(() => {
            reader.parseHTML(path);
        }).not.toThrow();
    });

    it('should throw an error for invalid file paths', () => {
        expect(() => {
            reader.parseHTML('cats');
        }).toThrow();

        expect(() => {
            reader.parseHTML();
        }).toThrow();
    });

    it('should return a tree object', () => {
        reader.parseHTML(path).then(result => expect(typeof result).toBe('object'));
        reader.parseHTML(path).then(result => expect(result.root).toHaveProperty('value'));
        reader.parseHTML(path).then(result => expect(result.root).toHaveProperty('children'));
    });

    it('should parse the HTML and return the correct values and children for each node', () => {
        reader.parseHTML(path).then(result => expect(result.root.value.tag).toBe('html'));
        reader.parseHTML(path).then(result => expect(result.root.value.tag).not.toBe('cats'));
        reader.parseHTML(path).then(result => expect(result.root.children[0].children[0].value.tag).toBe('title'));
        reader.parseHTML(path).then(result => expect(result.root.children[0].children[0].value.content).toBe('minimal html to tree'));
    });
});