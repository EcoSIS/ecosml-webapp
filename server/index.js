const express = require('express');
const session = require('express-session');
const config = require('./lib/config');

const app = express();

/**
 * Setup sessions
 */
const RedisStore = require('connect-redis')(session); 
app.use(session({
    store: new RedisStore({
      host : 'redis'
    }),
    maxAge : config.server.session.maxAge,
    secret: config.server.session.secret
}));

/**
 * Setup static asset dir
 */
app.use(express.static(config.server.assets));

/**
 * Setup Controllers
 */
app.use('/auth', require('./controllers/auth'));

/**
 * Start server
 */
app.listen(config.server.port, () => {
  console.log(`Server ready on port ${config.server.port}`);
});