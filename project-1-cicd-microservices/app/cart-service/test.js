const assert = require('assert');
const app = require('./server');

console.log('Running Cart Service unit tests...');
assert.strictEqual(typeof app, 'function', 'App must export an express instance');
console.log('PASS: Cart service application structure is valid');
