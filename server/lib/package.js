const config = require('./config');
const REGEX = {
  GUID : /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/,
  DOI : new RegExp(`((ark|doi):)?${config.doi.shoulder}/[a-zA-Z0-9\.]+`)
}

class PackageUtils {
  
  parseId(nameOrId='') {
    if( nameOrId.match(REGEX.GUID) ) {
      return {id : nameOrId}
    }
    if( nameOrId.match(REGEX.DOI) ) {
      return {doi: nameOrId.match(REGEX.DOI)[0].replace(/^(ark|doi):/, '')}
    }

    let hostname, pathname;
    if( nameOrId.match(/^http/) ) {
      let url = new URL(nameOrId);
      hostname = url.hostname;
      pathname = url.pathname.split('/');
    } else if( nameOrId.match(/.*\/.*\/.*/) ) {
      let parts = nameOrId.split('/');
      hostname = parts.shift();
      pathname = parts;
    } else {
      throw new Error('Invalid package name or id: '+nameOrId);
    }

    if( pathname.length !== 2 ) {
      throw new Error('Invalid package name or id: '+nameOrId);
    }

    return {
      host : hostname,
      name : pathname.join('/')
    }
  }
}

module.exports = new PackageUtils();