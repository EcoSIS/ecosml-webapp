const bunyan = require('bunyan');
const config = require('./config');

let logger = bunyan.createLogger({
  name: 'server',
  level: config.server.loglevel || 'info',
  streams: [
    { stream: process.stdout }
  ]
});

module.exports = logger;