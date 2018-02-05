'use strict';

const Kary = require('./lib/kary');
const parseHTML = require('./lib/parseHtml');
const debug = require('debug')('kary:index');
const debugV = require('debug')('karv:index');

debug(JSON.stringify(parseHTML(`<html><main>
<section>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ad consequuntur dolor quis laboriosam animi expedita, recusandae, illo? Omnis reiciendis veritatis iure debitis eos provident accusantium est molestiae commodi corrupti.</p>
  <p>Lorem ipsum dolor sit amet, <span>consectetur adipisicing elit, sed do eiusmod</span> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</section>
</main>
<footer>
<p>&copy; Codefellows LLC 2017</p>
</footer></html>`)));

const k = new Kary();
debug(`k: ${JSON.stringify(k)}`);
k.insert('html');
debug(`k: ${JSON.stringify(k)}`);
// k.insert('body', k.root);
// debug(`k: ${JSON.stringify(k)}`);
// k.insert('head', k.root);
// debug(`k: ${JSON.stringify(k)}`);
// k.insert('div', k.root.children[0]);
// debug(`k: ${JSON.stringify(k)}`);
// k.insert('p', k.root.children[0].children[0]);
// debug(`k: ${JSON.stringify(k)}`);
