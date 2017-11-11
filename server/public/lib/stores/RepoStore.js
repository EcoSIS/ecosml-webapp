const {BaseStore} = require('@ucd-lib/cork-app-utils');

class RepoStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      // single state objects
      create : {},
      update : {},
      delete : {},
      // hash by id
      addedFiles : {},
      byId : {}
    }

    this.events = {
      'GET_REPO_UPDATE' : 'get-repo-update',
      'CREATE_REPO_UPDATE' : 'create-repo-update',
      'DELETE_REPO_UPDATE' : 'delete-repo-update',
      'ADD_FILE_UPDATE' : 'add-file-update'
    }
  }

  /**
   * Create operations
   */
  setCreateRepoLoading(request, payload) {
    this._setCreateRepoState({request, payload, state: this.STATE.LOADING});
  }

  setCreateRepoSuccess(payload) {
    this._setCreateRepoState({payload, state: this.STATE.LOADED});
  }

  setCreateRepoError(error) {
    this._setCreateRepoState({error, state: this.STATE.ERROR});
  }

  _setCreateRepoState(state) {
    this.data.create = state;
    this.emit(this.events.CREATE_REPO_UPDATE, this.data.create);
  }

  /**
   * Get operations
   */
  setGetRepoLoading(id, request) {
    this._setRepoState(id, {request, id, state: this.STATE.LOADING});
  }

  setGetRepoSuccess(id, payload) {
    this._setRepoState(id, {payload, id, state: this.STATE.LOADED});
  }

  setGetRepoError(id, error) {
    this._setRepoState(id, {error, id, state: this.STATE.ERROR});
  }

  _setDeleteRepoState(id, state) {
    this.data.byId[id] = state;
    this.emit(this.events.GET_REPO_UPDATE, this.data.byId[id]);
  }


  /**
   * Delete operations
   */
  setDeleteRepoLoading(request, payload) {
    this._setDeleteRepoState({request, payload, state: this.STATE.LOADING});
  }

  setDeleteRepoSuccess(payload) {
    this._setDeleteRepoState({payload, state: this.STATE.LOADED});
  }

  setDeleteRepoError(error) {
    this._setDeleteRepoState({error, state: this.STATE.ERROR});
  }

  _setDeleteRepoState(state) {
    this.data.delete = state;
    this.emit(this.events.DELETE_REPO_UPDATE, this.data.delete);
  }

  /**
   * Add File Operations
   */
  setFileSaving(request, fileId, payload) {
    this._setFileSaveState(fileId, {request, payload, fileId, state: this.STATE.SAVING});
  }

  setFileSaved(fileId, payload) {
    this._setFileSaveState(fileId, {payload, fileId, state: this.STATE.LOADED});
  }

  setFileSaveError(fileId, error) {
    this._setFileSaveState(fileId, {error, fileId, state: this.STATE.SAVE_ERROR});
  }

  _setFileSaveState(fileId, state) {
    this.data.addedFiles[fileId] = state;
    this.emit(this.events.ADD_FILE_UPDATE, this.data.addedFiles[fileId]);
  }
}

module.exports = new RepoStore();