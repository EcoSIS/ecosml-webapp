const bunyan = require('bunyan');
const config = require('./config');
const {LoggingBunyan} = require('@google-cloud/logging-bunyan');

let streams = [];
if( !global.testing && !global.quiteLogging ) {
  streams.push({stream: process.stdout});


  // create bunyan logger for stackdriver
  let loggingBunyan = new LoggingBunyan({
    projectId: config.google.key.project_id,
    keyFilename: config.google.keyPath,
    resource : {type: 'project'}
  });

  // add new logger stream
  streams.push(loggingBunyan.stream());
}


let logger = bunyan.createLogger({
  name: 'server',
  level: config.server.loglevel || 'info',
  streams: streams
});

module.exports = logger;