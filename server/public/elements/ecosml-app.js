// import styles
import "./styles/style-properties"
import "./styles/shared-styles"

// import app framework
import "@ucd-lib/cork-app-utils"
import "@ucd-lib/cork-app-state/elements/app-route"

// import main app library
import "../lib"

// import polymer elements
import {Element as PolymerElement} from "@polymer/polymer/polymer-element"

import "@polymer/paper-button/paper-button"
import "@polymer/app-layout/app-header/app-header"
import "@polymer/app-layout/app-toolbar/app-toolbar"
import "@polymer/app-layout/app-drawer/app-drawer"
import "@polymer/paper-icon-button/paper-icon-button"
import "@polymer/paper-button/paper-button"
import "@polymer/iron-icons/iron-icons"
import "@polymer/polymer/lib/elements/custom-style"
import "@polymer/paper-material/paper-material"
import "@polymer/iron-pages/iron-pages"

// app imports
import "./utils/app-title-card"
import "./management/app-package-metadata-editor"
import "./search/app-package-search"
import "./app-home"
import "./landing/app-landing-page"
import "./account/app-user-account"
import "./utils/app-auth-icon"

// element imports
import AppStateInterface from "./interfaces/AppStateInterface"
import template from "./ecosml-app.html";

export class EcoSMLApp extends Mixin(PolymerElement)
      .with(EventInterface, AppStateInterface) {
    
  // Define a string template instead of a `<template>` element.
  static get template() {
    return template;
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
        value : 'home'
      },
      firstLoad : {
        type : Boolean,
        value : true
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
    
    window.scrollTo(0, 0);
    this.page = page;
  }
}

customElements.define('ecosml-app', EcoSMLApp);