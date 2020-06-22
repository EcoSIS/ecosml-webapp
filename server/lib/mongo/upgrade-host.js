let mongo = require('./index');
const controlledVocabulary = require('../../public/lib/controlled-vocabulary');

(async function() {
  let collection = await mongo.packagesCollection();
  let cursor = collection.find();
  let document;
  while ( (document = await cursor.next()) ) {
    let changed = false;

    if( document.host ) {
      changed = true;
      document.host = 'github';
    }

    

    if( !changed ) continue;

    console.log('setting host for: '+document.name);
    await mongo.updatePackage(document.id, document);
  }
  mongo.disconnect();
})();