const assert = require('assert');
const path = require('path');
const fs = require('fs');
const packageModel = require('../../server/models/PackageModel');
const model = require('../../server/models/SearchModel');
const mongo = require('../../server/lib/mongo');
const git = require('../../server/lib/git');

let pkg = {
  name : 'Unit-Test-Package',
  description : 'This is a test, this is only a test',
  owner : 'bob',
  keywords : ['foo', 'bar'],
  organization : 'myorg'
};

function wait(time = 5000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
}

describe('Package Search Methods', function() {

  before(async function() {
    this.timeout(20000);
    await packageModel.create(pkg);
    await packageModel.update(pkg);
  });

  it(`should find a package ${pkg.name}`, async () => {
    let results = await model.search({text: 'test'});
    assert.equal(typeof results, 'object');
    assert.equal(results.total >= 1, true);
    assert.equal(results.offset, 0);
    assert.equal(results.limit, 10);
    assert.deepEqual(results.sort, {name: 1});
    assert.equal(typeof results.filters, 'object');
    assert.equal(Array.isArray(results.results), true);
  });

  it(`should let you reindex package from Github`, async () => {
    // we need to give Github time to propogate metadata file to raw request
    await wait();

    // remove package
    await mongo.removePackage(pkg.name);

    // make sure it has been removed
    let tmp = await mongo.getPackage(pkg.name);
    assert.equal(tmp, null);

    // now lets reindex
    await model.reindexRepository(pkg.name);

    // make sure it worked
    tmp = await mongo.getPackage(pkg.name);
    assert.equal(tmp.name, pkg.name);
    assert.deepEqual(tmp.keywords, pkg.keywords);

    let results = await model.search({text: 'test'});
    assert.equal(results.total >= 1, true);
  }).timeout(20000);

  after(async function() {
    this.timeout(10000);
    await packageModel.delete(pkg.name);
    mongo.db.close();
  });

});