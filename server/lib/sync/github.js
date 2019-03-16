/**
 * Sync a GitHub org to mongodb
 */
const github = require('../github');
const git = require('../git');
const fs = require('fs-extra');
const regRepos = require('../registered-repositories');
const mongodb = require('../mongo');
const config = require('../config');
const utils = require('../utils');
const logger = require('../logger');
const firebase = require('../firebase');
const redis = require('../redis');
const schema = require('../schema');
const packageModel = require('../../models/PackageModel');
const queue = require('../../models/PackageQueueModel');

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
    firebase.on(firebase.EVENTS.GITHUB_TEAM_UPDATE, e => this._onTeamChangeEvents(e));


    // this is triggered on each firestore doc update
    firebase.initGithubCommitObserver(e => {
      e.docChanges.forEach((change) => {
        let data = firebase.getDataFromChangeDoc(change);
        firebase.emitBuffered(data.payload, firebase.EVENTS.GITHUB_COMMIT, data);
      });
    });

    // this is triggered after a certain amount of time of method call above
    // e is an array of buffered events
    firebase.on(firebase.EVENTS.GITHUB_COMMIT, e => this._onGithubCommitEvents(e));
  
    // TODO: what about release events?
    firebase.initGithubReleaseObserver(e => {
      e.docChanges.forEach((change) => {
        let data = firebase.getDataFromChangeDoc(change);
        firebase.emitBuffered(data.payload, firebase.EVENTS.GITHUB_RELEASE, data);
      });
    });

    // this is triggered after a certain amount of time of method call above
    // e is an array of buffered events
    firebase.on(firebase.EVENTS.GITHUB_RELEASE, e => this._onGithubReleaseEvents(e));
  }

  /**
   * @method _onGithubCommit
   * @description called from firebase event listener.  We want to verify
   * that no badness has been made to the ecosis-metadata file.  We might
   * also want to run travis tests
   * 
   * @param {Array} events commit event list
   */
  async _onGithubCommitEvents(events) {
    let handled = {};
    
    for( var i = 0; i < events.length; i++ ) {
      if( events[i].fsChangeType === 'removed' ) continue; // noop

      let e = events[i].payload;
      let repoName = e.repository.name;

      // ignore anything from the admin user
      if( e.pusher.name === 'ecosml-admin' ) {
        await firebase.ackGithubCommitEvent(events[i].fsId);
        continue;
      }
      // only handle one repository commit event per batch
      if( handled[repoName] ) {
        await firebase.ackGithubCommitEvent(events[i].fsId);
        continue;
      }

      let pkg = await mongodb.getPackage(repoName);
      if( pkg ) {
        await this._verifyPackageMetadata(pkg);
        // TODO: ensure metadata file is in good order
        // TODO: sync package from github once metadata is ok and there was a change
      } else {
        logger.warn(`Received commit event for repo ${repoName} that is not in mongo. ignoring`);
      }
      
      await firebase.ackGithubCommitEvent(events[i].fsId);
      handled[repoName] = true;
    }
  }

  async _verifyPackageMetadata(pkg) {
    // first get in sync
    await git.resetHEAD(pkg.name);
    await git.clean(pkg.name);
    await git.pull(pkg.name);

    let {overview, description} = await regRepos.getGitHubProperties(pkg.name);
    pkg.overview = overview;
    await packageModel.writeMetadataFile(pkg);

    await mongodb.updatePackage(pkg.id, {
      description, overview
    });

    await queue.add(
      'commit', 
      pkg.name, 
      [pkg.name, 'Resetting package metadata, please use EcoSML website to update metadata file']
    );
  }

  async _onTeamChangeEvents(events) {
    // we just want the last changes
    let handled = {};

    // these are ordered by timestamp, so we only handle the first
    for( var i = 0; i < events.length; i++ ) {
      let e = events[i];
      if( e.fsChangeType === 'removed' ) continue; // noop

      let teamId = e.payload.id;

      // we already processed a newer event for this team
      if( handled[teamId] ) {
        try {
          await firebase.ackGithubTeamEvent(e.fsId);
        } catch(error) {
          logger.error('Failed to handle firestore github team sync event', e, error);
        }
        continue;  
      }

      try {
        await this.syncTeamToMongo(teamId);
        await firebase.ackGithubTeamEvent(e.fsId);
      } catch(error) {
        logger.error('Failed to handle firestore github team sync event', e, error);
      }

      handled[teamId] = true;
    }    
  }

  async _onGithubReleaseEvents(events) {
    // we just want the last changes
    let handled = {};

    // these are ordered by timestamp, so we only handle the first
    for( var i = 0; i < events.length; i++ ) {
      let e = events[i];
      if( e.fsChangeType === 'removed' ) continue; // noop

      if( e.payload.author === 'ecosml-admin' ) {
        await firebase.ackGithubReleaseEvent(e.fsId);
        continue;
      }

      let repoName = e.payload.id;

      // we already processed a newer event for this team
      if( handled[repoName] ) {
        try {
          await firebase.ackGithubReleaseEvent(e.fsId);
        } catch(error) {
          logger.error('Failed to handle firestore github release sync event', e, error);
        }
        continue;  
      }

      try {
        let releaseInfo = await this._syncReleases(repoName);
        await mongodb.updatePackage(repoName, releaseInfo);
        await firebase.ackGithubReleaseEvent(e.fsId);
      } catch(error) {
        logger.error('Failed to handle firestore github release sync event', e, error);
      }

      handled[repoName] = true;
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
    
    logger.info(`Starting GitHub repository sync for ${config.github.org}\n`);

    let repos = await github.listRepositories();
    repos = repos.map(repo => repo.name);

    logger.info(`Syncing ${repos.length} GitHub repositories`);

    for( let i = 0; i < repos.length; i++ ) {
      await this.syncRepo(repos[i]);
    }

    logger.info(`Starting GitHub repository sync for Registered Repositories\n`);
    let regReposList = await regRepos.restoreAll();
    repos = repos.concat(regReposList);

    let pkgs = (await mongodb.getAllPackageNames())
               .filter((pkg) => repos.indexOf(pkg.name) === -1)
               .map(pkg => pkg.name);

    logger.info('Removing the following packages found locally in EcoSML but not in GitHub', pkgs);
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
    logger.info(`Syncing GitHub repository ${repoName}`);
    let metadata;

    try {
      var {body} = await github.getRepository(repoName);
      if( body ) metadata = utils.githubRepoToEcosml(JSON.parse(body));

      var {body} = await github.getRawFile(repoName, 'ecosml-metadata.json');
      if( body ) metadata = Object.assign(metadata, JSON.parse(body));
     
      var {body} = await github.getRawFile(repoName, 'README.md');
      if( body ) metadata.description = body;

      let {releases, releaseCount} = await this._syncReleases(repoName);
      metadata.releases = releases;
      metadata.releaseCount = releaseCount;

    } catch(e) {
      logger.error('Failed to download metadata file for repo '+repoName+', ignoring');
      logger.error(e);
      return;
    }

    await mongodb.insertPackage(metadata);
  }

  async _syncReleases(repoName) {
    var {body} = await github.listReleases(repoName);
    let releases = JSON.parse(body).map(release => utils.githubReleaseToEcosml(release));
    releases.sort((a, b) => {
      if( a.publishedAt.getTime() < b.publishedAt.getTime() ) return -1;
      if( a.publishedAt.getTime() > b.publishedAt.getTime() ) return 1;
      return 0;
    });

    return {
      releases : releases,
      releaseCount : (releases || []).length
    }
  }

  /**
   * @method syncAllTeamsToMongo
   * @description sync all teams from Github to local MongoDB for org.
   * 
   * @return {Promise}
   */
  async syncAllTeamsToMongo() {
    
    logger.info(`Starting GitHub team sync for ${config.github.org}\n`);

    let teams = await github.listTeams();

    logger.info(`Syncing ${teams.length} GitHub teams`);

    for( let i = 0; i < teams.length; i++ ) {
      await this.syncTeamToMongo(teams[i]);
    }

    let removeTeams = (await mongodb.getAllGithubTeamNames())
               .filter((team) => teams.findIndex(t => team.id === t.id) === -1)
               .map(team => team.slug);

    logger.info('Removing the following github teams', removeTeams);
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
    if( typeof team !== 'object' ) {
      let {response} = await github.getTeam(team);
      team = JSON.parse(response.body);
    }

    if( team.organization ) {
      delete team.organization;
    }

    team.members = await github.listTeamMembers(team.id);
    team.members = team.members.map(member => ({
      login : member.login,
      id : member.id,
      avatar_url : member.avatar_url
    }));

    team.repos = (await github.listTeamRepos(team.id)) || [];
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
      let resp = await github.createTeam({
        name : org.name,
        description : org.description,
        repo_names : pkgs.map(pkg => config.github.org+'/'+pkg.name)
      });

      // if we failed to create team, sync to github
      if( resp.statusCode !== 201 ) {
        // find our team id
        let teams = await github.listTeams();
        team = teams.find(team => team.name === orgName);

        // sync team to mongo, then refetch
        if( team ) {
          await this.syncTeamToMongo(team.id);
          team = await mongodb.getGithubTeam(orgName);
        } else {
          return logger.error('Failed to create Github team but could not find team in Github team list:', orgName);
        }
      }
    }

    // something changed, update the github team
    if( team.name !== org.name ||
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
        let index = team.repos.findIndex(repoId => repoId === pkgs[i].githubId);
        if( index === -1 ) {
          await github.addTeamRepo(team.id, pkgs[i].name);
        }
      }

      // make sure invalid packages are removed
      for( var i = 0; i < team.repos.length; i++ ) {
        let index = pkgs.findIndex(pkg => pkg.githubId === team.repos[i]);
        if( index === -1 ) {
          // grab current package name from mongo
          let pkg = await mongodb.getPackage(team.repos[i]);
          await github.removeTeamRepo(team.id, pkg.name);
        }
      }
    }

    // filter out org.members that are of type member.  They
    // have no equivalent role in GitHub so we can't include them.
    // mapping is as follows:
    //
    // GitHub    | CKAN
    // no access | memnber
    // member    | editor
    // member    | owner
    let ckanMembers = org.members.filter(member => member.role === 'editor' || member.role === 'admin');

    // make sure all teams members (if provided github id) are in sync
    for( let info of ckanMembers ) {
      let githubUsername = await redis.getGithubUsername(info.user);
      if( !githubUsername ) continue;
      try {
        await github.addTeamMember(team.id, githubUsername);
      } catch(e) {
        console.error('Failed to sync github user to team: ', e, team, info, githubUsername);
      }
    }

    // see if anybody needs to be removed
    let orgMembers = org.members.map(m => m.user);
    for( let member of team.members ) {
      if( orgMembers.indexOf(member.login) === -1 ) {
        await github.removeTeamMember(team.id, member.login);
      }
    }
 
    
  }
}

module.exports = new GithubSync();