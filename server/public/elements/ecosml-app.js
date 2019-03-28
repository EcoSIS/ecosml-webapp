// import styles
import "./styles/style-properties"
import "./styles/shared-styles"

// import app framework
import "@ucd-lib/cork-app-utils"
import "@ucd-lib/cork-app-state/elements/app-route"

// import main app library
import APP from "../lib"
window.APP = APP;

// import polymer elements
import {PolymerElement, html} from "@polymer/polymer"

import "@polymer/paper-button/paper-button"
import "@polymer/paper-icon-button/paper-icon-button"
import "@polymer/paper-button/paper-button"
import "@polymer/iron-icons/iron-icons"
import "@polymer/iron-icons/social-icons"
import "@polymer/iron-icons/editor-icons"
import "@polymer/polymer/lib/elements/custom-style"
import "@polymer/paper-material/paper-material"
import "@polymer/iron-pages/iron-pages"

// app imports
import "./utils/app-title-card"
import "./management/app-package-metadata-editor"
import "./search/app-package-search"
import "./app-home"
import "./app-about"
import "./landing/app-landing-page"
import "./account/app-user-account"
import "./header/app-header"
import "./utils/app-user-icon"
import "./utils/app-popup"

// element imports
import AppStateInterface from "./interfaces/AppStateInterface"
import PackageInterface from "./interfaces/PackageInterface"
import template from "./ecosml-app.html";

export class EcoSMLApp extends Mixin(PolymerElement)
      .with(EventInterface, AppStateInterface, PackageInterface) {
    
  // Define a string template instead of a `<template>` element.
  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      // APP_CONFIG is global and injected via template from server.
      appRoutes : {
        type : Array,
        value : () => APP_CONFIG.appRoutes
      },
      page : {
        type : String,
        value : ''
      },
      firstLoad : {
        type : Boolean,
        value : true
      },
      searchHeader : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  toggleDrawer() {
    this.$.drawer.toggle();
  }

  _onAppStateUpdate(e) {
    let page = e.location.path[0] || 'home';
    if( page === this.page ) return;

    if( page === 'create' ) page = 'edit';
    if( page === 'edit' || page === 'package' ) {
      if( e.location.path.length > 1 ) {
        this._setSelectedPackageId(e.location.path[1]);
      }
    }

    if( page === 'search' || page === 'package' || page === 'home' ) {
      this.searchHeader = true;
    } else {
      this.searchHeader = false;
    }
    
    window.scrollTo(0, 0);
    this.page = page;
  }
}

customElements.define('ecosml-app', EcoSMLApp);