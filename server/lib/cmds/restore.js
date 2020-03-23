let model = require('../../models/BackupModel');
model.restore()
  .then(() => console.log('done.'))
  .catch(e => console.error(e));