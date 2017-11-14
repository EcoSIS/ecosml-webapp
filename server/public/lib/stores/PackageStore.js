const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PackageStore extends BaseStore {

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
      'GET_PACKAGE_UPDATE' : 'get-package-update',
      'CREATE_PACKAGE_UPDATE' : 'create-package-update',
      'DELETE_PACKAGE_UPDATE' : 'delete-package-update',
      'ADD_FILE_UPDATE' : 'add-file-update'
    }
  }

  /**
   * Create operations
   */
  setCreatePackageLoading(request, payload) {
    this._setCreatePackageState({request, payload, state: this.STATE.LOADING});
  }

  setCreatePackageSuccess(payload) {
    this._setCreatePackageState({payload, state: this.STATE.LOADED});
  }

  setCreatePackageError(error) {
    this._setCreatePackageState({error, state: this.STATE.ERROR});
  }

  _setCreatePackageState(state) {
    this.data.create = state;
    this.emit(this.events.CREATE_PACKAGE_UPDATE, this.data.create);
  }

  /**
   * Get operations
   */
  setGetPackageLoading(id, request) {
    this._setPackageState(id, {request, id, state: this.STATE.LOADING});
  }

  setGetPackageSuccess(id, payload) {
    this._setPackageState(id, {payload, id, state: this.STATE.LOADED});
  }

  setGetPackageError(id, error) {
    this._setPackageState(id, {error, id, state: this.STATE.ERROR});
  }

  _setDeletePackageState(id, state) {
    this.data.byId[id] = state;
    this.emit(this.events.GET_PACKAGE_UPDATE, this.data.byId[id]);
  }


  /**
   * Delete operations
   */
  setDeletePackageLoading(request, payload) {
    this._setDeletePackageState({request, payload, state: this.STATE.LOADING});
  }

  setDeletePackageSuccess(payload) {
    this._setDeletePackageState({payload, state: this.STATE.LOADED});
  }

  setDeletePackageError(error) {
    this._setDeletePackageState({error, state: this.STATE.ERROR});
  }

  _setDeletePackageState(state) {
    this.data.delete = state;
    this.emit(this.events.DELETE_PACKAGE_UPDATE, this.data.delete);
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

module.exports = new PackageStore();