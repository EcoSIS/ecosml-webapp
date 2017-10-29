let github = require('./index');

github
  .createRepository({
    name : 'Test API Repo 2',
    description : 'This is a test, this is only a test',
    license_template : 'mit',
    auto_init : true
  })
  .then((result) => {
    console.log(result.body);
  })
  .catch(e => console.error(e));