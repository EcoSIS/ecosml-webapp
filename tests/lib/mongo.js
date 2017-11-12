const assert = require('assert');
const mongo = require('../../server/lib/mongo');

let package = {
  name : 'Unit-Test-Package',
  description : 'This is a test, this is only a test'
};

describe('MongoDB Package Methods', function() {

  it(`should insert a package ${package.name}`, async () => {
    let response = await mongo.insertPackage(package);

    assert.equal(response.result.ok, 1);
    assert.equal(response.result.n, 1);
  });

  it(`should get a package ${package.name}`, async () => {
    let response = await mongo.getPackage(package.name);

    assert.equal(response.name, package.name);
  });

  it(`should delete a package ${package.name}`, async () => {
    let response = await mongo.removePackage(package.name);

    assert.equal(response.result.ok, 1);
  });

  after(function(){
    mongo.db.close();
  });

});