const bunyan = require('bunyan');
const config = require('./config');
const {LoggingBunyan} = require('@google-cloud/logging-bunyan');

let streams = [];
let host = 'unknown.host';
let info = {};

if( !global.testing && !global.quiteLogging ) {
  streams.push({stream: process.stdout});

  let projectId;
  if( config.google.key ) {
    projectId = config.google.key.project_id;
  }

  if( projectId && config.google.keyPath ) {
    let loggingBunyan = new LoggingBunyan({
      projectId: projectId,
      keyFilename: config.google.keyPath,
      resource : {type: 'project'}
    });

    // add new logger stream
    streams.push(loggingBunyan.stream());
  }

  try {
    host = new URL(config.server.url).host;
  } catch(e) {}

  info = {
    name: process.env.LOGGER_NAME || host,
    level: config.server.loglevel || 'info',
    stackdriver : {
      enabled : projectId ? true : false,
      file : config.google.keyPath
    }
  }

  if( projectId ) {
    info.stackdriver.projectId = projectId;
  }

}

let logger = bunyan.createLogger({
  name: process.env.LOGGER_NAME || host,
  level: config.server.loglevel || 'info',
  streams: streams
});

if( streams.length > 0 ) logger.info('logger initialized', info);

module.exports = logger;