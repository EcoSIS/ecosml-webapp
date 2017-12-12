const {BaseModel} = require('@ucd-lib/cork-app-utils');
const SearchService = require('../services/SearchService');
const SearchStore = require('../stores/SearchStore');

// NodeJS compatability
let decode;
if( typeof decodeURIComponent !== 'undefined' ) {
  decode = decodeURIComponent
} else {
  decode = text => text;
}
let encode;
if( typeof encodeURIComponent !== 'undefined' ) {
  encode = encodeURIComponent
} else {
  encode = text => text;
}


class SearchModel extends BaseModel {

  constructor() {
    super();

    this.store = SearchStore;
    this.service = SearchService;
      
    this.register('SearchModel');
  }

  getEmptyQuery() {
    return {
      text : '',
      filters : [],
      sort : null,
      limit : 0,
      offset : 0
    }
  }

  /**
   * @method toUrl
   * @description convert a query object to a url slug
   * 
   * @returns {String} url slug for query
   */
  toUrl(query) {
    return [
      encode(query.text || ''),
      encode(query.filters ? JSON.stringify(query.filters) : ''),
      encode(query.sort || ''),
      query.offset || '',
      query.limit || '' 
    ].join('/')
  }

  /**
   * @method fromUrl
   * @description convert url slug to query
   * 
   * @param {String} url  
   */
  fromUrl(url) {
    if( typeof url === 'string' ) {
      url = url.split('/');
    }

    let query = this.getEmptyQuery();

    let i = 0;
    while( urlParts.length > 0 ) {
      let part = decode(urlParts.splice(0, 1)[0]);
      
      switch(i) {
        case 0:
          query.text = part;
          break;
        case 1:
          query.filters = part ? JSON.parse(part) : [];
          break;
        case 2:
          query.sort = part || null;
          break;
        case 3:
          query.limit = part ? parseInt(part) : 10;
          break;
        case 4:
          query.offset = part ? parseInt(part) : 0;
          break;
      }

      i++;
    }
    
    return query;
  }

  getQuery() {
    if( !this.store.getSearchQuery() ) {
      this.store.setSearchQuery(this.getEmptyQuery());
    }
    return  this.store.getSearchQuery();
  }

  setOffset(offset) {
    let query = this.getQuery();
    query.offset = offset;
    return query;
  }

  setLimit(limit) {
    let query = this.getQuery();
    query.limit = limit;
    return query;
  }

  setText(text) {
    let query = this.getQuery();
    query.text = text;
    return query;
  }

  appendFilter(key, value) {
    let query = this.getQuery();
    if( this._hasFilter(query.filters, key, value) ) return;
    query.filters.push({[key] : value});
    return query;
  }

  removeFilter(key, value) {
    let query = this.getQuery();
    let filters = query.filters;

    for( var i = filters.length; i >= 0; i-- ) {
      if( filters[i][key] ) {
        if( value ) {
          if( filters[i][key] === value ) {
            filters.splice(i, 1);
            return;
          }
        } else {
          filters.splice(i, 1);
        }
      }
    }

    return query;
  }

  _hasFilter(filters, key, value) {
    for( var i = 0; i < filters.length; i++ ) {
      if( filters[i][key] === value ) return true;
    }
    return false;
  }

  search(query) {
    return this.service.search(query || this.getQuery());
  }
}

module.exports = new SearchModel();