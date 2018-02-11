import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-file-uploader.html"

import "@polymer/paper-progress/paper-progress"
import PackageInterface from "../../interfaces/PackageInterface"

export default class AppFileUploader extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : () => {},
        observer : '_onDataUpdate'
      },
      uploading : {
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

    this.uploadPercent = e.status.progress;
    this.uploadText = e.status.speed+e.status.speedUnits;
  }

  _onFileUpdate(e) {
    if( e.id !== this.data.id ) return;

    if( e.state === 'uploading' ) {
      this.uploading = true;
      return;
    }

    if( e.state === 'loaded' ) {
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


  async _startFileUpload() {
    this.uploading = true;
    this.uploadSession = {
      file : this.data.file,
      dir : this.data.dir,
      packageId : this.data.packageId,
      message : this.data.message
    }

    try {
      this._uploadFile(this.uploadSession);
    } catch(e) {
      console.error(e);
    }
  }

  /**
   * @method _onRemoveClicked
   * @description fired when the close icon button is clicked
   */
  async _onRemoveClicked() {
    try {
      if( this.uploading ) await this.cancel();
      else await this.remove();

      this.fire('file-removed', this.data);
    } catch(e) {
      // TODO: handle
    }
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

  }

}

customElements.define('app-file-uploader', AppFileUploader);