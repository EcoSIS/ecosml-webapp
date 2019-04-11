const assert = require('assert');
const github = require('../../lib/github');

let repo = {
  name : 'Unit-Test-Repo',
  description : 'This is a test, this is only a test',
  license_template : 'mit',
  auto_init : true
};

let release = {
  name : 'v0.0.1',
  tag_name : 'v0.0.1',
  body : 'testing',
  draft : false,
  prerelease : false
}

let team = {
  name : 'unit-test-team',
  description : 'unit testing',
  maintainers : ['jrmerz']
}

describe('Github API Request Methods', function() {

  // it(`should create a repo ${repo.name}`, async () => {
  //   let {response, body} = await github.createRepository(repo);

  //   assert.equal(response.statusCode, 201);
  //   repo = JSON.parse(body);
  // });

  // it(`should get a raw README file from ${repo.name}`, async () => {
  //   let {response, body} = await github.getRawFile(repo.name, 'README.md');

  //   assert.equal(response.statusCode, 200);
  //   assert.equal(response.body.indexOf(repo.description) > -1, true);
  // });

  // it(`should list repositories`, async () => {
  //   let repos = await github.listRepositories();

  //   let r = repos.find(r => r.name === repo.name);
  //   assert.equal(typeof r, 'object');
  // });

  // it(`should get a repositories`, async () => {
  //   let {response, body} = await github.getRepository(repo.name);
  //   assert.equal(response.statusCode, 200);
  // });

  // it(`should edit a repositories`, async () => {
  //   let patch = {
  //     name : repo.name,
  //     description : 'an update'
  //   }
  //   var {response, body} = await github.editRepository(patch);
  //   assert.equal(response.statusCode, 200);

  //   var {response, body} = await github.getRepository(repo.name);
  //   assert.equal(response.statusCode, 200);
  //   assert.equal(JSON.parse(body).description, 'an update');
  // });

  // it('should create a release', async () => {
  //   var {response, body} = await github.createRelease(repo.name, release);
  //   assert.equal(response.statusCode, 201);
  //   release.id = JSON.parse(body).id;
  // });

  // it('should list releases', async () => {
  //   var {response, body} = await github.listReleases(repo.name);
  //   assert.equal(response.statusCode, 200);
  //   let releases = JSON.parse(body);
  //   assert.equal(releases.length, 1);
  // });

  // it('should delete the release', async () => {
  //   var {response, body} = await github.deleteRelease(repo.name, release.id);
  //   assert.equal(response.statusCode, 204);
  // });

  // it(`should delete a repo ${repo.name}`, async () => {
  //   let {response, body} = await github.deleteRepository(repo.name);
  //   assert.equal(response.statusCode, 204);
  // });

  it('should create a team', async () => {
    let {response} = await github.createTeam(team);
    assert.equal(response.statusCode, 201);
    team = JSON.parse(response.body);
  });

  it('should list all teams', async () => {
    let teams = await github.listTeams();
    assert.equal(teams.length > 0, true);
  });

  it('should list get a team', async () => {
    let {response} = await github.getTeam(team.id);
    assert.equal(response.statusCode, 200);
    let responseTeam = JSON.parse(response.body);
    assert.equal(responseTeam.id, team.id);
  });

  it('should list all team members', async () => {
    let members = await github.listTeamMembers(team.id);
    assert.equal(members.length === 1, true);
  });

  it('should add a member to a team', async () => {
    let {response} = await github.addTeamMember(team.id, 'ecosml-admin');
    assert.equal(response.statusCode, 200);
    let body = JSON.parse(response.body);
    assert.equal(body.state, 'active');
  });

  it('should list all team members', async () => {
    let members = await github.listTeamMembers(team.id);
    assert.equal(members.length === 2, true);
  });

  it('should remove a member from a team', async () => {
    let {response} = await github.removeTeamMember(team.id, 'ecosml-admin');
    assert.equal(response.statusCode, 204);
  });

  it('should delete a team', async () => {
    let {response} = await github.deleteTeam(team.id);
    assert.equal(response.statusCode, 204);
  });

});