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

    appRoutes : ['package', 'search']
  },

  mongodb : {
    host : mongoHost,
    url : `mongodb://${mongoHost}:27017/ecosml`,
    collections : {
      package : 'package'
    },
    indexes : {
      package : [
        {
          index : {
            name: "text",
            desciption : "text",
            keywords: "text",
            overview: "text"
          },
          options : {
            weights: {
              name: 10,
              keywords: 10,
              overview : 5,
              desciption : 2
            },
            name: "TextIndex"
          }
        },
        {
          index : {
            name: 1,
            keywords: 1,
            id: 1,
            private : 1,
            createdAt : 1,
            pushedAt : 1,
            createdAt : 1
          },
          options : {
            name: "KeywordIndex"
          }
        }
      ]
    }
  },

  github : {
    access : secrets.github,
    org : 'ecosml',
    fsRoot : env.GITHUB_FS_ROOT || path.join(__dirname, '..', 'gitdata'),
    default_license : 'mit'
  }

}