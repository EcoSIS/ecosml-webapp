global.testing = true;

const assert = require('assert');
const ecosisSync = require('../../lib/sync/ecosis');
const ckan = require('../../lib/ckan');
const firebase = require('../../lib/firebase');
const redis = require('../../lib/redis');

let orgName = 'sync-testing-org';

function getOrganizationStub() {
  return {
    "users": [
      {
        "capacity": "admin",
        "name": "tester",
        "state": "active",
        "display_name": "tester",
        "id": "528250de-c1e2-462c-ac37-42ef813071b4",
      }
    ],
    "display_name": orgName,
    "description": "this is a test, this is only a test",
    "image_display_url": "http://www.google.com",
    "name": orgName,
    "is_organization": true,
    "state": "active",
    "type": "organization",
    "id": "8c247a42-ddad-496f-832d-1e4aa51fe2ce"
  }
}
let getOrganization;

describe('Sync API', function() {

  before(() => {
    // setup our stub
    getOrganization = ckan.getOrganization;
    ckan.getOrganization = getOrganizationStub;
  });

  it(`should sync org with EcoSIS`, async () => {
    await ecosisSync.syncOrg(orgName);
    let authOrg = await redis.client.get(redis.createOrgKey(orgName));
    assert.deepEqual(JSON.parse(authOrg), {
      id : "8c247a42-ddad-496f-832d-1e4aa51fe2ce",
      name :"sync-testing-org", 
      displayName : "sync-testing-org",
      description : "this is a test, this is only a test",
      logo: "http://www.google.com"
    });

    let authOrgRoles = await redis.client.keys(redis.createAuthKey(orgName));
    assert.deepEqual(authOrgRoles, ['auth-sync-testing-org-tester-admin']);
  });

  it(`should removeOrg with EcoSIS`, async () => {
    await ecosisSync.removeOrg(orgName);
    let authOrg = await redis.client.get(redis.createOrgKey(orgName));
    assert.equal(authOrg, null);

    let authOrgRoles = await redis.client.keys(redis.createAuthKey(orgName));
    assert.deepEqual(authOrgRoles, []);
  });

  it(`should listen to firebase EcoSIS sync event`, function(next) {
    this.timeout(10000);

    function onEvents(events) {

      setTimeout(async () => {
        let authOrg = await redis.client.get(redis.createOrgKey(orgName));
        assert.deepEqual(JSON.parse(authOrg), {
          id : "8c247a42-ddad-496f-832d-1e4aa51fe2ce",
          name :"sync-testing-org", 
          displayName : "sync-testing-org",
          description : "this is a test, this is only a test",
          logo: "http://www.google.com"
        });
    
        let authOrgRoles = await redis.client.keys(redis.createAuthKey(orgName));
        assert.deepEqual(authOrgRoles, ['auth-sync-testing-org-tester-admin']);

        firebase.removeListener(firebase.EVENTS.ECOSIS_ORG_UPDATE, onEvents);
        next();
      }, 100);
    }

    firebase.on(firebase.EVENTS.ECOSIS_ORG_UPDATE, onEvents);

    firebase.firestore
      .collection(firebase.collections.ecosisOrgs)
      .add({
        headers : {},
        payload : {
          id : '8c247a42-ddad-496f-832d-1e4aa51fe2ce',
          deleted : false
        },
        timestamp : Date.now()
      });
  });

  after(async () => {
    // cleanup
    await ecosisSync.removeOrg(orgName);
    
    // undo our stub
    ckan.getOrganization = getOrganization;

    // redis.client.quit();
  });

});