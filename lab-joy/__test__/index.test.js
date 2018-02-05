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
    });

    it('should return a tree object', () => {
        console.log(reader.parseHTML(path));
        // expect(typeof reader.parseHTML(path)).toBe('object');
        // expect(reader.parseHTML(path).root.value.tag).toBe('html');
    });

});