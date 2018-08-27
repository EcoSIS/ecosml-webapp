const defaultPkg = require('./default');
const pythonPkg = require('./python');

module.exports = (pkg) => {
  if( pkg.language === 'python' ) {
    return pythonPkg(pkg);
  }

  return defaultPkg(pkg);
}