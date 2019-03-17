const config = require('../lib/config');
const path = require('path');
const express = require('express');
const gitinfo = require('../gitinfo');
const redis = require('../lib/redis');
const logger = require('../lib/logger');
const pkgModel = require('../models/PackageModel');
const jsonldTransform = require('../lib/jsonld');
const spaMiddleware = require('@ucd-lib/spa-router-middleware');

/**
 * How we load Webcomponent polyfills and Webpacked Polymer 3 application bundle.
 * The loader script is from @ucd-load/cork-app-load and expects the global
 * CORK_LOADER_VERSIONS which will load all required polyfills and application
 * js bundles with cache breaking version flags.
 */
const bundle = `
  <script>
    var CORK_LOADER_VERSIONS = {
      loader : '${config.client.versions.loader}',
      bundle : '${config.client.versions.bundle}'
    }
  </script>
  <script src="/loader/loader.js?_=${config.client.versions.loader}"></script>
`;

module.exports = function(app) {
  let assetsDir = path.join(__dirname, '..', config.server.assets);

  spaMiddleware({
    app: app,
    htmlFile : path.join(assetsDir, 'index.html'),
    isRoot : true,
    appRoutes : config.server.appRoutes,
    getConfig : async (req, res, next) => {
      let githubInfo = (await redis.getGithubInfo(req.session.username)) || {};

      next({
        user : req.session.username || null,
        github : {
          username : githubInfo.username,
          data : githubInfo.data
        },
        appRoutes : config.server.appRoutes,
        ecosisDataHost : config.ecosis.host,
        googleAnalyticsKey : config.google.analyticsKey,
        env : {
          client : config.server.clientEnv,
          github : config.github.org,
          firebase : config.firebase.env,
          git : gitinfo
        }
      });
    },
    template : async (req, res, next) => {
      let jsonld = '';

      let pkg = req.originalUrl.match(/\/package\/([0-9A-Za-z-]+)/);
      if( pkg ) {
        try {
          pkg = await pkgModel.get(pkg[1]);
          jsonld = JSON.stringify(jsonldTransform(pkg), '  ', '  ');
        } catch(e) {
          logger.error('failed to run seo transform', e);
        }
      }
      next({bundle, jsonld})
    }
  });

  app.use(express.static(assetsDir));
}