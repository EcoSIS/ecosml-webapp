const router = require('express').Router();
const config = require('../lib/config');
const jwt = require('jsonwebtoken');
const {URL} = require('url'); 
const model = require('../models/AuthModel');
const Logger = require('../lib/logger');

router.get('/user', async (req, res) => {
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

module.exports = router;