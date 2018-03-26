const assert = require('assert');
const travis = require('../../lib/travis-ci');


describe('Github API Request Methods', function() {

  it(`should create a repo ${repo.name}`, async () => {
    let {response, body} = await github.createRepository(repo);

    assert.equal(response.statusCode, 201);
    repo = JSON.parse(body);
  });

});