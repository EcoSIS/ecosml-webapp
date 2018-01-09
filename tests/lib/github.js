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

  it(`should get a raw README file from ${repo.name}`, async () => {
    let {response, body} = await github.getRawFile(repo.name, 'README.md');

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.indexOf(repo.description) > -1, true);
  });

  it(`should delete a repo ${repo.name}`, async () => {
    let {response, body} = await github.deleteRepository(repo.name);
    assert.equal(response.statusCode, 204);
  });

});