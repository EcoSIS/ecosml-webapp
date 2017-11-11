const assert = require('assert');
const mongo = require('../../server/lib/mongo');

let repo = {
  name : 'Unit-Test-Repo',
  description : 'This is a test, this is only a test'
};

describe('MongoDB Repo Methods', function() {

  it(`should insert a repo ${repo.name}`, async () => {
    let response = await mongo.insertRepository(repo);

    assert.equal(response.result.ok, 1);
    assert.equal(response.result.n, 1);
  });

  it(`should get a repo ${repo.name}`, async () => {
    let response = await mongo.getRepository(repo.name);

    assert.equal(response.name, repo.name);
  });

  it(`should delete a repo ${repo.name}`, async () => {
    let response = await mongo.removeRepository(repo.name);

    assert.equal(response.result.ok, 1);
  });

  after(function(){
    mongo.db.close();
  });

});