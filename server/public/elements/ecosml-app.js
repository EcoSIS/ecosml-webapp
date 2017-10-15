import {Element as PolymerElement} from "@polymer/polymer/polymer-element.js"
import "@polymer/paper-button/paper-button.js"
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

}

customElements.define('ecosml-app', EcoSMLApp);