import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-folder-uploader.html"

import sha from "sha.js"
import PackageInterface from "../../interfaces/PackageInterface"
import "./app-file-diff"

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

  _onSelectedPackageUpdate(payload) {
    this.packageId = payload.id;
    this.files = {};
  }

  async _onChange(e) {
    let files = [];

    let f;
    
    this.hasMetadataJson = false;
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

    let diff = [];
    for( var i = 0; i < files.length; i++ ) {
      let f = files[i];

      let blob = await this._getFileBlob(f);
      let sha256 = await this._hash(f.name, blob);      

      if( this.files[f.realPath] ) {
        if( sha256 !== this.files[f.realPath].sha256 ) {
          diff.push({
            name: f.realPath,
            changeType : 'updated',
            file: blob
          });
        }
      } else {
        diff.push({
          name: f.realPath,
          changeType : 'added',
          file: blob
        });
      }
    }

    for( var key in this.files ) {
      // mock file input object
      let tf = {
        name: this.files[key].filename,
        fullPath : this.files[key].dir
      };

      if( this.ignoreFile(tf) ) continue;
      if( this.isDotPath(tf) ) continue;

      let index = files.findIndex(f => f.realPath === key);
      if( index === -1 ) {
        diff.push({
          name: key,
          changeType : 'removed'
        });
      }
    }

    if( !(await this._checkValidUpload(files, diff)) ) return;

    diff.sort((a, b) => {
      if( a.name < b.name ) return 1;
      if( a.name > b.name ) return -1;
      return 0;
    });

    this.$.diff.show(diff, this.packageId);
  }

  async _checkValidUpload(files, diff) {
    // make sure there is a metadata.json file in the root of the directory.
    if( !this.hasMetadataJson ) {
      alert('No metadata.json file found in root directory, please upload the root repository directory');
      return false;
    }

    let blob = await this._getFileBlob(this.hasMetadataJson);
    try {
      let metadata = JSON.parse(await this._readAsText(blob));
      if( metadata.id !== this.packageId ) {
        alert('You are attempting to upload the wrong repository, ecosml-metadata.json id does not match');
        return false;
      }
    } catch(e) {
      alert('Failed to parse ecosml-metadata.json file.  Please make sure it is valid JSON.');
      return false;
    }

    let c = 0;
    diff.forEach(d => {if( d.changeType === 'removed') c++});
    if( c >= files.length ) {
      if( !confirm('It appears you have moved or deleted every file in the repository. Make sure you have uploaded '+
      ' the root of your repository. Are you sure you want to continue?' ) ) return false; 
    }

    if( diff.length === 0 ) {
      alert('No changes found, ignoring');
      return false;
    }

    return true;
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
      reader.onload = (event) => {
        var binary = Buffer.from(event.target.result);
        resolve(sha('sha256').update(binary).digest('hex'));
      };
      reader.readAsArrayBuffer(file);
    });
  }

  _readAsText(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsText(file);
    });
  }

  async _walkDragAndDropDir(item, files) {
    if (item.isDirectory) {
      let entries = await this._readFolder(item);
      for( var i = 0; i < entries.length; i++ ) {
        await this._walkDragAndDropDir(entries[i], files);
      }
    } else {
      if( this.isDotPath(item) ) return;
      if( this.ignoreFile(item) ) return;

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
    
    let parts = (file.webkitRelativePath || file.fullPath).split('/');
    for( var i = 0; i < parts.length; i++ ) {
      if( parts[i].charAt(0) === '.' ) return true;
    }
    return false;
  }

  ignoreFile(file) {
    if( !this.hasMetadataJson && file.name === 'ecosml-metadata.json' ) {
      this.hasMetadataJson = file;
    }

    return ( this.ignore.indexOf(file.name) > -1)
  }

}

customElements.define('app-folder-uploader', AppFolderUploader);