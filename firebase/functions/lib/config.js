module.exports = {
  envs : ['local', 'dev', 'prod'],
  secrets : require("../secrets"),
  travis : {
    collection : 'travis-events'
  },
  ecosis : {
    collections : {
      users : 'ecosis-users',
      orgs : 'ecosis-org-events'
    }
  },
  github : {
    collections : {
      commits : 'github-commit-events',
      teams : 'github-team-events'
    },
    ignoreUsers : ['ecosml-admin']
  }
}