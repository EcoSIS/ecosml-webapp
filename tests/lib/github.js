const assert = require('assert');
const github = require('../../server/lib/github');

let repo = {
  name : 'Unit-Test-Repo',
  description : 'This is a test, this is only a test',
  license_template : 'mit',
  auto_init : true
};

describe('Github API Request Methods', function() {

  it(`should create a repo ${repo.name}`, async () => {
    let {response, body} = await github.createRepository(repo);

    assert.equal(response.statusCode, 201);
    repo = JSON.parse(body);
  });

  it(`should delete a repo ${repo.name}`, async () => {
    let {response, body} = await github.deleteRepository(repo.name);
    assert.equal(response.statusCode, 204);
  });

});