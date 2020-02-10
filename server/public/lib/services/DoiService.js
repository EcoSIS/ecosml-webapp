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
      url : this.baseUrl+'/all/'+id,
      onLoading : request => this.store.setGetDoiLoading(request, id),
      onLoad : result => this.store.setGetDoiLoaded(result.body, id),
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

  requestDoi(packageId, tag) {
    return this.request({
      url : `${this.baseUrl}/request/${packageId}/${tag}`,
      fetchOptions : {
        method : 'POST'
      },
      onLoading : request => this.store.setDoiSaving(request, 'request', {id: packageId, tag}),
      onLoad : result => this.store.setDoiSaved(result.body),
      onError : e => this.store.setDoiSaveError(e, 'request', {id: packageId, tag})
    });
  }

  cancel(doi) {
    return this.request({
      url : `${this.baseUrl}/request/${doi.package.name}/${doi.tag}/cancel`,
      fetchOptions : {
        method : 'PUT'
      },
      onLoading : request => this.store.setDoiSaving(request, 'cancel', doi),
      onLoad : result => this.store.setDoiSaved(result.body),
      onError : e => this.store.setDoiSaveError(e, 'cancel', doi)
    });
  }

  update(doi, msg) {
    return this.request({
      url : `${this.baseUrl}/request/${doi.package.name}/${doi.tag}/update`,
      fetchOptions : {
        method : 'PUT',
        body : msg || ''
      },
      onLoading : request => this.store.setDoiSaving(request, 'update', doi),
      onLoad : result => this.store.setDoiSaved(result.body),
      onError : e => this.store.setDoiSaveError(e, 'update', doi)
    });
  }

  approve(doi) {
    return this.request({
      url : `${this.baseUrl}/request/${doi.package.name}/${doi.tag}/approve`,
      fetchOptions : {
        method : 'PUT'
      },
      onLoading : request => this.store.setDoiSaving(request, 'approve', doi),
      onLoad : result => this.store.setDoiSaved(result.body),
      onError : e => this.store.setDoiSaveError(e, 'approve', doi)
    });
  }

}

module.exports = new DoiService();