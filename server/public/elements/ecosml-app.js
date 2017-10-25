import {Element as PolymerElement} from "@polymer/polymer/polymer-element.js"
import "@polymer/paper-button/paper-button.js"
import "@polymer/app-layout/app-header/app-header.js"
import "@polymer/app-layout/app-toolbar/app-toolbar.js"
import "@polymer/app-layout/app-drawer/app-drawer"
import "@polymer/paper-icon-button/paper-icon-button"
import "@polymer/iron-icons/iron-icons"
import "@polymer/polymer/lib/elements/custom-style"
import "@polymer/paper-material/paper-material"
import "@polymer/paper-styles/paper-styles"
import template from "./ecosml-app.html";


export class EcoSMLApp extends PolymerElement {
    
  // Define a string template instead of a `<template>` element.
  static get template() {
    return template;
  }

  constructor() {
    super();
    this.name = '3.0 preview';
    this.count = 1;
  }

  // properties, observers, etc. are identical to 2.x
  static get properties() {
    name: {
      Type: String
    }
  }

  toggleDrawer() {
    this.$.drawer.toggle();
  }

}

customElements.define('ecosml-app', EcoSMLApp);