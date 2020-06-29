let mongo = require('./index');
let config = require('../config');
const controlledVocabulary = require('../../public/lib/controlled-vocabulary');

(async function() {
  let collection = await mongo.packagesCollection();
  let cursor = collection.find();
  let document;
  while ( (document = await cursor.next()) ) {
    let changed = false;

    if( !document.host ) {
      changed = true;
      document.host = 'github';
    }

    if( document.name.indexOf('/') > -1 ) {
      changed = true;
      document.repoOrg = document.name.split('/')[0];
      document.name = document.name.split('/')[1];
    }

    if( !document.repoOrg ) {
      document.repoOrg = config.github.org;
    }

    if( document.fullName !== document.host+'/'+document.repoOrg+'/'+document.name ) {
      document.fullName = document.host+'/'+document.repoOrg+'/'+document.name;
      changed = true;
    }

    if( !changed ) continue;

    console.log('updating name for', {
      id : document.id,
      fullName : document.fullName,
      name : document.name,
      repoOrg : document.repoOrg,
      host : document.host
    });
    // await mongo.updatePackage(document.id, document);
  }
  mongo.disconnect();
})();