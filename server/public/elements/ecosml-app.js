// import styles
import "ecosis-client-commons"

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
import "./search/ecosml-search-header"
import "./app-home"
import "./app-about"
import "./landing/app-landing-page"
import "./account/app-user-account"
import "./admin/app-admin"
import "./header/app-header"
import "./utils/app-user-icon"
// import "./utils/app-popup"

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
      },
      openMenu : {
        type : Boolean,
        value : false
      },
      loggedIn : {
        type : Boolean,
        value : false
      },
      ecosisHost : {
        type : String,
        value : () => APP_CONFIG.ecosis.host
      }
    }
  }

  constructor() {
    super();
    this.active = true;

    window.addEventListener('click', e => {
      if( !this.openMenu ) return;
      if( !e.composedPath ) {
        return console.warn('Browser does not support event.path');
      }
      if( e.composedPath().indexOf(this.$.menu) > -1) return;
      if( e.composedPath().indexOf(this.$.header) > -1) return;
      this.openMenu = false;
    });

    this._injectModel('AuthModel');
  }

  toggleDrawer() {
    this.$.drawer.toggle();
  }

  _onAppStateUpdate(e) {
    if( e.page === this.page ) return;

    if( e.page === 'search' || e.page === 'package' || e.page === 'home' ) {
      this.searchHeader = true;
    } else {
      this.searchHeader = false;
    }
    
    window.scrollTo(0, 0);
    this.page = e.page;
    this.openMenu = false;
  }

  _onOpenMenu() {
    this.openMenu = !this.openMenu;
  }

    /**
   * @method _onAuthUpdate
   * @description from AuthInterface, called when auth updates
   * 
   * @param {Object} e event payload
   */
  _onAuthUpdate(e) {
    if( e.state === 'loggedIn' ) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
}

customElements.define('ecosml-app', EcoSMLApp);