const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const logger = require('./lib/logger');
const path = require('path');
const fs = require('fs');

const app = express();

/**
 * Log promise errors, uncaught exceptions
 */
process.on('unhandledRejection', e => logger.error(e));
process.on('uncaughtException', e => {
  logger.error(e);
  process.exit(-1);
});

/**
 * Setup sessions
 */
const RedisStore = require('connect-redis')(session); 
app.use(session({
    store: new RedisStore({
      host : 'redis'
    }),
    resave : false,
    saveUninitialized : false,
    maxAge : config.server.session.maxAge,
    secret: config.server.session.secret
}));

/**
 * Setup POST body parsing
 */

// parse application/json
app.use(bodyParser.json())

/**
 * Setup static routes for webapp
 **/
require('./lib/static')({
  app: app,
  assetsDir : path.join(__dirname, config.server.assets),
  appRoutes : config.server.appRoutes
});

/**
 * Setup Controllers
 */
app.use('/auth', require('./controllers/auth'));
app.use('/api', require('./controllers/api'));

/**
 * Start server
 */
app.listen(config.server.port, () => {
  console.log(`Server ready on port ${config.server.port}`);
});