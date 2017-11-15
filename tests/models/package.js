const assert = require('assert');
const path = require('path');
const fs = require('fs');
const model = require('../../server/models/PackageModel');
const mongo = require('../../server/lib/mongo');
const git = require('../../server/lib/git');

let pkg = {
  name : 'Unit-Test-Package',
  description : 'This is a test, this is only a test',
  owner : 'bob',
  organization : 'myorg'
};

describe('Package Model Methods', function() {

  it(`should insert a package ${pkg.name}`, async () => {
    try {
      let response = await model.create(pkg);
      assert.equal(response.name, pkg.name);
    } catch(e) {
      assert.equal(e, null);
    }

    // make sure the git repo was pulled to filesystem
    let rpath = git.getRepoPath(pkg.name);
    let readmePath = path.join(rpath, 'README.md');
    assert.equal(fs.existsSync(readmePath), true);

    // make the package was inserted into mongo
    let mpackage = await mongo.getPackage(pkg.name);
    assert.equal(mpackage.name, pkg.name);
  }).timeout(10000);


  it(`should delete a package ${pkg.name}`, async () => {
    try {
      await model.delete(pkg.name);
    } catch(e) {
      assert.equal(e, null);
    }

    // make sure the package was removed from filesystem
    let rpath = git.getRepoPath(pkg.name);
    let readmePath = path.join(rpath, 'README.md');
    assert.equal(fs.existsSync(readmePath), false);

    // make the package was removed from mongo
    let mpackage = await mongo.getPackage(pkg.name);
    assert.equal(mpackage, null);
  });

  after(function(){
    mongo.db.close();
  });

});