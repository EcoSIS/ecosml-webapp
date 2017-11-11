const express = require('express');
const session = require('express-session');
const config = require('./lib/config');
const path = require('path');
const fs = require('fs');

const app = express();

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

// setup static routes
require('./lib/static')({
  app: app,
  assetsDir : path.join(__dirname, config.server.assets),
  appRoutes : config.server.appRoutes
});

/**
 * Setup Controllers
 */
app.use('/auth', require('./controllers/auth'));
app.use('/repo', require('./controllers/repo'));

/**
 * Start server
 */
app.listen(config.server.port, () => {
  console.log(`Server ready on port ${config.server.port}`);
});