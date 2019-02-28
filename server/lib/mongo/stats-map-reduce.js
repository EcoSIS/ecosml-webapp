const config = require('../config');

module.exports = (collection, query) => {
  let filterNames = [];
  let filterParts = [];
  let filters = config.mongodb.filters.slice(0);

  for( var i = 0; i < filters.length; i++ ) {
    var name = filters[i].replace(/.*\./, '');
    filterNames.push(name);
    filterParts.push(filters[i].split('.'));
  }


  let mrConfig = {
    out : config.mongodb.collections.stats,
    query : { 
      '$and': [ 
        {releaseCount: {$gt: 0}},
        {private: false} 
      ] 
    },
    finalize
  }

  return collection.mapReduce(map, reduce, mrConfig);
}

function map() {
  let value = {
    organizations : {
      [this.organization] : 1
    },
    keywords : {},
    themes : {}
  }

  if( this.theme ) {
    if( !Array.isArray(this.theme) ) {
      this.theme = [this.theme];
    }
    for( let theme of this.theme ) {
      value.themes[theme] = 1;
    }
  }

  if( this.keywords ) {
    if( !Array.isArray(this.keywords) ) {
      this.keywords = [this.keywords];
    }
    for( let keyword of this.keywords ) {
      value.keywords[keyword] = 1;
    }
  }

  emit(null, value);
}

function reduce(id, values) {
  var result = {
    organizations : {},
    keywords : {},
    themes : {}
  };

  function merge(obj1, obj2) {
    for( let key in obj2 ) {
      if( !obj1[key] ) obj1[key] = 0;
      obj1[key] += obj2[key];
    }
  }

  values.forEach(value => {
    merge(result.organizations, value.organizations);
    merge(result.keywords, value.keywords);
    merge(result.themes, value.themes);
  });

  return result;
}

function finalize(key, result) {
  function toArray(obj) {
    return Object
      .keys(obj)
      .map(key => ({key, count: obj[key]}));
  }

  for( let key in result ) {
    result[key] = toArray(result[key]);
  }

  return result;
};