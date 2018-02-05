
const debug = require('debug')('kary:const');
const debugV = require('debug')('karv:const');

module.exports = {
  debug: function() {
    const args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    debug(...args);
    console.log(...args);
  },
  debugV: function() {
    const args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    debugV(...args);
    console.log(...args);
  }
}
