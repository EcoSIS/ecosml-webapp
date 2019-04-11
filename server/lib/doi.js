const request = require('request');
const config = require('./config');

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

  async mint(pkg) {
    let created = new Date().getFullYear();
    if( pkg.created ) created = new Date(pkg.created).getFullYear();

    let body = {
      data: {
        type: 'dois',
        attributes: {
          doi: config.datacite.shoulder
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
          'content-type' : 'Content-Type: application/vnd.api+json'
        },
        body : JSON.stringify(body)
      }
    );

    if( response.statusCode !== 200 ) {
      throw Error(`Invalid response from doi service ${config.datacite.url}. ${response.statusCode}: ${response.body}`);
    }
    let doi = JSON.parse(response.body).data.doi;

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
            title: pkg.title
          }],
          publisher: 'EcoSML',
          publicationYear: 2016,
          types: {
            resourceTypeGeneral: 'Software'
          },
          url: config.ecosis.host+'/doi:'+doi,
          schemaVersion: 'http://datacite.org/schema/kernel-4'
        }
      }
    }

    response = await this._request(
      config.datacite.url,
      {
        method : 'POST',
        headers : {
          'Authorization' : `Basic ${userpass}`,
          'content-type' : 'Content-Type: application/vnd.api+json'
        },
        body : JSON.stringify(body)
      }
    );
    if( response.statusCode !== 200 ) {
      throw Error(`Invalid response from doi service ${config.datacite.url}. ${response.statusCode}: ${response.body}`);
    }

    return doi;

  }

  _request(url, options) {
    return new Promise((resolve, reject) => {
      request(url, options, (error, response) => {
        if( error ) reject(error);
        else resolve(response);
      });
    });
  }

}

module.exports = new DOI();