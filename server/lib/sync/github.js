/**
 * Sync a GitHub org to mongodb
 */
const github = require('../github');
const mongodb = require('../mongo');
const config = require('../config');
const utils = require('../utils');
const Logger = require('../logger');

class GithubSync {

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
   * @method syncAllTeams
   * @description sync all teams from Github for org.
   * 
   * @return {Promise}
   */
  async syncAllTeams() {
    
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
   * @method syncTeam
   * @description sync a github team.  team can either be a team object
   * or a team id string
   * 
   * @param {Object|String} team if string, must be team id
   * 
   * @returns {Promise} 
   */
  async syncTeam(team) {
    if( typeof team === 'String' ) {
      let {response} = await github.getTeam(team);
      team = JSON.parse(response.body);
    }

    team.members = await github.listTeamMembers(team.id);
    
    return mongodb.insertGithubTeam(team);
  }

}

module.exports = new GithubSync();
