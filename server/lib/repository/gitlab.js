const fetch = require('node-fetch');
const config = require('../config')

class Gitlab {

  constructor() {

  }

  /**
   * @method exists
   * @description check is a respository exits.  This method uses
   * a HEAD request to the repo root page so it does not burn up a API request.
   * 
   * @param {String} name repository name to check
   * @param {String} org Optional.
   * 
   * @returns {Promise} resolves to {Boolean}
   */
  async exists(name, org) {
    let resp = await fetch(
      config.gitlab.host+'/'+name+'/'+org, 
      {method: 'head'}
    );
    return resp.ok;
  }

}

module.exports = new Gitlab();