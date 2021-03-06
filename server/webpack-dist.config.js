let configs = require('@ucd-lib/cork-app-build').dist({
  // root directory, all paths below will be relative to root
  root : __dirname,
  // path to your entry .js file
  entry : 'public/elements/ecosml-app.js',
  // folder where bundle.js and ie-bundle.js will be written
  dist : 'dist/js',
  // path your client (most likely installed via yarn) node_modules folder.
  // Due to the flat:true flag of yarn, it's normally best to separate 
  // client code/libraries from all other modules (ex: build tools such as this).
  clientModules : 'public/node_modules'
});

module.exports = configs;