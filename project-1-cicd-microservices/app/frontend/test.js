const assert = require('assert');
const app = require('./server');

console.log('Running Frontend unit tests...');
assert.strictEqual(typeof app, 'function', 'App must export an express instance');
console.log('PASS: Frontend application structure is valid');
