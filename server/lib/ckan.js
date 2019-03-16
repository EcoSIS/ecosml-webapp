const request = require('request');
const Logger = require('./logger');
const config = require('./config');
const jwt = require('jsonwebtoken');

const HOST = config.ecosis.host;

class CkanApi {

  constructor() {
    this.API_ROOT = HOST+'/api/3/action/';
  }

  /**
   * @method listOrganizations
   * @description http://docs.ckan.org/en/latest/api/#ckan.logic.action.get.organization_list
   * 
   * @returns {Promise} resolves to Array
   */
  async listOrganizations() {
    let {body} = await this._request({uri: this.API_ROOT+'organization_list'});
    return JSON.parse(body).result;
  }

  /**
   * @method getOrganization
   * @description http://docs.ckan.org/en/latest/api/#ckan.logic.action.get.organization_show
   * 
   * @returns {Promise} resolves to Object
   */
  async getOrganization(orgName) {
    let {body} = await this._request({
      uri: this.API_ROOT+'organization_show',
      qs : {id: orgName}
    });
    return JSON.parse(body).result;
  }

  /**
   * @method getOrganizationUsers
   * @description Get array of users w/ roles for organization.  Array will be of
   * format {username, role}.
   * 
   * @param {String} orgName name or id of organization
   * 
   * @returns {Promise} resolves to Array
   */
  async getOrganizationUsers(orgName) {
    let org = await this.getOrganization(orgName);
    return org.users.map(user => { return {username: user.name, role: user.capacity} });
  }

  /**
   * @method login
   * @description login via EcoSIS account using username/password
   * 
   * @param {String} username EcoSIS username
   * @param {String} password EcoSIS password 
   */
  async login(username, password) {
    let token = jwt.sign(
      {username, password}, 
      config.server.jwt.secret, 
      { expiresIn: 60 * 60 }
    );

    let {body} = await this._request({
      method : 'POST',
      uri : HOST+'/ecosis/user/remoteLogin',
      form: {token}
    });

    return JSON.parse(body);
  }

  /**
   * @method setGithubInfo
   * @description set a github username for given ecosis
   * user
   * 
   * @param {String} ecosisUsername
   * @param {String} githubUsername
   * @param {Object} githubData
   * @param {String} githubAccessToken
   * 
   * @returns {Promise}
   */
  async setGithubInfo(ecosisUsername, githubUsername, githubData, githubAccessToken) {
    let token = jwt.sign(
      {username: ecosisUsername}, 
      config.server.jwt.secret, 
      { expiresIn: 60 * 60 }
    );
    
    let {body} = await this._request({
      method : 'POST',
      uri : HOST+'/ecosis/user/githubInfo',
      headers : {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        username: githubUsername,
        data : JSON.stringify(githubData),
        accessToken : githubAccessToken
      })
    });

    return JSON.parse(body);
  }

  /**
   * @method getAllGithubInfo
   * @description admin call to grab all EcoSIS stored user github data and 
   * stash locally in redis
   * 
   * @returns {Promise} resolves to Array
   */
  async getAllGithubInfo() {
    let token = jwt.sign(
      {username: 'ecosml-admin'}, 
      config.server.jwt.secret, 
      { expiresIn: 60 * 60 }
    );

    let {body} = await this._request({
      method : 'GET',
      uri : HOST+'/ecosis/admin/github/sync',
      headers : {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return JSON.parse(body);
  }

  _request(options) {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if( error ) {
          Logger.error(`CKAN API request error: ${options.method || 'GET'} ${options.uri}`, error);
          return reject(error);
        }
        Logger.info(`CKAN API request: ${options.method || 'GET'} ${options.uri}`);
        resolve({response, body});
      });
    });
  }

}

module.exports = new CkanApi();