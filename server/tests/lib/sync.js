const assert = require('assert');
const ecosisSync = require('../../lib/sync/ecosis');
const auth = require('../../models/AuthModel');
const redis = require('../../lib/redis');


describe('Sync API', function() {

  it(`should sync orgs with EcoSIS`, async function() {
    this.timeout(10 * 1000);
    let orgNames = await ecosisSync.syncOrgs();

    let orgs = await auth.getOrgs();
    
    assert.equal(orgNames.length > 0, true);
    assert.equal(orgs.length, orgNames.length);
  });

  after(() => {
    redis.client.quit();
  })

});