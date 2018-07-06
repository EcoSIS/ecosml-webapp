import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-folder-uploader.html"

import PackageInterface from "../../interfaces/PackageInterface"
import { join } from "path";

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