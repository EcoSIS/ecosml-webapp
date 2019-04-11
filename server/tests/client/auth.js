const puppeteer = require('puppeteer');
const config = require('../config');
const assert = require('assert');

let testingAccount = config.testing.secrets.testingAccount;
let page, browser;

describe('Should login/out user', function() {

  before(async function() {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should login', async function() {
    this.timeout(1000 * 10);

    await page.goto(config.server.url+'/account'+config.testing.urlFlag);
    let user = {
      username : testingAccount.username,
      password : testingAccount.password
    }

    await page.evaluate(user => {
      let appLogin = window.INTEGRATION_TESTING['app-login'];
      appLogin.$.username.value = user.username;
      appLogin.$.password.value = user.password;
      appLogin.$.loginBtn.click();
    }, user);

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    
    let pathname = await page.evaluate(() => window.location.pathname);
    assert.equal(pathname, '/account');

    let username = await page.evaluate(() => APP_CONFIG.user);
    assert.equal(username, testingAccount.username);
  });

  it('should logout', async function() {
    
  });

  after(async function() {
    await browser.close();
  });

});