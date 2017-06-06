'use strict';

const assert = require('assert');
const createCat = require('../../../../src/services/cat/hooks/createCat.js');

describe('cat createCat hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    createCat()(mockHook);

    assert.ok(mockHook.createCat);
  });
});
