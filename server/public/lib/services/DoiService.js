const {BaseService} = require('@ucd-lib/cork-app-utils');
const DoiStore = require('../stores/DoiStore');

class DoiService extends BaseService {

  constructor() {
    super();
    this.store = DoiStore;
    this.searchId = 0;
    this.baseUrl = '/api/doi';
  }

  /**
   * @method get
   * 
   * @param {String} id package id
   */
  get(id) {
    return this.request({
      url : this.baseUrl+'/pending/'+id,
      onLoading : request => this.store.setGetDoiLoading(request, id),
      onLoad : result => this.store.setGetDoiLoaded(JSON.parse(result.body), id),
      onError : e => this.store.setGetDoiError(e, id)
    })
  }

  search(type, text, page) {
    let qs = {};
    if( type ) qs.type = type;
    if( text ) qs.text = text;
    if( page ) qs.offset = page*10;

    return this.request({
      url : this.baseUrl+'/search',
      qs : qs,
      onLoading : request => this.store.setSearchLoading(request, {type, text}),
      onLoad : result => this.store.setSearchLoaded(result.body, {type, text}),
      onError : e => this.store.setSearchError(e, {type, text})
    });
  }

}

module.exports = new DoiService();