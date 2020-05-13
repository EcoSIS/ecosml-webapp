const config = require('./config');
const REGEX = {
  GUID : /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/,
  DOI : new RegExp(`((ark|doi):)?${config.doi.shoulder}/[a-zA-Z0-9\.]+`)
}

class PackageUtils {
  
  parseId(nameOrId='') {
    if( typeof nameOrId === 'object' ) {
      if( nameOrId.id ) return {id: nameOrId.id}
      if( nameOrId.name && nameOrId.host ) return {host: nameOrId.host, name: nameOrId.name}
      if( nameOrId.fullName ) return this._parseHostNameFromFullname(nameOrId.fullName);
      throw new Error('Invalid package name or id object provided');
    }

    if( nameOrId.match(REGEX.GUID) ) {
      return {id : nameOrId}
    }
    if( nameOrId.match(REGEX.DOI) ) {
      return {doi: nameOrId.match(REGEX.DOI)[0].replace(/^(ark|doi):/, '')}
    }

    return this._parseHostNameFromFullname(nameOrId);
  }

  _parseHostNameFromFullname(fullname) {
    let hostname, pathname;
    if( fullname.match(/^http/) ) {
      let url = new URL(fullname);
      hostname = url.hostname;
      pathname = url.pathname.split('/');
    } else if( fullname.match(/.*\/.*\/.*/) ) {
      let parts = fullname.split('/');
      hostname = parts.shift();
      pathname = parts;
    } else {
      throw new Error('Invalid package name or id: '+fullname);
    }

    if( pathname.length !== 2 ) {
      throw new Error('Invalid package name or id: '+fullname);
    }

    return {
      host : hostname,
      name : pathname.join('/')
    }
  }
}

module.exports = new PackageUtils();