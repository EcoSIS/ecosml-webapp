const {BaseService} = require('@ucd-lib/cork-app-utils');
const RepoStore = require('../stores/RepoStore');
const uuid = require('uuid');

class RepoService extends BaseService {

  constructor() {
    super();
    this.store = RepoStore;
  }

  /**
   * @method create
   * @description create a new repositoru
   * 
   * @param {String} repoName name of respository 
   */
  async create(name, description) {
    let payload = {name, description};

    return this.request({
      url : '/repo',
      fetchOptions : {
        method : 'POST',
        body  : payload
      },
      json : true,
      onLoading : request => this.store.setCreateRepoLoading(request, payload),
      onLoad : result => this.store.setCreateRepoSuccess(result.body),
      onError : error => this.store.setCreateRepoError(error)
    })
  }

  /**
   * @method get
   * @description get a repo by id.  the /repo/:id request also 
   * accepts /repo/:name
   * 
   * @param {String} id repo ecosml id 
   */
  async get(id) {
    return this.request({
      url : `/repo/${id}`,
      onLoading : request => this.store.setGetRepoLoading(id, request),
      onLoad : result => this.store.setGetRepoSuccess(id, result.body),
      onError : error => this.store.setGetRepoError(id, error)
    });
  }

  async delete(name) {
    return this.request({
      url : `/repo/${name}`,
      fetchOptions : {
        method : 'DELETE'
      },
      onLoading : request => this.store.setDeletingRepo(request, payload),
      onLoad : result => this.store.setDeleteRepoSuccess(result.body),
      onError : error => this.store.setDeleteRepoError(error)
    });
  }

  async addFile(formData) {
    let id = uuid.v4();
    let filename = formData.get('filename'); 
    let payload = {filename};

    return this.request({
      url : '/repo/addFile',
      fetchOptions : {
        method : 'POST',
        body : formData
      },
      onLoading : request => this.store.setFileSaving(request, fileId, payload),
      onLoad : result => this.store.setFileSaved(fileId, payload),
      onError : error => this.store.setFileSaveError(fileId, error)
    });
  }

}

module.exports = new RepoService();