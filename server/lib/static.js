const config = require('./config');
const path = require('path');
const express = require('express');
const spaMiddleware = require('@ucd-lib/spa-router-middleware');

module.exports = function(app) {
  let assetsDir = path.join(__dirname, '..', config.server.assets);
  
  spaMiddleware({
    app: app,
    htmlFile : path.join(assetsDir, 'index.html'),
    isRoot : true,
    appRoutes : config.server.appRoutes,
    getConfig : (req, res) => {
      return {
        user : null,
        appRoutes : config.server.appRoutes
      }
    }
  });

  app.use(express.static(assetsDir));
}