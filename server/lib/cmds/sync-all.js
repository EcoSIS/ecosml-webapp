let sync = require('../sync');

(async function() {
  try {
    await sync.syncAll();
    console.log('done');
  } catch(e) {
    console.log(e);
  }
})();