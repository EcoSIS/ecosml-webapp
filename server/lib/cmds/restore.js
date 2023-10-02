let model = require('../../models/BackupModel');

let file = undefined;
let isLocalFile = false;
if( process.argv.length >= 3 ) {
  file = process.argv[2];
  isLocalFile = true;
}

model.restore(file,  isLocalFile)
  .then(() => console.log('done.'))
  .catch(e => console.error(e));