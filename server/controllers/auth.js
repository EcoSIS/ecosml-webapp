const router = require('express').Router();
const config = require('../lib/config');
const jwt = require('jsonwebtoken');
const {URL} = require('url'); 
const model = require('../models/AuthModel');
const github = require('../lib/github');
const Logger = require('../lib/logger');
const {authenticated, sendError} = require('./middleware/auth');

router.get('/user', authenticated, async (req, res) => {
  let user = {
    username: req.session.username,
    orgs : await model.getUserOrgs(req.session.username)
  }

  if( req.session.admin ) {
    user.admin = true;
  }

  res.json(user);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({success: true});
});

router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  login(username, password, req, res);
});

router.get('/login', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  login(username, password, req, res);
});

async function login(username, password, req, res) {
  let result = await model.login(username, password);

  if( !result.loggedIn ) {
    Logger.info(`Failed login attempt: ${username}`);
    return res.json({
      error: true,
      message:  result.message
    });
  }

  console.log(result);

  req.session.username = result.username;
  req.session.ckanJwt = result.token;
  req.session.admin = await model.isAdmin(username);

  let orgs = await model.getUserOrgs(result.username);

  Logger.info(`Successful login: ${username}`);
  res.json({
    success: true,
    username : result.username,
    ckanJwt : result.token,
    organizations : orgs
  });
}

router.get('/organizations', async (req, res) => {
  let username = req.session.username;
  let orgs = await model.getUserOrgs(username);
  res.json(orgs);
});

router.get('/github-authorize', authenticated, async (req, res) => {
  let {url, state} = github.getOauthAuthorizeUrl();
  
  // save state token for later check
  req.session.oauthStateToken = state;
  res.redirect(url);
});

router.get('/github-oauth-callback', authenticated, async (req, res) => {
  let code = req.query.code;
  let state = req.query.state;

  if( req.session.oauthStateToken !== state ) {
    return sendError(res, 400, 'invalid oauth state token');
  }

  try {
    let response = await github.getOauthAccessToken(code, state);
    let accessToken = response.access_token;

    response = await github.getAuthenticatedUser(accessToken);
    response = JSON.parse(response.body);

    await model.linkGithubUsername(
      req.session.username,
      response,
      accessToken
    );

    res.redirect('/account');
  } catch(e) {
    sendError(res, 400, e.message);
  }
});

router.get('/github-revoke', authenticated, async (req, res) => {
  try {
    await model.unlinkGithubUsername(req.session.username);
    res.redirect('/account');
  } catch(e) {
    sendError(res, 400, e.message);
  }
});

module.exports = router;