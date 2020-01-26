global.quiteLogging = true;

const package = require('./PackageModel');
const doi = require('./DoiModel');
const doiLib = require('../lib/doi');

(async function() {
  try {
    let pkg = await package.get('another-test');
    // await doi.request(pkg, 'v0.0.1', 'jrmerz@ucdavis.edu');
    // doi.mint(pkg, 'v0.0.1', 'jrmerz@gmail.com')
    let number = await doi.mint(pkg, 'v0.0.1', 'jrmerz@gmail.com');
    console.log(number);
  } catch(e) {
    console.error(e);
  }
  console.log('done.');
})();