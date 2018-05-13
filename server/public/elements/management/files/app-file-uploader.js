import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-file-uploader.html"

import "@polymer/paper-progress/paper-progress"
import PackageInterface from "../../interfaces/PackageInterface"

export default class AppFileUploader extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : () => {},
        observer : '_onDataUpdate'
      },
      
      packageId : {
        type : String,
        value : ''
      },
      
      uploading : {
        type : Boolean,
        value : false
      },

      committing : {
        type : Boolean,
        value : false
      },

      // should be 0 - 100
      uploadPercent : {
        type : Number,
        value : 0
      },

      uploadText : {
        type : String,
        value : '',
      },

      uploadSession : {
        type : Object,
        value : null
      },

      error : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  _onUploadFileStatusUpdate(e) {
    if( !this.uploadSession ) return;
    if( e.id !== this.uploadSession.uploadId ) return;
    if( this.error ) return;

    this.uploadPercent = e.status.progress;
    this.uploadText = 'Upload '+e.status.progress+'% complete @'+e.status.speed+e.status.speedUnits;

    if( this.uploadPercent === '100' ) {
      this.committing = true;
      this.uploadText = 'Upload Complete.  Committing file...';
    }
  }

  _onSelectedPackageUpdate(payload) {
    this.currentPackageId = payload.id;
  }

  _onFileUpdate(e) {
    if( e.id !== this.data.id ) return;

    this.data = e.payload;

    if( e.state === 'uploading' ) {
      
      this.uploading = true;
      this.committing = false;
      return;
    }

    if( e.state === 'loaded' ) {
      this.committing = false;
      setTimeout(() => this.uploading = false, 500);
      return;
    }
  }

  /**
   * @method _onDataUpdate
   * @description fired from the data attribute observer
   */
  _onDataUpdate() {
    if( !this.data ) return;

    if( this.data.upload ) {
      this._startFileUpload();
    }
  }


  async _startFileUpload(reupload = false) {
    this.uploading = true;
    this.committing = false;
    this.error = false;

    if( !reupload ) {
      this.reuploadSession = {
        file : this.data.file,
        dir : this.data.dir,
        packageId : this.data.packageId,
        message : this.data.message
      }
    }

    this.uploadSession = Object.assign({}, this.reuploadSession);

    try {
      await this._uploadFile(this.uploadSession);
    } catch(e) {
      this.error = true;
      this.uploadPercent = 100;
      this.uploadText = 'Error uploading file: '+e.message;
      console.error(e);
    }
  }

  /**
   * @method _onResendIconClicked
   * @description Called when the upload error 'resend icon' is clicked.  Try reuploading
   * file.
   * 
   */
  _onResendIconClicked() {
    this._startFileUpload(true);
  }

  /**
   * @method _onRemoveClicked
   * @description fired when the close icon button is clicked
   */
  async _onRemoveClicked() {
    this.committing = true;
    try {
      if( this.uploading ) await this.cancel();
      else await this.remove();
    } catch(e) {
      // TODO: handle
    }
    this.committing = false;
  }

  /**
   * @method cancel
   * @description cancel a file while it's uploading
   */
  cancel() {

  }

  /**
   * @method remove
   * @description remove a file from the repository
   */
  remove() {
    return this._deleteFile(this.packageId, this.data);
  }

}

customElements.define('app-file-uploader', AppFileUploader);