import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-file-manager.html"

export default class AppFileManager extends PolymerElement {

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
      }
    }
  }

  ready() {
    super.ready();
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
    this._handleUpload(e);
  }

  /**
   * @method _onFileInputChange
   * @description called when the fileInput change event is fired
   */
  _onFileInputChange(e) {
    this._handleUpload(e);
  }

  _onChooseClicked(e) {
    setTimeout(() =>  this.$.fileInput.click(), 200);
  }

  _handleUpload(e) {
    e.stopPropagation();
    e.preventDefault();

    let files = e.dataTransfer ? e.dataTransfer.files : e.target.files; // FileList object.
    let staggedFiles = [].slice.call(files).map(file => {
      return {
        file,
        filename : file.name,
        filePath : this.path,
        message : '',
        repoName : this.currentPackage
      }
    });

    console.log(staggedFiles)
  }

}

customElements.define('app-file-manager', AppFileManager);