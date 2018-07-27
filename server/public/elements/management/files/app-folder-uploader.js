import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-folder-uploader.html"

import PackageInterface from "../../interfaces/PackageInterface"

export default class AppFolderUploader extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.active = true;
    this.files = {};

    this.ignore = ['ecosml-metadata.json']
  }

  _onFileUpdate(e) {
    let file = e.payload;
    this.files[(file.dir !== '/' ? file.dir + '/' : '/')+file.filename] = file;
  }

  _onChange(e) {
    let files = [];

    let f;
    if( e.dataTransfer ) {
      var items = e.dataTransfer.items;
      for (var i=0; i<items.length; i++) {
        // webkitGetAsEntry is where the magic happens
        var item = items[i].webkitGetAsEntry();
       console.log(item);
      }
      return;
    }

    for( var i = 0; i < e.target.files.length; i++ ) {
      let f = e.target.files[i];
      if( this.isDotPath(f) ) continue;
      if( this.ignoreFile(f) ) continue;

      let p = f.webkitRelativePath.split('/');
      p.splice(0, 1);
      f.realPath = '/'+p.join('/');
      
      files.push(f);

      if( this.files[f.realPath] ) console.log('Updating: '+f.realPath);
      else console.log('Adding: '+f.realPath);
    }

    console.log(this.files);
    console.log(files);
    
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
    this._onChange(e);
  }

  _onChooseClicked(e) {
    setTimeout(() =>  this.$.fileInput.click(), 100);
  }

  isDotPath(file) {
    if( file.name.charAt(0) === '.' ) return true;
    
    let parts = file.webkitRelativePath.split('/');
    for( var i = 0; i < parts.length; i++ ) {
      if( parts[i].charAt(0) === '.' ) return true;
    }
    return false;
  }

  ignoreFile(file) {
    return ( this.ignore.indexOf(file.name) > -1)
  }

}

customElements.define('app-folder-uploader', AppFolderUploader);