import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import "@polymer/paper-input/paper-input"

import template from "./app-repo-metadata-editor.html"
import RepoInterface from "../interfaces/RepoInterface"

class AppRepoMetadataEditor extends Mixin(PolymerElement)
      .with(EventInterface, RepoInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      creating : {
        type : Boolean,
        value : true
      },
      currentAction : {
        type : String,
        value : 'Create'
      },
      sections : {
        type : Array,
        value : () => ['basicInformation', 'details']
      },

      // repo schema object
      schema : {
        type : Object,
        value : {}
      },

      // used for displaying title
      titlePreview : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();
    this.schema = this._getRepoSchema();
  }

  get(attr) {
    switch(attr) {
      case 'keywords':
        return this._valueToArray(this.$.keywords.value)
                   .map(value => value.toLowerCase());
      default:
        return this.$[attr].value;
    }
  }

  set(attr, value) {
    switch(attr) {
      case 'keywords':
        return this.$.keywords.value = value ? value.join(', ') : '';
      default:
        return this.$[attr].value = value || '';
    }
  }

  /**
   * @method createPackage
   * @description Reset UI to create a new package
   */
  createPackage() {
    this.currentAction = 'Create';
    this.creating = true;
    this.titlePreview = '';
    for( var key in schema ) this.set(key);
  }

  _onCreateBtnClicked() {
    if( this.titlePreview.length < 4 ) {
      return alert('Title must be at least 4 characters');
    }
    if( this.get('overview').length < 15 ) {
      return alert('Please provide a longer overview');
    }

    this._createRepo(this.titlePreview, this.get('overview'));
  }

  /**
   * @method updatePackage
   * @description update UI from package data
   * 
   * @param {Object} pkgData package to render
   */
  updatePackage(pkgData) {
    this.currentAction = 'Update';
    this.creating = false;

    this.titlePreview = pkgData.title;

    let schema = this._getRepoSchema();
    for( var key in schema ) {
      if( pkgData[key] ) this.set(key, pkgData[key]);
      else this.set(key);
    }
  }

  /**
   * Fired from title input
   */
  _updateTitlePreview() {
    this.titlePreview = this.get('title').toLowerCase().replace(/ /g, '-');
  }

  _onCreateRepoUpdate(e) {
    console.log(e);
  }

  _valueToArray(value) {
    return value.split(',').map(value => value.trim());
  }


}
customElements.define('app-repo-metadata-editor', AppRepoMetadataEditor);