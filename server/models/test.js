global.quiteLogging = true;

const package = require('./PackageModel');
const doi = require('./DoiModel');
const doiLib = require('../lib/doi');

(async function() {
  try {
    let pkg = await package.get('another-test');
    // await doi.request(pkg, 'v0.0.1', 'jrmerz@ucdavis.edu');
    // doi.mint(pkg, 'v0.0.1', 'jrmerz@gmail.com')
    let doi = await doiLib.mint(pkg, 'v0.0.1');
    console.log(doi);
  } catch(e) {
    console.error(e);
  }
  console.log('done.');
})();