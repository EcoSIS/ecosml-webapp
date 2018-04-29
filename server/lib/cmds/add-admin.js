let model = require('../../models/AuthModel');
let redis = require('../../lib/redis');
let user = process.argv[2];


(async function(){
  console.log('Setting admin: '+user);
  let resp = await model.setAdmin(user);
  console.log(resp);
  redis.client.quit();
})();