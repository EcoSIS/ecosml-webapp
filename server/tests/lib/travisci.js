const assert = require('assert');
const travis = require('../../lib/travis-ci');


describe('Travis CI API Request Methods', function() {

  // it(`should fetch a repo from travis`, async () => {
  //   let response = await travis.getRepository('price-the-vintage', 'UCDavisLibrary');

  //   console.log(response.statusCode);
  //   console.log(response.body);
  // });

  // it(`should fetch a repo builds from travis`, async () => {
  //   let response = await travis.getRepositoryBuilds('price-the-vintage', {org: 'UCDavisLibrary'});

  //   console.log(response.statusCode);
  //   console.log(response.body);
  // });

  it(`should schedule a travis to build a repo`, async () => {
    let response = await travis.requestBuild('price-the-vintage', {org: 'UCDavisLibrary'});

    console.log(response.statusCode);
    console.log(response.body);
  });


});