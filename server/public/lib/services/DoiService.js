const {BaseService} = require('@ucd-lib/cork-app-utils');
const DoiStore = require('../stores/DoiStore');

class DoiService extends BaseService {

  constructor() {
    super();
    this.store = DoiStore;
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
      onLoaded : result => this.store.setGetDoiLoaded(JSON.parse(result.body), id),
      onError : e => this.store.setGetDoiError(e, id)
    })
  }

  search(type, text) {
    return this.request({
      url : this.baseUrl+'/search',
      qs : {type, text},
      onLoading : request => this.store.setSearchLoading(request, {type, text}),
      onLoaded : result => this.store.setSearchLoaded(JSON.parse(result.body), {type, text}),
      onError : e => this.store.setSearchError(e, {type, text})
    });
  }

}

module.exports = new DoiService();