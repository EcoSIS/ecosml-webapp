const assert = require('assert');
const path = require('path');
const fs = require('fs');
const model = require('../../server/models/RepoModel');
const mongo = require('../../server/lib/mongo');
const git = require('../../server/lib/git');

let repo = {
  name : 'Unit-Test-Repo',
  description : 'This is a test, this is only a test',
  owner : 'bob',
  organization : 'myorg'
};

describe('RepoModel Methods', function() {

  it(`should insert a repo ${repo.name}`, async () => {
    try {
      let response = await model.create(repo);
      assert.equal(response.name, repo.name);
    } catch(e) {
      assert.equal(e, null);
    }

    // make sure the repo was pulled to filesystem
    let rpath = git.getRepoPath(repo.name);
    let readmePath = path.join(rpath, 'README.md');
    assert.equal(fs.existsSync(readmePath), true);

    // make the repo was inserted into mongo
    let mrepo = await mongo.getRepository(repo.name);
    assert.equal(mrepo.name, repo.name);
  }).timeout(10000);


  it(`should delete a repo ${repo.name}`, async () => {
    try {
      await model.delete(repo.name);
    } catch(e) {
      assert.equal(e, null);
    }

    // make sure the repo was removed from filesystem
    let rpath = git.getRepoPath(repo.name);
    let readmePath = path.join(rpath, 'README.md');
    assert.equal(fs.existsSync(readmePath), false);

    // make the repo was removed from mongo
    let mrepo = await mongo.getRepository(repo.name);
    assert.equal(mrepo, null);
  });

  after(function(){
    mongo.db.close();
  });

});