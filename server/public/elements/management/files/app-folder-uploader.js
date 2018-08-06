import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-folder-uploader.html"

import sha from "sha.js"
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

  async _onChange(e) {
    let files = [];

    let f;
    if( e.dataTransfer ) {
      var items = e.dataTransfer.items;
      if( items.length === 0 ) return;
      await this._walkDragAndDropDir(items[0].webkitGetAsEntry(), files);

      for( var i = 0; i < files.length; i++ ) {
        let p = files[i].fullPath.replace(/^\//, '').split('/');
        p.splice(0, 1);
        files[i].realPath = '/'+p.join('/');
      }
    } else {
      for( var i = 0; i < e.target.files.length; i++ ) {
        let f = e.target.files[i];
        if( this.isDotPath(f) ) continue;
        if( this.ignoreFile(f) ) continue;
  
        let p = f.webkitRelativePath.split('/');
        p.splice(0, 1);
        f.realPath = '/'+p.join('/');
        
        files.push(f);
      }
    }

    for( var i = 0; i < files.length; i++ ) {
      let f = files[i];

      let blob = await this._getFileBlob(f);
      let sha256 = await this._hash(f.name, blob);      
      

      if( this.files[f.realPath] ) {
        if( sha256 !== this.files[f.realPath].sha256 ) console.log('Updating: '+f.realPath);
        else console.log('No changes: ', f.realPath);
      } else {
        console.log('Adding: '+f.realPath);
      }
    }
    
    console.log(this.files);
    console.log(files); 
  }

  _getFileBlob(f) {
    // in moz, f is already a blob
    if( !f.file ) return f;

    return new Promise((resolve, reject) => {
      f.file(
        blob => resolve(blob),
        e => reject(e)
      )
    });
  }

  _hash(name, file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function(event) {
        var binary = event.target.result;
        resolve(sha('sha256').update(binary).digest('hex'));
      };
      reader.readAsBinaryString(file);
    });
  }


  async _walkDragAndDropDir(item, files) {
    if (item.isDirectory) {
      let entries = await this._readFolder(item);
      for( var i = 0; i < entries.length; i++ ) {
        await this._walkDragAndDropDir(entries[i], files);
      }
    } else {
      files.push(item);
    }
  }

  _readFolder(dir) {
    return new Promise((resolve, reject) => {
      dir.createReader().readEntries(entries => resolve(entries));
    });
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
    e.preventDefault();
    e.stopPropagation();
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