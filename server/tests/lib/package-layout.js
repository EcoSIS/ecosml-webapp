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

  it(`should create a basic package layout`, async () => {
    await layout.python.ensureLayout(pkg);

    let dir = layout.python.getPackageRootDir(pkg.name);
    assert.equal(fs.existsSync(path.join(dir, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.COEFFIENTS_DIR_NAME, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME)), true);
  });

  it(`should add tmp files for testing`, async () => {
    await layout.python.ensureLayout(pkg);

    let dir = layout.python.getPackageRootDir(pkg.name);
    
    await fs.writeFile(path.join(dir, 'tmp'), '');
    await fs.writeFile(path.join(dir, layout.python.EXAMPLES_DIR_NAME, 'tmp'), 'example')
    await fs.writeFile(path.join(dir, layout.python.COEFFIENTS_DIR_NAME, 'tmp'), 'coeffients')
    await fs.writeFile(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp'), 'main')
    await fs.writeFile(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp'), 'papers')

    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.COEFFIENTS_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);
  });

  it(`should convert python layout to basic layout`, async () => {
    await layout.python.undoLayout(pkg);

    let dir = git.getRepoPath(pkg.name);
    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.COEFFIENTS_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);
  });

  it(`should convert basic layout to python layout`, async () => {
    await layout.python.ensureLayout(pkg);

    let dir = layout.python.getPackageRootDir(pkg.name);
    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.COEFFIENTS_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);

    assert.equal(fs.existsSync(path.join(dir, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.COEFFIENTS_DIR_NAME, '__init__.py')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, '__init__.py')), true);
  });

  it(`should convert python to basic then to r layout`, async () => {
    await layout.python.undoLayout(pkg);
    await layout.r.ensureLayout(pkg);

    let dir = layout.r.getPackageRootDir(pkg.name);
    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.COEFFIENTS_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);
  });

  it(`should undo r layout setting back to basic`, async () => {
    await layout.r.undoLayout(pkg);

    let dir = git.getRepoPath(pkg.name);
    assert.equal(fs.existsSync(path.join(dir, layout.python.EXAMPLES_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.COEFFIENTS_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(dir, layout.python.MAIN_DIR_NAME, 'tmp')), true);
    assert.equal(fs.existsSync(path.join(git.getRepoPath(pkg.name), layout.python.PAPERS_DIR_NAME, 'tmp')), true);
  });

  after(async function() {
    // cleanup any existing data
    let p = git.getRepoPath(pkg.name);
    await fs.remove(p);
  });

});