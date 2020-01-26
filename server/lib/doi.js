const request = require('request');
const config = require('./config');
const shortid = require('shortid');

class DOI {

  async _mintEZ(pkg) {
    let created = new Date().getFullYear();
    if( pkg.created ) created = new Date(pkg.created).getFullYear();

    let body = `_profile: datacite
_target: ${config.ecosis.host}/#result/${pkg.id}
datacite.creator: ${pkg.owner}
datacite.title: ${pkg.title}
datacite.resourcetype: Software
datacite.publisher: EcoSML
datacite.publicationyear: ${created}`;

    // set body, authentication header and make request
    let userpass = Buffer.from(`${config.datacite.username}:${config.datacite.password}`).toString('base64');
    let {response} = await this._request(
      config.datacite.url,
      {
        method : 'POST',
        headers : {
          'Authorization' : `Basic ${userpass}`,
          'content-type' : 'text/plain;charset=UTF-8'
        },
        body
      }
    )

    if( response.statusCode !== 200 ) {
      throw Error(`Invalid response from doi service ${config.datacite.url}. ${response.statusCode}: ${response.body}`);
    }
    let [status, doi] = response.body.split('\n')[0].split(': ')

    return {
        "status" : status,
        "doi" : doi
    }
  }

  /**
   * @method mint
   * @description mint a DataCite doi given a EcoSML package object
   * THis uses the DataCite REST API.  Not the MD or EZ APIs.
   * https://support.datacite.org/docs/api-create-dois
   * https://support.datacite.org/reference/dois-2#post_dois
   * 
   * @param {Object} pkg EcoSML package object
   * 
   * @returns {Promise}
   */
  async mint(pkg, tag, attempt=0) {
    let created = new Date().getFullYear();
    if( pkg.created ) created = new Date(pkg.created).getFullYear();

    let doi = config.doi.shoulder+'/'+shortid();

    let body = {
      data: {
        type: 'dois',
        attributes: {
          doi: doi
        }
      }
    }

    let userpass = Buffer.from(`${config.datacite.username}:${config.datacite.password}`).toString('base64');
    let response = await this._request(
      config.datacite.url,
      {
        method : 'POST',
        headers : {
          'Authorization' : `Basic ${userpass}`,
          'content-type' : 'application/vnd.api+json'
        },
        body : JSON.stringify(body)
      }
    );

    if( response.statusCode !== 201 ) {
      try {
        let body = JSON.parse(response.body);
        if( response.statusCode === 422 && 
            body.errors[0].title === 'This doi has already been taken' && 
            attempt === 0) {
          return await this.mint(pkg, tag, 1);
        }
      } catch(e) {}

      throw Error(`Invalid response from doi draft service ${config.datacite.url}. ${response.statusCode}: ${response.body}`);
    }

    body = {
      data: {
        id: doi,
        type: "dois",
        attributes: {
          event: 'publish',
          doi: doi,
          creators: [{
            name: pkg.owner
          }],
          titles: [{
            title: pkg.name
          }],
          descriptions : [{
            description : pkg.overview
          }],
          identifiers : [{
            identifierType : 'ecosml-uid',
            identifier : pkg.id
          },
          {
            identifierType : 'version',
            identifier : tag
          }],
          version : tag,
          publisher: 'EcoSML',
          publicationYear: created,
          types: {
            resourceTypeGeneral: 'Software'
          },
          url: config.server.url+'/doi:'+doi,
          schemaVersion: 'http://datacite.org/schema/kernel-4'
        }
      }
    }

    response = await this._request(
      config.datacite.url+'/'+doi,
      {
        method : 'PUT',
        headers : {
          'Authorization' : `Basic ${userpass}`,
          'content-type' : 'application/vnd.api+json'
        },
        body : JSON.stringify(body)
      }
    );
    if( response.statusCode !== 200 ) {
      throw Error(`Invalid response from doi publish service ${config.datacite.url}. ${response.statusCode}: ${response.body}`);
    }

    return doi;

  }

  _request(url, options) {
    return new Promise((resolve, reject) => {
      request(url, options, (error, response) => {
        if( error ) return reject(error);
        else resolve(response);
      });
    });
  }

}

module.exports = new DOI();