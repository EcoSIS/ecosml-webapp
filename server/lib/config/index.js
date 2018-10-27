const env = process.env;
const path = require('path');
const secrets = require('../../secrets');
const keyPath = path.join(__dirname, '../../google-key.json');

const mongoHost = env.MONGO_HOST || 'mongo';
const firebaseEnv = env.FIREBASE_ENV || 'local';
const clientEnv = env.CLIENT_ENV || 'dev';

let assetsDir = (clientEnv === 'prod') ? 'dist' : 'public';
let clientPackage = require(`../../${assetsDir}/package.json`);

module.exports = {

  server : {
    port : env.SERVER_PORT || '3000',
    url : env.SERVER_URL || 'http://localhost:3000',
    label : env.SERVER_LABEL || 'EcoSML', // used for auth redirect
    assets : env.SERVER_ASSET_DIR || 'public',
    loglevel : env.SERVER_LOG_LEVEL || 'info',
    clientEnv,

    jwt : {
      secret : env.JWT_SECRET || secrets.ecosml.secret
    },

    auth : {
      redirect : env.AUTH_REDIRECT || 'http://localhost:5000/user/remotelogin'
    },

    session : {
      maxAge : (86400 * 365), // ms - year
      secret : env.SESSION_SECRET || 'not set'
    },

    // place all SPA base route names here
    appRoutes : ['package', 'search', 'edit', 
    'create', 'account', 'about']
  },

  client : {
    env : clientEnv,
    versions : {
      bundle : clientPackage.version,
      loader : clientPackage.dependencies['@ucd-lib/cork-app-load'].replace(/^\D/, '')
    }
  },

  ecosis : {
    host : env.ECOSIS_HOST || 'http://localhost:5000'
  },

  redis : {
    host : 'redis',
    prefixes : {
      org : 'org',
      auth : 'auth',
      admin : 'admin'
    }
  },

  mongodb : {
    host : mongoHost,
    url : `mongodb://${mongoHost}:27017/ecosml`,
    collections : {
      package : 'package',
      githubTeam : 'github-team',
      stats : 'stats'
    },
    filters : ['keywords', 'theme', 'family', 'specific', 'language'],
    indexes : require('./mongo-indexes')
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
    fsRoot : env.GITHUB_FS_ROOT || path.resolve(__dirname, '..', '..', 'gitdata'),
    default_license : 'mit',
    homepageRoot : clientEnv === 'dev' ? 'https://dev.ecosml.org/package/' : 'https://ecosml.org/package/',
  },

  travisCi : secrets.travisCi,

  git : {
    name : 'EcoSML Admin',
    email : 'admin@ecosml.org'
  },

  google : {
    key : secrets.google,
    keyPath : keyPath
  },

  firebase : {
    env : firebaseEnv,
    key : secrets.google,
    collections : {
      githubCommits : 'github-commit-events-'+firebaseEnv,
      githubTeams : 'github-team-events-'+firebaseEnv,
      travis : 'travis-events-'+firebaseEnv,
      ecosisUsers : 'ecosis-users-'+firebaseEnv,
      ecosisOrgs : 'ecosis-org-events-'+firebaseEnv
    }
  },

  cloudFunctions : {
    envs : {
      dev : 'Dev',
      prod : 'Prod',
      local : 'Local'
    },
    baseUrls : {
      githubWebhook : 'https://us-central1-ecosis-prod.cloudfunctions.net/githubWebhook',
      travisBuild : 'https://us-central1-ecosis-prod.cloudfunctions.net/travisBuild',
      ecosisSync : 'https://us-central1-ecosis-prod.cloudfunctions.net/ecosisSync'
    }
  }

}