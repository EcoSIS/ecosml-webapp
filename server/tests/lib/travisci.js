const assert = require('assert');
const travis = require('../../lib/travis-ci');


describe('Travis CI API Request Methods', function() {

  it(`should fetch all repos from travis`, async () => {
    let response = await travis.listRepositories();

    console.log(response.statusCode);
    console.log(response.body);
  });

  it(`should fetch a repo from travis`, async () => {
    let response = await travis.getRepository('testing-pkg-creation');

    console.log(response.statusCode);
    console.log(response.body);
  });

  it(`should set a repo to active`, async () => {
    let response = await travis.activateRepository('testing-pkg-creation');

    console.log(response.statusCode);
    console.log(response.body);
  });

  it(`should not build repo on push requests`, async () => {
    let response = await travis.setRepositorySettings('testing-pkg-creation', 'build_pushes', false);

    console.log(response.statusCode);
    console.log(response.body);
  });

  it(`should not build repo on pull requests`, async () => {
    let response = await travis.setRepositorySettings('testing-pkg-creation', 'build_pull_requests', false);

    console.log(response.statusCode);
    console.log(response.body);
  });

  // it(`should fetch a repo builds from travis`, async () => {
  //   let response = await travis.getRepositoryBuilds('price-the-vintage', {org: 'UCDavisLibrary'});

  //   console.log(response.statusCode);
  //   console.log(response.body);
  // });

  // it(`should schedule a travis to build a repo`, async () => {
  //   let response = await travis.requestBuild(
  //     'testing-pkg-creation', 
  //     {
  //       config: {
  //         language: 'python',
  //         python : ['2.7'],
  //         install : ['pip install -r requirements.txt'],
  //         script: ['cd examples/package_example_1 && python test.py']
  //       }
  //     }
  //   );

  //   console.log(response.statusCode);
  //   console.log(response.body);
  // });



});

/*
`language: python
python:
  - "2.7"
install:
  - pip install -r requirements.txt
script:
  - python testing-pkg-creation/examples/package_example_1/test.py`
*/