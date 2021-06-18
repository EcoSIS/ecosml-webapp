let mongo = require('./index');
let config = require('../config');
let git = require('../git');
let repository = require('../repository');

(async function() {
  let collection = await mongo.packagesCollection();
  let cursor = collection.find();
  let document;
  while ( (document = await cursor.next()) ) {
    try {
      let changed = false;

      if( !document.defaultBranch ) {
        changed = true;
        document.defaultBranch =  await git.defaultBranchName(
          repository.getHost(document.host),
          document.repoOrg,
          document.name
        )
      }

      if( !changed ) continue;

      console.log('updating defaultBranch for', {
        id : document.id,
        name : document.name,
        repoOrg : document.repoOrg,
        host : document.host,
        defaultBranch : document.defaultBranch,
      });
      await mongo.updatePackage(document.id, document);
    } catch(e) {
      console.error('Failed to update: '+document.fullName, e);
    }
  }
  mongo.disconnect();
})();