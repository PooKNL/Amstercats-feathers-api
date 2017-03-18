'use strict';

const service = require('feathers-mongoose');
const cat = require('./cat-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: cat,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/cats', service(options));

  // Get our initialize service to that we can bind hooks
  const catService = app.service('/cats');

  // Set up our before hooks
  catService.before(hooks.before);

  // Set up our after hooks
  catService.after(hooks.after);
};
