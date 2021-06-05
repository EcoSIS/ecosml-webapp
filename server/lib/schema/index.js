const Validator = require('jsonschema').Validator;

Validator.prototype.customFormats.packageName = function(input) {
  if( input.length < 4 ) throw new Error('Package name must be greater than 4 characters');
  return true;
};
Validator.prototype.customFormats.packageFullName = function(input) {
  if( !input.match(/^.*\/.*\/.*$/) ) throw new Error('Package name must be greater than 4 characters');
  return true;
};
Validator.prototype.customFormats.packageOverview = function(input) {
  if( input.length < 4 ) throw new Error('Please provide a longer package overview');
  return true;
};

const v = new Validator();

const schemas = {
  create : require('./create.json'),
  update : require('./update.js')
}

function validate(schema, instance, type) {
  schemaImpl = schemas[schema];
  console.log(type);
  if( typeof schemaImpl === 'function' ) {
    schemaImpl = schemaImpl(type);
  }

  if( !schemaImpl ) throw new Error('Unknown schema: '+schema);
  v.validate(instance, schemaImpl, {throwError: true})
}

module.exports = {
  validate
}