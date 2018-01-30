const bunyan = require('bunyan');
const config = require('./config');

let streams = [];
if( !global.testing && !global.quiteLogging ) {
  streams.push({stream: process.stdout});
}

let logger = bunyan.createLogger({
  name: 'server',
  level: config.server.loglevel || 'info',
  streams: streams
});

module.exports = logger;