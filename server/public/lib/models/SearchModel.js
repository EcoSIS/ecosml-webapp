
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

    this.EventBus.on('app-state-update', e => {
      if( e.page === 'search' ) {
        this.search(this.fromUrl(window.location.pathname));
      }
    });
      
    this.register('SearchModel');
  }

  getEmptyQuery() {
    return {
      text : '',
      filters : [],
      sort : null,
      limit : 10,
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
    if( !query ) query = this.getQuery();

    return '/search/'+[
      encode(query.text || ''),
      encode(query.filters ? JSON.stringify(query.filters) : ''),
      encode(query.sort || ''),
      query.limit || '',
      query.offset || '', 
    ].join('/')
  }

  /**
   * @method fromUrl
   * @description convert url slug to query
   * 
   * @param {String} url  
   * 
   * @return {Object}
   */
  fromUrl(url) {
    if( typeof url === 'string' ) {
      url = url.replace(/^\//, '').split('/');
    }

    let urlParts = url.slice(0);
    if( urlParts.length && urlParts[0] === 'search' ) {
      urlParts.shift();
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
    let q = this.store.getSearchQuery();
    if( !q ) return this.getEmptyQuery();
    return q;
  }

  setOffset(offset, query) {
    query.offset = offset;
    return query;
  }

  setLimit(limit, query) {
    query.limit = limit;
    return query;
  }

  setText(text, query) {
    query.text = text;
    return query;
  }

  appendFilter(key, value, query) {
    if( this._hasFilter(query.filters, key, value) ) return;
    query.filters.push({[key] : value});
    return query;
  }

  removeFilter(key, value, query) {
    let filters = query.filters;

    for( var i = filters.length-1; i >= 0; i-- ) {
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
    return this.service.search(query);
  }

  getOwnerPackages(owner) {
    let query = this.getEmptyQuery();
    query.limit = 1000;
    return this.service.getOwnerPackages(query);
  }
}

module.exports = new SearchModel();