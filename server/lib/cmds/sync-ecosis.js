let sync = require('../sync/ecosis');

(async function() {
  try {
    await sync.syncOrgs();
    console.log('done');
  } catch(e) {
    console.log(e);
  }
})();