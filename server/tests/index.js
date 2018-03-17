global.testing = true;

const config = require('../lib/config');
config.github.org = 'ecosml-dev';

require('./lib');
require('./models');