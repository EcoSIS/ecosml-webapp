const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PackageStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      // single state objects
      create : {},
      update : {},
      delete : {},
      createRelease : {},
      // hash by id
      addedFiles : {},
      byId : {}
    }

    this.events = {
      'PACKAGE_UPDATE' : 'package-update',
      'CREATE_PACKAGE_UPDATE' : 'create-package-update',
      'EDIT_PACKAGE_UPDATE'   : 'edit-package-update',
      'DELETE_PACKAGE_UPDATE' : 'delete-package-update',
      'CREATE_PACKAGE_RELEASE_UPDATE' : 'create-package-release-update',
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
   * Update operations
   */
  setUpdatePackageLoading(request, payload) {
    this._setUpdatePackageState({request, payload, state: this.STATE.LOADING});
  }

  setUpdatePackageSuccess(payload) {
    this._setUpdatePackageState({payload, state: this.STATE.LOADED});
  }

  setUpdatePackageError(error) {
    this._setUpdatePackageState({error, state: this.STATE.ERROR});
  }

  _setUpdatePackageState(state) {
    this.data.update = state;
    this.emit(this.events.EDIT_PACKAGE_UPDATE, this.data.update);
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

  _setPackageState(id, state) {
    this.data.byId[id] = state;
    this.emit(this.events.PACKAGE_UPDATE, this.data.byId[id]);
  }


  /**
   * Delete operations
   */
  setDeletingPackage(request, payload) {
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
   * Create release operations
   */
  setCreateReleaseLoading(request, payload) {
    this._setCreateReleaseState({request, payload, state: this.STATE.LOADING});
  }

  setCreateReleaseSuccess(payload) {
    this._setCreateReleaseState({payload, state: this.STATE.LOADED});
    this._setPackageState(payload.id, {payload, id: payload.id, state: this.STATE.LOADED});
  }

  setCreateReleaseError(error) {
    this._setCreateReleaseState({error, state: this.STATE.ERROR});
  }

  _setCreateReleaseState(state) {
    this.data.createRelease = state;
    this.emit(this.events.CREATE_PACKAGE_RELEASE_UPDATE, this.data.createRelease);
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