const jwt = require('jsonwebtoken');
const config = require('../config');

let payload = {username: process.argv[2]}
if( process.argv.length > 3 && process.argv[3] === 'true' ) {
  payload.admin = true;
}

console.log(jwt.sign(payload, config.server.jwt.secret));