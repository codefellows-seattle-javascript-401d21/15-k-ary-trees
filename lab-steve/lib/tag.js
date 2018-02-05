'use strict';

module.exports = class {
  constructor(eleName) {
    if (!eleName) throw new Error('Error: No eleName provided');
    this.eleName = eleName;
    this.textContent = '';
    this.classes = [];
    this._id = '';
  }
};
