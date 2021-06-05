let def = {
  "id": "/UpdatePackage",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "fullName" : {
      "type" : "string",
      "format" : "packageFullName"
    },
    "repoOrg" : {
      "type" : "string"
    },
    "overview" : {
      "type": "string"
    },
    "source": {
      "type": "string",
      "enum" : ["registered", "managed"]
    },
    "host" : {
      "type" : "string",
      "enum" : ["github", "gitlab", "bitbucket"]
    },
    "organization": {
      "type": "string"
    },
    "description" : {
      "type" : "string"
    },
    "website" : {
      "type" : ["array","string"]
    },
    "keywords" : {
      "type" : "array",
      "items": {"type": "string"}
    },
    "theme" : {
      "type" : ["array","string"]
    },
    "family" : {
      "type" :  ["array","string"]
    },
    "specific" : {
      "type" :  ["array","string"]
    },
    "language" : {
      "type" : "string"
    },
    "packageType" : {
      "type" : "string",
      "enum" : ["standalone", "package"]
    },
    "organizationInfo" : {
      "type" : "object"
    }
  },
  "additionalProperties": false
}

module.exports = function(type) {
  let schema = Object.assign({}, def);
  if( type === 'managed' ) {
    schema.properties.overview.format = 'packageOverview';
  }
  return schema;
}