/**
 * Sync a GitHub org to mongodb
 */
const github = require('../github');
const mongodb = require('../mongo');
const config = require('../config');
const utils = require('../utils');
const Logger = require('../logger');
const firebase = require('../firebase');
const redis = require('../redis');

class GithubSync {

  constructor() {
    this._init();
  }

  /**
   * @method _init
   * @description wire up event listern to firebase module and preform
   * a query for sync events to make sure we didn't miss anything
   */
  async _init() {
    // this is triggered on each firestore doc update
    firebase.initGithubTeamObserver(e => {
      e.docChanges.forEach((change) => {
        let data = firebase.getDataFromChangeDoc(change);
        firebase.emitBuffered(data.payload, firebase.EVENTS.GITHUB_TEAM_UPDATE, data);
      });
    });

    // this is triggered after a certain amount of time of method call above
    // e is an array of buffered events
    firebase.on(firebase.EVENTS.GITHUB_TEAM_UPDATE, e => this._onChangeEvents(e));
  }

  async _onChangeEvents(events) {
    // we just want the last changes
    let handled = {};

    // these are ordered by timestamp, so we only handle the first
    for( var i = 0; i < events.length; i++ ) {
      let e = events[i];
      if( e.fsChangeType === 'removed' ) continue; // noop

      let teamSlug = e.payload;

      // we already processed a newer event for this team
      if( handled[teamSlug] ) {
        try {
          await firebase.ackGithubTeamEvent(e.fsId);
        } catch(error) {
          logger.error('Failed to handle firestore github team sync event', e, error);
        }
        continue;  
      }

      try {
        this.syncTeamToMongo(teamSlug);
        await firebase.ackGithubTeamEvent(e.fsId);
      } catch(error) {
        logger.error('Failed to handle firestore ecosis sync event', e, error);
      }

      handled[teamSlug] = true;
    }    
  }

  /**
   * @method syncAllRepos
   * @description sync all repositories from Github for org.  This will sync
   * github repo metadata, stores ecosml-metadata.json file, README.md (description)
   * and all Github releases
   * 
   * @return {Promise}
   */
  async syncAllRepos() {
    
    Logger.info(`Starting GitHub repository sync for ${config.github.org}\n`);

    let repos = await github.listRepositories();
    repos = repos.map(repo => repo.name);

    Logger.log(`Syncing ${repos.length} GitHub repositories`);

    for( let i = 0; i < repos.length; i++ ) {
      await this.syncRepo(repos[i]);
    }

    let pkgs = (await mongodb.getAllPackageNames())
               .filter((pkg) => repos.indexOf(pkg.name) === -1)
               .map(pkg => pkg.name);

    Logger.log('Removing the following packages found locally in EcoSML but not in GitHub', pkgs);
    for( let i = 0; i < pkgs.length; i++ ) {
      await mongodb.removePackage(pkgs[i]);
    }
  }

  /**
   * @method syncAllRepos
   * @description sync repository from Github.  This will sync
   * github repo metadata, stores ecosml-metadata.json file, README.md (description)
   * and all Github releases
   * 
   * @param {String} repoName repository name to sync
   * 
   * @return {Promise}
   */
  async syncRepo(repoName) {
    Logger.log(`Syncing GitHub repository ${repoName}`);
    let metadata;

    try {
      var {body} = await github.getRepository(repoName);
      metadata = utils.githubRepoToEcosml(JSON.parse(body));

      var {body} = await github.getRawFile(repoName, 'ecosml-metadata.json');
      metadata = Object.assign(metadata, JSON.parse(body));
      
      var {body} = await github.getRawFile(repoName, 'README.md');
      metadata.description = body;

      var {body} = await github.listReleases(repoName);
      let releases = JSON.parse(body).map(release => utils.githubReleaseToEcosml(release));
      releases.sort((a, b) => {
        if( a.publishedAt.getTime() < b.publishedAt.getTime() ) return -1;
        if( a.publishedAt.getTime() > b.publishedAt.getTime() ) return 1;
        return 0;
      });
      metadata.releases = releases;

    } catch(e) {
      Logger.error('Failed to download metadata file for repo '+repoName+', ignoring');
      Logger.error(e);
      return;
    }

    await mongodb.insertPackage(metadata);
  }

