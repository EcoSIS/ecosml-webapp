let model = require('./RepoModel');

// model.create({
//   name : 'Model-Test-5',
//   description : 'test using the model',
//   owner : 'jrmerz',
//   organization : 'CSTARS'
// })
// .then(() => console.log('Repo Created!'))
// .catch(e => console.error(e));

model.delete('Model-Test-2');