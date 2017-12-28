const git = require('../git');
const github = require('../github');
const mongo = require('../mongo');


let staticName = '';
if( process.argv.length > 2 ) {
  staticName = process.argv[2];
}

(async function(){

  let names = await mongo.getAllPackageNames() || [];
  names = names.map(item => item.name);
  if( staticName ) names.push(staticName);

  for( var i = 0; i < names.length; i++ ) {
    console.log('Removing package: '+names[i]);

    try {
      await github.deleteRepository(names[i]);
    } catch(e) {}

    try {
      await git.removeRepositoryFromDisk(names[i]);
    } catch(e) {}

    try {
      await mongo.removePackage(names[i]);
    } catch(e) {}
  }

  console.log('done');
  mongo.db.close();
})()