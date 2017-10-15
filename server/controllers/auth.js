const router = require('express').Router();
const config = require('../lib/config');
const jwt = require('jsonwebtoken');
const {URL} = require('url'); 

router.get('/login', (req, res) => {
  let hash = req.query.hash || '';
  let returnToUrl = `${config.server.url}/auth/jwtLogin?hash=${hash}`;

  let redirectUrl = new URL(config.server.auth.redirect);
  redirectUrl.searchParams.set('returnTo', returnToUrl);
  redirectUrl.searchParams.set('label', config.server.label);

  res.redirect(config.server.auth.redirect);
});

router.get('jwtLogin', (req, res) => {
  let jwt = req.query.jwt;
  let hash = req.query.hash || '#';
  let token;

  try {
    token = jwt.verify(token, config.server.jwt.secret);
    // var issuer = token.iss;
    // if( issuer !== config.jwt.issuer ) {
    //   console.log('Invalid JWT Token:', `Invalid issuer: ${issuer}/${config.jwt.issuer}`);
    //   return false;
    // }
  } catch(e) {
    console.log('Invalid JWT Token:', e.message);
    return res.redirect(`${config.server.url}/#login-failed`);
  }
  
  req.session.user = token.payload;

  res.send(`${config.server.url}/#${hash}`);
});

module.exports = router;