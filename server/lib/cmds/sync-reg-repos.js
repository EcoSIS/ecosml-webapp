const model = require('../../models/CronModel');
(async function() {
  await model.syncRegRepos();
  console.log('Done.');
  process.exit();
})();