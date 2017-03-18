'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

// before hook: assign authorId to the _id of the currently logged in user.
const assignAuthor = function(options) {
  return function(hook) {
    // The authenticated user
    const user = hook.params.user;
    hook.data.authorId = user._id;
  }
}
// after hook: look up the user with the matching authorId in the users service and add it as 'author'
const populateAuthor = common.populate('author', { service: 'users', field: 'authorId' })

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [
    assignAuthor()
  ],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [
    populateAuthor
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
