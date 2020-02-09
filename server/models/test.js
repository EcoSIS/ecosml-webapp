global.quiteLogging = true;

const package = require('./PackageModel');
const doi = require('./DoiModel');
const doiLib = require('../lib/doi');

(async function() {
  try {
    let pkg = await package.get('another-test');
    let resp = await doi.request(pkg, 'v0.0.2', 'jrmerz', 'jrmerz@ucdavis.edu');
    // doi.mint(pkg, 'v0.0.1', 'jrmerz@gmail.com')
    // let number = await doi.mint(pkg, 'v0.0.1', 'jrmerz@gmail.com');
    console.log(resp);
  } catch(e) {
    console.error(e);
  }
  console.log('done.');
})();