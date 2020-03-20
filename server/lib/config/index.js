const env = process.env;
const path = require('path');
const fs = require('fs');
const keyPath = path.join(__dirname, '../../google-key.json');

let secrets = {
  ecosml : {
    secret : {}
  },
  datacite : {},
  aws : {}
};

const MOUNT_PATH = env.MOUNT_PATH || '/storage';

if( fs.existsSync(path.resolve(__dirname, '../../secrets.js')) ) {
  secrets = require('../../secrets');
}

const mongoHost = env.MONGO_HOST || 'mongo';
const firebaseEnv = env.FIREBASE_ENV || 'local';
const serverEnv = env.SERVER_ENV || 'dev';
const clientEnv = env.CLIENT_ENV || 'dev';

let assetsDir = (clientEnv === 'prod') ? 'dist' : 'public';
let clientPackage = require(`../../${assetsDir}/package.json`);

module.exports = {

  server : {
    port : env.SERVER_PORT || '3000',
    url : env.SERVER_URL || 'http://localhost:3000',
    label : env.SERVER_LABEL || 'EcoSML', // used for auth redirect
    assets : assetsDir,
    loglevel : env.SERVER_LOG_LEVEL || 'info',
    clientEnv,
    serverEnv,

    jwt : {
      secret : env.JWT_SECRET || secrets.ecosml.secret[serverEnv]
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
    'create', 'account', 'about', 'admin'],
  },

  client : {
    env : clientEnv,
    versions : {
      bundle : clientPackage.version,
      loader : clientPackage.dependencies['@ucd-lib/cork-app-load'].replace(/^\D/, '')
    }
  },

  backups : {
    tmpDir : path.join(MOUNT_PATH, 'backup'),
    tmpRestoreDir : path.join(MOUNT_PATH, 'backup-restore'),
    bucket : env.BACKUP_ENV === 'prod' ? 'ecosml-backups' : 'ecosml-'+(env.BACKUP_ENV || 'local')+'-backups',
    ecosisBucket : 'ecosis-backups'
  },

  ecosis : {
    host : env.ECOSIS_HOST || 'http://localhost:3000',
    dataHost : env.ECOSIS_DATA_HOST || 'http://localhost:5000'
  },

  redis : {
    host : 'redis',
    prefixes : {
      org : 'org',
      auth : 'auth',
      admin : 'admin',
      github : 'github'
    }
  },

  mongodb : {
    host : mongoHost,
    database : 'ecosml',
    url : `mongodb://${mongoHost}:27017/ecosml`,
    collections : {
      package : 'package',
      githubTeam : 'github-team',
      stats : 'stats',
      doi : 'doi'
    },
    filters : ['keywords', 'theme', 'family', 'specific', 'language'],
    indexes : require('./mongo-indexes')
  },

  // control which attributes are allowed to post
  // schemaFilter : {
  //   // required attributes for creating package
  //   REQUIRED_CREATE : ['name', 'description', 'owner', 'organization'],
  //   // attributes that are allowed to be updated
  //   UPDATE_ATTRIBUTES : ['name', 'description', 'overview', 'theme', 'organization',
  //     'family', 'specific', 'keywords']
  // },

  github : {
    host : 'https://github.com',
    clientId : env.GITHUB_CLIENT_ID || '',
    clientSecret : env.GITHUB_CLIENT_SECRET || '',
    access : secrets.github,
    org : env.GITHUB_ORG || 'ecosml-dev',
    fsRoot : path.join(MOUNT_PATH, 'gitdata'),
    default_license : 'mit',
    homepageRoot : serverEnv === 'dev' ? 'https://dev.ecosml.org/package/' : 'https://ecosml.org/package/',

    // backups for registered repositories
    registeredRepositories : {
      file : (serverEnv === 'prod' ? 'production' : 'development') + '-respositories.json',
      repoName : 'EcoSIS/ecosml-registered-repositories',
      removeAttributes : ['_id', 'description', 'overview', 'releases']
    }
  },

  gitlab : {
    host : 'https://gitlab.com',
    apiRoot : '/api/v4'
  },

  datacite : {
    url : (serverEnv === 'prod') ? 'https://api.datacite.org/dois' : 'https://api.test.datacite.org/dois',
    username : secrets.datacite.username,
    password : secrets.datacite.password
  },

  doi : {
    shoulder : (serverEnv === 'prod') ? '10.21232' : '10.21232',
    states : {
      pendingApproval : 'pending-approval',
      pendingRevision : 'pending-revision',
      canceled : 'canceled',
      requesting : 'requesting',
      accepted : 'accepted',
      applied : 'applied'
    },
    snapshotDir : path.join(MOUNT_PATH, 'snapshots')
  },

  travisCi : secrets.travisCi,

  git : {
    name : 'EcoSML Admin',
    email : 'admin@ecosml.org'
  },

  aws : secrets.aws ? secrets.aws : null,

  google : {
    key : secrets.google,
    keyPath : keyPath,
    analyticsKey : env.GOOGLE_ANALYTICS_KEY || '',
  },

  firebase : {
    env : firebaseEnv,
    key : secrets.google,
    collections : {
      githubCommits : 'github-commit-events-'+firebaseEnv,
      githubTeams : 'github-team-events-'+firebaseEnv,
      githubReleases : 'github-release-events-'+firebaseEnv,
      // travis : 'travis-events-'+firebaseEnv,
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
      // travisBuild : 'https://us-central1-ecosis-prod.cloudfunctions.net/travisBuild',
      ecosisSync : 'https://us-central1-ecosis-prod.cloudfunctions.net/ecosisSync'
    }
  }

}