  /**
   * @method syncAllTeamsToMongo
   * @description sync all teams from Github to local MongoDB for org.
   * 
   * @return {Promise}
   */
  async syncAllTeamsToMongo() {
    
    Logger.info(`Starting GitHub team sync for ${config.github.org}\n`);

    let teams = await github.listTeams();

    Logger.log(`Syncing ${teams.length} GitHub teams`);

    for( let i = 0; i < repos.length; i++ ) {
      await this.syncTeam(teams[i]);
    }

    let removeTeams = (await mongodb.getAllGithubTeamNames())
               .filter((team) => teams.findIndex(t => team.id === t.id) === -1)
               .map(team => team.slug);

    Logger.log('Removing the following github teams', removeTeams);
    for( let i = 0; i < removeTeams.length; i++ ) {
      await mongodb.removeGithubTeam(removeTeams[i]);
    }
  }

  /**
   * @method syncTeamToMongo
   * @description sync a github team to local MongoDB.  team can either
   * be a team object or a team id string
   * 
   * @param {Object|String} team if string, must be team id
   * 
   * @returns {Promise} 
   */
  async syncTeamToMongo(team) {
    if( typeof team !== 'Object' ) {
      let {response} = await github.getTeam(team);
      team = JSON.parse(response.body);
    }

    team.members = await github.listTeamMembers(team.id);
    team.repos = (await github.listRepositories(team.id)) || [];
    // just store the id, the one thing that won't change on us
    team.repos = team.repos.map(repo => repo.id);
    
    return mongodb.insertGithubTeam(team);
  }

  /**
   * @method syncEcoSISOrgToTeam
   * @description given a ecosis org name, make sure github team
   * is in sync with team metadata, members and repos.
   * 
   * @param {String} orgName ecosis org name
   * 
   * @returns {Promise}
   */
  async syncEcoSISOrgToTeam(orgName) {
    let org = await redis.client.get(redis.createOrgKey(orgName));
    org = JSON.parse(org);
    org.members = [];
    
    let searchKey = redis.createAuthKey(orgName, '*', '*');
    let keys = await redis.client.keys(searchKey);
    for( let i = 0; i < keys.length; i++ ) {
      let member = await redis.client.get(keys[i]);
      org.members.push(JSON.parse(member));
    }

    let pkgs = await mongodb.getAllOrgPackageNames(orgName);
    let team = await mongodb.getGithubTeam(orgName);
    
    // create the github team
    if( team === null ) {
      await github.createTeam({
        name : org.name,
        description : org.description,
        repo_names : pkgs.map(pkg => config.github.org+'/'+pkg.name)
      });
    
    // something changed, update the github team
    } else if( team.name !== org.name ||
        team.description !== org.description ) {

      await github.editTeam(team.id, {
        name : org.name,
        description : org.description
      });
    }

    // make sure package permissions are correct
    if( team !== null ) {
      if( !team.repos ) team.repos = [];

      // check all packages have permissions
      for( var i = 0; i < pkgs.length; i++ ) {
        let index = team.repos.findIndex(repoId => repoId === pkgs[i].id);
        if( index === -1 ) {
          await github.addTeamRepo(team.id, pkgs[i].name);
        }
      }

      // make sure invalid packages are removed
      for( var i = 0; i < team.repos.length; i++ ) {
        let index = pkgs.findIndex(pkg => pkg.id === team.repos[i]);
        if( index === -1 ) {
          // grab current package name from mongo
          let pkg = await mongodb.getPackage(team.repos[i]);
          await github.removeTeamRepo(team.id, pkg.name);
        }
      }
    }



    // TODO: make sure all teams members (if provided github id) are in sync
  }

}

module.exports = new GithubSync();
