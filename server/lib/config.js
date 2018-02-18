const env = process.env;
const path = require('path');
const secrets = require('../secrets');

const mongoHost = env.MONGO_HOST || 'mongo';

module.exports = {

  server : {
    port : env.SERVER_PORT || '3000',
    url : env.SERVER_URL || 'http://localhost:3000',
    label : env.SERVER_LABEL || 'EcoSML', // used for auth redirect
    assets : env.SERVER_ASSET_DIR || 'public',
    loglevel : env.SERVER_LOG_LEVEL || 'debug',

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

    appRoutes : ['package', 'search', 'edit', 
    'create', 'account']
  },

  ecosis : {
    host : env.ECOSIS_HOST || 'http://localhost:5000'
  },

  mongodb : {
    host : mongoHost,
    url : `mongodb://${mongoHost}:27017/ecosml`,
    collections : {
      package : 'package'
    },
    filters : ['keywords', 'theme', 'family', 'specific'],
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
              keywords: 8,
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

  // control which attributes are allowed to post
  schemaFilter : {
    // required attributes for creating package
    REQUIRED_CREATE : ['name', 'description', 'owner', 'organization'],
    // attributes that are allowed to be updated
    UPDATE_ATTRIBUTES : ['name', 'description', 'overview', 'theme', 'organization',
      'family', 'specific', 'keywords']
  },

  github : {
    access : secrets.github,
    org : env.GITHUB_ORG || 'ecosml-dev',
    fsRoot : env.GITHUB_FS_ROOT || path.join(__dirname, '..', 'gitdata'),
    default_license : 'mit'
  },

  git : {
    name : 'EcoSML Admin',
    email : 'admin@ecosml.org'
  }

}