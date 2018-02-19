/**
 * Sync a GitHub org to mongodb
 */
const github = require('./github');
const mongodb = require('./mongo');
const config = require('./config');
const utils = require('./utils');

class GithubSync {

  async syncAll() {
    console.log(`Starting sync for ${config.github.org}\n`);

    let repos = await github.listRepositories();
    repos = repos.map(repo => repo.name);

    console.log(`Syncing ${repos.length} repositories`);

    for( let i = 0; i < repos.length; i++ ) {
      await this.syncRepo(repos[i]);
    }


    let pkgs = (await mongodb.getAllPackageNames())
               .filter((pkg) => repos.indexOf(pkg.name) === -1)
               .map(pkg => pkg.name);

    console.log('Removing the following packages', pkgs);
    for( let i = 0; i < pkgs.length; i++ ) {
      await mongodb.removePackage(pkgs[i]);
    }

    mongodb.disconnect();
  }

  async syncRepo(repoName) {
    console.log(`Syncing ${repoName}`);
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
      console.error('Failed to download metadata file for repo '+repoName+', ignoring');
      console.error(e);
      return;
    }

    await mongodb.insertPackage(metadata);
  }
}

module.exports = new GithubSync();
