global.testing = true;

const config = require('../server/lib/config');
config.github.org = 'ecosml-dev';

require('./lib');
require('./models');