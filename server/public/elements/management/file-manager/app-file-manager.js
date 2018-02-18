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
      directory : {
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
      },
      color : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();
    this.active = true;
    this.currentPackageId = this._getSelectedPackageId().id;
  }

  /**
   * @method _onFileUpdate
   * @description via PackageInterface, called whenever a file is updated
   * 
   * @param {Object} e 
   */
  _onFileUpdate(e) {
    if( e.payload.dir !== this.directory ) return;
    if( e.state === 'deleted' ) return this._onFileRemoved(e.payload);

    this._addFile(e.payload);
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
    [].slice.call(files).forEach(file => this._addFile({
      file,
      id : this._getFileId(this.directory, file.name),
      filename : file.name,
      dir : this.directory,
      message : '',
      packageId : this.currentPackageId,
      upload : true
    }));
  }

  _addFile(file) {
    clearTimeout(this.fileUpdateTimer);

    let index = this.files.findIndex(f => f.id == file.id);
    if( index > -1 ) this.files[index] = file;
    else this.files.push(file);

    this.fileUpdateTimer = setTimeout(() => {
      this.files = this.files.slice(0);
    }, 25);
  }

  _getFileId(dir, name) {
    let sep = '';
    if( !dir.match(/\/^/) ) sep = '/';
    return dir + sep + name;
  }

  /**
   * @method _onFileRemoved
   * @description 
   * 
   * @param {Object} file
   */
  _onFileRemoved(file) {
    let index = this.files.findIndex(f => f.id === file.id);
    this.files.splice(index, 1)
    this.files = this.files.slice(0);
  }

}

customElements.define('app-file-manager', AppFileManager);