const assert = require('assert');
const git = require('../../lib/git');
const layout = require('../../lib/package-layout');
const fs = require('fs-extra');
const path = require('path');

let pkg = {
  id : '12340987',
  name : 'unit-test-repo',
  owner : 'tester',
  overview : 'A unit test package',
  keywords : ['test', 'foo', 'bar']
};


describe('Package Layout', function() {

  before(async function() {
    // cleanup any existing data
    let p = git.getRepoPath(pkg.name);
    await fs.remove(p);
  });

  it(`should create a python package layout`, async () => {
    await layout.python.ensureLayout(pkg);

    let dir = layout.python.getPackageRootDir(pkg.name);
    assert.equal(fs.existsSync(path.join(dir, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.RESOURCES_DIR_NAME, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME)), true);
  });

  it(`should create a example python package layout`, async () => {
    await layout.python.ensureExampleLayout(pkg.name, 'unit-test-example');

    let exDir = path.join(layout.python.getExamplesDir(pkg.name), 'unit-test-example');

    assert.equal(fs.existsSync(path.join(exDir, 'test.py')), true);
    assert.equal(fs.existsSync(path.join(exDir, layout.python.EXAMPLE_DIRS.TRANSFORM, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(exDir, layout.python.EXAMPLE_DIRS.TRANSFORM, 'ecosml_transform_utils.py')), true);
  });

  it(`should add tmp files for testing`, async () => {
    await layout.python.ensureLayout(pkg);
    
    await fs.writeFile(path.join(layout.python.getRootDir(pkg.name), 'tmp'), '');
    await fs.writeFile(path.join(layout.python.getExamplesDir(pkg.name), 'tmp'), 'example')
    await fs.writeFile(path.join(layout.python.getResourcesDir(pkg.name), 'tmp'), 'resources')
    await fs.writeFile(path.join(layout.python.getMainDir(pkg.name), 'tmp'), 'main')
    await fs.writeFile(path.join(layout.python.getPapersDir(pkg.name), 'tmp'), 'papers')

    let dir = layout.python.getRootDir(pkg.name);
    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.getPackageDirName(pkg.name), layout.python.RESOURCES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.getPackageDirName(pkg.name), layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.PAPERS_DIR_NAME, 'tmp')), true);
  });

  it(`should convert python layout to basic layout`, async () => {
    await layout.python.undoLayout(pkg);

    let dir = git.getRepoPath(pkg.name);
    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.RESOURCES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);
  });

  it(`should convert basic layout to python layout`, async () => {
    await layout.python.ensureLayout(pkg);

    let dir = layout.python.getPackageRootDir(pkg.name);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.RESOURCES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);

    assert.equal(fs.existsSync(path.join(dir, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.RESOURCES_DIR_NAME, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, '__init__.py')), true);
  });

  it(`should convert python to basic then to r layout`, async () => {
    await layout.python.undoLayout(pkg);
    await layout.r.ensureLayout(pkg);

    let dir = layout.r.getPackageRootDir(pkg.name);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.RESOURCES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);
  });

  it(`should undo r layout setting back to basic`, async () => {
    await layout.r.undoLayout(pkg);

    let dir = git.getRepoPath(pkg.name);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.RESOURCES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);
  });

  after(async function() {
    // cleanup any existing data
    let p = git.getRepoPath(pkg.name);
    await fs.remove(p);
  });

});