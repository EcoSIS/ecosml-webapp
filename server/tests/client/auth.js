const puppeteer = require('puppeteer');
const config = require('./config');


describe('Should login/out user', function() {

  before(async function() {
    let browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should login', async () => {
    await page.goto(config.server.url+'/account'+config.testing.urlFlag);
    let user = {
      username : 'foo',
      password : 'bar'
    }

    await page.evaluate(user => {
      let appLogin = window.INTEGRATION_TESTING['app-login'];
      appLogin.$.username.value = user.username;
      appLogin.$.password.value = user.password;
    }, user);

    await page.screenshot({path: 'example.png'});
  });

});