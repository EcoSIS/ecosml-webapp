module.exports = {
  envs : ['local', 'dev', 'prod'],
  travis : {
    collection : 'travis'
  },
  ecosis : {
    collections : {
      users : 'ecosis-users',
      orgs : 'ecosis-orgs'
    }
  },
  github : {
    collections : {
      commits : 'github-commit-events',
      teams : 'github-teams'
    },
    ignoreUsers : ['ecosml-admin']
  }
}