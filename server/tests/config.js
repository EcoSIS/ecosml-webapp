let config = require('../lib/config');
let secrets = require('./secrets');

config.testing = {
  secrets,
  urlFlag : '?integration-testing'
}

module.exports = config;