const request = require('request');
const config = require('../config');

const API_ROOT = 'https://api.github.com';
const ACCEPT_MIME_TYPE = 'application/vnd.github.v3+json'
const GITHUB_ACCESS = config.github.access;

/**
 * TODO: watch rate limiting. headers:
 * 
 * 'x-ratelimit-limit': '5000',
 * 'x-ratelimit-remaining': '4994',
 * 'x-ratelimit-reset': '1509229188',
 */

module.exports = (options) => {
  options.uri = `${API_ROOT}${options.uri}`;

  // set access clientId/clientSecret
  // if( !options.qs ) options.qs = {};
  // options.qs.client_id = GITHUB_ACCESS.clientId;
  // options.qs.client_secret = GITHUB_ACCESS.clientSecret;

  // set admin authentication
  options.auth = {
    user: GITHUB_ACCESS.username,
    pass: GITHUB_ACCESS.token,
  }

  // set the API version
  if( !options.headers ) options.headers = {}
  options.headers.Accept = ACCEPT_MIME_TYPE;
  options.headers['User-Agent'] = 'EcoSML Webapp';

  console.log(options);

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if( error ) reject(error);
      else resolve({response, body});
    });
  });
}