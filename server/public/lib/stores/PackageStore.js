const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PackageStore extends BaseStore {

  constructor() {
    super();

    this.ignoreFiles = [];

    this.data = {
      selectedPackageId : '',
      // single state objects
      create : {},
      update : {},
      delete : {},
      createRelease : {},

      files : {},
      fileUploadStatus : {},

      byId : {}
    }

    this.events = {
      'SELECTED_PACKAGE_UPDATE' : 'selected-package-update',
      'PACKAGE_UPDATE' : 'package-update',
      'CREATE_PACKAGE_UPDATE' : 'create-package-update',
      'EDIT_PACKAGE_UPDATE'   : 'edit-package-update',
      'DELETE_PACKAGE_UPDATE' : 'delete-package-update',
      'CREATE_PACKAGE_RELEASE_UPDATE' : 'create-package-release-update',
      'FILE_UPDATE' : 'file-update',
      'UPLOAD_FILE_STATUS_UPDATE' : 'upload-file-status-update'
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
    this.setSelectedPackageId(payload.id);
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
   * Upload File Operations
   */
  getFiles(packageId) {
    return this.data.files[packageId];
  }

  onFileUploadProgress(uploadId, e) {
    this.data.fileUploadStatus[uploadId] = {id: uploadId, status: e};
    this.emit(this.events.UPLOAD_FILE_STATUS_UPDATE, this.data.fileUploadStatus[uploadId]);
  }

  onFileUploadStart(packageId, file) {
    file.id = this._createFileId(file);

    let state = {
      id : file.id,
      packageId : packageId,
      payload : file, 
      state : 'uploading'
    }
    this._setFileState(packageId, state);
  }

  onFilesLoaded(packageId, files = []) {
    files = files
      .filter(file => this.ignoreFiles.indexOf(file.filename) === -1)
      .forEach(file => {
        this.onFileLoaded(packageId, file);
      });
  }

  onFileLoaded(packageId, file) {
    file.id = this._createFileId(file);
    let state = {
      id : file.id,
      packageId : packageId,
      payload : file, 
      state : this.STATE.LOADED
    }
    this._setFileState(packageId, state);
  }

  onFileError(packageId, file, error) {
    file.id = this._createFileId(file);
    let state = {
      id : file.id,
      packageId : packageId,
      error : error,
      payload : file, 
      state : this.STATE.ERROR
    }
    this._setFileState(packageId, state);
  }

  _setFileState(packageId, state) {
    if( !this.data.files[packageId] ) {
      this.data.files[packageId] = {};
    }
    this.data.files[packageId][state.id] = state;
    this.emit(this.events.FILE_UPDATE, this.data.files[packageId][state.id]);
  }

  /**
   * Selected package operations
   */
  setSelectedPackageId(packageId) {
    this.data.selectedPackageId = {id: packageId};
    this.emit(this.events.SELECTED_PACKAGE_UPDATE, this.data.selectedPackageId);
  }

  getSelectedPackageId() {
    return this.data.selectedPackageId;
  }

  _createFileId(file) {
    let sep = '';
    if( !file.dir.match(/\/$/) ) sep = '/';
    return file.dir + sep + file.filename;
  }

}

module.exports = new PackageStore();