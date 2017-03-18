'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('cat service', function() {
  it('registered the cats service', () => {
    assert.ok(app.service('cats'));
  });
});
