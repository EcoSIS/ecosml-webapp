const env = process.env;
const path = require('path');
const secrets = require('../secrets');

const mongoHost = env.MONGO_HOST || '127.0.0.1';

module.exports = {

  server : {
    port : env.SERVER_PORT || '3000',
    url : env.SERVER_URL || 'http://localhost:3000',
    label : env.SERVER_LABEL || 'EcoSML', // used for auth redirect
    assets : env.SERVER_ASSET_DIR || 'public',
    loglevel : env.SERVER_LOG_LEVEL || 'info',

    jwt : {
      secret : env.JWT_SECRET || 'not set'
    },

    auth : {
      redirect : env.AUTH_REDIRECT || 'http://localhost:5000/user/remotelogin'
    },

    session : {
      maxAge : (86400 * 365), // ms - year
      secret : env.SESSION_SECRET || 'not set'
    },

    appRoutes : ['package']
  },

  mongodb : {
    host : mongoHost,
    url : `mongodb://${mongoHost}:27017/ecosml`,
    collections : {
      package : 'package'
    }
  },

  github : {
    access : secrets.github,
    org : 'ecosml',
    fsRoot : env.GITHUB_FS_ROOT || path.join(__dirname, '..', 'gitdata'),
    default_license : 'mit'
  }

}