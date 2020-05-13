let mongo = require('./index');

(async function() {
  let collection = await mongo.packagesCollection();
  let cursor = collection.find();
  let document;
  while ( (document = await cursor.next()) ) {
    if( document.host ) continue;
    document.host = 'github';
    console.log('setting host for: '+document.name);
    await mongo.updatePackage(document.id, document);
  }
  mongo.disconnect();
})();