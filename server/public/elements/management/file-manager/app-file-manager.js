import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-file-manager.html"

import "./app-file-uploader"
import PackageInterface from "../../interfaces/PackageInterface"

export default class AppFileManager extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      files : {
        type : Array,
        value : () => []
      },
      path : {
        type : String,
        value : ''
      },
      label : {
        type : String,
        value : ''
      },
      description : {
        type : String,
        value : ''
      },
      currentPackageId : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  _onSelectedPackageUpdate(payload) {
    this.currentPackageId = payload.id;
  }

  /**
   * @method _onDropBoxDragOver
   * @description called when the dropbox dragover event is fired
   */
  _onDropBoxDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    this.$.dropbox.classList.add('hover');
  }

  _onDropBoxDragLeave(e) {
    this.$.dropbox.classList.remove('hover');
  }

  /**
   * @method _onDropBoxDrop
   * @description called when the dropbox drop event is fired
   */
  _onDropBoxDrop(e) {
    this.$.dropbox.classList.remove('hover');
    this._startFileUpload(e);
  }

  /**
   * @method _onFileInputChange
   * @description called when the fileInput change event is fired
   */
  _onFileInputChange(e) {
    this._startFileUpload(e);
  }

  _onChooseClicked(e) {
    setTimeout(() =>  this.$.fileInput.click(), 100);
  }

  /**
   * @method _startFileUpload
   * @description start a file upload process based on given input event
   * 
   * @param {Object} e html event
   */
  _startFileUpload(e) {
    e.stopPropagation();
    e.preventDefault();

    let files = e.dataTransfer ? e.dataTransfer.files : e.target.files; // FileList object.
    this.files = [].slice.call(files).map(file => ({
        file,
        filename : file.name,
        filePath : this.path,
        message : '',
        repoName : this.currentPackageId
      }));
  }

  /**
   * @method _onFileRemoved
   * @description Triggered from app-file-uploader when file has been removed
   * 
   * @param {Object} e 
   */
  _onFileRemoved(e) {
    let index = this.files.findIndex(file => file === e.detail);
    this.files.splice(index, 1)
    this.files = this.files.slice(0);
  }

}

customElements.define('app-file-manager', AppFileManager);