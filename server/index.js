const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const config = require('./lib/config');
const logger = require('./lib/logger');
const sitemap = require('./models/SitemapModel');
const backup = require('./models/BackupModel');
require('./models/CronModel');

const app = express();

/**
 * Log promise errors, uncaught exceptions
 */
process.on('unhandledRejection', e => logger.fatal(e));
process.on('uncaughtException', e => logger.fatal(e));

/**
 * Simple HTTP logging
 */
app.use((req, res, next) => {
  res.on('finish',() => {
    logger.info(`${res.statusCode} ${req.method} ${req.protocol}/${req.httpVersion} ${req.originalUrl || req.url} ${req.get('User-Agent') || 'no-user-agent'}`);
  });
  next();
});

/**
 * Setup sessions
 */
const RedisStore = require('connect-redis')(session); 
app.use(session({
    store: new RedisStore({
      host : 'redis',
      prefix : 'session-'
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
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Setup doi resolver
 */
require('./controllers/doi').doiResolver(app);

/**
 * Setup static routes for webapp
 **/
require('./controllers/static')(app);

/**
 * Setup Controllers
 */
app.use('/auth', require('./controllers/auth'));
app.use('/api', require('./controllers/api'));
sitemap.middleware(app);

/**
 * Init EcoSIS, Travis and Github event sync
 */
require('./lib/sync');

/**
 * Init backup model, run a cleaning
 */
setTimeout(async () => {
  try {
    await backup.clean();
  } catch(e) {
    logger.error('failed initial backup cleaning: ', e);
  }
}, 1000*30);

/**
 * Start server
 */
app.listen(config.server.port, () => {
  logger.info(`Server ready on port ${config.server.port}`);
});