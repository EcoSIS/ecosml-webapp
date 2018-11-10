const defaultPkg = require('./default');
const pythonPkg = require('./python');
const rPkg = require('./r');

module.exports = (pkg) => {
  if( pkg.packageType !== 'package' ) {
    return defaultPkg(pkg);
  }

  if( pkg.language === 'python' ) {
    return pythonPkg(pkg);
  } else if( pkg.language === 'r' ) {
    return rPkg(pkg);
  }

  return defaultPkg(pkg);
}