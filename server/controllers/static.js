const config = require('../lib/config');
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
        user : req.session.username || null,
        appRoutes : config.server.appRoutes,
        ecosisDataHost : config.ecosis.host,
        env : {
          client : config.server.clientEnv,
          github : config.github.org,
          firebase : config.firebase.env
        }
      }
    }
  });

  app.use(express.static(assetsDir));
}