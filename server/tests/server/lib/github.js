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