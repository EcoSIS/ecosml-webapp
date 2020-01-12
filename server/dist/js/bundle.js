!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=104)}([function(e,t,n){"use strict";n.d(t,"a",function(){return r});var i=n(27),a=n(2);n.d(t,"b",function(){return a.a});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r=Object(i.a)(HTMLElement)},function(e,t,n){"use strict";n(8);var i=n(3),a=(n(7),n(40)),r=n(11);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function s(e){return"slot"===e.localName}let o=class{static getFlattenedNodes(e){const t=Object(i.a)(e);return s(e)?(e=e,t.assignedNodes({flatten:!0})):Array.from(t.childNodes).map(e=>s(e)?(e=e,Object(i.a)(e).assignedNodes({flatten:!0})):[e]).reduce((e,t)=>e.concat(t),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=(()=>{this._schedule()}),this.connect(),this._schedule()}connect(){s(this._target)?this._listenSlots([this._target]):Object(i.a)(this._target).children&&(this._listenSlots(Object(i.a)(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,e=>{this._processMutations(e)}):(this._nativeChildrenObserver=new MutationObserver(e=>{this._processMutations(e)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){s(this._target)?this._unlistenSlots([this._target]):Object(i.a)(this._target).children&&(this._unlistenSlots(Object(i.a)(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,r.a.run(()=>this.flush()))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let n=e[t];n.addedNodes&&this._listenSlots(n.addedNodes),n.removedNodes&&this._unlistenSlots(n.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),n=Object(a.a)(t,this._effectiveNodes);for(let t,i=0;i<n.length&&(t=n[i]);i++)for(let n,i=0;i<t.removed.length&&(n=t.removed[i]);i++)e.removedNodes.push(n);for(let i,a=0;a<n.length&&(i=n[a]);a++)for(let n=i.index;n<i.index+i.addedCount;n++)e.addedNodes.push(t[n]);this._effectiveNodes=t;let i=!1;return(e.addedNodes.length||e.removedNodes.length)&&(i=!0,this.callback.call(this._target,e)),i}_listenSlots(e){for(let t=0;t<e.length;t++){let n=e[t];s(n)&&n.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let n=e[t];s(n)&&n.removeEventListener("slotchange",this._boundSchedule)}}};var l=n(19);n(13);n.d(t,"b",function(){return d}),n.d(t,"a",function(){return m}),n.d(t,!1,function(){return l.b}),n.d(t,!1,function(){return l.a});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const h=Element.prototype,c=h.matches||h.matchesSelector||h.mozMatchesSelector||h.msMatchesSelector||h.oMatchesSelector||h.webkitMatchesSelector,d=function(e,t){return c.call(e,t)};class p{constructor(e){this.node=e}observeNodes(e){return new o(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if(Object(i.a)(this.node).contains(e))return!0;let t=e,n=e.ownerDocument;for(;t&&t!==n&&t!==this.node;)t=Object(i.a)(t).parentNode||Object(i.a)(t).host;return t===this.node}getOwnerRoot(){return Object(i.a)(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?Object(i.a)(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=Object(i.a)(this.node).assignedSlot;for(;t;)e.push(t),t=Object(i.a)(t).assignedSlot;return e}importNode(e,t){let n=this.node instanceof Document?this.node:this.node.ownerDocument;return Object(i.a)(n).importNode(e,t)}getEffectiveChildNodes(){return o.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),n=[];for(let i,a=0,r=t.length;a<r&&(i=t[a]);a++)i.nodeType===Node.ELEMENT_NODE&&d(i,e)&&n.push(i);return n}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function u(e,t){for(let n=0;n<t.length;n++){let i=t[n];Object.defineProperty(e,i,{get:function(){return this.node[i]},configurable:!0})}}class g{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}p.prototype.cloneNode,p.prototype.appendChild,p.prototype.insertBefore,p.prototype.removeChild,p.prototype.replaceChild,p.prototype.setAttribute,p.prototype.removeAttribute,p.prototype.querySelector,p.prototype.querySelectorAll,p.prototype.parentNode,p.prototype.firstChild,p.prototype.lastChild,p.prototype.nextSibling,p.prototype.previousSibling,p.prototype.firstElementChild,p.prototype.lastElementChild,p.prototype.nextElementSibling,p.prototype.previousElementSibling,p.prototype.childNodes,p.prototype.children,p.prototype.classList,p.prototype.textContent,p.prototype.innerHTML;let f=p;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(p.prototype).forEach(t=>{"activeElement"!=t&&(e.prototype[t]=p.prototype[t])}),u(e.prototype,["classList"]),f=e,Object.defineProperties(g.prototype,{localTarget:{get(){return this.event.currentTarget},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let n=0;n<t.length;n++){let i=t[n];e[i]=function(){return this.node[i].apply(this.node,arguments)}}}(p.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),u(p.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(e,t){for(let n=0;n<t.length;n++){let i=t[n];Object.defineProperty(e,i,{get:function(){return this.node[i]},set:function(e){this.node[i]=e},configurable:!0})}}(p.prototype,["textContent","innerHTML"]);const m=function(e){if((e=e||document)instanceof f)return e;if(e instanceof g)return e;let t=e.__domApi;return t||(t=e instanceof Event?new g(e):new f(e),e.__domApi=t),t}},function(e,t,n){"use strict";n.d(t,"a",function(){return r});n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class i{constructor(e){this.value=e.toString()}toString(){return this.value}}function a(e){if(e instanceof i)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}const r=function(e,...t){const n=document.createElement("template");return n.innerHTML=t.reduce((t,n,r)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof i)return a(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}(n)+e[r+1],e[0]),n}},function(e,t,n){"use strict";n.d(t,"a",function(){return i});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const i=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:e=>e},function(e,t,n){"use strict";var i=n(34),a=n(5),r=n(25);n(8);var s=n(28),o=n(20),l=n(41),h=n(7),c=n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const d=Object(l.a)(Object(o.b)(Object(s.a)(HTMLElement)));customElements.define("dom-bind",class extends d{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),h.f)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(){this.mutableData=!0}connectedCallback(){this.style.display="none",this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){Object(c.a)(Object(c.a)(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(!(e=e||this.querySelector("template"))){let t=new MutationObserver(()=>{if(!(e=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()});return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});n(62);var p=n(0),u=n(13),g=n(19),f=n(11),m=n(6);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class v extends p.a{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=u.a.debounce(this.__renderDebouncer,f.a,()=>this.__render()),Object(g.a)(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=Object(c.a)(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||Object(c.a)(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),this.style.display="none",this.if&&this.__debounceRender()}render(){Object(g.b)()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let e=Object(c.a)(this).parentNode;if(e){if(!this.__ctor){let e=Object(c.a)(this).querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!Object(c.a)(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}this.__ctor=Object(r.b)(e,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Object(m.g)(e)]=!0))}})}if(this.__instance){this.__syncHostProperties();let t=this.__instance.children;if(t&&t.length){if(Object(c.a)(this).previousSibling!==t[t.length-1])for(let n,i=0;i<t.length&&(n=t[i]);i++)Object(c.a)(e).insertBefore(n,this)}}else this.__instance=new this.__ctor,Object(c.a)(e).insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let e=this.__invalidProps;if(e){for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=Object(c.a)(e[0]).parentNode;if(t){t=Object(c.a)(t);for(let n,i=0;i<e.length&&(n=e[i]);i++)t.removeChild(n)}}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let e=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(e)}}customElements.define(v.is,v);var y=n(9),b=n(40),_=n(27);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let w=Object(y.a)(e=>{let t=Object(_.a)(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let n=t.path;if(n==JSCompiler_renameProperty("items",this)){let n=t.base||[],i=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),i){let e=Object(b.a)(n,i);this.__applySplices(e)}this.__lastItems=n,this.__lastMulti=e}else if(t.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(t.value.indexSplices);else{let e=n.slice(`${JSCompiler_renameProperty("items",this)}.`.length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let n=0;n<e.length;n++){let i=e[n];t.forEach((e,n)=>{e<i.index||(e>=i.index+i.removed.length?t.set(n,e+i.addedCount-i.removed.length):t.set(n,-1))});for(let e=0;e<i.addedCount;e++){let n=i.index+e;t.has(this.items[n])&&t.set(this.items[n],n)}}this.__updateLinks();let n=0;t.forEach((e,i)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),n,1):this.selected=this.selectedItem=null,t.delete(i)):n++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach(t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)})}else this.__selectedMap.forEach(e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach((n,i)=>{t==e++&&this.deselect(i)})}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let n;this.__selectedMap.delete(e),this.multi&&(n=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),n,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}})(p.a);class x extends w{static get is(){return"array-selector"}static get template(){return null}}customElements.define(x.is,x);n(37);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let k;k=o.a._mutablePropertyChange;Boolean;var z=n(2);n.d(t,"a",function(){return S}),n.d(t,!1,function(){return a.a}),n.d(t,"b",function(){return z.a});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const S=Object(i.a)(HTMLElement).prototype},function(e,t,n){"use strict";var i=n(34),a=n(7);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},s={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},o=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},s);function l(e,t,n,i){!function(e,t,n){const i=e._noAccessors,a=Object.getOwnPropertyNames(e);for(let r=0;r<a.length;r++){let s=a[r];if(!(s in n))if(i)t[s]=e[s];else{let n=Object.getOwnPropertyDescriptor(e,s);n&&(n.configurable=!0,Object.defineProperty(t,s,n))}}}(t,e,i);for(let e in r)t[e]&&(n[e]=n[e]||[],n[e].push(t[e]))}function h(e,t){for(const n in t){const i=e[n],a=t[n];e[n]=!("value"in a)&&i&&"value"in i?Object.assign({value:i.value},a):a}}function c(e,t,n){let i;const r={};class c extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(i)for(let e,t=0;t<i.length;t++)(e=i[t]).properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else super._finalizeClass()}static get properties(){const t={};if(i)for(let e=0;e<i.length;e++)h(t,i[e].properties);return h(t,e.properties),t}static get observers(){let t=[];if(i)for(let e,n=0;n<i.length;n++)(e=i[n]).observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=r.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=c.prototype;if(!e.hasOwnProperty("__hasRegisterFinished")){e.__hasRegisterFinished=!0,super._registered(),a.b&&d(e);const t=Object.getPrototypeOf(this);let n=r.beforeRegister;if(n)for(let e=0;e<n.length;e++)n[e].call(t);if(n=r.registered)for(let e=0;e<n.length;e++)n[e].call(t)}}_applyListeners(){super._applyListeners();const e=r.listeners;if(e)for(let t=0;t<e.length;t++){const n=e[t];if(n)for(let e in n)this._addMethodEventListenerToNode(this,e,n[e])}}_ensureAttributes(){const e=r.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const n=e[t];for(let e in n)this._ensureAttribute(e,n[e])}super._ensureAttributes()}ready(){super.ready();let e=r.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=r.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=r.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,n){super.attributeChanged();let i=r.attributeChanged;if(i)for(let a=0;a<i.length;a++)i[a].call(this,e,t,n)}}if(n){Array.isArray(n)||(n=[n]);let e=t.prototype.behaviors;i=function e(t,n,i){n=n||[];for(let a=t.length-1;a>=0;a--){let r=t[a];r?Array.isArray(r)?e(r,n):n.indexOf(r)<0&&(!i||i.indexOf(r)<0)&&n.unshift(r):console.warn("behavior is null, check for missing or 404 import")}return n}(n,null,e),c.prototype.behaviors=e?e.concat(n):i}const d=t=>{i&&function(e,t,n){for(let i=0;i<t.length;i++)l(e,t[i],n,o)}(t,i,r),l(t,e,r,s)};return a.b||d(c.prototype),c.generatedFrom=e,c}n(8);n.d(t,"a",function(){return d});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const d=function(e){let t;return t="function"==typeof e?e:d.Class(e),customElements.define(t.is,t),t};d.Class=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let n=t?t(Object(i.a)(HTMLElement)):Object(i.a)(HTMLElement);return(n=c(e,n,e.behaviors)).is=n.prototype.is=e.is,n}},function(e,t,n){"use strict";n.d(t,"d",function(){return i}),n.d(t,"g",function(){return a}),n.d(t,"b",function(){return r}),n.d(t,"c",function(){return s}),n.d(t,"i",function(){return o}),n.d(t,"e",function(){return l}),n.d(t,"f",function(){return h}),n.d(t,"a",function(){return d}),n.d(t,"h",function(){return p});n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function i(e){return e.indexOf(".")>=0}function a(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function r(e,t){return 0===e.indexOf(t+".")}function s(e,t){return 0===t.indexOf(e+".")}function o(e,t,n){return t+n.slice(e.length)}function l(e,t){return e===t||r(e,t)||s(e,t)}function h(e){if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let i=e[n].toString().split(".");for(let e=0;e<i.length;e++)t.push(i[e])}return t.join(".")}return e}function c(e){return Array.isArray(e)?h(e).split("."):e.toString().split(".")}function d(e,t,n){let i=e,a=c(t);for(let e=0;e<a.length;e++){if(!i)return;i=i[a[e]]}return n&&(n.path=a.join(".")),i}function p(e,t,n){let i=e,a=c(t),r=a[a.length-1];if(a.length>1){for(let e=0;e<a.length-1;e++){if(!(i=i[a[e]]))return}i[r]=n}else i[t]=n;return a.join(".")}},function(e,t,n){"use strict";n.d(t,"h",function(){return a}),n.d(t,"d",function(){return r}),n.d(t,"e",function(){return s}),n.d(t,"c",function(){return o}),n.d(t,"f",function(){return l}),n.d(t,"a",function(){return h}),n.d(t,"b",function(){return c}),n.d(t,"g",function(){return d});n(8);var i=n(15);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a=!window.ShadyDOM;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let r=Object(i.a)(document.baseURI||window.location.href);let s=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;let o=!1;let l=!1;let h=!1;let c=!1;let d=!1},function(e,t,n){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/window.JSCompiler_renameProperty=function(e,t){return e}},function(e,t,n){"use strict";n.d(t,"a",function(){return r});n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i=0;function a(){}a.prototype.__mixinApplications,a.prototype.__mixinSet;const r=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let n=i++;return function(i){let a=i.__mixinSet;if(a&&a[n])return i;let r=t,s=r.get(i);s||(s=e(i),r.set(i,s));let o=Object.create(s.__mixinSet||a||null);return o[n]=!0,s.__mixinSet=o,s}}},function(e,t,n){e.exports={BaseModel:n(150),BaseStore:n(149),BaseService:n(147),BaseMixin:n(145),Mixin:n(144),EventBus:n(35),EventInterface:n(143),LitCorkUtils:n(142),fetch:n(60),LightDom:n(141)}},function(e,t,n){"use strict";n.d(t,"b",function(){return l}),n.d(t,"a",function(){return h});n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i=0,a=0,r=[],s=0,o=document.createTextNode("");new window.MutationObserver(function(){const e=r.length;for(let t=0;t<e;t++){let e=r[t];if(e)try{e()}catch(e){setTimeout(()=>{throw e})}}r.splice(0,e),a+=e}).observe(o,{characterData:!0});const l={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},h={run:e=>(o.textContent=s++,r.push(e),i++),cancel(e){const t=e-a;if(t>=0){if(!r[t])throw new Error("invalid async handle: "+e);r[t]=null}}}},function(e,t,n){"use strict";n.d(t,"d",function(){return i}),n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o}),n.d(t,"c",function(){return l});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const i=!(window.ShadyDOM&&window.ShadyDOM.inUse);let a,r;function s(e){a=(!e||!e.shimcssproperties)&&(i||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(r=window.ShadyCSS.cssBuild);const o=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?a=window.ShadyCSS.nativeCss:window.ShadyCSS?(s(window.ShadyCSS),window.ShadyCSS=void 0):s(window.WebComponents&&window.WebComponents.flags);const l=a},function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return r}),n.d(t,"c",function(){return s});n(8),n(9),n(11);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class i{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run(()=>{this._timer=null,a.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),a.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,n){return e instanceof i?e._cancelAsync():e=new i,e.setConfig(t,n),e}}let a=new Set;const r=function(e){a.add(e)},s=function(){const e=Boolean(a.size);return a.forEach(e=>{try{e.flush()}catch(e){setTimeout(()=>{throw e})}}),e}},function(e,t){e.exports=(e=>(class extends e{constructor(){super(),this._injectModel("PackageModel")}_getPackageSchema(){return this.PackageModel.schema}async _getPackage(e){return this.PackageModel.get(e)}async _updatePackage(e,t,n){return this.PackageModel.update(e,t,n)}async _deletePackage(e){return this.PackageModel.delete(e)}_createRelease(e,t){return this.PackageModel.createRelease(e,t)}_uploadFile(e){return this.PackageModel.uploadFile(e)}_deleteFile(e,t){return this.PackageModel.deleteFile(e,t)}_setSelectedPackageId(e){this.PackageModel.setSelectedPackageId(e)}_getSelectedPackageId(){return this.PackageModel.getSelectedPackageId()}_getPackageFiles(e){return this.PackageModel.getFiles(e)}_moveExampleDirectory(e,t,n){return this.PackageModel.moveExample(e,t,n)}_deleteExampleDirectory(e,t){return this.PackageModel.deleteExample(e,t)}}))},function(e,t,n){"use strict";n.d(t,"c",function(){return o}),n.d(t,"b",function(){return l}),n.d(t,"a",function(){return h});n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i,a,r=/(url\()([^)]*)(\))/g,s=/(^\/)|(^#)|(^[\w-\d]*:)/;function o(e,t){if(e&&s.test(e))return e;if(void 0===i){i=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",i="http://a/c%20d"===e.href}catch(e){}}return t||(t=document.baseURI||window.location.href),i?new URL(e,t).href:(a||((a=document.implementation.createHTMLDocument("temp")).base=a.createElement("base"),a.head.appendChild(a.base),a.anchor=a.createElement("a"),a.body.appendChild(a.anchor)),a.base.href=t,a.anchor.href=e,a.anchor.href||e)}function l(e,t){return e.replace(r,function(e,n,i,a){return n+"'"+o(i.replace(/["']/g,""),t)+"'"+a})}function h(e){return e.substring(0,e.lastIndexOf("/")+1)}},function(e,t){e.exports=(e=>(class extends e{constructor(){super(),this._injectModel("AuthModel")}_login(e,t){return this.AuthModel.login(e,t)}_logout(){return this.AuthModel.logout()}_getUserOrganizations(){return this.AuthModel.getUserOrganizations()}_getAuthState(){return this.AuthModel.get()}}))},function(e,t,n){"use strict";n.d(t,"b",function(){return s}),n.d(t,"a",function(){return o});n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const i={},a=/-[a-z]/g,r=/([A-Z])/g;function s(e){return i[e]||(i[e]=e.indexOf("-")<0?e:e.replace(a,e=>e[1].toUpperCase()))}function o(e){return i[e]||(i[e]=e.replace(r,"-$1").toLowerCase())}},function(e,t,n){"use strict";n.d(t,"c",function(){return i}),n.d(t,"b",function(){return a}),n.d(t,"a",function(){return r});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const i=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,a=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,r=/@media\s(.*)/},function(e,t,n){"use strict";n.d(t,"b",function(){return a});n(8);var i=n(13);n.d(t,"a",function(){return i.b});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=Object(i.c)()}while(e||t)}},function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return s});var i=n(9);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function a(e,t,n,i,a){let r;a&&(r="object"==typeof n&&null!==n)&&(i=e.__dataTemp[t]);let s=i!==n&&(i==i||n==n);return r&&s&&(e.__dataTemp[t]=n),s}const r=Object(i.a)(e=>{return class extends e{_shouldPropertyChange(e,t,n){return a(this,e,t,n,!0)}}}),s=Object(i.a)(e=>{return class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,n){return a(this,e,t,n,this.mutableData)}}});r._mutablePropertyChange=a},function(e,t,n){"use strict";n.d(t,"c",function(){return a}),n.d(t,"b",function(){return r}),n.d(t,"a",function(){return s});var i=n(18);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function a(e,t){for(let n in t)null===n?e.style.removeProperty(n):e.style.setProperty(n,t[n])}function r(e,t){const n=window.getComputedStyle(e).getPropertyValue(t);return n?n.trim():""}function s(e){const t=i.b.test(e)||i.c.test(e);return i.b.lastIndex=0,i.c.lastIndex=0,t}},function(e,t){e.exports='<dom-module id="shared-styles">\n  <template>\n    <style>\n      paper-material {\n        background: white;\n        display: block;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      .header {\n        background: rgb(77,182,172);\n        background: linear-gradient(90deg, rgba(77,182,172,1) 0%, rgba(0,134,125,0.7973564425770308) 65%, rgba(34,134,195,1) 100%);\n      }\n\n      input, select, button, textarea {\n        font-size        : var(--font-size);\n        font-weight      : var(--font-weight);\n        color            : var(--text-primary-color);\n        box-sizing       : border-box;\n      }\n\n      input, textarea, select {\n        border-radius: 4px;\n        background-color: white;\n        border: 1px solid var(--dark-background-color);\n        padding: 9px;\n        margin: 3px 1px;\n      }\n\n      input:focus {\n        border: 1px solid var(--default-primary-color);\n        outline: none;\n      }\n\n      input[disabled] {\n        background-color: var(--default-background-color);\n        color: var(--secondary-text-color);\n        cursor: not-allowed;\n      }\n\n      select {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        appearance: none;\n      }\n\n      select::after {\n        width: 0;\n        height: 0;\n        border-left: 4px solid transparent;\n        border-right: 4px solid transparent;\n        border-top: 7px solid #666;\n        margin-top: -3px;\n      }\n\n      .help {\n        color: var(--secondary-text-color);\n        font-size: 14px;\n      }\n\n      .narrow-container {\n        display: flex;\n        justify-content: center;\n        flex-direction: column;\n        align-items: center;\n      }\n      \n      .narrow-container > * {\n        max-width: var(--max-text-width);\n        width: 100%;\n      }\n\n      .container {\n        display: flex;\n        justify-content: center;\n        flex-direction: column;\n        align-items: center;\n      }\n\n      .container > * {\n        max-width: var(--max-width);\n        width: 100%;\n      }\n\n      .main-panel {\n        background-color: white;\n        padding: 40px;\n        margin: 10px;\n        border-radius: 4px;\n        border: 1px solid #ddd;\n      }\n\n      a, a:visited {\n        color: var(--text-primary-color);\n        cursor: pointer;\n        text-decoration: none;\n      }\n\n      a[highlight], a[highlight]:visited {\n        text-decoration: none;\n        color: var(--default-primary-color);\n      }\n\n      a:hover {\n        color: var(--default-primary-color);\n      }\n\n      a[inverse], a[inverse]:visited {\n        color: var(--inverse-text-color);\n      }\n\n      h1, h2, h3, h4 {\n        font-weight: 400;\n      }\n\n      h2.uheader {\n        border-bottom-width: 2px;\n        border-bottom-style: solid;\n        margin: 0 0 10px 0;\n        padding-bottom: 5px;\n      }\n\n      h2.uheader.blue, h2.uheader[color="blue"] {\n        border-bottom-color: var(--default-secondary-color);\n      }\n      h2.uheader.green, h2.uheader[color="green"] {\n        border-bottom-color: var(--default-primary-color);\n      }\n      h2.uheader.lightgreen, h2.uheader[color="lightgreen"] {\n        border-bottom-color: var(--light-primary-color);\n      }\n      h2.uheader.lightblue, h2.uheader[color="lightblue"] {\n        border-bottom-color: var(--light-secondary-color);\n      }\n      h2.uheader.dark, h2.uheader[color="dark"] {\n        border-bottom-color: var(--text-primary-color);\n      }\n\n      h3.uheader {\n        border-bottom-width: 2px;\n        border-bottom-style: solid;\n        margin: 0 0 8px 0;\n        padding-bottom: 0px;\n      }\n\n      h3.uheader.blue, h3.uheader[color="blue"] {\n        border-bottom-color: var(--default-secondary-color);\n      }\n      h3.uheader.green, h3.uheader[color="green"] {\n        border-bottom-color: var(--default-primary-color);\n      }\n      h3.uheader.lightgreen, h3.uheader[color="lightgreen"] {\n        border-bottom-color: var(--light-primary-color);\n      }\n      h3.uheader.lightblue, h3.uheader[color="lightblue"] {\n        border-bottom-color: var(--light-secondary-color);\n      }\n      h3.uheader.dark, h3.uheader[color="dark"] {\n        border-bottom-color: var(--text-primary-color);\n      }\n\n      .indent-panel {\n        margin-left: 45px;\n      }\n\n      @media(max-width: 750px) {\n        .main-panel {\n          padding: 25px;\n        }\n        .indent-panel {\n          margin-left: 10px;\n        }\n      }\n\n      @media(max-width: 600px) {\n        .main-panel {\n          padding: 15px;\n        }\n        .indent-panel {\n          margin-left: 5px;\n        }\n      }\n\n      .row {\n        display: flex;\n        margin-bottom: 35px;\n      }\n\n      .row:last-child {\n        margin-bottom: 0;\n      }\n\n      .row > * {\n        flex : 1;\n        padding-right: 10px;\n        padding-left: 10px;\n      }\n      .row > *:first-child {\n        padding-left: 0;\n      }\n      .row > *:last-child {\n        padding-right: 0;\n      }\n\n      @media(max-width: 768px) {\n        .row {\n          display: block;\n        }\n        .row > * {\n          padding: 0px;\n        }\n      }\n\n      /* HEADER */\n      .header {\n        display: flex;\n        align-items: center;\n        background: var(--default-primary-color);\n        padding: 10px;\n      }\n\n      /* .header[sandbox] {\n        background: var(--default-secondary-color);\n      } */\n      \n      .header [main-title] {\n        flex: 1;\n        font-size: 22px;\n      }\n\n      .header [main-title] small {\n        font-size: 14px;\n      }\n\n      [icon="menu"], [main-title] {\n        color: var(--inverse-text-color);\n      }\n\n      paper-icon-button {\n        color: var(--inverse-text-color);\n      }\n\n      @media(max-width: 768px) {\n        [main-title] small {\n          display: none;\n        }\n      }\n    </style>\n  </template>\n</dom-module>'},function(e,t,n){const{AppStateInterface:i}=n(46);e.exports=(e=>(class extends(Mixin(e).with(i)){}))},function(e,t){e.exports={chemistry:{nitrogen:["N","15N"],carbon:["C","13C"],"defense compounds":["phenolic glycocide","condensed tannins"]},physiology:{fiber:["% Cellulose"],lignen:["% ADL","% ADF"],LMA:[],photosynthesis:["Vcmax","Jmax","Ev","A-Ci"],fluorescence:["fPAR","GPP"]},abiotic:{plastics:[],methane:[],ice:[]},pathogen:{mold:["late blight","early blight"],bacteria:[],virus:["PVY"],fungus:["verticilium"]},damage:{pests:[],herbicide:[]},production:{yield:[],"yield quality":[]}}},function(e,t,n){"use strict";n.d(t,"b",function(){return b}),n.d(t,"a",function(){return _});n(8);var i=n(28),a=n(20),r=n(7),s=n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let o=null;function l(){return o}l.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:l,writable:!0}});const h=Object(i.a)(l),c=Object(a.a)(h);const d=Object(i.a)(class{});class p extends d{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=this.children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let n=this.__templatizeOptions;(e&&n.instanceProps||!n.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,n){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,e=>{e.model=this,n(e)});else{let i=this.__dataHost.__dataHost;i&&i._addEventListenerToNode(e,t,n)}}_showHideChildren(e){let t=this.children;for(let n=0;n<t.length;n++){let i=t[n];if(Boolean(e)!=Boolean(i.__hideTemplateChildren__))if(i.nodeType===Node.TEXT_NODE)e?(i.__polymerTextContent__=i.textContent,i.textContent=""):i.textContent=i.__polymerTextContent__;else if("slot"===i.localName)if(e)i.__polymerReplaced__=document.createComment("hidden-slot"),Object(s.a)(Object(s.a)(i).parentNode).replaceChild(i.__polymerReplaced__,i);else{const e=i.__polymerReplaced__;e&&Object(s.a)(Object(s.a)(e).parentNode).replaceChild(i,e)}else i.style&&(e?(i.__polymerDisplay__=i.style.display,i.style.display="none"):i.style.display=i.__polymerDisplay__);i.__hideTemplateChildren__=e,i._showHideChildren&&i._showHideChildren(e)}}_setUnmanagedPropertyToNode(e,t,n){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=n:super._setUnmanagedPropertyToNode(e,t,n)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}p.prototype.__dataHost,p.prototype.__templatizeOptions,p.prototype._methodHost,p.prototype.__templatizeOwner,p.prototype.__hostProps;const u=Object(a.a)(p);function g(e){let t=e.__dataHost;return t&&t._methodHost||t}function f(e,t,n){let i=n.mutableData?u:p;b.mixin&&(i=b.mixin(i));let a=class extends i{};return a.prototype.__templatizeOptions=n,a.prototype._bindTemplate(e),function(e,t,n,i){let a=n.hostProps||{};for(let t in i.instanceProps){delete a[t];let n=i.notifyInstanceProp;n&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:y(t,n)})}if(i.forwardHostProp&&t.__dataHost)for(let t in a)e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,n){e.__dataHost._setPendingPropertyOrPath("_host_"+t,n[t],!0,!0)}})}(a,e,t,n),a}function m(e,t,n){let i=n.forwardHostProp;if(i){let a=t.templatizeTemplateClass;if(!a){let e=n.mutableData?c:h;a=t.templatizeTemplateClass=class extends e{};let r=t.hostProps;for(let e in r)a.prototype._addPropertyEffect("_host_"+e,a.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:v(e,i)}),a.prototype._createNotifyingProperty("_host_"+e)}!function(e,t){o=e,Object.setPrototypeOf(e,t.prototype),new t,o=null}(e,a),e.__dataProto&&Object.assign(e.__data,e.__dataProto),e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties()}}function v(e,t){return function(e,n,i){t.call(e.__templatizeOwner,n.substring("_host_".length),i[n])}}function y(e,t){return function(e,n,i){t.call(e.__templatizeOwner,e,n,i[n])}}function b(e,t,n){if(r.f&&!g(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(n=n||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let i=(t?t.constructor:p)._parseTemplate(e),a=i.templatizeInstanceClass;a||(a=f(e,i,n),i.templatizeInstanceClass=a),m(e,i,n);let s=class extends a{};return s.prototype._methodHost=g(e),s.prototype.__dataHost=e,s.prototype.__templatizeOwner=t,s.prototype.__hostProps=i.hostProps,s=s}function _(e,t){let n;for(;t;)if(n=t.__templatizeInstance){if(n.__dataHost==e)return n;t=n.__dataHost}else t=Object(s.a)(t).parentNode;return null}},function(e,t,n){var i=n(44),a=i.Buffer;function r(e,t){for(var n in e)t[n]=e[n]}function s(e,t,n){return a(e,t,n)}a.from&&a.alloc&&a.allocUnsafe&&a.allocUnsafeSlow?e.exports=i:(r(i,t),t.Buffer=s),r(a,s),s.from=function(e,t,n){if("number"==typeof e)throw new TypeError("Argument must not be a number");return a(e,t,n)},s.alloc=function(e,t,n){if("number"!=typeof e)throw new TypeError("Argument must be a number");var i=a(e);return void 0!==t?"string"==typeof n?i.fill(t,n):i.fill(t):i.fill(0),i},s.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return a(e)},s.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return i.SlowBuffer(e)}},function(e,t,n){"use strict";n(8);var i=n(7),a=n(9),r=n(36),s=n(15),o=n(33),l=n(28);const h=[];var c=n(42);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const d=Object(a.a)(e=>{const t=Object(c.a)(e);function n(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof a?t:null}function i(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const n=e.properties;n&&(t=function(e){const t={};for(let n in e){const i=e[n];t[n]="function"==typeof i?{type:i}:i}return t}(n))}e.__ownProperties=t}return e.__ownProperties}class a extends t{static get observedAttributes(){if(!this.hasOwnProperty("__observedAttributes")){e=this.prototype,h.push(e);const t=this._properties;this.__observedAttributes=t?Object.keys(t).map(e=>this.attributeNameForProperty(e)):[]}var e;return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=n(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=i(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=n(this);this.__properties=Object.assign({},e&&e._properties,i(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){0,this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return a});var p=n(3);n.d(t,"a",function(){return f});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const u="3.2.0",g=window.ShadyCSS&&window.ShadyCSS.cssBuild,f=Object(a.a)(e=>{const t=d(Object(l.a)(e));return class extends t{static get polymerElementVersion(){return u}static _finalizeClass(){super._finalizeClass();const e=((t=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",t))||(t.__ownObservers=t.hasOwnProperty(JSCompiler_renameProperty("observers",t))?t.observers:null),t.__ownObservers);var t;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):i.b||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let r in e)t=this.prototype,n=r,i=e[r],a=e,i.computed&&(i.readOnly=!0),i.computed&&(t._hasReadOnlyEffect(n)?console.warn(`Cannot redefine computed property '${n}'.`):t._createComputedProperty(n,i.computed,a)),i.readOnly&&!t._hasReadOnlyEffect(n)?t._createReadOnlyProperty(n,!i.computed):!1===i.readOnly&&t._hasReadOnlyEffect(n)&&console.warn(`Cannot make readOnly property '${n}' non-readOnly.`),i.reflectToAttribute&&!t._hasReflectEffect(n)?t._createReflectedProperty(n):!1===i.reflectToAttribute&&t._hasReflectEffect(n)&&console.warn(`Cannot make reflected property '${n}' non-reflected.`),i.notify&&!t._hasNotifyEffect(n)?t._createNotifyingProperty(n):!1===i.notify&&t._hasNotifyEffect(n)&&console.warn(`Cannot make notify property '${n}' non-notify.`),i.observer&&t._createPropertyObserver(n,i.observer,a[i.observer]),t._addPropertyToAttributeMap(n);var t,n,i,a}static createObservers(e,t){const n=this.prototype;for(let i=0;i<e.length;i++)n._createMethodObserver(e[i],t)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(e){let t=null;if(e&&(!i.f||i.a)&&(t=o.a.import(e,"template"),i.f&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=Object(s.a)(e.url);else{const e=o.a.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=i.d,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let n in t){let i=t[n];"value"in i&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[n]=i)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let n=e[t];if(!this.hasOwnProperty(t)){let e="function"==typeof n.value?n.value.call(this):n.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}static _processStyleText(e,t){return Object(s.b)(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const n=this.importPath;!function(e,t,n,i){if(!g){const a=t.content.querySelectorAll("style"),s=Object(r.c)(t),o=Object(r.b)(n),l=t.content.firstElementChild;for(let n=0;n<o.length;n++){let a=o[n];a.textContent=e._processStyleText(a.textContent,i),t.content.insertBefore(a,l)}let h=0;for(let t=0;t<s.length;t++){let n=s[t],r=a[h];r!==n?(n=n.cloneNode(!0),r.parentNode.insertBefore(n,r)):h++,n.textContent=e._processStyleText(n.textContent,i)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,n)}(this,t,e,n?Object(s.c)(n):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=Object(p.a)(this);if(t.attachShadow)return e?(t.shadowRoot||t.attachShadow({mode:"open"}),t.shadowRoot.appendChild(e),i.g&&window.ShadyDOM&&ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=Object(s.c)(this.importPath)),Object(s.c)(e,t)}static _parseTemplateContent(e,t,n){return t.dynamicFns=t.dynamicFns||this._properties,super._parseTemplateContent(e,t,n)}static _addTemplatePropertyEffect(e,t,n){return!i.b||t in this._properties||console.warn(`Property '${t}' used in template but not declared in 'properties'; `+"attribute will not be observed."),super._addTemplatePropertyEffect(e,t,n)}}})},function(e,t,n){"use strict";n(8);var i=n(3),a=n(9),r=n(6),s=n(17),o=n(43);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const l=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),h={"dom-if":!0,"dom-repeat":!0};function c(e){let t=e.getAttribute("is");if(t&&h[t]){let n=e;for(n.removeAttribute("is"),e=n.ownerDocument.createElement(t),n.parentNode.replaceChild(e,n),e.appendChild(n);n.attributes.length;)e.setAttribute(n.attributes[0].name,n.attributes[0].value),n.removeAttribute(n.attributes[0].name)}return e}function d(e,t){let n=t.parentInfo&&d(e,t.parentInfo);if(!n)return e;l.currentNode=n;for(let e=l.firstChild(),n=0;e;e=l.nextSibling())if(t.parentIndex===n++)return e}function p(e,t,n,i){i.id&&(t[i.id]=n)}function u(e,t,n){if(n.events&&n.events.length)for(let i,a=0,r=n.events;a<r.length&&(i=r[a]);a++)e._addMethodEventListenerToNode(t,i.name,i.value,e)}function g(e,t,n){n.templateInfo&&(t._templateInfo=n.templateInfo)}const f=Object(a.a)(e=>{return class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let n=e._templateInfo={};n.nodeInfoList=[],n.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,n,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,n){return this._parseTemplateNode(e.content,t,n)}static _parseTemplateNode(e,t,n){let i,a=e;return"template"!=a.localName||a.hasAttribute("preserve-content")?"slot"===a.localName&&(t.hasInsertionPoint=!0):i=this._parseTemplateNestedTemplate(a,t,n)||i,l.currentNode=a,l.firstChild()&&(i=this._parseTemplateChildNodes(a,t,n)||i),a.hasAttributes&&a.hasAttributes()&&(i=this._parseTemplateNodeAttributes(a,t,n)||i),i}static _parseTemplateChildNodes(e,t,n){if("script"!==e.localName&&"style"!==e.localName){l.currentNode=e;for(let i,a=l.firstChild(),r=0;a;a=i){if("template"==a.localName&&(a=c(a)),l.currentNode=a,i=l.nextSibling(),a.nodeType===Node.TEXT_NODE){let n=i;for(;n&&n.nodeType===Node.TEXT_NODE;)a.textContent+=n.textContent,i=l.nextSibling(),e.removeChild(n),n=i;if(t.stripWhiteSpace&&!a.textContent.trim()){e.removeChild(a);continue}}let s={parentIndex:r,parentInfo:n};this._parseTemplateNode(a,t,s)&&(s.infoIndex=t.nodeInfoList.push(s)-1),l.currentNode=a,l.parentNode()&&r++}}}static _parseTemplateNestedTemplate(e,t,n){let i=this._parseTemplate(e,t);return(i.content=e.content.ownerDocument.createDocumentFragment()).appendChild(e.content),n.templateInfo=i,!0}static _parseTemplateNodeAttributes(e,t,n){let i=!1,a=Array.from(e.attributes);for(let r,s=a.length-1;r=a[s];s--)i=this._parseTemplateNodeAttribute(e,t,n,r.name,r.value)||i;return i}static _parseTemplateNodeAttribute(e,t,n,i,a){return"on-"===i.slice(0,3)?(e.removeAttribute(i),n.events=n.events||[],n.events.push({name:i.slice(3),value:a}),!0):"id"===i&&(n.id=a,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let t=this.constructor._parseTemplate(e),n=t.nodeInfoList,i=t.content||e.content,a=document.importNode(i,!0);a.__noInsertionPoint=!t.hasInsertionPoint;let r=a.nodeList=new Array(n.length);a.$={};for(let e,t=0,i=n.length;t<i&&(e=n[t]);t++){let n=r[t]=d(a,e);p(0,a.$,n,e),g(0,n,e),u(this,n,e)}return a=a}_addMethodEventListenerToNode(e,t,n,i){let a=function(e,t,n){return e=e._methodHost||e,function(t){e[n]?e[n](t,t.detail):console.warn("listener method `"+n+"` not defined")}}(i=i||e,0,n);return this._addEventListenerToNode(e,t,a),a}_addEventListenerToNode(e,t,n){e.addEventListener(t,n)}_removeEventListenerFromNode(e,t,n){e.removeEventListener(t,n)}}});var m=n(7);n.d(t,"a",function(){return q});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
let v=0;const y={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},b=/[A-Z]/;function _(e,t){let n=e[t];if(n){if(!e.hasOwnProperty(t)){n=e[t]=Object.create(e[t]);for(let e in n){let t=n[e],i=n[e]=Array(t.length);for(let e=0;e<t.length;e++)i[e]=t[e]}}}else n=e[t]={};return n}function w(e,t,n,i,a,r){if(t){let s=!1,o=v++;for(let l in n)x(e,t,o,l,n,i,a,r)&&(s=!0);return s}return!1}function x(e,t,n,i,a,s,o,l){let h=!1,c=t[o?Object(r.g)(i):i];if(c)for(let t,r=0,d=c.length;r<d&&(t=c[r]);r++)t.info&&t.info.lastRun===n||o&&!k(i,t.trigger)||(t.info&&(t.info.lastRun=n),t.fn(e,i,a,s,t.info,o,l),h=!0);return h}function k(e,t){if(t){let n=t.name;return n==e||!(!t.structured||!Object(r.b)(n,e))||!(!t.wildcard||!Object(r.c)(n,e))}return!0}function z(e,t,n,i,a){let r="string"==typeof a.method?e[a.method]:a.method,s=a.property;r?r.call(e,e.__data[s],i[s]):a.dynamicFn||console.warn("observer method `"+a.method+"` not defined")}function S(e,t,n){let i=Object(r.g)(t);if(i!==t){return A(e,Object(s.a)(i)+"-changed",n[t],t),!0}return!1}function A(e,t,n,a){let r={value:n,queueProperty:!0};a&&(r.path=a),Object(i.a)(e).dispatchEvent(new CustomEvent(t,{detail:r}))}function C(e,t,n,i,a,s){let o=(s?Object(r.g)(t):t)!=t?t:null,l=o?Object(r.a)(e,o):e.__data[t];o&&void 0===l&&(l=n[t]),A(e,a.eventName,l,o)}function E(e,t,n,i,a){let r=e.__data[t];m.e&&(r=Object(m.e)(r,a.attrName,"attribute",e)),e._propertyToAttribute(t,a.attrName,r)}function M(e,t,n,i,a){let r=V(e,t,n,i,a),s=a.methodInfo;e.__dataHasAccessor&&e.__dataHasAccessor[s]?e._setPendingProperty(s,r,!0):e[s]=r}function P(e,t,n,i,a,r,o){n.bindings=n.bindings||[];let l={kind:i,target:a,parts:r,literal:o,isCompound:1!==r.length};if(n.bindings.push(l),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(l)){let{event:e,negate:t}=l.parts[0];l.listenerEvent=e||Object(s.a)(a)+"-changed",l.listenerNegate=t}let h=t.nodeInfoList.length;for(let n=0;n<l.parts.length;n++){let i=l.parts[n];i.compoundIndex=n,O(e,t,l,i,h)}}function O(e,t,n,i,a){if(!i.literal)if("attribute"===n.kind&&"-"===n.target[0])console.warn("Cannot set attribute "+n.target+' because "-" is not a valid attribute starting character');else{let r=i.dependencies,s={index:a,binding:n,part:i,evaluator:e};for(let n=0;n<r.length;n++){let i=r[n];"string"==typeof i&&((i=D(i)).wildcard=!0),e._addTemplatePropertyEffect(t,i.rootProperty,{fn:T,info:s,trigger:i})}}}function T(e,t,n,i,a,s,o){let l=o[a.index],h=a.binding,c=a.part;if(s&&c.source&&t.length>c.source.length&&"property"==h.kind&&!h.isCompound&&l.__isPropertyEffectsClient&&l.__dataHasAccessor&&l.__dataHasAccessor[h.target]){let i=n[t];t=Object(r.i)(c.source,h.target,t),l._setPendingPropertyOrPath(t,i,!1,!0)&&e._enqueueClient(l)}else{!function(e,t,n,i,a){a=function(e,t,n,i){if(n.isCompound){let a=e.__dataCompoundStorage[n.target];a[i.compoundIndex]=t,t=a.join("")}return"attribute"!==n.kind&&("textContent"!==n.target&&("value"!==n.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=void 0==t?"":t)),t}(t,a,n,i),m.e&&(a=Object(m.e)(a,n.target,n.kind,t));if("attribute"==n.kind)e._valueToNodeAttribute(t,a,n.target);else{let i=n.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[i]?t[y.READ_ONLY]&&t[y.READ_ONLY][i]||t._setPendingProperty(i,a)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,i,a)}}(e,l,h,c,a.evaluator._evaluateBinding(e,c,t,n,i,s))}}function L(e,t){if(t.isCompound){let n=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),i=t.parts,a=new Array(i.length);for(let e=0;e<i.length;e++)a[e]=i[e].literal;let r=t.target;n[r]=a,t.literal&&"property"==t.kind&&(e[r]=t.literal)}}function H(e,t,n){if(n.listenerEvent){let i=n.parts[0];e.addEventListener(n.listenerEvent,function(e){!function(e,t,n,i,a){let s,o=e.detail,l=o&&o.path;l?(i=Object(r.i)(n,i,l),s=o&&o.value):s=e.currentTarget[n],s=a?!s:s,t[y.READ_ONLY]&&t[y.READ_ONLY][i]||!t._setPendingPropertyOrPath(i,s,!0,Boolean(l))||o&&o.queueProperty||t._invalidateProperties()}(e,t,n.target,i.source,i.negate)})}}function I(e,t,n,i,a,r){r=t.static||r&&("object"!=typeof r||r[t.methodName]);let s={methodName:t.methodName,args:t.args,methodInfo:a,dynamicFn:r};for(let a,r=0;r<t.args.length&&(a=t.args[r]);r++)a.literal||e._addPropertyEffect(a.rootProperty,n,{fn:i,info:s,trigger:a});r&&e._addPropertyEffect(t.methodName,n,{fn:i,info:s})}function V(e,t,n,i,a){let r=e._methodHost||e,s=r[a.methodName];if(s){let i=e._marshalArgs(a.args,t,n);return s.apply(r,i)}a.dynamicFn||console.warn("method `"+a.methodName+"` not defined")}const R=[],N=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function j(e){let t="";for(let n=0;n<e.length;n++){t+=e[n].literal||""}return t}function B(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:R};if(t[2].trim()){return function(e,t){return t.args=e.map(function(e){let n=D(e);return n.literal||(t.static=!1),n},this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function D(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),n={name:t,value:"",literal:!1},i=t[0];switch("-"===i&&(i=t[1]),i>="0"&&i<="9"&&(i="#"),i){case"'":case'"':n.value=t.slice(1,-1),n.literal=!0;break;case"#":n.value=Number(t),n.literal=!0}return n.literal||(n.rootProperty=Object(r.g)(t),n.structured=Object(r.d)(t),n.structured&&(n.wildcard=".*"==t.slice(-2),n.wildcard&&(n.name=t.slice(0,-2)))),n}function $(e,t,n){let i=Object(r.a)(e,n);return void 0===i&&(i=t[n]),i}function F(e,t,n,i){e.notifyPath(n+".splices",{indexSplices:i}),e.notifyPath(n+".length",t.length)}function U(e,t,n,i,a,r){F(e,t,n,[{index:i,addedCount:a,removed:r,object:t,type:"splice"}])}const q=Object(a.a)(e=>{const t=f(Object(o.a)(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return y}_initializeProperties(){super._initializeProperties(),K.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[y.READ_ONLY];for(let n in e)t&&t[n]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[n]=this.__dataPending[n]=e[n])}_addPropertyEffect(e,t,n){this._createPropertyAccessor(e,t==y.READ_ONLY);let i=_(this,t)[e];i||(i=this[t][e]=[]),i.push(n)}_removePropertyEffect(e,t,n){let i=_(this,t)[e],a=i.indexOf(n);a>=0&&i.splice(a,1)}_hasPropertyEffect(e,t){let n=this[t];return Boolean(n&&n[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,y.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,y.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,y.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,y.COMPUTE)}_setPendingPropertyOrPath(e,t,n,i){if(i||Object(r.g)(Array.isArray(e)?e[0]:e)!==e){if(!i){let n=Object(r.a)(this,e);if(!(e=Object(r.h)(this,e,t))||!super._shouldPropertyChange(e,t,n))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,n))return function(e,t,n){let i=e.__dataLinkedPaths;if(i){let a;for(let s in i){let o=i[s];Object(r.c)(s,t)?(a=Object(r.i)(s,o,t),e._setPendingPropertyOrPath(a,n,!0,!0)):Object(r.c)(o,t)&&(a=Object(r.i)(o,s,t),e._setPendingPropertyOrPath(a,n,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,n);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,n){n===e[t]&&"object"!=typeof n||(e[t]=n)}_setPendingProperty(e,t,n){let i=this.__dataHasPaths&&Object(r.d)(e),a=i?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,a[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),i?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(i||this[y.NOTIFY]&&this[y.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=n),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let n=e[t];n.__dataEnabled?n.__dataPending&&n._flushProperties():n._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let n in e)!t&&this[y.READ_ONLY]&&this[y.READ_ONLY][n]||this._setPendingPropertyOrPath(n,e[n],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,n){let i=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,n,i){let a=e[y.COMPUTE];if(a){let r=t;for(;w(e,a,r,n,i);)Object.assign(n,e.__dataOld),Object.assign(t,e.__dataPending),r=e.__dataPending,e.__dataPending=null}}(this,t,n,i);let a=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(t,n,i),this._flushClients(),w(this,this[y.REFLECT],t,n,i),w(this,this[y.OBSERVE],t,n,i),a&&function(e,t,n,i,a){let r,s,o=e[y.NOTIFY],l=v++;for(let s in t)t[s]&&(o&&x(e,o,l,s,n,i,a)?r=!0:a&&S(e,s,n)&&(r=!0));r&&(s=e.__dataHost)&&s._invalidateProperties&&s._invalidateProperties()}(this,a,t,n,i),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,n){this[y.PROPAGATE]&&w(this,this[y.PROPAGATE],e,t,n);let i=this.__templateInfo;for(;i;)w(this,i.propertyEffects,e,t,n,i.nodeList),i=i.nextTemplateInfo}linkPaths(e,t){e=Object(r.f)(e),t=Object(r.f)(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=Object(r.f)(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let n={path:""};F(this,Object(r.a)(this,e,n),n.path,t)}get(e,t){return Object(r.a)(t||this,e)}set(e,t,n){n?Object(r.h)(n,e,t):this[y.READ_ONLY]&&this[y.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let n={path:""},i=Object(r.a)(this,e,n),a=i.length,s=i.push(...t);return t.length&&U(this,i,n.path,a,t.length,[]),s}pop(e){let t={path:""},n=Object(r.a)(this,e,t),i=Boolean(n.length),a=n.pop();return i&&U(this,n,t.path,n.length,0,[a]),a}splice(e,t,n,...i){let a,s={path:""},o=Object(r.a)(this,e,s);return t<0?t=o.length-Math.floor(-t):t&&(t=Math.floor(t)),a=2===arguments.length?o.splice(t):o.splice(t,n,...i),(i.length||a.length)&&U(this,o,s.path,t,i.length,a),a}shift(e){let t={path:""},n=Object(r.a)(this,e,t),i=Boolean(n.length),a=n.shift();return i&&U(this,n,t.path,0,0,[a]),a}unshift(e,...t){let n={path:""},i=Object(r.a)(this,e,n),a=i.unshift(...t);return t.length&&U(this,i,n.path,0,t.length,[]),a}notifyPath(e,t){let n;if(1==arguments.length){let i={path:""};t=Object(r.a)(this,e,i),n=i.path}else n=Array.isArray(e)?Object(r.f)(e):e;this._setPendingPropertyOrPath(n,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var n;this._addPropertyEffect(e,y.READ_ONLY),t&&(this["_set"+(n=e,n[0].toUpperCase()+n.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,n){let i={property:e,method:t,dynamicFn:Boolean(n)};this._addPropertyEffect(e,y.OBSERVE,{fn:z,info:i,trigger:{name:e}}),n&&this._addPropertyEffect(t,y.OBSERVE,{fn:z,info:i,trigger:{name:t}})}_createMethodObserver(e,t){let n=B(e);if(!n)throw new Error("Malformed observer expression '"+e+"'");I(this,n,y.OBSERVE,V,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,y.NOTIFY,{fn:C,info:{eventName:Object(s.a)(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,y.REFLECT,{fn:E,info:{attrName:t}})}_createComputedProperty(e,t,n){let i=B(t);if(!i)throw new Error("Malformed computed expression '"+t+"'");I(this,i,y.COMPUTE,M,e,n)}_marshalArgs(e,t,n){const i=this.__data,a=[];for(let s=0,o=e.length;s<o;s++){let{name:o,structured:l,wildcard:h,value:c,literal:d}=e[s];if(!d)if(h){const e=Object(r.c)(o,t),a=$(i,n,e?t:o);c={path:e?t:o,value:a,base:e?Object(r.a)(i,o):a}}else c=l?$(i,n,o):i[o];a[s]=c}return a}static addPropertyEffect(e,t,n){this.prototype._addPropertyEffect(e,t,n)}static createPropertyObserver(e,t,n){this.prototype._createPropertyObserver(e,t,n)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,n){this.prototype._createComputedProperty(e,t,n)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let n=this.constructor._parseTemplate(e),i=this.__templateInfo==n;if(!i)for(let e in n.propertyEffects)this._createPropertyAccessor(e);if(t&&((n=Object.create(n)).wasPreBound=i,!i&&this.__templateInfo)){let e=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=e.nextTemplateInfo=n,n.previousTemplateInfo=e,n}return this.__templateInfo=n}static _addTemplatePropertyEffect(e,t,n){(e.hostProps=e.hostProps||{})[t]=!0;let i=e.propertyEffects=e.propertyEffects||{};(i[t]=i[t]||[]).push(n)}_stampTemplate(e){K.beginHosting(this);let t=super._stampTemplate(e);K.endHosting(this);let n=this._bindTemplate(e,!0);if(n.nodeList=t.nodeList,!n.wasPreBound){let e=n.childNodes=[];for(let n=t.firstChild;n;n=n.nextSibling)e.push(n)}return t.templateInfo=n,function(e,t){let{nodeList:n,nodeInfoList:i}=t;if(i.length)for(let t=0;t<i.length;t++){let a=i[t],r=n[t],s=a.bindings;if(s)for(let t=0;t<s.length;t++){let n=s[t];L(r,n),H(r,e,n)}r.__dataHost=e}}(this,n),this.__dataReady&&w(this,n.propertyEffects,this.__data,null,!1,n.nodeList),t}_removeBoundDom(e){let t=e.templateInfo;t.previousTemplateInfo&&(t.previousTemplateInfo.nextTemplateInfo=t.nextTemplateInfo),t.nextTemplateInfo&&(t.nextTemplateInfo.previousTemplateInfo=t.previousTemplateInfo),this.__templateInfoLast==t&&(this.__templateInfoLast=t.previousTemplateInfo),t.previousTemplateInfo=t.nextTemplateInfo=null;let n=t.childNodes;for(let e=0;e<n.length;e++){let t=n[e];t.parentNode.removeChild(t)}}static _parseTemplateNode(e,t,n){let i=super._parseTemplateNode(e,t,n);if(e.nodeType===Node.TEXT_NODE){let a=this._parseBindings(e.textContent,t);a&&(e.textContent=j(a)||" ",P(this,t,n,"text","textContent",a),i=!0)}return i}static _parseTemplateNodeAttribute(e,t,n,i,a){let r=this._parseBindings(a,t);if(r){let a=i,o="property";b.test(i)?o="attribute":"$"==i[i.length-1]&&(i=i.slice(0,-1),o="attribute");let l=j(r);return l&&"attribute"==o&&("class"==i&&e.hasAttribute("class")&&(l+=" "+e.getAttribute(i)),e.setAttribute(i,l)),"input"===e.localName&&"value"===a&&e.setAttribute(a,""),e.removeAttribute(a),"property"===o&&(i=Object(s.b)(i)),P(this,t,n,o,i,r,l),!0}return super._parseTemplateNodeAttribute(e,t,n,i,a)}static _parseTemplateNestedTemplate(e,t,n){let i=super._parseTemplateNestedTemplate(e,t,n),a=n.templateInfo.hostProps;for(let e in a)P(this,t,n,"property","_host_"+e,[{mode:"{",source:e,dependencies:[e]}]);return i}static _parseBindings(e,t){let n,i=[],a=0;for(;null!==(n=N.exec(e));){n.index>a&&i.push({literal:e.slice(a,n.index)});let r=n[1][0],s=Boolean(n[2]),o=n[3].trim(),l=!1,h="",c=-1;"{"==r&&(c=o.indexOf("::"))>0&&(h=o.substring(c+2),o=o.substring(0,c),l=!0);let d=B(o),p=[];if(d){let{args:e,methodName:n}=d;for(let t=0;t<e.length;t++){let n=e[t];n.literal||p.push(n)}let i=t.dynamicFns;(i&&i[n]||d.static)&&(p.push(n),d.dynamicFn=!0)}else p.push(o);i.push({source:o,mode:r,negate:s,customEvent:l,signature:d,dependencies:p,event:h}),a=N.lastIndex}if(a&&a<e.length){let t=e.substring(a);t&&i.push({literal:t})}return i.length?i:null}static _evaluateBinding(e,t,n,i,a,s){let o;return o=t.signature?V(e,n,i,0,t.signature):n!=t.source?Object(r.a)(e,t.source):s&&Object(r.d)(n)?Object(r.a)(e,n):e.__data[n],t.negate&&(o=!o),o}}});const K=new class{constructor(){this.stack=[]}registerHost(e){this.stack.length&&this.stack[this.stack.length-1]._enqueueClient(e)}beginHosting(e){this.stack.push(e)}endHosting(e){let t=this.stack.length;t&&this.stack[t-1]==e&&this.stack.pop()}}},function(e,t,n){"use strict";n.d(t,"b",function(){return V}),n.d(t,"c",function(){return R}),n.d(t,"d",function(){return j}),n.d(t,"a",function(){return K});n(8);var i=n(11),a=n(13),r=n(7),s=n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let o="string"==typeof document.head.style.touchAction,l="__polymerGestures",h="__polymerGesturesHandled",c="__polymerGesturesTouchAction",d=25,p=5,u=2500,g=["mousedown","mousemove","mouseup","click"],f=[0,1,4,2],m=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function v(e){return g.indexOf(e)>-1}let y=!1;function b(e){if(!v(e)&&"touchend"!==e)return o&&y&&r.c?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){y=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let _=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const w=[],x={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},k={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function z(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];let n=e.getRootNode();if(e.id){let i=n.querySelectorAll(`label[for = ${e.id}]`);for(let e=0;e<i.length;e++)t.push(i[e])}}return t}let S=function(e){let t=e.sourceCapabilities;var n;if((!t||t.firesTouchEvents)&&(e[h]={skip:!0},"click"===e.type)){let t=!1,i=O(e);for(let e=0;e<i.length;e++){if(i[e].nodeType===Node.ELEMENT_NODE)if("label"===i[e].localName)w.push(i[e]);else if(n=i[e],x[n.localName]){let n=z(i[e]);for(let e=0;e<n.length;e++)t=t||w.indexOf(n[e])>-1}if(i[e]===E.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function A(e){let t=_?["click"]:g;for(let n,i=0;i<t.length;i++)n=t[i],e?(w.length=0,document.addEventListener(n,S,!0)):document.removeEventListener(n,S,!0)}function C(e){let t=e.type;if(!v(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!m&&(t=f[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let E={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function M(e,t,n){e.movefn=t,e.upfn=n,document.addEventListener("mousemove",t),document.addEventListener("mouseup",n)}function P(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}document.addEventListener("touchend",function(e){E.mouse.mouseIgnoreJob||A(!0),E.mouse.target=O(e)[0],E.mouse.mouseIgnoreJob=a.a.debounce(E.mouse.mouseIgnoreJob,i.b.after(u),function(){A(),E.mouse.target=null,E.mouse.mouseIgnoreJob=null})},!!y&&{passive:!0});const O=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],T={},L=[];function H(e){const t=O(e);return t.length>0?t[0]:e.target}function I(e){let t,n=e.type,i=e.currentTarget[l];if(!i)return;let a=i[n];if(a){if(!e[h]&&(e[h]={},"touch"===n.slice(0,5))){let t=(e=e).changedTouches[0];if("touchstart"===n&&1===e.touches.length&&(E.touch.id=t.identifier),E.touch.id!==t.identifier)return;o||"touchstart"!==n&&"touchmove"!==n||function(e){let t=e.changedTouches[0],n=e.type;if("touchstart"===n)E.touch.x=t.clientX,E.touch.y=t.clientY,E.touch.scrollDecided=!1;else if("touchmove"===n){if(E.touch.scrollDecided)return;E.touch.scrollDecided=!0;let n=function(e){let t="auto",n=O(e);for(let e,i=0;i<n.length;i++)if((e=n[i])[c]){t=e[c];break}return t}(e),i=!1,a=Math.abs(E.touch.x-t.clientX),r=Math.abs(E.touch.y-t.clientY);e.cancelable&&("none"===n?i=!0:"pan-x"===n?i=r>a:"pan-y"===n&&(i=a>r)),i?e.preventDefault():D("track")}}(e)}if(!(t=e[h]).skip){for(let n,i=0;i<L.length;i++)a[(n=L[i]).name]&&!t[n.name]&&n.flow&&n.flow.start.indexOf(e.type)>-1&&n.reset&&n.reset();for(let i,r=0;r<L.length;r++)a[(i=L[r]).name]&&!t[i.name]&&(t[i.name]=!0,i[n](e))}}}function V(e,t,n){return!!T[t]&&(function(e,t,n){let i=T[t],a=i.deps,r=i.name,s=e[l];s||(e[l]=s={});for(let t,n,i=0;i<a.length;i++)t=a[i],_&&v(t)&&"click"!==t||((n=s[t])||(s[t]=n={_count:0}),0===n._count&&e.addEventListener(t,I,b(t)),n[r]=(n[r]||0)+1,n._count=(n._count||0)+1);e.addEventListener(t,n),i.touchAction&&j(e,i.touchAction)}(e,t,n),!0)}function R(e,t,n){return!!T[t]&&(function(e,t,n){let i=T[t],a=i.deps,r=i.name,s=e[l];if(s)for(let t,n,i=0;i<a.length;i++)t=a[i],(n=s[t])&&n[r]&&(n[r]=(n[r]||1)-1,n._count=(n._count||1)-1,0===n._count&&e.removeEventListener(t,I,b(t)));e.removeEventListener(t,n)}(e,t,n),!0)}function N(e){L.push(e);for(let t=0;t<e.emits.length;t++)T[e.emits[t]]=e}function j(e,t){o&&e instanceof HTMLElement&&i.a.run(()=>{e.style.touchAction=t}),e[c]=t}function B(e,t,n){let i=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(i.detail=n,Object(s.a)(e).dispatchEvent(i),i.defaultPrevented){let e=n.preventer||n.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function D(e){let t=function(e){for(let t,n=0;n<L.length;n++){t=L[n];for(let n,i=0;i<t.emits.length;i++)if((n=t.emits[i])===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function $(e,t,n,i){t&&B(t,e,{x:n.clientX,y:n.clientY,sourceEvent:n,preventer:i,prevent:function(e){return D(e)}})}function F(e,t,n){if(e.prevent)return!1;if(e.started)return!0;let i=Math.abs(e.x-t),a=Math.abs(e.y-n);return i>=p||a>=p}function U(e,t,n){if(!t)return;let i,a=e.moves[e.moves.length-2],r=e.moves[e.moves.length-1],s=r.x-e.x,o=r.y-e.y,l=0;a&&(i=r.x-a.x,l=r.y-a.y),B(t,"track",{state:e.state,x:n.clientX,y:n.clientY,dx:s,dy:o,ddx:i,ddy:l,sourceEvent:n,hover:function(){return function(e,t){let n=document.elementFromPoint(e,t),i=n;for(;i&&i.shadowRoot&&!window.ShadyDOM&&i!==(i=i.shadowRoot.elementFromPoint(e,t));)i&&(n=i);return n}(n.clientX,n.clientY)}})}function q(e,t,n){let i=Math.abs(t.clientX-e.x),a=Math.abs(t.clientY-e.y),r=H(n||t);!r||k[r.localName]&&r.hasAttribute("disabled")||(isNaN(i)||isNaN(a)||i<=d&&a<=d||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=H(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let n=t.getBoundingClientRect(),i=e.pageX,a=e.pageY;return!(i>=n.left&&i<=n.right&&a>=n.top&&a<=n.bottom)}return!1}(t))&&(e.prevent||B(r,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:n}))}N({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){P(this.info)},mousedown:function(e){if(!C(e))return;let t=H(e),n=this;M(this.info,function(e){C(e)||($("up",t,e),P(n.info))},function(e){C(e)&&$("up",t,e),P(n.info)}),$("down",t,e)},touchstart:function(e){$("down",H(e),e.changedTouches[0],e)},touchend:function(e){$("up",H(e),e.changedTouches[0],e)}}),N({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,P(this.info)},mousedown:function(e){if(!C(e))return;let t=H(e),n=this,i=function(e){let i=e.clientX,a=e.clientY;F(n.info,i,a)&&(n.info.state=n.info.started?"mouseup"===e.type?"end":"track":"start","start"===n.info.state&&D("tap"),n.info.addMove({x:i,y:a}),C(e)||(n.info.state="end",P(n.info)),t&&U(n.info,t,e),n.info.started=!0)};M(this.info,i,function(e){n.info.started&&i(e),P(n.info)}),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=H(e),n=e.changedTouches[0],i=n.clientX,a=n.clientY;F(this.info,i,a)&&("start"===this.info.state&&D("tap"),this.info.addMove({x:i,y:a}),U(this.info,t,n),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=H(e),n=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:n.clientX,y:n.clientY}),U(this.info,t,n))}}),N({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){C(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){C(e)&&q(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){q(this.info,e.changedTouches[0],e)}});const K=V},function(e,t,n){var i=n(26).Buffer;function a(e,t){this._block=i.alloc(e),this._finalSize=t,this._blockSize=e,this._len=0}a.prototype.update=function(e,t){"string"==typeof e&&(t=t||"utf8",e=i.from(e,t));for(var n=this._block,a=this._blockSize,r=e.length,s=this._len,o=0;o<r;){for(var l=s%a,h=Math.min(r-o,a-l),c=0;c<h;c++)n[l+c]=e[o+c];o+=h,(s+=h)%a==0&&this._update(n)}return this._len+=r,this},a.prototype.digest=function(e){var t=this._len%this._blockSize;this._block[t]=128,this._block.fill(0,t+1),t>=this._finalSize&&(this._update(this._block),this._block.fill(0));var n=8*this._len;if(n<=4294967295)this._block.writeUInt32BE(n,this._blockSize-4);else{var i=(4294967295&n)>>>0,a=(n-i)/4294967296;this._block.writeUInt32BE(a,this._blockSize-8),this._block.writeUInt32BE(i,this._blockSize-4)}this._update(this._block);var r=this._hash();return e?r.toString(e):r},a.prototype._update=function(){throw new Error("_update must be implemented by subclass")},e.exports=a},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e,t){e.exports=(e=>(class extends e{constructor(){super(),this._injectModel("SearchModel")}_appendSearchFilter(e,t){return this.SearchModel.appendFilter(e,t)}_removeSearchFilter(e,t){return this.SearchModel.removeFilter(e,t)}_setSearchText(e){return this.SearchModel.setText(e)}_setSearchLimit(e){return this.SearchModel.setLimit(e)}_setSearchOffset(e){return this.SearchModel.setOffset(e)}async _searchPackages(e){return this.SearchModel.search(e)}_searchQueryToUrl(e){return this.SearchModel.toUrl(e)}_urlToSearchQuery(e){return this.SearchModel.fromUrl(e)}_getEmptySearchQuery(){return this.SearchModel.getEmptyQuery()}_getOwnerPackages(e){return this.SearchModel.getOwnerPackages(e)}}))},function(e,t,n){"use strict";n.d(t,"a",function(){return h});n(8);var i=n(15),a=n(7);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let r={},s={};function o(e,t){r[e]=s[e.toLowerCase()]=t}function l(e){return r[e]||s[e.toLowerCase()]}class h extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let n=l(e);return n&&t?n.querySelector(t):n}return null}attributeChangedCallback(e,t,n,i){t!==n&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=Object(i.c)(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=Object(i.a)(t)}return this.__assetpath}register(e){if(e=e||this.id){if(a.f&&void 0!==l(e))throw o(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,o(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}h.prototype.modules=r,customElements.define("dom-module",h)},function(e,t,n){"use strict";var i=n(12);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class a{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function r(e){return function e(t,n){let i=n.substring(t.start,t.end-1);t.parsedCssText=t.cssText=i.trim();if(t.parent){let e=t.previous?t.previous.end:t.parent.start;i=n.substring(e,t.start-1),i=(i=(i=i.replace(/\\([0-9a-f]{1,6})\s/gi,function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e})).replace(c.multipleSpaces," ")).substring(i.lastIndexOf(";")+1);let a=t.parsedSelector=t.selector=i.trim();t.atRule=0===a.indexOf(u),t.atRule?0===a.indexOf(p)?t.type=o.MEDIA_RULE:a.match(c.keyframesRule)&&(t.type=o.KEYFRAMES_RULE,t.keyframesName=t.selector.split(c.multipleSpaces).pop()):0===a.indexOf(d)?t.type=o.MIXIN_RULE:t.type=o.STYLE_RULE}let a=t.rules;if(a)for(let t,i=0,r=a.length;i<r&&(t=a[i]);i++)e(t,n);return t}(function(e){let t=new a;t.start=0,t.end=e.length;let n=t;for(let i=0,r=e.length;i<r;i++)if(e[i]===l){n.rules||(n.rules=[]);let e=n,t=e.rules[e.rules.length-1]||null;(n=new a).start=i+1,n.parent=e,n.previous=t,e.rules.push(n)}else e[i]===h&&(n.end=i+1,n=n.parent||t);return t}(e=e.replace(c.comments,"").replace(c.port,"")),e)}function s(e,t,n=""){let i="";if(e.cssText||e.rules){let n=e.rules;if(n&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(d)}(n))for(let e,a=0,r=n.length;a<r&&(e=n[a]);a++)i=s(e,t,i);else(i=(i=t?e.cssText:function(e){return function(e){return e.replace(c.mixinApply,"").replace(c.varApply,"")}(e=function(e){return e.replace(c.customProp,"").replace(c.mixinProp,"")}(e))}(e.cssText)).trim())&&(i="  "+i+"\n")}return i&&(e.selector&&(n+=e.selector+" "+l+"\n"),n+=i,e.selector&&(n+=h+"\n\n")),n}const o={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},l="{",h="}",c={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},d="--",p="@media",u="@";var g=n(18);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const f=new Set,m="shady-unscoped";function v(e){const t=e.textContent;if(!f.has(t)){f.add(t);const n=e.cloneNode(!0);document.head.appendChild(n)}}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function y(e,t){return e?("string"==typeof e&&(e=r(e)),t&&_(e,t),s(e,i.c)):""}function b(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=r(e.textContent)),e.__cssRules||null}function _(e,t,n,i){if(!e)return;let a=!1,r=e.type;if(i&&r===o.MEDIA_RULE){let t=e.selector.match(g.a);t&&(window.matchMedia(t[1]).matches||(a=!0))}r===o.STYLE_RULE?t(e):n&&r===o.KEYFRAMES_RULE?n(e):r===o.MIXIN_RULE&&(a=!0);let s=e.rules;if(s&&!a)for(let e,a=0,r=s.length;a<r&&(e=s[a]);a++)_(e,t,n,i)}function w(e,t){let n=0;for(let i=t,a=e.length;i<a;i++)if("("===e[i])n++;else if(")"===e[i]&&0==--n)return i;return-1}window.ShadyDOM&&window.ShadyDOM.wrap;const x="css-build";function k(e){if(void 0!==i.a)return i.a;if(void 0===e.__cssBuild){const t=e.getAttribute(x);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===x)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}(e),e.__cssBuild=t}}return e.__cssBuild||""}function z(e){return""!==k(e)}var S=n(21);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const A=/;\s*/m,C=/^\s*(initial)|(inherit)\s*$/,E=/\s*!important/,M="_-_";class P{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let O=null;class T{constructor(){this._currentElement=null,this._measureElement=null,this._map=new P}detectMixin(e){return Object(S.a)(e)}gatherStyles(e){const t=function(e){const t=[],n=e.querySelectorAll("style");for(let e=0;e<n.length;e++){const a=n[e];a.hasAttribute(m)?i.d||(v(a),a.parentNode.removeChild(a)):(t.push(a.textContent),a.parentNode.removeChild(a))}return t.join("").trim()}(e.content);if(t){const n=document.createElement("style");return n.textContent=t,e.content.insertBefore(n,e.content.firstChild),n}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const n=e._gatheredStyle;return n?this.transformStyle(n,t):null}transformStyle(e,t=""){let n=b(e);return this.transformRules(n,t),e.textContent=y(n),n}transformCustomStyle(e){let t=b(e);return _(t,e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)}),e.textContent=y(t),t}transformRules(e,t){this._currentElement=t,_(e,e=>{this.transformRule(e)}),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(g.c,(e,n,i,a)=>this._produceCssProperties(e,n,i,a,t)),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const n={};let i=!1;return _(t,t=>{(i=i||t===e)||t.selector===e.selector&&Object.assign(n,this._cssTextToMap(t.parsedCssText))}),n}_consumeCssProperties(e,t){let n=null;for(;n=g.b.exec(e);){let i=n[0],a=n[1],r=n.index,s=r+i.indexOf("@apply"),o=r+i.length,l=e.slice(0,s),h=e.slice(o),c=t?this._fallbacksFromPreviousRules(t):{};Object.assign(c,this._cssTextToMap(l));let d=this._atApplyToCssProperties(a,c);e=`${l}${d}${h}`,g.b.lastIndex=r+d.length}return e}_atApplyToCssProperties(e,t){e=e.replace(A,"");let n=[],i=this._map.get(e);if(i||(this._map.set(e,{}),i=this._map.get(e)),i){let a,r,s;this._currentElement&&(i.dependants[this._currentElement]=!0);const o=i.properties;for(a in o)s=t&&t[a],r=[a,": var(",e,M,a],s&&r.push(",",s.replace(E,"")),r.push(")"),E.test(o[a])&&r.push(" !important"),n.push(r.join(""))}return n.join("; ")}_replaceInitialOrInherit(e,t){let n=C.exec(t);return n&&(t=n[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let n,i,a=e.split(";"),r={};for(let e,s,o=0;o<a.length;o++)(e=a[o])&&(s=e.split(":")).length>1&&(n=s[0].trim(),i=s.slice(1).join(":"),t&&(i=this._replaceInitialOrInherit(n,i)),r[n]=i);return r}_invalidateMixinEntry(e){if(O)for(let t in e.dependants)t!==this._currentElement&&O(t)}_produceCssProperties(e,t,n,i,a){if(n&&function e(t,n){let i=t.indexOf("var(");if(-1===i)return n(t,"","","");let a=w(t,i+3),r=t.substring(i+4,a),s=t.substring(0,i),o=e(t.substring(a+1),n),l=r.indexOf(",");return-1===l?n(s,r.trim(),"",o):n(s,r.substring(0,l).trim(),r.substring(l+1).trim(),o)}(n,(e,t)=>{t&&this._map.get(t)&&(i=`@apply ${t};`)}),!i)return e;let r=this._consumeCssProperties(""+i,a),s=e.slice(0,e.indexOf("--")),o=this._cssTextToMap(r,!0),l=o,h=this._map.get(t),c=h&&h.properties;c?l=Object.assign(Object.create(c),o):this._map.set(t,l);let d,p,u=[],g=!1;for(d in l)void 0===(p=o[d])&&(p="initial"),!c||d in c||(g=!0),u.push(`${t}${M}${d}: ${p}`);return g&&this._invalidateMixinEntry(h),h&&(h.properties=l),n&&(s=`${e};${s}`),`${s}${u.join("; ")};`}}T.prototype.detectMixin=T.prototype.detectMixin,T.prototype.transformStyle=T.prototype.transformStyle,T.prototype.transformCustomStyle=T.prototype.transformCustomStyle,T.prototype.transformRules=T.prototype.transformRules,T.prototype.transformRule=T.prototype.transformRule,T.prototype.transformTemplate=T.prototype.transformTemplate,T.prototype._separator=M,Object.defineProperty(T.prototype,"invalidCallback",{get:()=>O,set(e){O=e}});var L=T;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/var H={};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const I="_applyShimCurrentVersion",V="_applyShimNextVersion",R="_applyShimValidatingVersion",N=Promise.resolve();function j(e){let t=H[e];t&&function(e){e[I]=e[I]||0,e[R]=e[R]||0,e[V]=(e[V]||0)+1}(t)}function B(e){return e[I]===e[V]}function D(e){return!B(e)&&e[R]===e[V]}function $(e){e[R]=e[V],e._validating||(e._validating=!0,N.then(function(){e[I]=e[V],e._validating=!1}))}n(48);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const F=new L;if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new class{constructor(){this.customStyleInterface=null,F.invalidCallback=j}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=(e=>{F.transformCustomStyle(e)}),this.customStyleInterface.validateCallback=(()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})}))}prepareTemplate(e,t){if(this.ensure(),z(e))return;H[t]=e;let n=F.transformTemplate(e,t);e._styleAst=n}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let n=e[t],i=this.customStyleInterface.getStyleForCustomStyle(n);i&&F.transformCustomStyle(i)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&Object(S.c)(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,n="",i="";return t?t.indexOf("-")>-1?n=t:(i=t,n=e.getAttribute&&e.getAttribute("is")||""):(n=e.is,i=e.extends),{is:n,typeExtension:i}}(e),n=H[t];if((!n||!z(n))&&n&&!B(n)){D(n)||(this.prepareTemplate(n,t),$(n));let i=e.shadowRoot;if(i){let e=i.querySelector("style");e&&(e.__cssRules=n._styleAst,e.textContent=y(n._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}};let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,n,i){e.flushCustomStyles(),e.prepareTemplate(t,n)},prepareTemplateStyles(e,t,n){window.ShadyCSS.prepareTemplate(e,t,n)},prepareTemplateDom(e,t){},styleSubtree(t,n){e.flushCustomStyles(),e.styleSubtree(t,n)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>Object(S.b)(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:i.c,nativeShadow:i.d,cssBuild:i.a,disableRuntime:i.b},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=F;var U=n(27),q=n(41),K=n(43),G=n(9);
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const Y=/:host\(:dir\((ltr|rtl)\)\)/g,W=':host([dir="$1"])',J=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,X=':host([dir="$2"]) $1',Q=/:dir\((?:ltr|rtl)\)/,Z=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),ee=[];let te=null,ne="";function ie(){ne=document.documentElement.getAttribute("dir")}function ae(e){if(!e.__autoDirOptOut){e.setAttribute("dir",ne)}}function re(){ie(),ne=document.documentElement.getAttribute("dir");for(let e=0;e<ee.length;e++)ae(ee[e])}const se=Object(G.a)(e=>{Z||te||(ie(),(te=new MutationObserver(re)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=Object(K.a)(e);class n extends t{static _processStyleText(e,t){return e=super._processStyleText(e,t),!Z&&Q.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=(t=t.replace(Y,W)).replace(J,X)}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(te&&te.takeRecords().length&&re(),ee.push(this),ae(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=ee.indexOf(this);e>-1&&ee.splice(e,1)}}}return n.__activateDir=!1,n});n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function oe(){document.body.removeAttribute("unresolved")}"interactive"===document.readyState||"complete"===document.readyState?oe():window.addEventListener("DOMContentLoaded",oe);var le=n(1),he=n(29),ce=n(13),de=n(11),pe=n(6),ue=n(3);n.d(t,"a",function(){return fe});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let ge=window.ShadyCSS;const fe=Object(G.a)(e=>{const t=se(Object(q.a)(Object(U.a)(e))),n={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class i extends t{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(e,t,n,i){t!==n&&(super.attributeChangedCallback(e,t,n,i),this.attributeChanged(e,t,n))}attributeChanged(e,t,n){}_initializeProperties(){let e=Object.getPrototypeOf(this);e.hasOwnProperty("__hasRegisterFinished")||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),this._applyListeners()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,n){this._propertyToAttribute(e,t,n)}serializeValueToAttribute(e,t,n){this._valueToNodeAttribute(n||this,e,t)}extend(e,t){if(!e||!t)return e||t;let n=Object.getOwnPropertyNames(t);for(let i,a=0;a<n.length&&(i=n[a]);a++){let n=Object.getOwnPropertyDescriptor(t,i);n&&Object.defineProperty(e,i,n)}return e}mixin(e,t){for(let n in t)e[n]=t[n];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,n){n=n||{},t=null===t||void 0===t?{}:t;let i=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});i.detail=t;let a=n.node||this;return Object(ue.a)(a).dispatchEvent(i),i}listen(e,t,n){e=e||this;let i=this.__boundListeners||(this.__boundListeners=new WeakMap),a=i.get(e);a||(a={},i.set(e,a));let r=t+n;a[r]||(a[r]=this._addMethodEventListenerToNode(e,t,n,this))}unlisten(e,t,n){e=e||this;let i=this.__boundListeners&&this.__boundListeners.get(e),a=t+n,r=i&&i[a];r&&(this._removeEventListenerFromNode(e,t,r),i[a]=null)}setScrollDirection(e,t){Object(he.d)(t||this,n[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=Object(ue.a)(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=Object(le.a)(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return Object(le.a)(this).getEffectiveChildNodes()}queryDistributedElements(e){return Object(le.a)(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter(function(e){return e.nodeType===Node.ELEMENT_NODE})}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let n,i=0;n=e[i];i++)n.nodeType!==Node.COMMENT_NODE&&t.push(n.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?Object(le.a)(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter(function(e){return e.nodeType===Node.ELEMENT_NODE})}isLightDescendant(e){return this!==e&&Object(ue.a)(this).contains(e)&&Object(ue.a)(this).getRootNode()===Object(ue.a)(e).getRootNode()}isLocalDescendant(e){return this.root===Object(ue.a)(e).getRootNode()}scopeSubtree(e,t){}getComputedStyleValue(e){return ge.getComputedStyleValue(this,e)}debounce(e,t,n){return this._debouncers=this._debouncers||{},this._debouncers[e]=ce.a.debounce(this._debouncers[e],n>0?de.b.after(n):de.a,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?de.b.run(e.bind(this),t):~de.a.run(e.bind(this))}cancelAsync(e){e<0?de.a.cancel(~e):de.b.cancel(e)}create(e,t){let n=document.createElement(e);if(t)if(n.setProperties)n.setProperties(t);else for(let e in t)n[e]=t[e];return n}elementMatches(e,t){return Object(le.b)(t||this,e)}toggleAttribute(e,t){let n=this;return 3===arguments.length&&(n=arguments[2]),1==arguments.length&&(t=!n.hasAttribute(e)),t?(Object(ue.a)(n).setAttribute(e,""),!0):(Object(ue.a)(n).removeAttribute(e),!1)}toggleClass(e,t,n){n=n||this,1==arguments.length&&(t=!n.classList.contains(e)),t?n.classList.add(e):n.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,n,i){i=i||this,this.transform("translate3d("+e+","+t+","+n+")",i)}arrayDelete(e,t){let n;if(Array.isArray(e)){if((n=e.indexOf(t))>=0)return e.splice(n,1)}else{if((n=Object(pe.a)(this,e).indexOf(t))>=0)return this.splice(e,n,1)}return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return i.prototype.is="",i})},function(e,t,n){const i=n(61).EventEmitter;e.exports=new class extends i{constructor(){super(),this.setMaxListeners(1e4)}}},function(e,t,n){"use strict";n.d(t,"c",function(){return p}),n.d(t,"b",function(){return u}),n.d(t,"a",function(){return f});var i=n(33),a=n(15);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r="link[rel=import][type~=css]",s="include",o="shady-unscoped";function l(e){return i.a.import(e)}function h(e){let t=e.body?e.body:e;const n=Object(a.b)(t.textContent,e.baseURI),i=document.createElement("style");return i.textContent=n,i}function c(e){const t=e.trim().split(/\s+/),n=[];for(let e=0;e<t.length;e++)n.push(...d(t[e]));return n}function d(e){const t=l(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...g(t));const n=t.querySelector("template");n&&e.push(...p(n,t.assetpath)),t._styles=e}return t._styles}function p(e,t){if(!e._styles){const n=[],i=e.content.querySelectorAll("style");for(let e=0;e<i.length;e++){let r=i[e],o=r.getAttribute(s);o&&n.push(...c(o).filter(function(e,t,n){return n.indexOf(e)===t})),t&&(r.textContent=Object(a.b)(r.textContent,t)),n.push(r)}e._styles=n}return e._styles}function u(e){let t=l(e);return t?g(t):[]}function g(e){const t=[],n=e.querySelectorAll(r);for(let e=0;e<n.length;e++){let i=n[e];if(i.import){const e=i.import,n=i.hasAttribute(o);if(n&&!e._unscopedStyle){const t=h(e);t.setAttribute(o,""),e._unscopedStyle=t}else e._style||(e._style=h(e));t.push(n?e._unscopedStyle:e._style)}}return t}function f(e){let t=e.trim().split(/\s+/),n="";for(let e=0;e<t.length;e++)n+=m(t[e]);return n}function m(e){let t=l(e);if(t&&void 0===t._cssText){let e=v(t),n=t.querySelector("template");n&&(e+=function(e,t){let n="";const i=p(e,t);for(let e=0;e<i.length;e++){let t=i[e];t.parentNode&&t.parentNode.removeChild(t),n+=t.textContent}return n}(n,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}function v(e){let t="",n=g(e);for(let e=0;e<n.length;e++)t+=n[e].textContent;return t}},function(e,t,n){"use strict";var i=n(48),a=n(21),r=n(12);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const s=new i.a;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,n){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,n){},styleSubtree(e,t){s.processStyles(),Object(a.c)(e,t)},styleElement(e){s.processStyles()},styleDocument(e){s.processStyles(),Object(a.c)(document.body,e)},getComputedStyleValue:(e,t)=>Object(a.b)(e,t),flushCustomStyles(){},nativeCss:r.c,nativeShadow:r.d,cssBuild:r.a,disableRuntime:r.b}),window.ShadyCSS.CustomStyleInterface=s;var o=n(36);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const l="include",h=window.ShadyCSS.CustomStyleInterface;window.customElements.define("custom-style",class extends HTMLElement{constructor(){super(),this._style=null,h.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(l);return t&&(e.removeAttribute(l),e.textContent=Object(o.a)(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}})},function(e,t,n){const{BaseModel:i}=n(10),a=n(134),r=n(45),s=n(133).package;e.exports=new class extends i{constructor(){super(),this.schema=s,this.store=r,this.service=a,this.EventBus.on("app-state-update",e=>{"package"===e.page&&this.get(e.location.path[1])}),this.register("PackageModel")}async create(e,t,n,i,a,r){return this.service.create(e,t,n,i,a,r)}async get(e){let t=this.store.data.byId[e];return t&&t.request?await t.request:await this.service.get(e),this.store.data.byId[e]}async update(e,t,n){try{await this.service.update(e,t,n)}catch(e){console.error(e)}return this.store.data.update}async delete(e){return this.service.delete(e)}async createRelease(e,t){try{await this.service.createRelease(e,t)}catch(e){}return this.store.data.createRelease}async getFiles(e){let t=this.store.getFiles(e);return t&&t.request?await t.request:await this.service.getFiles(e),this.store.getFiles(e)}async previewMarkdown(e,t){let n=this.store.data.markdown[t]||{};return"loading"===n.state?await n.request:"loaded"!==n.state&&await this.service.previewMarkdown(e,t),this.store.data.markdown[t]}setSelectedPackageId(e){this.store.setSelectedPackageId(e)}getSelectedPackageId(e){return this.store.getSelectedPackageId(e)}}},function(e,t){e.exports='<custom-style>\n  <style is="custom-style">\n    html {\n      --default-primary-color : #00867d;\n      --primary-color         : var(--default-primary-color); /* alt name */\n      --light-primary-color   : #4db6ac;\n      --default-secondary-color : #2286c3;\n      --light-secondary-color   : #64b5f6;\n      --default-background-color : #F5F5F6;\n      --dark-background-color    : #E1E2E1;\n      --extra-dark-background-color : #616161;\n      \n      --text-primary-color      : #313534;\n      --text-light-color        : #4d5251;\n      --primary-text-color      : var(--text-primary-color);\n      --secondary-text-color    : #8c9794;\n      --disabled-text-color     : #aaa;\n      --inverse-text-color      : var(--default-background-color);\n      --max-width               : 1200px;\n      --max-text-width          : 650px;\n      --font-size               : 16px;\n      --font-weight             : 400;\n      --font-weight-heavy       : 700;\n      --form-break-margin       : 75px;\n      --color-red               : #d32f2f;\n      --color-orange            : #ff9800;\n      --color-green             : #388e3c;\n      /**\n       * Global Element Styles\n       */\n      /* paper-input */\n      --paper-input-container-color: var(--secondary-text-color);\n    }\n    body, html {\n      @apply --paper-font-common-base;\n      font-size        : var(--font-size);\n      font-weight      : var(--font-weight);\n      margin           : 0;\n      padding          : 0;\n      height           : 100%;\n      background-color : var(--default-background-color);\n      color            : var(--text-primary-color);\n      font-weight      : 400;\n    }\n  </style>\n</custom-style>'},function(e,t,n){"use strict";n.d(t,"a",function(){return h});n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function i(e,t,n){return{index:e,removed:t,addedCount:n}}const a=0,r=1,s=2,o=3;function l(e,t,n,l,h,d){let p,u=0,g=0,f=Math.min(n-t,d-h);if(0==t&&0==h&&(u=function(e,t,n){for(let i=0;i<n;i++)if(!c(e[i],t[i]))return i;return n}(e,l,f)),n==e.length&&d==l.length&&(g=function(e,t,n){let i=e.length,a=t.length,r=0;for(;r<n&&c(e[--i],t[--a]);)r++;return r}(e,l,f-u)),h+=u,d-=g,(n-=g)-(t+=u)==0&&d-h==0)return[];if(t==n){for(p=i(t,[],0);h<d;)p.removed.push(l[h++]);return[p]}if(h==d)return[i(t,[],n-t)];let m=function(e){let t=e.length-1,n=e[0].length-1,i=e[t][n],l=[];for(;t>0||n>0;){if(0==t){l.push(s),n--;continue}if(0==n){l.push(o),t--;continue}let h,c=e[t-1][n-1],d=e[t-1][n],p=e[t][n-1];(h=d<p?d<c?d:c:p<c?p:c)==c?(c==i?l.push(a):(l.push(r),i=c),t--,n--):h==d?(l.push(o),t--,i=d):(l.push(s),n--,i=p)}return l.reverse(),l}(function(e,t,n,i,a,r){let s=r-a+1,o=n-t+1,l=new Array(s);for(let e=0;e<s;e++)l[e]=new Array(o),l[e][0]=e;for(let e=0;e<o;e++)l[0][e]=e;for(let n=1;n<s;n++)for(let r=1;r<o;r++)if(c(e[t+r-1],i[a+n-1]))l[n][r]=l[n-1][r-1];else{let e=l[n-1][r]+1,t=l[n][r-1]+1;l[n][r]=e<t?e:t}return l}(e,t,n,l,h,d));p=void 0;let v=[],y=t,b=h;for(let e=0;e<m.length;e++)switch(m[e]){case a:p&&(v.push(p),p=void 0),y++,b++;break;case r:p||(p=i(y,[],0)),p.addedCount++,y++,p.removed.push(l[b]),b++;break;case s:p||(p=i(y,[],0)),p.addedCount++,y++;break;case o:p||(p=i(y,[],0)),p.removed.push(l[b]),b++}return p&&v.push(p),v}function h(e,t){return l(e,0,e.length,t,0,t.length)}function c(e,t){return e===t}},function(e,t,n){"use strict";n.d(t,"a",function(){return r});n(8);var i=n(9),a=n(29);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r=Object(i.a)(e=>{return class extends e{_addEventListenerToNode(e,t,n){Object(a.b)(e,t,n)||super._addEventListenerToNode(e,t,n)}_removeEventListenerFromNode(e,t,n){Object(a.c)(e,t,n)||super._removeEventListenerFromNode(e,t,n)}}})},function(e,t,n){"use strict";n.d(t,"a",function(){return o});n(8);var i=n(9),a=n(11),r=n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const s=a.a,o=Object(i.a)(e=>{return class extends e{static createProperties(e){const t=this.prototype;for(let n in e)n in t||t._createPropertyAccessor(n)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[e]){const t=this.constructor.attributeNameForProperty(e);this.__dataAttributes[t]=e}}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this._getProperty(e)},set:t?function(){}:function(t){this._setProperty(e,t)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,n){let i=this.__data[e],a=this._shouldPropertyChange(e,t,i);return a&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||e in this.__dataOld||(this.__dataOld[e]=i),this.__data[e]=t,this.__dataPending[e]=t),a}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,s.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const e=this.__data,t=this.__dataPending,n=this.__dataOld;this._shouldPropertiesChange(e,t,n)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,n))}_shouldPropertiesChange(e,t,n){return Boolean(t)}_propertiesChanged(e,t,n){}_shouldPropertyChange(e,t,n){return n!==t&&(n==n||t==t)}attributeChangedCallback(e,t,n,i){t!==n&&this._attributeToProperty(e,n),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,n,i)}_attributeToProperty(e,t,n){if(!this.__serializing){const i=this.__dataAttributes,a=i&&i[e]||e;this[a]=this._deserializeValue(t,n||this.constructor.typeForProperty(a))}}_propertyToAttribute(e,t,n){this.__serializing=!0,n=arguments.length<3?this[e]:n,this._valueToNodeAttribute(this,n,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,n){const i=this._serializeValue(t);void 0===i?e.removeAttribute(n):("class"!==n&&"name"!==n&&"slot"!==n||(e=Object(r.a)(e)),e.setAttribute(n,i))}_serializeValue(e){switch(typeof e){case"boolean":return e?"":void 0;default:return null!=e?e.toString():void 0}}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}})},function(e,t,n){"use strict";n.d(t,"a",function(){return l});n(8);var i=n(9),a=n(17),r=n(42);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const s={};let o=HTMLElement.prototype;for(;o;){let e=Object.getOwnPropertyNames(o);for(let t=0;t<e.length;t++)s[e[t]]=!0;o=Object.getPrototypeOf(o)}const l=Object(i.a)(e=>{const t=Object(r.a)(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(Object(a.b)(e[t]))}static attributeNameForProperty(e){return Object(a.a)(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const n=this;n.hasAttribute(e)||this._valueToNodeAttribute(n,t,e)}_serializeValue(e){switch(typeof e){case"object":if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}default:return super._serializeValue(e)}}_deserializeValue(e,t){let n;switch(t){case Object:try{n=JSON.parse(e)}catch(t){n=e}break;case Array:try{n=JSON.parse(e)}catch(t){n=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:n=isNaN(e)?String(e):Number(e),n=new Date(n);break;default:n=super._deserializeValue(e,t)}return n}_definePropertyAccessor(e,t){!function(e,t){if(!s[t]){let n=e[t];void 0!==n&&(e.__data?e._setPendingProperty(t,n):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=n))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}})},function(e,t,n){"use strict";(function(e){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var i=n(128),a=n(127),r=n(126);function s(){return l.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function o(e,t){if(s()<t)throw new RangeError("Invalid typed array length");return l.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=l.prototype:(null===e&&(e=new l(t)),e.length=t),e}function l(e,t,n){if(!(l.TYPED_ARRAY_SUPPORT||this instanceof l))return new l(e,t,n);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return d(this,e)}return h(this,e,t,n)}function h(e,t,n,i){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function(e,t,n,i){if(t.byteLength,n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(i||0))throw new RangeError("'length' is out of bounds");t=void 0===n&&void 0===i?new Uint8Array(t):void 0===i?new Uint8Array(t,n):new Uint8Array(t,n,i);l.TYPED_ARRAY_SUPPORT?(e=t).__proto__=l.prototype:e=p(e,t);return e}(e,t,n,i):"string"==typeof t?function(e,t,n){"string"==typeof n&&""!==n||(n="utf8");if(!l.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var i=0|g(t,n),a=(e=o(e,i)).write(t,n);a!==i&&(e=e.slice(0,a));return e}(e,t,n):function(e,t){if(l.isBuffer(t)){var n=0|u(t.length);return 0===(e=o(e,n)).length?e:(t.copy(e,0,0,n),e)}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||(i=t.length)!=i?o(e,0):p(e,t);if("Buffer"===t.type&&r(t.data))return p(e,t.data)}var i;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function c(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function d(e,t){if(c(t),e=o(e,t<0?0:0|u(t)),!l.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function p(e,t){var n=t.length<0?0:0|u(t.length);e=o(e,n);for(var i=0;i<n;i+=1)e[i]=255&t[i];return e}function u(e){if(e>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|e}function g(e,t){if(l.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var i=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return B(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return D(e).length;default:if(i)return B(e).length;t=(""+t).toLowerCase(),i=!0}}function f(e,t,n){var i=e[t];e[t]=e[n],e[n]=i}function m(e,t,n,i,a){if(0===e.length)return-1;if("string"==typeof n?(i=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=a?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(a)return-1;n=e.length-1}else if(n<0){if(!a)return-1;n=0}if("string"==typeof t&&(t=l.from(t,i)),l.isBuffer(t))return 0===t.length?-1:v(e,t,n,i,a);if("number"==typeof t)return t&=255,l.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?a?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):v(e,[t],n,i,a);throw new TypeError("val must be string, number or Buffer")}function v(e,t,n,i,a){var r,s=1,o=e.length,l=t.length;if(void 0!==i&&("ucs2"===(i=String(i).toLowerCase())||"ucs-2"===i||"utf16le"===i||"utf-16le"===i)){if(e.length<2||t.length<2)return-1;s=2,o/=2,l/=2,n/=2}function h(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(a){var c=-1;for(r=n;r<o;r++)if(h(e,r)===h(t,-1===c?0:r-c)){if(-1===c&&(c=r),r-c+1===l)return c*s}else-1!==c&&(r-=r-c),c=-1}else for(n+l>o&&(n=o-l),r=n;r>=0;r--){for(var d=!0,p=0;p<l;p++)if(h(e,r+p)!==h(t,p)){d=!1;break}if(d)return r}return-1}function y(e,t,n,i){n=Number(n)||0;var a=e.length-n;i?(i=Number(i))>a&&(i=a):i=a;var r=t.length;if(r%2!=0)throw new TypeError("Invalid hex string");i>r/2&&(i=r/2);for(var s=0;s<i;++s){var o=parseInt(t.substr(2*s,2),16);if(isNaN(o))return s;e[n+s]=o}return s}function b(e,t,n,i){return $(B(t,e.length-n),e,n,i)}function _(e,t,n,i){return $(function(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}(t),e,n,i)}function w(e,t,n,i){return _(e,t,n,i)}function x(e,t,n,i){return $(D(t),e,n,i)}function k(e,t,n,i){return $(function(e,t){for(var n,i,a,r=[],s=0;s<e.length&&!((t-=2)<0);++s)n=e.charCodeAt(s),i=n>>8,a=n%256,r.push(a),r.push(i);return r}(t,e.length-n),e,n,i)}function z(e,t,n){return 0===t&&n===e.length?i.fromByteArray(e):i.fromByteArray(e.slice(t,n))}function S(e,t,n){n=Math.min(e.length,n);for(var i=[],a=t;a<n;){var r,s,o,l,h=e[a],c=null,d=h>239?4:h>223?3:h>191?2:1;if(a+d<=n)switch(d){case 1:h<128&&(c=h);break;case 2:128==(192&(r=e[a+1]))&&(l=(31&h)<<6|63&r)>127&&(c=l);break;case 3:r=e[a+1],s=e[a+2],128==(192&r)&&128==(192&s)&&(l=(15&h)<<12|(63&r)<<6|63&s)>2047&&(l<55296||l>57343)&&(c=l);break;case 4:r=e[a+1],s=e[a+2],o=e[a+3],128==(192&r)&&128==(192&s)&&128==(192&o)&&(l=(15&h)<<18|(63&r)<<12|(63&s)<<6|63&o)>65535&&l<1114112&&(c=l)}null===c?(c=65533,d=1):c>65535&&(c-=65536,i.push(c>>>10&1023|55296),c=56320|1023&c),i.push(c),a+=d}return function(e){var t=e.length;if(t<=A)return String.fromCharCode.apply(String,e);var n="",i=0;for(;i<t;)n+=String.fromCharCode.apply(String,e.slice(i,i+=A));return n}(i)}t.Buffer=l,t.SlowBuffer=function(e){+e!=e&&(e=0);return l.alloc(+e)},t.INSPECT_MAX_BYTES=50,l.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}(),t.kMaxLength=s(),l.poolSize=8192,l._augment=function(e){return e.__proto__=l.prototype,e},l.from=function(e,t,n){return h(null,e,t,n)},l.TYPED_ARRAY_SUPPORT&&(l.prototype.__proto__=Uint8Array.prototype,l.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&l[Symbol.species]===l&&Object.defineProperty(l,Symbol.species,{value:null,configurable:!0})),l.alloc=function(e,t,n){return function(e,t,n,i){return c(t),t<=0?o(e,t):void 0!==n?"string"==typeof i?o(e,t).fill(n,i):o(e,t).fill(n):o(e,t)}(null,e,t,n)},l.allocUnsafe=function(e){return d(null,e)},l.allocUnsafeSlow=function(e){return d(null,e)},l.isBuffer=function(e){return!(null==e||!e._isBuffer)},l.compare=function(e,t){if(!l.isBuffer(e)||!l.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,i=t.length,a=0,r=Math.min(n,i);a<r;++a)if(e[a]!==t[a]){n=e[a],i=t[a];break}return n<i?-1:i<n?1:0},l.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},l.concat=function(e,t){if(!r(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return l.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var i=l.allocUnsafe(t),a=0;for(n=0;n<e.length;++n){var s=e[n];if(!l.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(i,a),a+=s.length}return i},l.byteLength=g,l.prototype._isBuffer=!0,l.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)f(this,t,t+1);return this},l.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)f(this,t,t+3),f(this,t+1,t+2);return this},l.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)f(this,t,t+7),f(this,t+1,t+6),f(this,t+2,t+5),f(this,t+3,t+4);return this},l.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?S(this,0,e):function(e,t,n){var i=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return M(this,t,n);case"utf8":case"utf-8":return S(this,t,n);case"ascii":return C(this,t,n);case"latin1":case"binary":return E(this,t,n);case"base64":return z(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return P(this,t,n);default:if(i)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),i=!0}}.apply(this,arguments)},l.prototype.equals=function(e){if(!l.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===l.compare(this,e)},l.prototype.inspect=function(){var e="",n=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(e+=" ... ")),"<Buffer "+e+">"},l.prototype.compare=function(e,t,n,i,a){if(!l.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===i&&(i=0),void 0===a&&(a=this.length),t<0||n>e.length||i<0||a>this.length)throw new RangeError("out of range index");if(i>=a&&t>=n)return 0;if(i>=a)return-1;if(t>=n)return 1;if(t>>>=0,n>>>=0,i>>>=0,a>>>=0,this===e)return 0;for(var r=a-i,s=n-t,o=Math.min(r,s),h=this.slice(i,a),c=e.slice(t,n),d=0;d<o;++d)if(h[d]!==c[d]){r=h[d],s=c[d];break}return r<s?-1:s<r?1:0},l.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},l.prototype.indexOf=function(e,t,n){return m(this,e,t,n,!0)},l.prototype.lastIndexOf=function(e,t,n){return m(this,e,t,n,!1)},l.prototype.write=function(e,t,n,i){if(void 0===t)i="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)i=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,void 0===i&&(i="utf8")):(i=n,n=void 0)}var a=this.length-t;if((void 0===n||n>a)&&(n=a),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");i||(i="utf8");for(var r=!1;;)switch(i){case"hex":return y(this,e,t,n);case"utf8":case"utf-8":return b(this,e,t,n);case"ascii":return _(this,e,t,n);case"latin1":case"binary":return w(this,e,t,n);case"base64":return x(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return k(this,e,t,n);default:if(r)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),r=!0}},l.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var A=4096;function C(e,t,n){var i="";n=Math.min(e.length,n);for(var a=t;a<n;++a)i+=String.fromCharCode(127&e[a]);return i}function E(e,t,n){var i="";n=Math.min(e.length,n);for(var a=t;a<n;++a)i+=String.fromCharCode(e[a]);return i}function M(e,t,n){var i=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>i)&&(n=i);for(var a="",r=t;r<n;++r)a+=j(e[r]);return a}function P(e,t,n){for(var i=e.slice(t,n),a="",r=0;r<i.length;r+=2)a+=String.fromCharCode(i[r]+256*i[r+1]);return a}function O(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function T(e,t,n,i,a,r){if(!l.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>a||t<r)throw new RangeError('"value" argument is out of bounds');if(n+i>e.length)throw new RangeError("Index out of range")}function L(e,t,n,i){t<0&&(t=65535+t+1);for(var a=0,r=Math.min(e.length-n,2);a<r;++a)e[n+a]=(t&255<<8*(i?a:1-a))>>>8*(i?a:1-a)}function H(e,t,n,i){t<0&&(t=4294967295+t+1);for(var a=0,r=Math.min(e.length-n,4);a<r;++a)e[n+a]=t>>>8*(i?a:3-a)&255}function I(e,t,n,i,a,r){if(n+i>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function V(e,t,n,i,r){return r||I(e,0,n,4),a.write(e,t,n,i,23,4),n+4}function R(e,t,n,i,r){return r||I(e,0,n,8),a.write(e,t,n,i,52,8),n+8}l.prototype.slice=function(e,t){var n,i=this.length;if(e=~~e,t=void 0===t?i:~~t,e<0?(e+=i)<0&&(e=0):e>i&&(e=i),t<0?(t+=i)<0&&(t=0):t>i&&(t=i),t<e&&(t=e),l.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,t)).__proto__=l.prototype;else{var a=t-e;n=new l(a,void 0);for(var r=0;r<a;++r)n[r]=this[r+e]}return n},l.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||O(e,t,this.length);for(var i=this[e],a=1,r=0;++r<t&&(a*=256);)i+=this[e+r]*a;return i},l.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||O(e,t,this.length);for(var i=this[e+--t],a=1;t>0&&(a*=256);)i+=this[e+--t]*a;return i},l.prototype.readUInt8=function(e,t){return t||O(e,1,this.length),this[e]},l.prototype.readUInt16LE=function(e,t){return t||O(e,2,this.length),this[e]|this[e+1]<<8},l.prototype.readUInt16BE=function(e,t){return t||O(e,2,this.length),this[e]<<8|this[e+1]},l.prototype.readUInt32LE=function(e,t){return t||O(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},l.prototype.readUInt32BE=function(e,t){return t||O(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},l.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||O(e,t,this.length);for(var i=this[e],a=1,r=0;++r<t&&(a*=256);)i+=this[e+r]*a;return i>=(a*=128)&&(i-=Math.pow(2,8*t)),i},l.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||O(e,t,this.length);for(var i=t,a=1,r=this[e+--i];i>0&&(a*=256);)r+=this[e+--i]*a;return r>=(a*=128)&&(r-=Math.pow(2,8*t)),r},l.prototype.readInt8=function(e,t){return t||O(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},l.prototype.readInt16LE=function(e,t){t||O(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},l.prototype.readInt16BE=function(e,t){t||O(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},l.prototype.readInt32LE=function(e,t){return t||O(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},l.prototype.readInt32BE=function(e,t){return t||O(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},l.prototype.readFloatLE=function(e,t){return t||O(e,4,this.length),a.read(this,e,!0,23,4)},l.prototype.readFloatBE=function(e,t){return t||O(e,4,this.length),a.read(this,e,!1,23,4)},l.prototype.readDoubleLE=function(e,t){return t||O(e,8,this.length),a.read(this,e,!0,52,8)},l.prototype.readDoubleBE=function(e,t){return t||O(e,8,this.length),a.read(this,e,!1,52,8)},l.prototype.writeUIntLE=function(e,t,n,i){(e=+e,t|=0,n|=0,i)||T(this,e,t,n,Math.pow(2,8*n)-1,0);var a=1,r=0;for(this[t]=255&e;++r<n&&(a*=256);)this[t+r]=e/a&255;return t+n},l.prototype.writeUIntBE=function(e,t,n,i){(e=+e,t|=0,n|=0,i)||T(this,e,t,n,Math.pow(2,8*n)-1,0);var a=n-1,r=1;for(this[t+a]=255&e;--a>=0&&(r*=256);)this[t+a]=e/r&255;return t+n},l.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,1,255,0),l.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},l.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,2,65535,0),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):L(this,e,t,!0),t+2},l.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,2,65535,0),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):L(this,e,t,!1),t+2},l.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,4,4294967295,0),l.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):H(this,e,t,!0),t+4},l.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,4,4294967295,0),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):H(this,e,t,!1),t+4},l.prototype.writeIntLE=function(e,t,n,i){if(e=+e,t|=0,!i){var a=Math.pow(2,8*n-1);T(this,e,t,n,a-1,-a)}var r=0,s=1,o=0;for(this[t]=255&e;++r<n&&(s*=256);)e<0&&0===o&&0!==this[t+r-1]&&(o=1),this[t+r]=(e/s>>0)-o&255;return t+n},l.prototype.writeIntBE=function(e,t,n,i){if(e=+e,t|=0,!i){var a=Math.pow(2,8*n-1);T(this,e,t,n,a-1,-a)}var r=n-1,s=1,o=0;for(this[t+r]=255&e;--r>=0&&(s*=256);)e<0&&0===o&&0!==this[t+r+1]&&(o=1),this[t+r]=(e/s>>0)-o&255;return t+n},l.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,1,127,-128),l.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},l.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,2,32767,-32768),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):L(this,e,t,!0),t+2},l.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,2,32767,-32768),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):L(this,e,t,!1),t+2},l.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,4,2147483647,-2147483648),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):H(this,e,t,!0),t+4},l.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||T(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):H(this,e,t,!1),t+4},l.prototype.writeFloatLE=function(e,t,n){return V(this,e,t,!0,n)},l.prototype.writeFloatBE=function(e,t,n){return V(this,e,t,!1,n)},l.prototype.writeDoubleLE=function(e,t,n){return R(this,e,t,!0,n)},l.prototype.writeDoubleBE=function(e,t,n){return R(this,e,t,!1,n)},l.prototype.copy=function(e,t,n,i){if(n||(n=0),i||0===i||(i=this.length),t>=e.length&&(t=e.length),t||(t=0),i>0&&i<n&&(i=n),i===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(i<0)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),e.length-t<i-n&&(i=e.length-t+n);var a,r=i-n;if(this===e&&n<t&&t<i)for(a=r-1;a>=0;--a)e[a+t]=this[a+n];else if(r<1e3||!l.TYPED_ARRAY_SUPPORT)for(a=0;a<r;++a)e[a+t]=this[a+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+r),t);return r},l.prototype.fill=function(e,t,n,i){if("string"==typeof e){if("string"==typeof t?(i=t,t=0,n=this.length):"string"==typeof n&&(i=n,n=this.length),1===e.length){var a=e.charCodeAt(0);a<256&&(e=a)}if(void 0!==i&&"string"!=typeof i)throw new TypeError("encoding must be a string");if("string"==typeof i&&!l.isEncoding(i))throw new TypeError("Unknown encoding: "+i)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;var r;if(t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(r=t;r<n;++r)this[r]=e;else{var s=l.isBuffer(e)?e:B(new l(e,i).toString()),o=s.length;for(r=0;r<n-t;++r)this[r+t]=s[r%o]}return this};var N=/[^+\/0-9A-Za-z-_]/g;function j(e){return e<16?"0"+e.toString(16):e.toString(16)}function B(e,t){var n;t=t||1/0;for(var i=e.length,a=null,r=[],s=0;s<i;++s){if((n=e.charCodeAt(s))>55295&&n<57344){if(!a){if(n>56319){(t-=3)>-1&&r.push(239,191,189);continue}if(s+1===i){(t-=3)>-1&&r.push(239,191,189);continue}a=n;continue}if(n<56320){(t-=3)>-1&&r.push(239,191,189),a=n;continue}n=65536+(a-55296<<10|n-56320)}else a&&(t-=3)>-1&&r.push(239,191,189);if(a=null,n<128){if((t-=1)<0)break;r.push(n)}else if(n<2048){if((t-=2)<0)break;r.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;r.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;r.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return r}function D(e){return i.toByteArray(function(e){if((e=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e).replace(N,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function $(e,t,n,i){for(var a=0;a<i&&!(a+n>=t.length||a>=e.length);++a)t[a+n]=e[a];return a}}).call(this,n(58))},function(e,t,n){const{BaseStore:i}=n(10);e.exports=new class extends i{constructor(){super(),this.ignoreFiles=[],this.data={selectedPackageId:"",create:{},update:{},delete:{},createRelease:{},files:{},fileUploadStatus:{},byId:{},markdown:{}},this.events={PACKAGE_MARKDOWN_UPDATE:"package-markdown-update",SELECTED_PACKAGE_UPDATE:"selected-package-update",PACKAGE_UPDATE:"package-update",CREATE_PACKAGE_UPDATE:"create-package-update",EDIT_PACKAGE_UPDATE:"edit-package-update",DELETE_PACKAGE_UPDATE:"delete-package-update",CREATE_PACKAGE_RELEASE_UPDATE:"create-package-release-update",FILE_UPDATE:"file-update",UPLOAD_FILE_STATUS_UPDATE:"upload-file-status-update"}}setMarkdownLoading(e,t){this._setMarkdownState({id:e,request:t,state:this.STATE.LOADING})}setMarkdownLoaded(e,t){this._setMarkdownState({id:e,payload:t,state:this.STATE.LOADED})}setMarkdownError(e,t){this._setMarkdownState({id:e,error:t,state:this.STATE.ERROR})}_setMarkdownState(e){this.data.markdown[e.id]=e,this.emit(this.events.PACKAGE_MARKDOWN_UPDATE,e)}setCreatePackageLoading(e,t){this._setCreatePackageState({request:e,payload:t,state:this.STATE.LOADING})}setCreatePackageSuccess(e){this._setCreatePackageState({payload:e,state:this.STATE.LOADED}),this.setSelectedPackageId(e.id)}setCreatePackageError(e){this._setCreatePackageState({error:e,state:this.STATE.ERROR})}_setCreatePackageState(e){this.data.create=e,this.emit(this.events.CREATE_PACKAGE_UPDATE,this.data.create)}setUpdatePackageLoading(e,t){this._setUpdatePackageState({request:e,payload:t,state:this.STATE.LOADING})}setUpdatePackageSuccess(e){this._setUpdatePackageState({payload:e,state:this.STATE.LOADED})}setUpdatePackageError(e){this._setUpdatePackageState({error:e,state:this.STATE.ERROR})}_setUpdatePackageState(e){this.data.update=e,this.emit(this.events.EDIT_PACKAGE_UPDATE,this.data.update)}setGetPackageLoading(e,t){this._setPackageState(e,{request:t,id:e,state:this.STATE.LOADING})}setGetPackageSuccess(e,t){this._setPackageState(e,{payload:t,id:e,state:this.STATE.LOADED})}setGetPackageError(e,t){this._setPackageState(e,{error:t,id:e,state:this.STATE.ERROR})}_setPackageState(e,t){this.data.byId[e]=t,this.emit(this.events.PACKAGE_UPDATE,this.data.byId[e])}setDeletingPackage(e,t){this._setDeletePackageState({request:e,payload:t,state:this.STATE.LOADING})}setDeletePackageSuccess(e){this._setDeletePackageState({payload:e,state:this.STATE.LOADED})}setDeletePackageError(e){this._setDeletePackageState({error:e,state:this.STATE.ERROR})}_setDeletePackageState(e){this.data.delete=e,this.emit(this.events.DELETE_PACKAGE_UPDATE,this.data.delete)}setCreateReleaseLoading(e,t){this._setCreateReleaseState({request:e,payload:t,state:this.STATE.LOADING})}setCreateReleaseSuccess(e){this._setCreateReleaseState({payload:e,state:this.STATE.LOADED}),this._setPackageState(e.id,{payload:e,id:e.id,state:this.STATE.LOADED})}setCreateReleaseError(e){this._setCreateReleaseState({error:e,state:this.STATE.ERROR})}_setCreateReleaseState(e){this.data.createRelease=e,this.emit(this.events.CREATE_PACKAGE_RELEASE_UPDATE,this.data.createRelease)}getFiles(e){return this.data.files[e]}onFileUploadProgress(e,t){this.data.fileUploadStatus[e]={id:e,status:t},this.emit(this.events.UPLOAD_FILE_STATUS_UPDATE,this.data.fileUploadStatus[e])}onFileUploadStart(e,t){t.id=this._createFileId(t);let n={id:t.id,packageId:e,payload:t,state:"uploading"};this._setFileState(e,n)}onFilesLoaded(e,t=[]){t=t.filter(e=>-1===this.ignoreFiles.indexOf(e.filename)).forEach(t=>{this.onFileLoaded(e,t)})}onFileLoaded(e,t){t.id=this._createFileId(t);let n={id:t.id,packageId:e,payload:t,state:this.STATE.LOADED};this._setFileState(e,n)}onFileError(e,t,n){t.id=this._createFileId(t);let i={id:t.id,packageId:e,error:n,payload:t,state:this.STATE.ERROR};this._setFileState(e,i)}_setFileState(e,t){this.data.files[e]||(this.data.files[e]={}),this.data.files[e][t.id]=t,this.emit(this.events.FILE_UPDATE,this.data.files[e][t.id])}setSelectedPackageId(e){this.data.selectedPackageId={id:e},this.emit(this.events.SELECTED_PACKAGE_UPDATE,this.data.selectedPackageId)}getSelectedPackageId(){return this.data.selectedPackageId}_createFileId(e){let t="";return e.dir.match(/\/$/)||(t="/"),e.dir+t+e.filename}}},function(e,t,n){e.exports={AppStateInterface:n(49),AppStateModel:n(137),AppStateStore:n(136),"app-route":n(51)}},function(e,t,n){n(61).EventEmitter;e.exports=new class{constructor(){this.models={}}registerModel(e,t){if(this.models[e])throw new Error(`A model has already been registered with name: ${e}`);this.models[e]=t}getModel(e){if(!this.models[e])throw new Error(`No model has been registered with name: ${e}`);return this.models[e]}}},function(e,t,n){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i,a=null,r=window.HTMLImports&&window.HTMLImports.whenReady||null;function s(e){requestAnimationFrame(function(){r?r(e):(a||(a=new Promise(e=>{i=e}),"complete"===document.readyState?i():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&i()})),a.then(function(){e&&e()}))})}n.d(t,"a",function(){return d});const o="__seenByShadyCSS",l="__shadyCSSCachedStyle";let h=null,c=null;class d{constructor(){this.customStyles=[],this.enqueued=!1,s(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&c&&(this.enqueued=!0,s(c))}addCustomStyle(e){e[o]||(e[o]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[l])return e[l];let t;return t=e.getStyle?e.getStyle():e}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const n=e[t];if(n[l])continue;const i=this.getStyleForCustomStyle(n);if(i){const e=i.__appliedElement||i;h&&h(e),n[l]=e}}return e}}d.prototype.addCustomStyle=d.prototype.addCustomStyle,d.prototype.getStyleForCustomStyle=d.prototype.getStyleForCustomStyle,d.prototype.processStyles=d.prototype.processStyles,Object.defineProperties(d.prototype,{transformCallback:{get:()=>h,set(e){h=e}},validateCallback:{get:()=>c,set(e){let t=!1;c||(t=!0),c=e,t&&this.enqueueDocumentValidation()}}})},function(e,t){e.exports=(e=>(class extends e{constructor(){super(),this._injectModel("AppStateModel")}ready(){super.ready(),this._onAppStateUpdate&&this._getAppState().then(e=>this._onAppStateUpdate(e))}_setAppState(e){return this.AppStateModel.set(e)}_getAppState(){return this.AppStateModel.get()}_setWindowLocation(e){this.AppStateModel.setLocation(e)}}))},function(e,t,n){const i=n(24);e.exports=new class{constructor(){for(var e in this.themes=i,this.families={},this.specifics={},i)for(var t in i[e])this.families[t]=e,i[e][t].forEach(e=>this.specifics[e]=t)}getThemeObjectArray(e){let t=[],n={theme:{},family:{}},i=this._getThemeAsArray(e,"specific"),a=this._getThemeAsArray(e,"family"),r=this._getThemeAsArray(e,"theme");return i.forEach(e=>{let i=this.specifics[e],a=this.families[i];n.theme[a]=!0,n.family[i]=!0,t.push({theme:a,family:i,specific:e})}),a.forEach(e=>{if(n.family[e])return;let i=this.families[e];n.theme[i]=!0,t.push({theme:i,family:e})}),r.forEach(e=>{n.theme[e]||t.push({theme:e})}),t}themeObjectArrayToPackageArrays(e){let t={theme:{},family:{},specific:{}};e.forEach(e=>{for(let n in t)e[n]&&(t[n][e[n]]=!0)});for(let e in t)t[e]=Object.keys(t[e]);return t}_getThemeAsArray(e,t){let n=e[t];return n?Array.isArray(n)?n:[n]:[]}setTheme(e){}}},function(e,t,n){"use strict";n.r(t);var i=n(0),a=(n(4),n(5)),r=n(1);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(a.a)({is:"iron-location",properties:{path:{type:String,notify:!0,value:function(){return window.decodeURIComponent(window.location.pathname)}},query:{type:String,notify:!0,value:function(){return window.location.search.slice(1)}},hash:{type:String,notify:!0,value:function(){return window.decodeURIComponent(window.location.hash.slice(1))}},dwellTime:{type:Number,value:2e3},urlSpaceRegex:{type:String,value:""},encodeSpaceAsPlusInQuery:{type:Boolean,value:!1},_urlSpaceRegExp:{computed:"_makeRegExp(urlSpaceRegex)"},_lastChangedAt:{type:Number},_initialized:{type:Boolean,value:!1}},hostAttributes:{hidden:!0},observers:["_updateUrl(path, query, hash)"],created:function(){this.__location=window.location},attached:function(){this.listen(window,"hashchange","_hashChanged"),this.listen(window,"location-changed","_urlChanged"),this.listen(window,"popstate","_urlChanged"),this.listen(document.body,"click","_globalOnClick"),this._lastChangedAt=window.performance.now()-(this.dwellTime-200),this._initialized=!0,this._urlChanged()},detached:function(){this.unlisten(window,"hashchange","_hashChanged"),this.unlisten(window,"location-changed","_urlChanged"),this.unlisten(window,"popstate","_urlChanged"),this.unlisten(document.body,"click","_globalOnClick"),this._initialized=!1},_hashChanged:function(){this.hash=window.decodeURIComponent(this.__location.hash.substring(1))},_urlChanged:function(){this._dontUpdateUrl=!0,this._hashChanged(),this.path=window.decodeURIComponent(this.__location.pathname),this.query=this.__location.search.substring(1),this._dontUpdateUrl=!1,this._updateUrl()},_getUrl:function(){var e=window.encodeURI(this.path).replace(/\#/g,"%23").replace(/\?/g,"%3F"),t="";this.query&&(t="?"+this.query.replace(/\#/g,"%23"),t=this.encodeSpaceAsPlusInQuery?t.replace(/\+/g,"%2B").replace(/ /g,"+").replace(/%20/g,"+"):t.replace(/\+/g,"%2B").replace(/ /g,"%20"));var n="";return this.hash&&(n="#"+window.encodeURI(this.hash)),e+t+n},_updateUrl:function(){if(!this._dontUpdateUrl&&this._initialized&&(this.path!==window.decodeURIComponent(this.__location.pathname)||this.query!==this.__location.search.substring(1)||this.hash!==window.decodeURIComponent(this.__location.hash.substring(1)))){var e=this._getUrl(),t=new URL(e,this.__location.protocol+"//"+this.__location.host).href,n=window.performance.now(),i=this._lastChangedAt+this.dwellTime>n;this._lastChangedAt=n,i?window.history.replaceState({},"",t):window.history.pushState({},"",t),this.fire("location-changed",{},{node:window})}},_globalOnClick:function(e){if(!e.defaultPrevented){var t=this._getSameOriginLinkHref(e);t&&(e.preventDefault(),t!==this.__location.href&&(window.history.pushState({},"",t),this.fire("location-changed",{},{node:window})))}},_getSameOriginLinkHref:function(e){if(0!==e.button)return null;if(e.metaKey||e.ctrlKey)return null;for(var t=Object(r.a)(e).path,n=null,i=0;i<t.length;i++){var a=t[i];if("A"===a.tagName&&a.href){n=a;break}}if(!n)return null;if("_blank"===n.target)return null;if(("_top"===n.target||"_parent"===n.target)&&window.top!==window)return null;if(n.download)return null;var s,o,l,h=n.href;if(s=null!=document.baseURI?new URL(h,document.baseURI):new URL(h),o=this.__location.origin?this.__location.origin:this.__location.protocol+"//"+this.__location.host,s.origin)l=s.origin;else{var c=s.host,d=s.port,p=s.protocol;("https:"===p&&"443"===d||"http:"===p&&"80"===d)&&(c=s.hostname),l=p+"//"+c}if(l!==o)return null;var u=s.pathname+s.search+s.hash;return"/"!==u[0]&&(u="/"+u),this._urlSpaceRegExp&&!this._urlSpaceRegExp.test(u)?null:new URL(u,this.__location.href).href},_makeRegExp:function(e){return RegExp(e)}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(a.a)({is:"iron-query-params",properties:{paramsString:{type:String,notify:!0,observer:"paramsStringChanged"},paramsObject:{type:Object,notify:!0},_dontReact:{type:Boolean,value:!1}},hostAttributes:{hidden:!0},observers:["paramsObjectChanged(paramsObject.*)"],paramsStringChanged:function(){this._dontReact=!0,this.paramsObject=this._decodeParams(this.paramsString),this._dontReact=!1},paramsObjectChanged:function(){this._dontReact||(this.paramsString=this._encodeParams(this.paramsObject).replace(/%3F/g,"?").replace(/%2F/g,"/").replace(/'/g,"%27"))},_encodeParams:function(e){var t=[];for(var n in e){var i=e[n];""===i?t.push(encodeURIComponent(n)):i&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(i.toString()))}return t.join("&")},_decodeParams:function(e){for(var t={},n=(e=(e||"").replace(/\+/g,"%20")).split("&"),i=0;i<n.length;i++){var a=n[i].split("=");a[0]&&(t[decodeURIComponent(a[0])]=decodeURIComponent(a[1]||""))}return t}});var s=n(2);
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const o={properties:{route:{type:Object,notify:!0},queryParams:{type:Object,notify:!0},path:{type:String,notify:!0}},observers:["_locationChanged(path, queryParams)","_routeChanged(route.prefix, route.path)","_routeQueryParamsChanged(route.__queryParams)"],created:function(){this.linkPaths("route.__queryParams","queryParams"),this.linkPaths("queryParams","route.__queryParams")},_locationChanged:function(){this.route&&this.route.path===this.path&&this.queryParams===this.route.__queryParams||(this.route={prefix:"",path:this.path,__queryParams:this.queryParams})},_routeChanged:function(){this.route&&(this.path=this.route.prefix+this.route.path)},_routeQueryParamsChanged:function(e){this.route&&(this.queryParams=e)}};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Object(a.a)({_template:s["a"]`
    <iron-query-params params-string="{{__query}}" params-object="{{queryParams}}">
    </iron-query-params>
    <iron-location path="{{__path}}" query="{{__query}}" hash="{{__hash}}" url-space-regex="[[urlSpaceRegex]]" dwell-time="[[dwellTime]]">
    </iron-location>
  `,is:"app-location",properties:{route:{type:Object,notify:!0},useHashAsPath:{type:Boolean,value:!1},urlSpaceRegex:{type:String,notify:!0},__queryParams:{type:Object},__path:{type:String},__query:{type:String},__hash:{type:String},path:{type:String,observer:"__onPathChanged"},_isReady:{type:Boolean},dwellTime:{type:Number}},behaviors:[o],observers:["__computeRoutePath(useHashAsPath, __hash, __path)"],ready:function(){this._isReady=!0},__computeRoutePath:function(){this.path=this.useHashAsPath?this.__hash:this.__path},__onPathChanged:function(){this._isReady&&(this.useHashAsPath?this.__hash=this.path:this.__path=this.path)}});var l=n(10),h=n(103),c=n.n(h),d=n(49),p=n.n(d);customElements.define("app-route",class extends(Object(l.Mixin)(i.a).with(l.EventInterface,p.a)){static get template(){return i["b"]`<app-location url-space-regex="[[appRoutesRegex]]"></app-location>`}static get properties(){return{route:{type:Object},appRoutes:{type:Array,value:[]},appRoutesRegex:{type:RegExp,computed:"_makeRegex(appRoutes)"},debug:{type:Boolean,value:!1}}}constructor(){super(),this.AppStateModel.setLocationElement(this),this._setLocationObject();let e=window.location.href.replace(window.location.origin,"");window.history.replaceState({location:this.location},null,e),this._onLocationChange(),window.addEventListener("location-changed",e=>{this._replaceHistoryState(),this._onLocationChange()}),window.addEventListener("popstate",e=>{this.location=e.state.location,this._onLocationChange()})}ready(){super.ready(),this.debug&&this._initDebugging()}_replaceHistoryState(e){this._setLocationObject(e),window.history.replaceState({location:this.location},null,this.location.fullpath)}_initDebugging(){let e=history.pushState,t=history.replaceState;history.pushState=function(t){let n=new CustomEvent("history-push-state",{detail:t});return window.dispatchEvent(n),e.apply(history,arguments)},history.replaceState=function(e){let n=new CustomEvent("history-replace-state",{detail:e});return window.dispatchEvent(n),t.apply(history,arguments)},window.addEventListener("history-push-state",e=>console.log("history-push-state",e.detail)),window.addEventListener("history-replace-state",e=>console.log("history-replace-state",e.detail))}setWindowLocation(e){if("object"==typeof e){let t=e.path;if(e.qs){let n=[];for(let t in e.qs)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e.qs[t]));t+="?"+n.join("&")}e.hash&&(t+="#"+e.hash),e=t}window.history.state&&window.history.state.location&&window.history.state.location.fullpath===e||(window.history.pushState({},null,e),this._replaceHistoryState(e),this._onLocationChange())}_makeRegex(){let e=this.appRoutes.map(e=>"/"+e+"(/.*)?");e.push("/");let t="^("+e.join("|")+")$";return t=new RegExp(t,"i")}_setLocationObject(e){return this.location={fullpath:e||window.location.href.replace(window.location.origin,""),pathname:window.location.pathname,path:window.location.pathname.replace(/(^\/|\/$)/g,"").split("/"),query:c.a.parse(window.location.search)},location}_onLocationChange(){this._setAppState({location:this.location})}})},function(e,t,n){var i=n(31),a=n(30),r=n(26).Buffer,s=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],o=new Array(160);function l(){this.init(),this._w=o,a.call(this,128,112)}function h(e,t,n){return n^e&(t^n)}function c(e,t,n){return e&t|n&(e|t)}function d(e,t){return(e>>>28|t<<4)^(t>>>2|e<<30)^(t>>>7|e<<25)}function p(e,t){return(e>>>14|t<<18)^(e>>>18|t<<14)^(t>>>9|e<<23)}function u(e,t){return(e>>>1|t<<31)^(e>>>8|t<<24)^e>>>7}function g(e,t){return(e>>>1|t<<31)^(e>>>8|t<<24)^(e>>>7|t<<25)}function f(e,t){return(e>>>19|t<<13)^(t>>>29|e<<3)^e>>>6}function m(e,t){return(e>>>19|t<<13)^(t>>>29|e<<3)^(e>>>6|t<<26)}function v(e,t){return e>>>0<t>>>0?1:0}i(l,a),l.prototype.init=function(){return this._ah=1779033703,this._bh=3144134277,this._ch=1013904242,this._dh=2773480762,this._eh=1359893119,this._fh=2600822924,this._gh=528734635,this._hh=1541459225,this._al=4089235720,this._bl=2227873595,this._cl=4271175723,this._dl=1595750129,this._el=2917565137,this._fl=725511199,this._gl=4215389547,this._hl=327033209,this},l.prototype._update=function(e){for(var t=this._w,n=0|this._ah,i=0|this._bh,a=0|this._ch,r=0|this._dh,o=0|this._eh,l=0|this._fh,y=0|this._gh,b=0|this._hh,_=0|this._al,w=0|this._bl,x=0|this._cl,k=0|this._dl,z=0|this._el,S=0|this._fl,A=0|this._gl,C=0|this._hl,E=0;E<32;E+=2)t[E]=e.readInt32BE(4*E),t[E+1]=e.readInt32BE(4*E+4);for(;E<160;E+=2){var M=t[E-30],P=t[E-30+1],O=u(M,P),T=g(P,M),L=f(M=t[E-4],P=t[E-4+1]),H=m(P,M),I=t[E-14],V=t[E-14+1],R=t[E-32],N=t[E-32+1],j=T+V|0,B=O+I+v(j,T)|0;B=(B=B+L+v(j=j+H|0,H)|0)+R+v(j=j+N|0,N)|0,t[E]=B,t[E+1]=j}for(var D=0;D<160;D+=2){B=t[D],j=t[D+1];var $=c(n,i,a),F=c(_,w,x),U=d(n,_),q=d(_,n),K=p(o,z),G=p(z,o),Y=s[D],W=s[D+1],J=h(o,l,y),X=h(z,S,A),Q=C+G|0,Z=b+K+v(Q,C)|0;Z=(Z=(Z=Z+J+v(Q=Q+X|0,X)|0)+Y+v(Q=Q+W|0,W)|0)+B+v(Q=Q+j|0,j)|0;var ee=q+F|0,te=U+$+v(ee,q)|0;b=y,C=A,y=l,A=S,l=o,S=z,o=r+Z+v(z=k+Q|0,k)|0,r=a,k=x,a=i,x=w,i=n,w=_,n=Z+te+v(_=Q+ee|0,Q)|0}this._al=this._al+_|0,this._bl=this._bl+w|0,this._cl=this._cl+x|0,this._dl=this._dl+k|0,this._el=this._el+z|0,this._fl=this._fl+S|0,this._gl=this._gl+A|0,this._hl=this._hl+C|0,this._ah=this._ah+n+v(this._al,_)|0,this._bh=this._bh+i+v(this._bl,w)|0,this._ch=this._ch+a+v(this._cl,x)|0,this._dh=this._dh+r+v(this._dl,k)|0,this._eh=this._eh+o+v(this._el,z)|0,this._fh=this._fh+l+v(this._fl,S)|0,this._gh=this._gh+y+v(this._gl,A)|0,this._hh=this._hh+b+v(this._hl,C)|0},l.prototype._hash=function(){var e=r.allocUnsafe(64);function t(t,n,i){e.writeInt32BE(t,i),e.writeInt32BE(n,i+4)}return t(this._ah,this._al,0),t(this._bh,this._bl,8),t(this._ch,this._cl,16),t(this._dh,this._dl,24),t(this._eh,this._el,32),t(this._fh,this._fl,40),t(this._gh,this._gl,48),t(this._hh,this._hl,56),e},e.exports=l},function(e,t,n){var i=n(31),a=n(30),r=n(26).Buffer,s=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],o=new Array(64);function l(){this.init(),this._w=o,a.call(this,64,56)}function h(e,t,n){return n^e&(t^n)}function c(e,t,n){return e&t|n&(e|t)}function d(e){return(e>>>2|e<<30)^(e>>>13|e<<19)^(e>>>22|e<<10)}function p(e){return(e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7)}function u(e){return(e>>>7|e<<25)^(e>>>18|e<<14)^e>>>3}i(l,a),l.prototype.init=function(){return this._a=1779033703,this._b=3144134277,this._c=1013904242,this._d=2773480762,this._e=1359893119,this._f=2600822924,this._g=528734635,this._h=1541459225,this},l.prototype._update=function(e){for(var t,n=this._w,i=0|this._a,a=0|this._b,r=0|this._c,o=0|this._d,l=0|this._e,g=0|this._f,f=0|this._g,m=0|this._h,v=0;v<16;++v)n[v]=e.readInt32BE(4*v);for(;v<64;++v)n[v]=0|(((t=n[v-2])>>>17|t<<15)^(t>>>19|t<<13)^t>>>10)+n[v-7]+u(n[v-15])+n[v-16];for(var y=0;y<64;++y){var b=m+p(l)+h(l,g,f)+s[y]+n[y]|0,_=d(i)+c(i,a,r)|0;m=f,f=g,g=l,l=o+b|0,o=r,r=a,a=i,i=b+_|0}this._a=i+this._a|0,this._b=a+this._b|0,this._c=r+this._c|0,this._d=o+this._d|0,this._e=l+this._e|0,this._f=g+this._f|0,this._g=f+this._g|0,this._h=m+this._h|0},l.prototype._hash=function(){var e=r.allocUnsafe(32);return e.writeInt32BE(this._a,0),e.writeInt32BE(this._b,4),e.writeInt32BE(this._c,8),e.writeInt32BE(this._d,12),e.writeInt32BE(this._e,16),e.writeInt32BE(this._f,20),e.writeInt32BE(this._g,24),e.writeInt32BE(this._h,28),e},e.exports=l},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var a=(s=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),r=i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"});return[n].concat(r).concat([a]).join("\n")}var s;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},a=0;a<this.length;a++){var r=this[a][0];"number"==typeof r&&(i[r]=!0)}for(a=0;a<e.length;a++){var s=e[a];"number"==typeof s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t,n){const{BaseStore:i}=n(10);e.exports=new class extends i{constructor(){super(),this.AUTH_STATES={LOGGED_IN:"loggedIn",NOT_LOGGED_IN:"notLoggedIn"},this.data={auth:{state:this.AUTH_STATES.NOT_LOGGED_IN},organizations:{state:this.STATE.INIT}},this.events={AUTH_UPDATE:"auth-update",ORGS_UPDATE:"orgs-update",GITHUB_USERNAME_UPDATE:"github-username-update"}}logout(){this._setAuthState({state:this.AUTH_STATES.NOT_LOGGED_IN}),this._setOrgState({payload:[],state:this.STATE.INIT})}setAuthLoading(e,t){this._setAuthState({request:e,username:t,state:this.STATE.LOADING}),this._setOrgState({request:e,state:this.STATE.LOADING})}setAuthLoaded(e){this._setAuthState({username:e.username,state:this.AUTH_STATES.LOGGED_IN}),e.organizations&&this._setOrgState({payload:e.organizations,state:this.STATE.LOADED})}setAuthError(e){this._setAuthState({error:e,state:this.AUTH_STATES.NOT_LOGGED_IN}),this._setOrgState({error:e,payload:[],state:this.STATE.ERROR})}_setAuthState(e){this.data.auth=e,this.emit(this.events.AUTH_UPDATE,e)}setOrgsLoading(e){this._setOrgState({request:e,state:this.STATE.LOADING})}setOrgsLoaded(e){this._setOrgState({payload:e,state:this.STATE.LOADED})}setOrgsError(e){this._setOrgState({error:e,state:this.STATE.ERROR})}_setOrgState(e){e.state||console.warn("Setting orgs with no state"),this.data.organizations=e,this.emit(this.events.ORGS_UPDATE,e)}}},function(e,t,n){const{BaseStore:i}=n(10);e.exports=new class extends i{constructor(){super(),this.data=null,this.events={STATS_UPDATE:"stats-update"}}setLoading(e){this._set({state:this.STATE.LOADING,request:e})}setLoaded(e){this._set({state:this.STATE.LOADED,payload:e})}setError(e){this._set({state:this.STATE.ERROR,error:e})}_set(e){this.data=e,this.emit(this.events.STATS_UPDATE,e)}}},function(e,t,n){const{BaseStore:i}=n(10);e.exports=new class extends i{constructor(){super(),this.data={search:{state:this.STATE.INIT}},this.events={SEARCH_PACKAGES_UPDATE:"search-packages-update"}}getSearchQuery(){return this.data.search.query}setSearchQuery(e){this.data.search.query=e}setSearchLoading(e,t){this._setSearchState({request:e,query:t,state:this.STATE.LOADING})}setSearchSuccess(e,t){this._setSearchState({payload:e,query:t,state:this.STATE.LOADED})}setSearchError(e,t){this._setSearchState({error:e,query:t,state:this.STATE.ERROR})}_setSearchState(e){this.data.search=e,this.emit(this.events.SEARCH_PACKAGES_UPDATE,this.data.search)}}},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){const{BaseStore:i}=n(10),a=n(129),r={managed:["releases","releaseCount"],registered:["description","overview","releases","releaseCount"]};e.exports=new class extends i{constructor(){super(),this.ignoreFiles=[],this.data={package:{payload:{},state:""},startState:{}},this.events={PACKAGE_EDITOR_DATA_UPDATE:"package-editor-data-update"}}reset(){this._setData({state:"create",reset:!0,payload:{source:"managed",packageType:"standalone"}})}setEditStartStateData(e){this.data.startState=a(e),this.setData()}hasDataChanged(){let e=[this.data.package.payload,this.data.startState].map(e=>{e=a(e);let t=r[e.source]||[];for(let n in e)Array.isArray(e[n])&&0===e[n].length?delete e[n]:""===e[n]?delete e[n]:t.indexOf(n)>-1&&delete e[n];return e});return this.stateChanged(e[0],e[1])}setData(e,t={}){void 0===t.merge&&(t.merge=!0);let n={state:this.data.package.state,payload:null};t.merge?n.payload=Object.assign({},this.data.package.payload,e):n.payload=e,t.state&&(n.state=t.state),this._setData(n)}_setData(e){this.stateChanged(this.data.package,e)&&(this.data.package=e,this.emit(this.events.PACKAGE_EDITOR_DATA_UPDATE,this.data.package))}}},function(e,t,n){n(146),e.exports=self.fetch.bind(self)},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function a(e){return"object"==typeof e&&null!==e}function r(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,s,o,l,h;if(this._events||(this._events={}),"error"===e&&(!this._events.error||a(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t,c}if(r(n=this._events[e]))return!1;if(i(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:o=Array.prototype.slice.call(arguments,1),n.apply(this,o)}else if(a(n))for(o=Array.prototype.slice.call(arguments,1),s=(h=n.slice()).length,l=0;l<s;l++)h[l].apply(this,o);return!0},n.prototype.addListener=function(e,t){var s;if(!i(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?a(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,a(this._events[e])&&!this._events[e].warned&&(s=r(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&s>0&&this._events[e].length>s&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){if(!i(t))throw TypeError("listener must be a function");var n=!1;function a(){this.removeListener(e,a),n||(n=!0,t.apply(this,arguments))}return a.listener=t,this.on(e,a),this},n.prototype.removeListener=function(e,t){var n,r,s,o;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(s=(n=this._events[e]).length,r=-1,n===t||i(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(a(n)){for(o=s;o-- >0;)if(n[o]===t||n[o].listener&&n[o].listener===t){r=o;break}if(r<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(i(n=this._events[e]))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){return this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(i(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t,n){"use strict";var i=n(0),a=n(25),r=n(13),s=n(19),o=n(20),l=n(6),h=n(11),c=n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const d=Object(o.b)(i.a);class p extends d{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e)}connectedCallback(){if(super.connectedCallback(),this.style.display="none",this.__isDetached){this.__isDetached=!1;let e=Object(c.a)(Object(c.a)(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e)}}__ensureTemplatized(){if(!this.__ctor){let e=this.template=this.querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}let t={};t[this.as]=!0,t[this.indexAs]=!0,t[this.itemsIndexAs]=!0,this.__ctor=Object(a.b)(e,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:t,forwardHostProp:function(e,t){let n=this.__instances;for(let i,a=0;a<n.length&&(i=n[a]);a++)i.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,n){if(Object(l.e)(this.as,t)){let i=e[this.itemsIndexAs];t==this.as&&(this.items[i]=n);let a=Object(l.i)(this.as,`${JSCompiler_renameProperty("items",this)}.${i}`,t);this.notifyPath(a,n)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,n=this.__getMethodHost();return function(){return n[t].apply(n,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let e=performance.now(),t=this._targetFrameTime/(e-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*t)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=e,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let n=0;n<t.length;n++)0===e.indexOf(t[n])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(e,t=0){this.__renderDebouncer=r.a.debounce(this.__renderDebouncer,t>0?h.b.after(t):h.a,e.bind(this)),Object(s.a)(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),Object(s.b)()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let e=this.items||[],t=new Array(e.length);for(let n=0;n<e.length;n++)t[n]=n;this.__filterFn&&(t=t.filter((t,n,i)=>this.__filterFn(e[t],n,i))),this.__sortFn&&t.sort((t,n)=>this.__sortFn(e[t],e[n]));const n=this.__itemsIdxToInstIdx={};let i=0;const a=Math.min(t.length,this.__limit);for(;i<a;i++){let a=this.__instances[i],r=t[i],s=e[r];n[r]=i,a?(a._setPendingProperty(this.as,s),a._setPendingProperty(this.indexAs,i),a._setPendingProperty(this.itemsIndexAs,r),a._flushProperties()):this.__insertInstance(s,i,r)}for(let e=this.__instances.length-1;e>=i;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const n=Object(c.a)(t.root);for(let e=0;e<t.children.length;e++){let i=t.children[e];n.appendChild(i)}return t}__attachInstance(e,t){let n=this.__instances[e];t.insertBefore(n.root,this)}__detachAndRemoveInstance(e){let t=this.__detachInstance(e);t&&this.__pool.push(t),this.__instances.splice(e,1)}__stampInstance(e,t,n){let i={};return i[this.as]=e,i[this.indexAs]=t,i[this.itemsIndexAs]=n,new this.__ctor(i)}__insertInstance(e,t,n){let i=this.__pool.pop();i?(i._setPendingProperty(this.as,e),i._setPendingProperty(this.indexAs,t),i._setPendingProperty(this.itemsIndexAs,n),i._flushProperties()):i=this.__stampInstance(e,t,n);let a=this.__instances[t+1],r=a?a.children[0]:this;return Object(c.a)(Object(c.a)(this).parentNode).insertBefore(i.root,r),this.__instances[t]=i,i}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let n=e.slice(6),i=n.indexOf("."),a=i<0?n:n.substring(0,i);if(a==parseInt(a,10)){let e=i<0?"":n.substring(i+1);this.__handleObservedPaths(e);let r=this.__itemsIdxToInstIdx[a],s=this.__instances[r];if(s){let n=this.as+(e?"."+e:"");s._setPendingPropertyOrPath(n,t,!1,!0),s._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return Object(a.a)(this.template,e)}}customElements.define(p.is,p)},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n    height: 100vh;\n    /* --default-primary-color: #2286c3; */\n    /* --default-primary-color: #0478af; */\n    \n    --light-primary-color: #18779B;\n    --default-primary-color: #015E80;\n    \n    \n    --primary-color: var(--default-primary-color);\n    \n    /* --light-primary-color: #64b5f6; */\n    /* --light-primary-color: #47a9f9; */\n    \n    --default-secondary-color: #01a99d;\n    --light-secondary-color: #01bbaf;\n  }\n\n  .menu-root {\n    height: 100%;\n    box-sizing: border-box;\n    position: relative;\n  }\n\n  .main-content {\n    will-change: transition;\n    transform: translate(0px, 0px);\n    transition: transform 250ms ease-out;\n    position: absolute;\n    top: 61px;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .main-content[open-menu] {\n    transform: translate(-150px, 0px);\n  }\n\n  .menu {\n    will-change: transition;\n    transition: transform 250ms ease-out;\n    transform: translate(150px, 0px);\n    z-index: 0;\n    position: absolute;\n    top: 61px;\n    right: 0;\n    bottom: 0;\n    width: 150px;\n    background: white;\n    box-shadow: 0 0 5px #ccc inset;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    overflow-x: hidden;\n  }\n\n  .menu[open-menu] {\n    transform: translate(0px, 0px);\n  }\n\n  .menu a {\n    display: block;\n    text-align: center;\n    font-size: 17px;\n    margin-top: 20px;\n  }\n\n  .menu iron-icon {\n    --iron-icon-width: 32px;\n    --iron-icon-height: 32px;\n  }\n\n  .menu a span {\n    display: block;\n  }\n</style>\n\n<app-header on-open-menu="_onOpenMenu" id="header"></app-header>\n<app-route app-routes="[[appRoutes]]"></app-route>\n\n<div class="menu-root">\n  <div id="menu" class="menu" open-menu$="[[openMenu]]">\n    <a href="/" tabindex$="[[anchorTabIndex]]">\n      <div>\n        <iron-icon icon="home"></iron-icon> \n      </div>\n      <span>Home</span>\n    </a>\n    <a href="/search" tabindex$="[[anchorTabIndex]]">\n      <iron-icon icon="search"></iron-icon> \n      <span>Search</span>\n    </a>\n    <a href="/create" hidden$="[[!loggedIn]]" tabindex$="[[anchorTabIndex]]">\n      <iron-icon icon="create"></iron-icon> \n      <span>Create</span>\n    </a>\n    <a href="/account" hidden$="[[!loggedIn]]"  tabindex$="[[anchorTabIndex]]">\n      <iron-icon icon="social:person"></iron-icon> \n      <span>My Account</span>\n    </a>\n    <a href="/auth/logout" hidden$="[[!loggedIn]]"  tabindex$="[[anchorTabIndex]]">\n      <iron-icon icon="exit-to-app"></iron-icon> \n      <span>Logout</span>\n    </a>\n    <a href="/account" hidden$="[[loggedIn]]" tabindex$="[[anchorTabIndex]]">\n      <iron-icon icon="social:person"></iron-icon> \n      <span>Login</span>\n    </a>\n    <a href="[[ecosisHost]]" target="_blank" tabindex$="[[anchorTabIndex]]">\n      <iron-icon icon="timeline"></iron-icon> \n      <span>Spectra</span>\n    </a>\n    <a href="https://github.com/EcoSIS/ecosml-webapp/issues/new/choose" target="_blank" tabindex$="[[anchorTabIndex]]">\n      <iron-icon icon="bug-report"></iron-icon> \n      <span>Report Issue</span>\n    </a>\n  </div>\n  <div class="main-content" open-menu$="[[openMenu]]">\n    <ecosml-search-header></ecosml-search-header>\n    <iron-pages selected="[[page]]" attr-for-selected="id">\n      <app-home id="home"></app-home>\n      <app-about id="about"></app-about>\n      <app-package-metadata-editor id="edit"></app-package-metadata-editor>\n      <app-package-search id="search"></app-package-search>\n      <app-landing-page id="package"></app-landing-page>\n      <app-user-account id="account"></app-user-account>\n      <app-admin id="admin"></app-admin>\n    </iron-pages>\n  </div>\n</div>\n\n'},function(e,t){e.exports='<style>\n  :host {\n    display: inline-block;\n  }\n  \n  iron-icon {\n    display: inline-block;\n    border-radius: var(--user-icon-size);\n    --iron-icon-height: var(--user-icon-size);\n    --iron-icon-width: var(--user-icon-size);\n    color: white;\n    border: 4px solid transparent;\n  }\n\n  iron-icon[active] {\n    background-color: var(--default-primary-color);\n    border: 4px solid var(--default-primary-color);\n  }\n\n  :host([invert]) iron-icon[active] {\n    background-color: transparent;\n    border: none;\n  }\n\n</style>\n\n<iron-icon icon="social:person" active$="[[active]]"></iron-icon>\n'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: inline-block;\n  }\n  a {\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n  }\n  paper-icon-button {\n    color: var(--inverse-text-color);\n  }\n  app-user-icon {\n    margin-right: 5px;\n  }\n\n  @media(max-width: 768px) {\n    #welcome {\n      display: none;\n    }\n  }\n</style>\n\n<a href="/account" inverse>\n  <app-user-icon active$="[[loggedIn]]" invert></app-user-icon> \n  <span hidden$="[[loggedIn]]">Login</span>\n  <span hidden$="[[!loggedIn]]"><span id="welcome">Welcome,</span> [[username]]</span> \n</a>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n    position: absolute;\n    left: 0;\n    right: 0;\n    z-index: 10;\n  }\n\n  .header {\n    display: flex;\n    align-items: center;\n    background: rgb(34,134,195);\n    background: linear-gradient(\n      90deg, \n      var(--default-primary-color) 0%, \n      var(--default-primary-color) 15%, \n      var(--light-primary-color) 100%\n    );\n    padding: 10px;\n  }\n\n  .header [main-title] {\n    flex: 1;\n    font-size: 22px;\n  }\n\n  .header [main-title] a {\n    color: white;\n  }\n  .header [main-title] a:visited {\n    color: white;\n  }\n\n\n  .header [main-title] small {\n    font-size: 14px;\n  }\n\n  [icon="menu"], [main-title] {\n    color: var(--inverse-text-color);\n  }\n\n  paper-icon-button {\n    color: var(--inverse-text-color);\n  }\n\n  @media(max-width: 768px) {\n    [main-title] small {\n      display: none;\n    }\n  }\n</style>\n\n<div class="header" sandbox$="[[sandbox]]">\n  <div main-title>\n    <a href="/">EcoSML \n    <span id="titleExtra"></span> \n    <small>Ecological Spectral Model Library</small>\n    </a>\n  </div>\n  <app-auth-icon></app-auth-icon>\n  <div style="position:relative; padding-left: 15px">\n    <paper-icon-button inverse icon="more-vert" on-click="_onMenuIconClicked"></paper-icon-button>\n  </div>\n</div>\n\n'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  paper-button {\n    color: var(--default-primary-color);\n  }\n\n  img {\n    border-radius: 32px;\n    width: 32px;\n    height: 32px;\n    vertical-align: middle;\n  }\n\n  #revokeGithubBtn {\n    cursor: pointer;\n    font-size: 11px;\n  }\n\n  h3 {\n    margin: 0 0 5px 0;\n    border-bottom: 1px solid #eee;\n  }\n\n  .card {\n    padding: 15px;\n    margin: 15px;\n    border: 1px solid #eee;\n    border-radius: 6px;\n  }\n\n</style>\n\n<div hidden$="[[!linked]]" class="card">\n  <h3>GitHub Account</h3>\n  <div style="font-size: 18px"><img src$="[[githubAvatar]]" /> <a href$="https://github.com/[[githubUsername]]" target="_blank">[[githubUsername]]</a></div>\n  <div style="text-align: right"><a id="revokeGithubBtn" on-click="_onRevokeClicked">Revoke</a></div>\n</div>\n<div hidden$="[[linked]]">\n  <paper-button id="authorizeGithubBtn" on-click="_onAuthorizeClicked">\n    <iron-icon icon="verified-user"></iron-icon> Authorize\n  </paper-button>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n  .root {\n    margin-top: 50px;\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    align-items: center;\n  }\n  .root > div {\n    margin-top: 20px;\n    max-width: 390px;\n  }\n  paper-button {\n    background-color: var(--default-primary-color);\n    color: var(--inverse-text-color);\n  }\n</style>\n\n<div class="root">\n  <div class="main-panel">\n    <h2 class="uheader green">Login with EcoSIS</h2>\n    <div class="help">\n      Login with your <a href$="[[ecosisHost]]" target="_blank">EcoSIS</a> account.  If you don\'t \n      have a EcoSIS account you can create one \n      <a href="[[ecosisHost]]/user/register" target="_blank">here.</a> After you create an EcoSIS account,\n      return here and login.\n    </div>\n    <div style="margin:40px 0">\n      <app-text-input id="username" label="Username"></app-text-input>\n      <app-text-input id="password" label="Password" type="password" on-keyup="_onPassKeyUp"></app-text-input>\n    </div>\n\n    <div class="help" style="text-align: right">\n      <div><a href="[[ecosisHost]]/user/reset" target="_blank">Reset Password</a></div>\n      <div><a href="[[ecosisHost]]/user/register" target="_blank">Create Account</a></div>\n    </div>\n\n    <div style="margin-top:20px">\n      <paper-button id="loginBtn" on-click="_attemptLogin">Login</paper-button>\n    </div>\n  </div>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display : block\n  }\n\n  .container {\n    margin-top: 50px;\n  }\n\n  .container > div {\n    max-width: 1200px;\n  }\n\n  .break {\n    margin-top: 40px;\n  }\n\n  .my-pkg-title {\n    font-weight: bold;\n  }\n\n  .my-pkg-description {\n    padding-top: 5px;\n    font-size: 13px;\n  }\n\n  paper-button {\n    font-size: 14px;\n    color: var(--default-primary-color);\n  }\n</style>\n\n<iron-pages selected="[[view]]" attr-for-selected="id">\n  <app-login id="login"></app-login>\n  <div id="account">\n    <div class="container">\n      <div>\n          <div class="main-panel" style="display:flex">\n            <div>\n              <app-user-icon size="64" active></app-user-icon>\n            </div>\n            <div style="flex: 1; padding-left: 20px;">\n                <h2 class="uheader green" style="display:flex; align-items:center">\n                  <div style="flex:1">User: [[username]]</div>\n                  <paper-button on-click="_logout">Logout</paper-button>\n                </h2>\n\n                <div class="break">\n                  <a href="[[ecosisHost]]/user/login">Manage My Account on EcoSIS</a>\n                </div>\n                <div class="help">\n                  All EcoSML accounts are managed through EcoSIS.  To edit your profile or change\n                  your password, simply login to EcoSIS and edit your account.\n                </div>\n\n                <div class="break">\n                  <a href="[[ecosisHost]]/user/login">Manage My Organizations on EcoSIS</a>\n                </div>\n                <div class="help">\n                  Just like accounts all EcoSML organizations are managed through EcoSIS.  To create a new \n                  organization or manage an existing organization, simply login to EcoSIS then click\n                  \'My Organizations\'.\n                </div>\n\n                <div class="break">\n                  <h2 class="uheader lightblue">Github Account</h2>\n                  <div class="help">\n                    Link your <a href="https://github.com">GitHub</a> account and gain access to any EcoSML\n                    Hosted Repository via git CLI or via the GitHub repository webpage.  This will allow you to\n                    make commits, cut releases or use GitHub issues via the standard GitHub UI as well as EcoSML.\n                  </div>\n\n                  <app-github-authorize></app-github-authorize>\n                </div>\n\n                <div class="break">\n                  <h2 class="uheader lightblue">My Organizations</h2>\n                </div>\n                <div>\n                  <template is="dom-repeat" items="[[organizations]]">\n                    <div style="margin: 8px 5px"><a href="[[ecosisHost]]/organization/[[item.name]]" target="_blank">[[item.displayName]]</a></div>\n                  </template>\n                </div>\n\n                <div class="break">\n                  <h2 class="uheader blue">My Packages</h2>\n                </div>\n                <div>\n                  <template is="dom-repeat" items="[[ownerPackages]]">\n                    <div style="margin: 0px 5px 15px 5px">\n                      <div class="my-pkg-title"><a href="/edit/[[item.id]]">[[item.name]]</a></div>\n                      <div class="my-pkg-description">[[item.overview]]</div>\n                    </div>\n                  </template>\n                </div>\n\n            </div>\n          </div>\n      </div>\n      \n    </div>\n\n    \n  </div>\n</iron-pages>\n'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  .title {\n    margin-top: 25px;\n    margin-bottom: 5px;\n    /* text-align: center; */\n  }\n\n  .overview {\n\n    /* color: var(--light-primary-color);\n    border-left: 2px solid var(--light-primary-color); */\n    padding: 5px 0px 20px 0px;\n    /* text-align: center; */\n  }\n\n  .install {\n    color: var(--secondary-text-color);\n    font-family: monospace;\n    font-size: 14px;\n  }\n\n  .install .script {\n    margin-bottom: 15px;\n    overflow: auto;\n    white-space: nowrap;\n  }\n\n  .layout {\n    display: flex;\n  }\n\n  .layout .main {\n    padding-right: 40px;\n    flex: 1;\n  }\n  \n  h2.padded {\n    padding-top: 40px;\n  }\n  \n  #readme {\n    /* margin-top: 40px; */\n  }\n\n  .main.large {\n    display: none;\n  }\n  .main.small {\n    display: block;\n  }\n\n  .script-input {\n    width: 100%;\n    box-sizing: border-box;\n    margin: 5px 0;\n    display: block;\n  }\n\n  .info-panel {\n    width: 300px\n  }\n\n  .main.large {\n    display: block;\n  }\n  .main.small {\n    display: none;\n  }\n\n  @media (max-width: 900px) {\n    .main.large {\n      display: none;\n    }\n    .main.small {\n      display: block;\n    }\n\n    .layout {\n      display: block;\n    }\n\n    .info-panel {\n      width: auto\n    }\n  }\n</style>\n\n<div class="container">\n  <div>\n    <div style="margin: 25px 0 0 15px">\n      <a href$="[[lastSearch]]">\n        <iron-icon icon="arrow-back"></iron-icon> Back to search\n      </a>\n    </div>\n\n    <div style="margin-left: 15px">\n      <h2 class="title">[[package.name]]</h2>\n      <div class="overview">[[package.overview]]</div>\n    </div>\n\n    <div class="main-panel">\n      <div class="layout">\n        <div class="main large">\n          <app-markdown id="readmeLg" pkg-name="[[package.name]]"></app-markdown>\n        </div>\n        \n        <div class="info-panel">\n          <div id="install" class="install">\n            <div id="install-python">\n              <div style="margin-bottom: 15px">Language: <a href="https://www.python.org/" target="_blank">Python</a></div>\n              <div hidden$="[[!isPackageModule]]">\n                <div>Install via <a href="https://pip.pypa.io/en/stable/" target="_blank">pip:</a></div>\n                <div class="script">\n                  <input type="text" class="script-input" value="pip install git+https://github.com/[[githubOrg]]/[[package.name]]@[[release.name]]" />\n                </div>\n              </div>\n            </div>\n\n            <div id="install-r">\n              <div style="margin-bottom: 15px">Language: <a href="https://www.r-project.org/" target="_blank">R</a></div>\n              <div hidden$="[[!isPackageModule]]">\n                <div>Install via <a href="https://cran.r-project.org/web/packages/githubinstall/vignettes/githubinstall.html" target="_blank">devtools:</a></div>\n                <div class="script">\n                  <input type="text" class="script-input" value=\'install.packages("devtools")\' />\n                  <input type="text" class="script-input" value="library(devtools)" />\n                  <input type="text" class="script-input" value=\'install_github("ecosml/[[package.name]]", ref="[[release.name]")\' />\n                  <input type="text" class="script-input" value="library([[package.name]])" />\n                </div>\n              </div>\n            </div>\n\n            <div hidden$="[[!isPackageModule]]">*Note: It is up to individual package maintainers to follow standard practices for \n              language package management compatibility.</div>\n          </div>\n          \n          <h2 class="uheader dark">Current Release</h2>\n          <div style="padding-bottom: 20px" hidden$="[[!release]]">\n            <div><a href$="[[release.downloadUrl]]">[[release.name]]</a></div>\n            <div>[[release.description]]</div>\n          </div>\n\n          \x3c!-- This should never show --\x3e\n          <div style="padding-bottom: 20px" hidden$="[[release]]">\n            No releases available\n          </div>\n\n          <h2 class="uheader blue">Access</h2>\n          <div hidden$="[[!release]]"><a href$="[[release.downloadUrl]]">Download Current Release</a></div>\n          <div hidden$="[[!release]]"><a href$="[[package.htmlUrl]]/releases" target="_blank">All Releases</a></div>\n          <div><a href$="[[package.htmlUrl]]" target="_blank">GitHub</a></div>\n\n          <div hidden$="[[!package.theme]]">\n            <h2 class="uheader green padded">Theme</h2>\n            <div hidden$="[[!showThemes]]">\n              <span>Theme:</span>\n              <template is="dom-repeat" items="[[themes]]">\n                  <a href$="[[item.link]]">[[item.value]]</a>&nbsp;\n              </template>\n            </div>\n\n            <div hidden$="[[!showFamilies]]">\n              <span>Family:</span>\n              <template is="dom-repeat" items="[[families]]">\n                  <a href$="[[item.link]]">[[item.value]]</a>&nbsp;\n              </template>\n            </div>\n\n            <div hidden$="[[!showSpecifics]]">\n              <span>Specific:</span>\n              <template is="dom-repeat" items="[[specifics]]">\n                  <a href$="[[item.link]]">[[item.value]]</a>&nbsp;\n              </template>\n            </div>\n          </div>\n\n          <div hidden$="[[!hasKeywords]]">\n            <h2 class="uheader lightblue padded">Keywords</h2>\n            <div id="keywords"></div>\n          </div>\n\n          <div hidden$="[[!hasDois]]">\n            <h2 class="uheader lightblue padded">DOI</h2>\n            <template is="dom-repeat" items="[[package.dois]]">\n              <div><a href$="/api/doi/download/[[package.id]]/[[item.tag]]">doi:[[item.doi]]</a> for <b>[[item.tag]]</b></div>\n            </template>\n          </div>\n\n          <div hidden$="[[!userHasWriteAccess]]">\n            <h2 class="uheader dark padded">Admin</h2>\n            <div><a href$="/edit/[[package.id]]">Edit Package</a></div>\n          </div>\n        </div>\n\n        <div class="main small">\n          <app-markdown id="readmeSm" pkg-name="[[package.name]]"></app-markdown>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  .root {\n    display: flex;\n    justify-content: center;\n  }\n  .root > div {\n    width: 100%;\n    max-width: 1200px;\n    min-height: 600px;\n  }\n</style>\n\n<div class="root">\n    <div class="main-panel">\n      <h2>About</h2>\n      <p>EcoSML is part of the <a href="https://cce.nasa.gov/cgi-bin/cce/cce_profile.pl?project_group_id=3766" target="_blank">EcoSIS Toolkit</a>, \n        which is funded by NASA’s Earth Science Technology Office ESTO) \n        through the Advanced Information Systems Technology (AIST) Program (Grant Number: 80NSSC17K0244).</p>\n\n      <p>The EcoSIS Toolkit is an extension of <a href="https://ecosis.org" target="_blank">EcoSIS.org</a>, \n        which is online open-source database of ecologically \n        oriented spectral measurements and associated metadata such as leaf or plant morphological and chemical \n        measurements. EcoSIS is a repository to store your spectral data for distribution to the larger scientific \n        community, as required by granting agencies and journals. EcoSIS enables data discovery and integration \n        across datasets through a web-based search or an API. EcoSIS provides contributors with a DOI to enable \n        long-term archiving and accessibility.</p>\n\n      <p>EcoSML.org is part of the EcoSIS Toolkit. EcoSML stand for the EcoSIS Spectral Model Library. One of the \n        major uses of spectral data such as you might find in EcoSIS is the development of spectral models to \n        predict vegetation traits such as leaf mass per area, chlorophyll content, water content or nitrogen \n        concentration.  <b>EcoSML is meant to be a repository for the spectral models that people use to \n        predict variables of interest from spectral data</b> (spectral data can include image, canopy  (proximal) \n        or leaf level data). EcoSML provides both coefficients (e.g., for models built using partial least-squares \n        regression, PLSR) and code needed by users to apply a spectral model to their data.</p>\n\n      <p>Researchers provide details and resources to create model packages that include coefficients, error parameters, \n        demonstration data, and code. Users will be able to browse models, explore example code, and test outputs. Model \n        packages will be installable via common package managers like Python\'s PyPI/pip, as well as R\'s CRAN.</p>\n\n      <p>\n          EcoSML accommodates any model forms that can be imbedded in code. At present this includes PLSR and Gaussian \n          Process Models, and will be expanded to accept other model formats.\n      </p>\n\n      <div>EcoSML’s primary objectives:</div>\n      <ul>\n        <li>Serve as a widely-accessible online repository where researchers can offer spectroscopy-derived models to \n          the science community</li>\n        <li>Provide a robust API that allows direct links with EcoSIS.org, and various open-source software or \n          desktop softwares users may have.\n          </li>\n      </ul>\n\n      <div style="text-align: center">\n        <img style="max-width: 600px; width: 100%" src="/images/linkages.png" />\n      </div>\n\n      <h2>Personnel:</h2>\n      <ul>\n        <li><b>PI</b> <a target="_blank" href="https://forestandwildlifeecology.wisc.edu/people/faculty-and-staff/philip-townsend/">Philip Townsend</a></li>\n        <li><b>Project Manager</b> Erin Wagner</li>\n        <li><b>Lead Developer</b> <a target="_blank" href="https://github.com/jrmerz">Justin Merz</a></li>\n      </ul>\n    </div>\n</div>\n'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  /* .root {\n    display: flex;\n    justify-content: center;\n  } */\n\n  .stat-row {\n    padding: 3px;\n    display: flex;\n  }\n\n  .stat-row > div:first-child {\n    flex: 1;\n  }\n \n  .count-label {\n    background: #eee;\n    border-radius: 20px;\n    padding: 1px 5px;\n    font-size: 13px;\n  }\n\n  .gitinfo {\n    padding: 10px;\n    font-size: 11px;\n    color: #999;\n  }\n\n  footer {\n    display: flex;\n  }\n\n  footer > div {\n    flex: 1;\n  }\n\n  footer h2 {\n    margin-top: 0;\n  }\n\n  .beta-msg, .sandbox-msg {\n    color: var(--default-primary-color);\n  }\n\n  @media(max-width: 750px) {\n    .row {\n      display: block;\n      margin: 0;\n    }\n\n    h2.uheader {\n      margin-top: 35px;\n    }\n\n    .row > * {\n      flex : 1;\n      padding: 0;\n    }\n  }\n</style>\n\n<div class="root">\n  <div style="padding: 15px; text-align: center">\n    <h1 style="margin-bottom: 0">Ecological Spectral Model Library <span id="titleExtra"></span></h1>\n    <div>Welcome to the EcoSML, a useful tool for finding spectral models.</div>\n    <p hidden$="[[!sandbox]]" class="sandbox-msg">\n      <iron-icon icon="warning" style="vertical-align: bottom"></iron-icon> \n      This is the development server for \n      <a href="https://ecosml.org" highlight style="text-decoration: underline;">ecosml.org</a>. You can use this \n      server to learn about how to use the EcoSML model management tools.\n    </p>\n    <p class="beta-msg">\n      <iron-icon icon="warning" style="vertical-align: bottom"></iron-icon> \n      This is an beta version of EcoSML. Please report any bugs or issues you have \n      <a href="https://github.com/EcoSIS/ecosml-webapp/issues/new/choose" target="_blank" highlight style="text-decoration: underline;">here.</a>\n    </p>\n  </div>\n</div>\n\n<div class="root">\n  <div class="main-panel">\n\n    <div class="row">\n      <div>\n        <h2 class="uheader blue">Top Organizations</h2>\n        <dom-repeat items="[[stats.organizations]]">\n          <template>\n            <div class="stat-row">\n              <div><a href$="[[item.link]]">[[item.displayName]]</a></div>\n              <div class="count-label">[[item.count]]</div>\n            </div>\n          </template>\n        </dom-repeat>\n      </div>\n      <div>\n        <h2 class="uheader green">Top Keywords</h2>\n        <dom-repeat items="[[stats.keywords]]">\n          <template>\n            <div class="stat-row">\n              <div><a href$="[[item.link]]">[[item.key]]</a></div>\n              <div class="count-label">[[item.count]]</div>\n            </div>\n          </template>\n        </dom-repeat>\n      </div>\n      <div>\n        <h2 class="uheader lightblue">Top Themes</h2>\n        <dom-repeat items="[[stats.themes]]">\n          <template>\n            <div class="stat-row">\n              <div><a href$="[[item.link]]">[[item.key]]</a></div>\n              <div class="count-label">[[item.count]]</div>\n            </div>\n          </template>\n        </dom-repeat>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class="root">\n  <div class="main-panel">\n    <div class="row">\n      <div>\n        <h2 class="uheader lightgreen">Contribute!</h2>\n        <div hidden$="[[!loggedIn]]"><a href="/create">Create Package</a></div>\n        <div hidden$="[[loggedIn]]"><a href="/account">Login to Create Package</a></div>\n      </div>\n      <div>\n        <h2 class="uheader blue">Spectral Data</h2>\n        <div>Looking for spectral data? \n          Check out <a href$="[[ecosisHost]]">[[ecosisHost]]</a>.\n        </div>\n      </div>\n    </div>\n    \n\n  </div>\n</div>\n\n<div class="root">\n  <div class="main-panel">\n    <footer>\n      <div style="padding-right: 5px">\n        <div style="display:flex; align-items: center">\n          <img src="/images/nasa_logo.png" style="height: 115px; margin-right: 15px" />\n          <div>\n              <h2><a href="https://www.nasa.gov" target="_blank">NASA</a></h2>\n              <div><b>Program:</b> Advanced Information Systems Technology (AIST) Program</div>\n              <div><b>Grant Number:</b> 80NSSC17K0244</div>\n            </div>\n        </div>\n        \n      </div>\n      <div style="padding-left: 5px">\n        <h2>EcoSML Team</h2>\n        <div>University of Wisconsin-Madison Environmental Spectroscopy (EnSpec) Lab</div>\n        <div><b>PI:</b> Phil Townsend</div>\n        <div><b>Project Manager:</b> Erin Wagner</div>\n        <div><b>Lead Developer:</b> Justin Merz</div>\n      </div>\n    </footer>\n  </div>\n</div>\n\n<div hidden$="[[!sandbox]]" class="gitinfo">\n  <div>Branch: [[gitenv.branch]]</div>\n  <div>Tag: [[gitenv.tag]]</div>\n  <div>Commit: [[gitenv.commit]]</div>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n    padding-bottom: 50px;\n  }\n\n  h2 {\n    display: flex;\n  }\n\n  h2 a {\n    display: block;\n    flex: 1;\n  }\n\n  a {\n    color: var(--default-primary-color);\n    text-decoration: none;\n  }\n\n  a:hover, a:hover:visited  {\n    color: var(--light-primary-color);\n  }\n\n  a:visited {\n    color: var(--default-primary-color);\n  }\n\n  .help {\n    margin-top: 5px;\n    font-size: 16px;\n  }\n\n  .org {\n    font-size: 14px;\n    align-self: flex-end;\n    color: var(--default-primary-color);\n  }\n</style>\n\n<h2 class="uheader green">\n  <a href$="/package/[[item.id]]">[[item.name]]</a>\n  <div class="org">[[item.organization]]</div>\n</h2>\n<div>[[item.overview]]</div>\n<div>\n  <iron-icon icon="editor:linear-scale"></iron-icon>\n  <span class="help">[[latestRelease]]</span>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n    padding: 10px;\n    min-height: 500px;\n  }\n\n  .no-match {\n    text-align: center;\n  }\n</style>\n\n\n<app-search-pagination \n  text-mode \n  items-per-page="[[itemsPerPage]]"\n  current-index="[[currentIndex]]"\n  total-results="[[total]]"\n  on-nav="_onPaginationNav">\n</app-search-pagination>\n\n<div class="no-match" hidden$="[[hasResults]]">\n  No packages match your current search.\n</div>\n\n<div class="main-panel">\n  <template is="dom-repeat" items="[[results]]">\n    <app-search-result item="[[item]]"></app-search-result>\n  </template>\n</div>\n\n<app-search-pagination \n  hidden$="[[!hasResults]]"\n  items-per-page="[[itemsPerPage]]"\n  current-index="[[currentIndex]]"\n  total-results="[[total]]"\n  on-nav="_onPaginationNav">\n</app-search-pagination>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n  .title {\n    display: flex;\n    align-items: center;\n  }\n  .title h2 {\n    flex: 1;\n    margin : 0;\n    padding: 10px 0 0 0;\n  }\n  .clear-filters {\n    display: none;\n  }\n  .clear-filters[active] {\n    display: inline-block;\n  }\n</style>\n\n<div class="title">\n  <button class="clear-filters">Clear Filters</button>\n</div>\n\n<div hidden$="[[hasFilters]]">\n  No additional filters for current search\n</div>\n\n<template is="dom-repeat" items="[[filters]]">\n  <app-filter-panel \n    on-item-selected="_onFilterSelected"\n    filter="[[item.key]]"\n    label="[[item.label]]"\n    values="[[item.values]]">\n  </app-filter-panel>\n</template>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  .layout {\n    display: flex;\n    position: relative;\n  }\n\n  .filters-border {\n    border-radius: 0 3px 3px 0;\n    border-top: 1px solid #ddd;\n    border-bottom: 1px solid #ddd;\n    border-right: 1px solid #ddd;\n  }\n\n  .filters-title {\n    display: flex;\n    padding: 16px;\n    align-items: center;\n    font-weight: bold;\n  }\n\n  .filters-title paper-icon-button {\n    display: none;\n    color: var(--text-primary-color);\n  }\n\n  .filters-toggle {\n    padding: 10px;\n    display: none;\n  }\n\n  iron-icon[icon="filter-list"] {\n    vertical-align: text-bottom;\n  }\n\n  .location-label {\n    cursor: pointer;\n    display: flex;\n    color: var(--default-primary-color);\n    padding: 10px 0;\n    font-weight: bold;\n    position: relative;\n    background-color: white;\n    padding-left: 15px;\n    border-radius: 0 0 3px 0;\n    min-width: 250px;\n  }\n\n  .no-results {\n    padding: 50px;\n    text-align: center;\n  }\n\n  .api-link {\n    text-align: center;\n    color: var(--secondary-text-color);\n    padding: 10px;\n    font-size: 12px;\n  }\n  .api-link a {\n    color: var(--secondary-text-color);\n  }\n\n  @keyframes slidein {\n    from {\n      left: -260px;\n    }\n    to {\n      left: 0px;\n    }\n  }\n\n  @keyframes fadein {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  @media(max-width: 768px) {\n    .filters {\n      animation: 300ms slidein;\n      display: none;\n      position: absolute;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      overflow-y: auto;\n      background-color: var(--default-background-color);\n      z-index: 1000;\n    }\n\n    .filters-border {\n      border: none;\n      border-radius: 0;\n    }\n\n    .filters-background {\n      animation: 300ms fadein;\n      display: none;\n      position: absolute;\n      top: 0;\n      right: 0;\n      left: 0;\n      bottom: 0;\n      background-color: rgba(0,0,0,0.5);\n      z-index: 999;\n    }\n\n    .filters[open] {\n      display: block;\n    }\n\n    .filters-background[open] {\n      display: block;\n    }\n\n    .filters-title {\n      background-color: white;\n    }\n\n    .filters-title paper-icon-button {\n      display: inline-block;\n    }\n\n    .filters-toggle {\n      display: flex;\n    }\n  }\n</style>\n\n<div class="layout">\n  <div class="filters-background" open$="[[mobileFiltersOpen]]"></div>\n  <div class="filters" open$="[[mobileFiltersOpen]]">\n    <div class="filters-title">\n      <div style="flex: 1"><iron-icon icon="filter-list"></iron-icon> Filters</div>\n      <paper-icon-button on-click="_toggleMobileFilters" icon="close"></paper-icon-button>\n    </div>\n\n    <div class="filters-border">\n      <app-filters-panel></app-filters-panel>\n    </div>\n  </div>\n\n  <div style="flex: 1; max-width: 1150px;">\n    <div class="filters-toggle">\n      <a on-click="_toggleMobileFilters"><iron-icon icon="filter-list"></iron-icon>  Filters</a>\n    </div>\n    <app-search-results-panel></app-search-results-panel>\n  </div>\n</div>\n\n<div class="root">\n  <div style="padding: 75px 15px 40px 15px">\n    <div itemtype="http://schema.org/Organization" itemprop="provider">\n      <h2 itemprop="name" style="margin-bottom: 0px">EcoSML</h2>\n      <div class="help-block" style="margin-bottom: 0px" itemprop="description">Ecosystem Spectral Model Library</div>\n      <div>\n        <a href="https://ecosml.org" itemprop="url" highlight>https://ecosml.org</a> |\n        <a href="mailto:info@ecosis.org" itemprop="email" highlight>info@ecosis.org</a> |\n        <a href="mailto:help@ecosis.org" highlight>help@ecosis.org</a>\n      </div>\n    </div>\n  </div>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n  .row {\n    display: flex;\n    align-items: center;\n  }\n  .description {\n    font-style: italic;\n    flex: 1;\n  }\n</style>\n\n<div style="display:flex">\n  <div style="padding-right: 5px">\n    <iron-icon icon="editor:linear-scale"></iron-icon>\n  </div>\n  <div style="flex:1">\n    <div class="row">\n      <div style="flex:1">[[name]]</div>\n      <div>[[published]]</div>\n    </div>\n    \n    <div class="row">\n      <div class="description">[[description]]</div>\n      <div><a href$="[[zipballUrl]]">Download</a></div>\n    </div>\n  </div>\n</div>\n\n\n'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  .layout {\n    display: flex;\n    align-items: flex-end;\n  }\n\n  .layout input {\n    width: 100%;\n  }\n\n  .period {\n    font-size: 40px;\n  }\n\n  app-release {\n    padding-bottom: 15px;\n  }\n\n  .release-header {\n    font-weight: bold;\n    margin-bottom: 5px;\n    padding-bottom: 5px;\n    font-size: 18px;\n    border-bottom: 1px solid var(--dark-background-color);\n  }\n\n  paper-button {\n    font-size: 14px;\n    color: var(--light-secondary-color);\n  }\n</style>\n\n<h2 class="uheader lightblue" style="display:flex; align-items: center">\n  <div style="flex:1">Releases</div>\n  <div>\n    <paper-button hidden$="[[creating]]" on-click="_toggleCreate"><iron-icon icon="add"></iron-icon> Create</paper-button>\n    <paper-button hidden$="[[!creating]]" on-click="_toggleCreate">Cancel</paper-button>\n  </div>\n</h2>\n\n<div hidden$="[[!creating]]">\n  <div class="layout">\n    <div>\n      <div>Major</div>\n      <input type="number" id="major" placeholder="1" on-change="_onInputChange" />\n    </div>\n    <div class="period">.</div>\n    <div>\n      <div>Minor</div>\n      <input type="number" id="minor" placeholder="0" on-change="_onInputChange" />\n    </div>\n    <div class="period">.</div>\n    <div>\n      <div>Patch</div>\n      <input type="number" id="patch" placeholder="0" on-change="_onInputChange" />\n    </div>\n  </div>\n  <div>\n    <input type="text" placeholder="Release description" id="description" style="width: 100%" />\n  </div>\n\n  <div style="text-align: right">\n    <a href="https://semver.org/" target="_blank">Versioning Help</a>\n  </div>\n  <div>\n    <paper-button id="create" on-click="_onCreateClicked" disabled$="[[saving]]">Create Release</paper-button>\n  </div>\n</div>\n\n<div hidden$="[[creating]]">\n  <div><a href="[[packageHtmlUrl]]/releases" target="_blank">View on GitHub</a></div>\n\n  <div hidden$="[[hasCurrentRelease]]">\n    Click create above to <b>create</b> the packages first release!\n  </div>\n\n  <div hidden$="[[!hasCurrentRelease]]" style="padding: 15px 0"> \n    <div class="release-header">Current Release</div>\n    <app-release release="[[currentRelease]]"></app-release>\n  </div>\n  \n  <div hidden$="[[!hasPriorReleases]]">\n    <div class="release-header">Prior Releases</div>\n    <template is="dom-repeat" items="[[priorReleases]]">\n      <app-release release="[[item]]"></app-release>\n    </template>\n  </div>\n</div>\n'},function(e,t){e.exports='<style>\n\n  .row {\n    display: flex;\n    align-items: center;\n    margin: 3px 0;\n  }\n\n  .file-label {\n    flex: 1;\n  }\n\n  .change-label {\n    text-transform: capitalize;\n  }\n\n  [change-type="added"] {\n    color: var(--color-green);\n  }\n  [change-type="updated"] {\n    color: var(--color-orange);\n  }\n  [change-type="removed"] {\n    color: var(--color-red);\n  }\n</style>\n\n<app-popup id="popup" no-auto-move>\n  <div style="padding: 10px">\n    <div style="display:flex">\n      <h2 style="margin:0; flex:1">Changes</h2>\n      <paper-icon-button icon="close" on-click="_cancel"></paper-icon-button>\n    </div>\n\n    <div>Please review changes below to ensure appropriate file\n      modifications are being made to your package.\n    </div>\n\n    <div style="padding: 30px 0">\n      <template is="dom-repeat" items="[[files]]">\n        <div change-type$="[[item.changeType]]" class="row">\n          <div class="file-label">[[item.name]]</div>\n          <div class="change-label">[[item.changeType]]</div>\n        </div>\n      </template>\n    </div>\n\n    <div style="text-align: right" hidden$="[[saving]]">\n      <paper-button on-click="_cancel">Cancel</paper-button>\n      <paper-button on-click="_save">Save Changes</paper-button>\n    </div>\n    <div style="text-align: right" hidden$="[[!saving]]">[[status]]</div>\n  </div>\n</app-popup>'},function(e,t,n){(t=e.exports=function(e){e=e.toLowerCase();var n=t[e];if(!n)throw new Error(e+" is not supported (we accept pull requests)");return new n}).sha=n(112),t.sha1=n(111),t.sha224=n(110),t.sha256=n(53),t.sha384=n(109),t.sha512=n(52)},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n  }\n\n  input {\n    display: none;\n  }\n\n  .inputfile + label {\n    font-size: 1.25em;\n    font-weight: 700;\n    color: white;\n    background-color: black;\n    display: inline-block;\n  }\n\n  input:focus + label,\n  input + label:hover {\n    background-color: red;\n  }\n\n  .layout {\n    display: flex;\n    align-items: center;\n  }\n\n  #dropbox {\n    border: 1px solid var(--dark-background-color);\n    /* border: 1px dashed var(--secondary-text-color); */\n    padding: 15px;\n    border-radius: 6px;\n  }\n\n  #dropbox .droplabel {\n    transition: transform 350ms linear;\n    will-change: transform;\n    transform: scale(1);\n    font-size: 14px;\n    color : var(--secondary-text-color);\n    padding-left : 10px;\n  }\n\n  #dropbox.hover {\n    border: 1px dashed var(--default-primary-color);\n    background-color: var(--default-background-color);\n  }\n\n  #dropbox.hover .droplabel {\n    transform: scale(1.25) translateX(15px);\n    color: var(--default-primary-color);\n  }\n\n  paper-button {\n    background-color: var(--default-primary-color);\n    color: white;\n  }\n\n  .help {\n    color: var(--secondary-text-color);\n    font-size: 14px;\n  }\n</style>\n\n<app-file-diff id="diff"></app-file-diff>\n\n<div id="dropbox" \n  on-dragover="_onDropBoxDragOver" \n  on-dragleave="_onDropBoxDragLeave" \n  on-drop="_onDropBoxDrop">\n  \n  <div class="layout">\n    <div>\n      <input type="file" webkitdirectory directory multiple id="fileInput" on-change="_onChange" />\n      <paper-button on-click="_onChooseClicked">Choose Folder</paper-button>\n    </div>\n    <div class="droplabel">\n      Drag and drop root directory here\n    </div>\n  </div>\n</div>'},function(e,t,n){"use strict";
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */e.exports=function(e,t){if("string"==typeof e)return l(e);if("number"==typeof e)return o(e,t);return null},e.exports.format=o,e.exports.parse=l;var i=/\B(?=(\d{3})+(?!\d))/g,a=/(?:\.0*|(\.[^0]+)0+)$/,r={b:1,kb:1024,mb:1<<20,gb:1<<30,tb:1024*(1<<30)},s=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb)$/i;function o(e,t){if(!Number.isFinite(e))return null;var n=Math.abs(e),s=t&&t.thousandsSeparator||"",o=t&&t.unitSeparator||"",l=t&&void 0!==t.decimalPlaces?t.decimalPlaces:2,h=Boolean(t&&t.fixedDecimals),c=t&&t.unit||"";c&&r[c.toLowerCase()]||(c=n>=r.tb?"TB":n>=r.gb?"GB":n>=r.mb?"MB":n>=r.kb?"KB":"B");var d=(e/r[c.toLowerCase()]).toFixed(l);return h||(d=d.replace(a,"$1")),s&&(d=d.replace(i,s)),d+o+c}function l(e){if("number"==typeof e&&!isNaN(e))return e;if("string"!=typeof e)return null;var t,n=s.exec(e),i="b";return n?(t=parseFloat(n[1]),i=n[4].toLowerCase()):(t=parseInt(e,10),i="b"),Math.floor(r[i]*t)}},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n    margin-left: 20px;\n    padding-left: 20px;\n    border-left: 1px solid var(--secondary-text-color);\n    font-size: 14px;\n  }\n  .layout:hover {\n    font-weight: bold;\n  }\n  .layout {\n    display: flex;\n  }\n  .bytes {\n    color: var(--secondary-text-color);\n    font-size: 14px;\n  }\n</style>\n\n<div class="layout">\n  <div style="flex:1">[[data.filename]]</div>\n  <div class="bytes">[[bytes]]</div>\n</div>\n'},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n    margin-left: 25px;\n  }\n\n  :host(#root) {\n    margin-left: 0px;\n  }\n\n  .controls {\n    display: flex;\n    align-items: center;\n    /* border-bottom: 1px solid transparent; */\n  }\n  .controls:hover {\n    font-weight: var(--font-weight-heavy);\n    /* border-bottom: 1px solid var(--light-secondary-color); */\n  }\n</style>\n\n<div class="controls" open$="[[open]]">\n  <paper-icon-button icon="folder" on-click="toggle" hidden$="[[open]]"></paper-icon-button> \n  <paper-icon-button icon="folder-open" on-click="toggle" hidden$="[[!open]]"></paper-icon-button> \n  <div style="flex:1; cursor: pointer" on-click="toggle" >[[data.name]]</div>\n</div>\n\n<div hidden$="[[!open]]">\n  <template is="dom-repeat" items="[[files]]">\n    <app-file-tree-leaf data="[[item]]"></app-file-tree-leaf>\n  </template>\n  <template is="dom-repeat" items="[[directories]]">\n    <app-file-tree-branch data="[[item]]"></app-file-tree-branch>\n  </template>\n</div>'},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n  }\n</style>\n\n<app-file-tree-branch id="root"></app-file-tree-branch>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  app-file-manager {\n    margin-bottom: 75px;\n  }\n\n  .examples {\n    display: flex;\n    align-items: center;\n  }\n\n  .examples :first-child {\n    flex: 1;\n  }\n\n  .examples paper-button {\n    font-size: 14px;\n    color: var(--default-secondary-color);\n  }\n\n  [slot="help"] {\n    margin-bottom: 20px;\n    font-size: 14px;\n    color: var(--secondary-text-color);\n  }\n</style>\n\n<div>\n  <a href$="[[editorData.htmlUrl]]/archive/master.zip">\n    <iron-icon icon="archive"></iron-icon> Download Package Files\n  </a>\n</div>\n\n<div hidden$="[[isManagedSource]]" style="margin-top: 15px">\n  This is a Registered Repository, make edits to the package files via git.\n</div>\n\n<div hidden$="[[!isManagedSource]]">\n  <h2 style="margin-bottom: 5px">Sync Changes</h2>\n  <div style="margin-bottom: 15px">Upload root package directory to sync all changes to repository.</div>\n  <div>\n    <app-folder-uploader></app-folder-uploader>\n  </div>\n\n  <app-file-tree style="margin-top: 35px"></app-file-tree>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n  .layout {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .layout > * {\n    flex: .333;\n  }\n  h3 {\n    padding: 0;\n    margin: 0;\n  }\n</style>\n\n<div class="layout">\n  <div>\n    <h3 hidden$="[[hideLabels]]">Category</h3>\n    <select id="theme" on-change="_onThemeSelect">\n      <option></option>\n      <template is="dom-repeat" items="[[themeOptions]]">\n        <option value$="[[item]]">[[item]]</option>\n      </template>\n    </select>\n  </div>\n\n  <div>\n    <h3 hidden$="[[hideLabels]]">Family</h3>\n    <select on-change="_onFamilySelect" id="family" hidden$="[[!selectedTheme]]">\n      <option></option>\n      <template is="dom-repeat" items="[[familyOptions]]">\n        <option value$="[[item]]">[[item]]</option>\n      </template>\n    </select>\n  </div>\n\n  <div >\n    <h3 hidden$="[[hideLabels]]">Specific</h3>\n    <select on-change="_onSpecificSelect" id="specific" hidden$="[[!showSpecific]]">\n      <option></option>\n      <template is="dom-repeat" items="[[specificOptions]]">\n        <option value$="[[item]]">[[item]]</option>\n      </template>\n    </select>\n  </div>\n</div>'},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n  }\n\n  .layout {\n    display: flex; \n    align-items: center;\n    padding: 3px;\n  }\n\n  .rows .layout:nth-child(even) {\n    background-color: #eee;\n  }\n\n  app-theme-input {\n    flex: 1;\n  }\n</style>\n\n<div class="rows">\n  <template is="dom-repeat" items="[[themes]]">\n    <div class="layout">\n      <app-theme-input \n        selected-theme="[[item.theme]]"\n        selected-family="[[item.family]]"\n        selected-specific="[[item.specific]]"\n        on-update="_onThemeUpdate"\n        index$="[[index]]">\n      </app-theme-input>\n      <paper-icon-button \n        icon="delete" \n        index$="[[index]]"\n        on-click="_onDeleteClicked">\n      </paper-icon-button>\n    </div>\n  </template>\n</div>\n\n<paper-button on-click="_onAddClicked">Add</paper-button>'},function(e,t,n){var i=n(118);e.exports="string"==typeof i?i:i.toString()},function(e,t,n){var i=n(119);e.exports="string"==typeof i?i:i.toString()},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n  }\n\n  #root * {\n    word-break: break-word;\n  }\n</style>\n<div id="root" class="markdown-body"></div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n  .btns {\n    display: flex;\n    align-items: center;\n    padding-bottom: 5px;\n  }\n\n  textarea {\n    width: 100%;\n    min-height: 200px;\n    margin: 0 !important;\n  }\n\n  app-markdown {\n    border: 1px solid #ccc;\n    padding: 10px;\n    box-shadow: 0 0 5px #ccc inset;\n  }\n\n  paper-button {\n    color: var(--default-secondary-color);\n  }\n  paper-button[disabled] {\n    color: var(--disabled-text-color);\n  }\n</style>\n\n\n<div class="btns">\n  <div style="flex:1">\n    \x3c!-- <span hidden$="[[previewMode]]">Edit</span>\n    <span hidden$="[[!previewMode]]">Preview</span>  --\x3e\n    \x3c!-- Mode --\x3e\n  </div>\n  <paper-button disabled$="[[!previewMode]]" on-click="_toggle" data="edit">\n    <iron-icon icon="code"></iron-icon>\n    &nbsp;Edit\n  </paper-button>\n  <paper-button disabled$="[[previewMode]]" on-click="_toggle" data="preview">\n    <iron-icon icon="visibility"></iron-icon>\n    &nbsp;Preview\n  </paper-button>\n</div>\n\n<iron-pages selected="[[selected]]" attr-for-selected="id">\n  <textarea id="input" on-change="_triggerChangeEvent" on-keyup="_onTextAreaKeyUp"></textarea>\n  <app-markdown id="preview" pkg-name="[[pkgName]]"></app-markdown>\n</iron-pages>\n'},function(e,t){e.exports='\n<style>\n  :host {\n    display: block;\n  }\n\n  div {\n    display: flex;\n    align-items: center;\n  }\n\n  span {\n    /* padding-left: 5px; */\n    display: inline-block;\n    vertical-align: baseline;\n  }\n\n  button {\n    margin: 3px 5px;\n    padding: 8px;\n    background: white;\n    border-radius: 3px;\n  }\n\n  iron-icon {\n    --iron-icon-width: 18px;\n    --iron-icon-height: 18px;\n  }\n\n  button:hover {\n    cursor: pointer;\n    color: var(--inverse-text-color);\n    background: var(--default-primary-color);\n  }\n\n  app-text-input {\n    display: block;\n  }\n</style>\n\n<app-text-input \n  id="input" \n  placeholder="[[label]]"\n  on-change="_onChange" \n  on-keyup="_onKeyPress">\n</app-text-input>\n\n<div>\n  <template is="dom-repeat" items="[[keywords]]">\n    <button value$="[[item]]" on-click="_onRemoveClicked">\n      <iron-icon icon="clear"></iron-icon>\n      <span>[[item]]</span>\n    </button>\n  </template>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  app-org-input {\n    margin-top: 15px;\n  }\n  \n  app-keyword-input {\n    margin-top: 15px;\n  }\n\n  h2.uheader.break {\n    margin-top: var(--form-break-margin);\n  }\n</style>\n\n\n<h2 class="uheader lightblue">README</h2>\n<div hidden="[[!isManagedSource]]">\n  <div class="help">Please provide documentation on the model\n    and how it should be used. Code snippets are encourage. Markdown is supported and highly \n    encouraged.  Markdown is simple markup syntax that can be used to make your documentation\n    easier to follow and read.  <a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/" target="_blank">Markdown help.</a>\n    <a href="https://help.github.com/articles/creating-and-highlighting-code-blocks/" target="_blank">Supports code syntax highlighting as well.</a>\n  </div>\n  <app-markdown-editor label="Description" id="description" on-markdown-change="_onInputChange"></app-markdown-editor>\n</div>\n<div hidden="[[isManagedSource]]" class="help">\n  Pulled from /README.md file of the master branch of <a href="[[githubUrl]]/tree/master" target="_blank">[[packageName]]</a>\n</div>\n\n<h2 class="uheader green break">Keywords</h2>\n<div class="help">Faceted keywords for package discovery</div>\n<app-keyword-input \n  id="keywords" \n  label="Keywords. Comma Separate" \n  on-keyword-change="_onInputChange">\n</app-keyword-input>\n\n<h2 class="uheader blue break">Theme</h2>\n<div class="help">Package theming information</div>\n\n<app-multi-theme-input \n  id="theme" \n  on-update="_onThemeUpdate" \n  style="margin-top: 15px">\n</app-multi-theme-input>'},function(e,t){e.exports='<style include="shared-styles">\n\n  a {\n    color: var(--default-primary-color);\n    text-decoration: none;\n  }\n\n  .steps {\n    margin-top: 15px;\n    display: flex;\n    align-items: center;\n  }\n\n  .steps .number {\n    height: 32px;\n    width: 32px;\n    border-radius: 18px;\n    background-color: var(--secondary-text-color);\n    color: white;\n    font-size: 22px;\n    text-align: center;\n    margin: 10px;\n  }\n\n  .steps .text {\n    flex: 1;\n  }\n</style>\n\n\n\n\x3c!-- <app-popup id="popup" no-auto-move> --\x3e\n  <div style="padding: 10px">\n    \x3c!-- <div style="display:flex; align-items: center; margin-bottom: 40px">\n      <h2 style="flex: 1; margin: 0">Package Created!</h2>\n      <paper-icon-button icon="close" on-click="_cancel"></paper-icon-button>\n    </div> --\x3e\n\n    <div class="steps">\n      <div class="number">1</div>\n      <div class="text">\n        Click below to download the package files and get started! <br />\n        <a href="https://github.com/[[githubOrg]]/[[name]]/archive/master.zip">\n          <iron-icon icon="archive"></iron-icon> Download package files\n        </a>\n      </div>\n    </div>\n\n    <div class="steps">\n      <div class="number">2</div>\n      <div class="text">\n        Locally add / update your model code, resources and papers.\n      </div>\n    </div>\n\n    <div class="steps">\n      <div class="number">3</div>\n      <div class="text">\n        Use the <b>Files</b> tab to sync changes back to EcoSML.\n      </div>\n    </div>\n\n    <div class="steps">\n      <div class="number">4</div>\n      <div class="text">\n        Use the <b>Details</b> tab to add model documentation, keywords and themes.\n      </div>\n    </div>\n\n    <div class="steps">\n      <div class="number">5</div>\n      <div class="text">\n        Use the <b>Releases</b> tab to create a versioned release of the model \n        allowing the package show in search.\n      </div>\n    </div>\n\n    <div style="margin-top: 30px; text-align: right">\n      <paper-button on-click="_cancel">Close</paper-button>\n    </div>\n  </div>\n\x3c!-- </app-popup> --\x3e'},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n  }\n\n  .static-overview {\n    background-color: var(--default-background-color);\n    border: 1px solid var(--dark-background-colorr);\n    border-radius: 6px;\n    padding: 10px;\n  }\n\n  app-text-input {\n    display: block;\n  }\n</style>\n\n<div hidden$="[[!isManagedSource]]">\n  <div class="help">One sentance summary of package</div>\n  <app-text-input \n    id="overview"\n    on-change="_onInputChange"\n    placeholder="Overview (Short Description)">\n  </app-text-input>\n</div>\n<div hidden$="[[isManagedSource]]">\n  <div class="help" style="margin-bottom: 10px">Pulled from the repositories GitHub description.</div>\n  <div class="static-overview" hidden$="[[creating]]">[[value]]</div>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  select {\n    min-width: 200px;\n    width: 100%;\n  }\n</style>\n\n<select id="input" on-change="_onInputChange">\n  <option></option>\n  <template is="dom-repeat" items="[[orgs]]">\n    <option value="[[item.name]]">[[item.displayName]]</option>\n  </template>\n</select>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n  }\n\n  h2.uheader.break, h2.uheader[break] {\n    margin-top: var(--form-break-margin);\n  }\n\n  app-text-input {\n    display: block;\n  }\n\n  app-org-input, app-text-input, select {\n    margin-top: 15px\n  }\n\n  .delete {\n    margin-top: 75px;\n    text-align: right;\n  }\n\n  .radio-layout {\n    display: flex;\n    margin-top: 10px;\n  }\n\n  .radio-layout label {\n    font-weight: bold;\n    padding: 10px 0;\n    display: block;\n  }\n\n  input[type="radio"] {\n    margin: 10px 15px;\n  }\n\n  #nameMessage.ok {\n    color: var(--color-green);\n  }\n\n  #nameMessage.error {\n    color: var(--color-red);\n  }\n\n  paper-button[sync] {\n    color: white;\n    background-color: var(--default-primary-color);\n    margin: 15px 0;\n  } \n\n</style>\n\n<app-popup id="created" title="Package Created!">\n  <app-created-popup name="[[name]]"></app-created-popup>\n</app-popup>\n\n<div hidden$="[[creating]]">\n  <div hidden$="[[isManagedSource]]" style="margin-bottom: 35px">\n    \n    <paper-button sync style="white-space: nowrap" on-click="_onSyncClicked" hidden$="[[syncing]]">\n      <iron-icon icon="cached"></iron-icon> Sync Repository\n    </paper-button>\n    <paper-button style="white-space: nowrap" disabled hidden$="[[!syncing]]">Syncing..</paper-button>\n\n    <div class="help">Synchronize the repository overview, README and releases from GitHub.  This process happens\n      nightly, but you can request data be synchronized right now if you wish.\n    </div>\n  </div>\n</div>\n\n<div hidden$="[[!creating]]">\n  <div hidden$="[[!isManagedSource]]" >\n    <h2 class="uheader blue" hidden$="[[!creating]]">Package Name</h2>\n    <app-text-input  \n      id="name" \n      on-change="_updateNamePreview"\n      on-keyup="_onNameInputKeyUp"\n      hidden$="[[!creating]]">\n    </app-text-input>\n    <div id="nameMessage" hidden$="[[!creating]]"></div>\n  </div>\n</div>\n\n<div hidden$="[[!creating]]">\n  <div hidden$="[[isManagedSource]]" >\n    <h2 class="uheader blue" hidden$="[[!creating]]">Repository Url</h2>\n    <app-text-input  \n      id="url" \n      on-change="_onUrlInputChange"\n      on-keyup="_checkUrl"\n      hidden$="[[!creating]]">\n    </app-text-input>\n    <div id="urlMessage" hidden$="[[!creating]]"></div>\n    <div class="help">Provide a full url to the GitHub repository or the Organization/Repository path name</div>\n  </div>\n</div>\n\n\n<h2 class="uheader lightblue" break$="[[creating]]">Package Overview</h2>\n<app-overview-input \n  creating="[[creating]]"\n  is-managed-source="[[isManagedSource]]"\n  on-change="_onInputChange"\n  id="overview">\n</app-overview-input>\n\n<h2 class="uheader green break">Organization</h2>\n<div class="help">The <a href="https://ecosis.org" target="_blank">EcoSIS</a> organization this package belongs to, \n  all members will have access. If you need to create or edit an organization, do so via \n  <a href="[[ecosisDataHost]]/organization" target="_blank">EcoSIS organization management.</a>\n</div>\n<app-org-input id="organization" on-change="_onInputChange" style="display:block"></app-org-input>\n\n\n<h2 class="uheader green break">Language</h2>\n<div class="help">Which programming language is this package written in?</div>\n<select id="language" on-change="_onInputChange" style="width:100%">\n  <option></option>\n  <option value="python">Python</option>\n  <option value="r">R</option>\n  <option value="other">Other</option>\n</select>\n\n<h2 class="uheader green break">Code Type</h2>\n\n<div class="radio-layout">\n  <input id="packageInput" type="radio" name="software-package" value="package" on-change="_onInputChange"/> \n  <div>\n      <label for="packageInput">Package</label>\n      <div class="help">The code is a distributable software package meant to be installed via\n        the languages package management system such as; <a href="https://pypi.org/project/pip/" target="_blank">Python/PIP</a>, <a href="https://cran.r-project.org/" target="_blank">R/CRAN</a>,\n           <a href="https://www.npmjs.com/" target="_blank">NodeJS/NPM</a>, <a href="https://en.wikipedia.org/wiki/List_of_software_package_management_systems#Application-level_Dependency_managers" target="_blank">etc</a>.\n      </div>\n      <div class="help" hidden$="[[!isManagedSource]]">Currently <a href="https://www.python.org/" target="_blank">Python</a> and \n        <a href="https://www.r-project.org/" target="_blank">R</a> packages will auto build sample native package files for installation from Github.</div>\n  </div>\n</div>\n<div class="radio-layout">\n  <input id="standaloneInput" type="radio" name="software-package" value="standalone" on-change="_onInputChange"/> \n  <div>\n      <label for="standaloneInput">Standalone Application</label>\n      <div class="help">The code is a final product intended for use by end users.  \n      </div>\n  </div>\n</div>\n\n<div style="text-align: right; margin-top: 25px">\n  <paper-button \n    hidden$="[[!creating]]" \n    id="createBtn"\n    on-click="_onCreateBtnClicked"><iron-icon icon="add"></iron-icon> Create\n  </paper-button>\n</div>\n\n<div hidden$="[[creating]]" class="delete">\n  <paper-button on-click="_onDeleteBtnClicked" disabled$="[[deleting]]">\n    <iron-icon icon="delete"></iron-icon> Delete Package\n  </paper-button>\n</div>'},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n  }\n\n  h2 {\n    margin-top: 0;\n    margin-bottom: 10px;\n  }\n\n  .description {\n    color: var(--secondary-text-color);\n  }\n\n  .radio-layout {\n    display: flex;\n    margin-top: 10px;\n  }\n\n  .radio-layout label {\n    font-weight: bold;\n    padding: 10px 0;\n    display: block;\n  }\n\n  input[type="radio"] {\n    margin: 15px;\n  }\n</style>\n\n\n<h2>Select Repository Type</h2>\n<div class="description">\n  You have the option to create a EcoSML Managed Repository or if you\n  already have a GitHub repostory you can create a Registered Repository.\n</div>\n\n<div class="radio-layout">\n  <input \n    type="radio" \n    id="repositoryTypeManaged" \n    name="repository-type" \n    value="managed"\n    on-change="_onSourceRadioChange" /> \n  <div>\n    <div>\n        <label for="repositoryTypeManaged">EcoSML Managed Repository</label>\n    </div>\n    <div>\n      Recommended for users who are new to source code management (<a href="https://git-scm.com/" target="_blank">git</a>)\n      or don\'t want to manage their own repository.  Managed repositories are easy to create and provide a simple interface \n      for updating code.  The repository will be hosted in the \n      <a href="https://github.com/[[githubOrg]]" target="_blank">EcoSML GitHub organization</a>.\n    </div>\n  </div>\n</div>\n\n<div class="radio-layout">\n  <input \n    type="radio" \n    name="repository-type" \n    id="repositoryTypeRegistered" \n    value="registered" \n    on-change="_onSourceRadioChange" /> \n  <div>\n    <div>\n      <label for="repositoryTypeRegistered">Registered Repository</label>\n    </div>\n    <div>\n        Recommended for users who: have experince with git, want to host\n        the repository in their own GitHub organization or already have a GitHub repository.\n        You will provide EcoSML the url to your existing GitHub repository on the next screen.\n      </div>\n  </div>\n</div>\n\n<div style="text-align: right; margin-top: 25px;">\n  <paper-button disabled$="[[!hasSourceSet]]" on-click="_onNextBtnClicked">\n    Next &nbsp;<iron-icon icon="arrow-forward"></iron-icon>\n  </paper-button>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: inline-block;\n  }\n\n  input {\n    box-sizing: border-box;\n    width: 100%;\n    display: block;\n  }\n\n  .label {\n    font-weight: var(--font-weight-heavy);\n  }\n</style>\n\n<div class="label">\n  <slot name="label"></slot>\n  <span>[[label]]</span>\n</div>\n\n<input \n  type$="[[type]]" \n  id="input" \n  placeholder$="[[placeholder]]"\n  disabled$="[[disabled]]"\n  on-change="_onChange" \n  on-keyup="_onKeyUp" />\n\n<div class="help">\n  <slot name="help"></slot>\n  <span>[[help]]</span>\n</div>'},function(e,t){e.exports='<style include="shared-styles">\n  :host {\n    display: block;\n    padding-bottom: 50px;\n  }\n\n  .container {\n    margin-bottom: 100px;\n  }\n\n  #unsavedMsg paper-button {\n    color: var(--inverse-text-color);\n    border: 1px solid var(--inverse-text-color);\n  }\n  \n  #unsavedMsg paper-button:hover {\n    color: var(--default-primary-color);\n    border: 1px solid var(--default-primary-color);\n  }\n\n  #savedToast {\n    --paper-toast-background-color: var(--default-primary-color);\n    --paper-toast-color: var(--inverse-text-color);\n  }\n\n  paper-tabs {\n    --paper-tabs-selection-bar-color: var(--default-primary-color);\n  }\n\n  paper-tab {\n    --paper-tab-ink: var(--default-primary-color);\n  }\n\n  h1 {\n    margin-bottom: 5px;\n  }\n\n  .narrow-container, .narrow-container > * {\n    max-width: 800px;\n  }\n\n  .repo-type {\n    color: var(--secondary-text-color);\n    margin-bottom: 15px;\n  }\n\n  #commitMsg {\n    display: block;\n    width: 100%;\n    box-sizing: border-box;\n    margin-top: 20px;\n  }\n\n  .main-panel {\n    margin: 0;\n  }\n\n  .basic-header {\n    padding-bottom: 25px;\n    font-size: 14px;\n    color: var(--secondary-text-color);\n  }\n</style>\n\n<paper-toast id="savingToast" duration="0">\n  <div id="unsavedMsg">\n    <div>\n      You have unsaved changes  \n      <paper-button on-click="_onSaveChangesClicked">Commit Changes</paper-button> \n    </div> \n    <div>\n      <input type="text" placeholder="Commit message" id="commitMsg">\n    </div>\n  </div>\n  <div id="savingMsg">\n    Committing...\n  </div>\n</paper-toast>\n<paper-toast id="savedToast">\n  Package Data Saved!\n</paper-toast>\n\n<div class="container">\n  <div class="narrow-container">\n    <h1 hidden$="[[!creating]]">[[currentAction]] Package</h1>\n    <div hidden$="[[creating]]">\n      <h1>[[packageName]]</h1>\n      <div class="repo-type">[[repoType]]</div>\n    </div>\n\n    <div class="basic-header" hidden$="[[creating]]">\n      <div hidden$="[[!hasRelease]]">\n        <div>View in Search: <a href$="/package/[[packageId]]">/package/[[packageId]]</a></div>\n        <div>View in GitHub: <a href$="[[githubHtmlUrl]]">[[githubHtmlUrl]]</a></div>\n      </div>\n      <div hidden$="[[hasRelease]]">\n        <iron-icon icon="warning" style="vertical-align: text-bottom"></iron-icon> Warning, your package will not show up in search\n        until you create a release.  <span hidden$="[[!isManagedSource]]" >Click the <b>Release</b> tab to create one.</span>\n      </div>\n    </div>\n\n    <paper-tabs id="tabs" selected="{{selectedSection}}" attr-for-selected="id">\n      <paper-tab id="source" hidden$="[[!creating]]">Getting Started</paper-tab>\n      <paper-tab id="basic">Basic Information</paper-tab>\n      <paper-tab id="details" hidden$="[[creating]]">Details</paper-tab>\n      <paper-tab id="files" hidden$="[[creating]]">Files</paper-tab>\n      <paper-tab id="release" hidden$="[[creating]]">Releases</paper-tab>\n    </paper-tabs>\n\n    <iron-pages selected="[[selectedSection]]" attr-for-selected="id" selected-attribute="active" >\n      <app-create-start id="source" class="main-panel" on-change="_onDataChange" on-next-tab="_onCreateStartNextTab"></app-create-start>\n      <app-basic-metadata id="basic" class="main-panel" creating="[[creating]]" on-change="_onDataChange"></app-basic-metadata>\n      <app-details-metadata id="details" class="main-panel" on-change="_onDataChange"></app-details-metadata>\n      <app-files id="files" class="main-panel" package-name="[[data.name]]" language="[[data.language]]"></app-files>\n      <app-releases id="release" class="main-panel"></app-releases>\n    </iron-pages>\n  </div>\n</div>'},function(e,t){e.exports='<style>\n  :host {\n    display: block;\n  }\n  .header {\n    padding: 40px 40px 10px 40px;\n    background-color: white;\n  }\n  h2 {\n    font-size: 22px;\n    border-bottom: 2px solid var(--title-card-border-color, var(--default-primary-color));\n    margin : 0;\n    padding : 0 0 5px 0;\n  }\n  .content {\n    background-color: white;\n    padding: 10px 40px 40px 40px;\n  }\n</style>\n\n<div>\n  <div class="header">\n    <h2>\n      <slot name="header"></slot>\n    </h2>\n  </div>\n  <div class="content">\n    <slot name="content"></slot>\n  </div>\n</div>'},function(e,t,n){"use strict";const i=n(140),a=n(139);function r(e,t){return t.encode?t.strict?i(e):encodeURIComponent(e):e}function s(e,t){return t.decode?a(e):e}function o(e){const t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function l(e,t){const n=function(e){let t;switch(e.arrayFormat){case"index":return(e,n,i)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===i[e]&&(i[e]={}),i[e][t[1]]=n):i[e]=n};case"bracket":return(e,n,i)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==i[e]?i[e]=[].concat(i[e],n):i[e]=[n]:i[e]=n};default:return(e,t,n)=>{void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}(t=Object.assign({decode:!0,arrayFormat:"none"},t)),i=Object.create(null);if("string"!=typeof e)return i;if(!(e=e.trim().replace(/^[?#&]/,"")))return i;for(const a of e.split("&")){let[e,r]=a.replace(/\+/g," ").split("=");r=void 0===r?null:s(r,t),n(s(e,t),r,i)}return Object.keys(i).sort().reduce((e,t)=>{const n=i[t];return Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(n):e[t]=n,e},Object.create(null))}t.extract=o,t.parse=l,t.stringify=((e,t)=>{if(!e)return"";const n=function(e){switch(e.arrayFormat){case"index":return(t,n,i)=>null===n?[r(t,e),"[",i,"]"].join(""):[r(t,e),"[",r(i,e),"]=",r(n,e)].join("");case"bracket":return(t,n)=>null===n?[r(t,e),"[]"].join(""):[r(t,e),"[]=",r(n,e)].join("");default:return(t,n)=>null===n?r(t,e):[r(t,e),"=",r(n,e)].join("")}}(t=Object.assign({encode:!0,strict:!0,arrayFormat:"none"},t)),i=Object.keys(e);return!1!==t.sort&&i.sort(t.sort),i.map(i=>{const a=e[i];if(void 0===a)return"";if(null===a)return r(i,t);if(Array.isArray(a)){const e=[];for(const t of a.slice())void 0!==t&&e.push(n(i,t,e.length));return e.join("&")}return r(i,t)+"="+r(a,t)}).filter(e=>e.length>0).join("&")}),t.parseUrl=((e,t)=>{const n=e.indexOf("#");return-1!==n&&(e=e.slice(0,n)),{url:e.split("?")[0]||"",query:l(o(e),t)}})},function(e,t,n){"use strict";n.r(t);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=new WeakMap,a=e=>"function"==typeof e&&i.has(e),r=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(e,t,n=null)=>{let i=t;for(;i!==n;){const t=i.nextSibling;e.removeChild(i),i=t}},o={},l={},h=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${h}--\x3e`,d=new RegExp(`${h}|${c}`),p="$lit$";class u{constructor(e,t){this.parts=[],this.element=t;let n=-1,i=0;const a=[],r=t=>{const s=t.content,o=document.createTreeWalker(s,133,null,!1);let l=0;for(;o.nextNode();){n++;const t=o.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const a=t.attributes;let r=0;for(let e=0;e<a.length;e++)a[e].value.indexOf(h)>=0&&r++;for(;r-- >0;){const a=e.strings[i],r=m.exec(a)[2],s=r.toLowerCase()+p,o=t.getAttribute(s).split(d);this.parts.push({type:"attribute",index:n,name:r,strings:o}),t.removeAttribute(s),i+=o.length-1}}"TEMPLATE"===t.tagName&&r(t)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(h)>=0){const r=t.parentNode,s=e.split(d),o=s.length-1;for(let e=0;e<o;e++)r.insertBefore(""===s[e]?f():document.createTextNode(s[e]),t),this.parts.push({type:"node",index:++n});""===s[o]?(r.insertBefore(f(),t),a.push(t)):t.data=s[o],i+=o}}else if(8===t.nodeType)if(t.data===h){const e=t.parentNode;null!==t.previousSibling&&n!==l||(n++,e.insertBefore(f(),t)),l=n,this.parts.push({type:"node",index:n}),null===t.nextSibling?t.data="":(a.push(t),n--),i++}else{let e=-1;for(;-1!==(e=t.data.indexOf(h,e+1));)this.parts.push({type:"node",index:-1})}}};r(t);for(const e of a)e.parentNode.removeChild(e)}}const g=e=>-1!==e.index,f=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class v{constructor(e,t,n){this._parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this._parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let n=0,i=0;const a=e=>{const r=document.createTreeWalker(e,133,null,!1);let s=r.nextNode();for(;n<t.length&&null!==s;){const e=t[n];if(g(e))if(i===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(s.previousSibling),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(s,e.name,e.strings,this.options));n++}else i++,"TEMPLATE"===s.nodeName&&a(s.content),s=r.nextNode();else this._parts.push(void 0),n++}};return a(e),r&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class y{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){const e=this.strings.length-1;let t="";for(let n=0;n<e;n++){const e=this.strings[n],i=m.exec(e);t+=i?e.substr(0,i.index)+i[1]+i[2]+p+i[3]+h:e+c}return t+this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const b=e=>null===e||!("object"==typeof e||"function"==typeof e);class _{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new w(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let i=0;i<t;i++){n+=e[i];const t=this.parts[i];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)n+="string"==typeof t?t:String(t);else n+="string"==typeof e?e:String(e)}}return n+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===o||b(e)&&e===this.value||(this.value=e,a(e)||(this.committer.dirty=!0))}commit(){for(;a(this.value);){const e=this.value;this.value=o,e(this)}this.value!==o&&this.committer.commit()}}class x{constructor(e){this.value=void 0,this._pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(f()),this.endNode=e.appendChild(f())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=f()),e._insert(this.endNode=f())}insertAfterPart(e){e._insert(this.startNode=f()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;a(this._pendingValue);){const e=this._pendingValue;this._pendingValue=o,e(this)}const e=this._pendingValue;e!==o&&(b(e)?e!==this.value&&this._commitText(e):e instanceof y?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):e===l?(this.value=l,this.clear()):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&3===t.nodeType?t.data=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const n=new v(t,e.processor,this.options),i=n._clone();n.update(e.values),this._commitNode(i),this.value=n}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,i=0;for(const a of e)void 0===(n=t[i])&&(n=new x(this.options),t.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(t[i-1])),n.setValue(a),n.commit(),i++;i<t.length&&(t.length=i,this.clear(n&&n.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this._pendingValue=e}commit(){for(;a(this._pendingValue);){const e=this._pendingValue;this._pendingValue=o,e(this)}if(this._pendingValue===o)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=o}}class z extends _{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends w{}let A=!1;try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class C{constructor(e,t,n){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this._boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this._pendingValue=e}commit(){for(;a(this._pendingValue);){const e=this._pendingValue;this._pendingValue=o,e(this)}if(this._pendingValue===o)return;const e=this._pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),i&&(this._options=E(e),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=e,this._pendingValue=o}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const E=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const M=new class{handleAttributeExpressions(e,t,n,i){const a=t[0];return"."===a?new z(e,t.slice(1),n).parts:"@"===a?[new C(e,t.slice(1),i.eventContext)]:"?"===a?[new k(e,t.slice(1),n)]:new _(e,t,n).parts}handleTextExpression(e){return new x(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function P(e){let t=O.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},O.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const i=e.strings.join(h);return void 0===(n=t.keyString.get(i))&&(n=new u(e,e.getTemplateElement()),t.keyString.set(i,n)),t.stringsArray.set(e.strings,n),n}const O=new Map,T=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const L=(e,...t)=>new y(e,t,"html",M),H=133;function I(e,t){const{element:{content:n},parts:i}=e,a=document.createTreeWalker(n,H,null,!1);let r=R(i),s=i[r],o=-1,l=0;const h=[];let c=null;for(;a.nextNode();){o++;const e=a.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(h.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==s&&s.index===o;)s.index=null!==c?-1:s.index-l,s=i[r=R(i,r)]}h.forEach(e=>e.parentNode.removeChild(e))}const V=e=>{let t=11===e.nodeType?0:1;const n=document.createTreeWalker(e,H,null,!1);for(;n.nextNode();)t++;return t},R=(e,t=-1)=>{for(let n=t+1;n<e.length;n++){const t=e[n];if(g(t))return n}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const N=(e,t)=>`${e}--${t}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),j=!1);const B=["html","svg"],D=new Set,$=(e,t,n)=>{D.add(n);const i=e.querySelectorAll("style");if(0===i.length)return void window.ShadyCSS.prepareTemplateStyles(t.element,n);const a=document.createElement("style");for(let e=0;e<i.length;e++){const t=i[e];t.parentNode.removeChild(t),a.textContent+=t.textContent}if(n=n,B.forEach(e=>{const t=O.get(N(e,n));void 0!==t&&t.keyString.forEach(e=>{const{element:{content:t}}=e,n=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{n.add(e)}),I(e,n)})}),function(e,t,n=null){const{element:{content:i},parts:a}=e;if(null===n||void 0===n)return void i.appendChild(t);const r=document.createTreeWalker(i,H,null,!1);let s=R(a),o=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===n&&(o=V(t),n.parentNode.insertBefore(t,n));-1!==s&&a[s].index===l;){if(o>0){for(;-1!==s;)a[s].index+=o,s=R(a,s);return}s=R(a,s)}}(t,a,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,n),window.ShadyCSS.nativeShadow){const n=t.element.content.querySelector("style");e.insertBefore(n.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(a,t.element.content.firstChild);const e=new Set;e.add(a),I(t,e)}};var F;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
window.JSCompiler_renameProperty=((e,t)=>e);const U={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},q=(e,t)=>t!==e&&(t==t||e==e),K={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:q},G=Promise.resolve(!0),Y=1,W=4,J=8,X=16,Q=32;class Z extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=G,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,n)=>{const i=this._attributeNameForProperty(n,t);void 0!==i&&(this._attributeToPropertyMap.set(i,n),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=K){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const n="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[n]},set(t){const i=this[e];this[n]=t,this._requestUpdate(e,i)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const e=Object.getPrototypeOf(this);if("function"==typeof e.finalize&&e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const n of t)this.createProperty(n,e[n])}}static _attributeNameForProperty(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,n=q){return n(e,t)}static _propertyValueFromAttribute(e,t){const n=t.type,i=t.converter||U,a="function"==typeof i?i:i.fromAttribute;return a?a(e,n):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const n=t.type,i=t.converter;return(i&&i.toAttribute||U.toAttribute)(e,n)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Q,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,n){t!==n&&this._attributeToProperty(e,n)}_propertyToAttribute(e,t,n=K){const i=this.constructor,a=i._attributeNameForProperty(e,n);if(void 0!==a){const e=i._propertyValueToAttribute(t,n);if(void 0===e)return;this._updateState=this._updateState|J,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=this._updateState&~J}}_attributeToProperty(e,t){if(this._updateState&J)return;const n=this.constructor,i=n._attributeToPropertyMap.get(e);if(void 0!==i){const e=n._classProperties.get(i)||K;this._updateState=this._updateState|X,this[i]=n._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~X}}_requestUpdate(e,t){let n=!0;if(void 0!==e){const i=this.constructor,a=i._classProperties.get(e)||K;i._valueHasChanged(this[e],t,a.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==a.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,a))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|W;const n=this._updatePromise;this._updatePromise=new Promise((n,i)=>{e=n,t=i});try{await n}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Q}get _hasRequestedUpdate(){return this._updateState&W}get hasUpdated(){return this._updateState&Y}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&Y||(this._updateState=this._updateState|Y,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~W}get updateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}Z.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ee="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;Symbol();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const te=e=>e.flat?e.flat(1/0):function e(t,n=[]){for(let i=0,a=t.length;i<a;i++){const a=t[i];Array.isArray(a)?e(a,n):n.push(a)}return n}(e);class ne extends Z{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){te(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ee?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof y&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}ne.finalized=!0,ne.render=((e,t,n)=>{const i=n.scopeName,a=T.has(t),r=t instanceof ShadowRoot&&j&&e instanceof y,o=r&&!D.has(i),l=o?document.createDocumentFragment():t;if(((e,t,n)=>{let i=T.get(t);void 0===i&&(s(t,t.firstChild),T.set(t,i=new x(Object.assign({templateFactory:P},n))),i.appendInto(t)),i.setValue(e),i.commit()})(e,l,Object.assign({templateFactory:(e=>t=>{const n=N(t.type,e);let i=O.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},O.set(n,i));let a=i.stringsArray.get(t.strings);if(void 0!==a)return a;const r=t.strings.join(h);if(void 0===(a=i.keyString.get(r))){const n=t.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(n,e),a=new u(t,n),i.keyString.set(r,a)}return i.stringsArray.set(t.strings,a),a})(i)},n)),o){const e=T.get(l);T.delete(l),e.value instanceof v&&$(l,e.value.template,i),s(t,t.firstChild),t.appendChild(l),T.set(t,e)}!a&&r&&window.ShadyCSS.styleElement(t.host)});var ie=e=>(e=e.replace(/<template\w*>/,"").replace(/<dom-module.*>/,"").replace(/<\/template\s*>.*/,"").replace(/<\/dom-module\s*>/,""),L([e])),ae=(n(37),n(22)),re=n.n(ae);let se=document.createElement("div");se.style.display="none",se.innerHTML=re.a,document.head.appendChild(se);var oe=n(4),le=n(2);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const he=le["a"]`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;he.setAttribute("style","display: none;"),document.head.appendChild(he.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ce=le["a"]`
<custom-style>
  <style is="custom-style">
    html {
      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);

      /*
       * Primary and accent colors. Also see color.js for more colors.
       */
      --primary-color: var(--paper-indigo-500);
      --light-primary-color: var(--paper-indigo-100);
      --dark-primary-color: var(--paper-indigo-700);

      --accent-color: var(--paper-pink-a200);
      --light-accent-color: var(--paper-pink-a100);
      --dark-accent-color: var(--paper-pink-a400);


      /*
       * Material Design Light background theme
       */
      --light-theme-background-color: #ffffff;
      --light-theme-base-color: #000000;
      --light-theme-text-color: var(--paper-grey-900);
      --light-theme-secondary-color: #737373;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb;

      /*
       * Material Design Dark background theme
       */
      --dark-theme-background-color: var(--paper-grey-900);
      --dark-theme-base-color: #ffffff;
      --dark-theme-text-color: #ffffff;
      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c;

      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color);
      --default-primary-color: var(--primary-color);
    }
  </style>
</custom-style>`;ce.setAttribute("style","display: none;"),document.head.appendChild(ce.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const de=le["a"]`
<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`;
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
if(de.setAttribute("style","display: none;"),document.head.appendChild(de.content),!window.polymerSkipLoadingFontRoboto){const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.crossOrigin="anonymous",e.href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic",document.head.appendChild(e)}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const pe=le["a"]`<custom-style>
  <style is="custom-style">
    html {

      /* Shared Styles */
      --paper-font-common-base: {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-code: {
        font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-expensive-kerning: {
        text-rendering: optimizeLegibility;
      };

      --paper-font-common-nowrap: {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      };

      /* Material Font Styles */

      --paper-font-display4: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 112px;
        font-weight: 300;
        letter-spacing: -.044em;
        line-height: 120px;
      };

      --paper-font-display3: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 56px;
        font-weight: 400;
        letter-spacing: -.026em;
        line-height: 60px;
      };

      --paper-font-display2: {
        @apply --paper-font-common-base;

        font-size: 45px;
        font-weight: 400;
        letter-spacing: -.018em;
        line-height: 48px;
      };

      --paper-font-display1: {
        @apply --paper-font-common-base;

        font-size: 34px;
        font-weight: 400;
        letter-spacing: -.01em;
        line-height: 40px;
      };

      --paper-font-headline: {
        @apply --paper-font-common-base;

        font-size: 24px;
        font-weight: 400;
        letter-spacing: -.012em;
        line-height: 32px;
      };

      --paper-font-title: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
      };

      --paper-font-subhead: {
        @apply --paper-font-common-base;

        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      };

      --paper-font-body2: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-body1: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      };

      --paper-font-caption: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.011em;
        line-height: 20px;
      };

      --paper-font-menu: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 13px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-button: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.018em;
        line-height: 24px;
        text-transform: uppercase;
      };

      --paper-font-code2: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
      };

      --paper-font-code1: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      };

    }

  </style>
</custom-style>`;pe.setAttribute("style","display: none;"),document.head.appendChild(pe.content);var ue=n(39),ge=n.n(ue);let fe=document.createElement("div");fe.style.display="none",fe.innerHTML=ge.a,fe.id="ecosml-style-properties",document.head.appendChild(fe);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const me=le["a"]`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;me.setAttribute("style","display: none;"),document.head.appendChild(me.content);var ve=document.createElement("style");ve.textContent="[hidden] { display: none !important; }",document.head.appendChild(ve);var ye=n(5);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/class be{constructor(e){be[" "](e),this.type=e&&e.type||"default",this.key=e&&e.key,e&&"value"in e&&(this.value=e.value)}get value(){var e=this.type,t=this.key;if(e&&t)return be.types[e]&&be.types[e][t]}set value(e){var t=this.type,n=this.key;t&&n&&(t=be.types[t]=be.types[t]||{},null==e?delete t[n]:t[n]=e)}get list(){if(this.type){var e=be.types[this.type];return e?Object.keys(e).map(function(e){return _e[this.type][e]},this):[]}}byKey(e){return this.key=e,this.value}}be[" "]=function(){},be.types={};var _e=be.types;Object(ye.a)({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:!0},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:!0},__computeMeta:function(e,t,n){var i=new be({type:e,key:t});return void 0!==n&&n!==i.value?i.value=n:this.value!==i.value&&(this.value=i.value),i},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(e){e&&(this.value=this)},byKey:function(e){return new be({type:this.type,key:e}).value}});var we=n(1);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        @apply --iron-icon;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
`,is:"iron-icon",properties:{icon:{type:String},theme:{type:String},src:{type:String},_meta:{value:oe.a.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function(e){var t=(e||"").split(":");this._iconName=t.pop(),this._iconsetName=t.pop()||this._DEFAULT_ICONSET,this._updateIcon()},_srcChanged:function(e){this._updateIcon()},_usesIconset:function(){return this.icon||!this.src},_updateIcon:function(){this._usesIconset()?(this._img&&this._img.parentNode&&Object(we.a)(this.root).removeChild(this._img),""===this._iconName?this._iconset&&this._iconset.removeIcon(this):this._iconsetName&&this._meta&&(this._iconset=this._meta.byKey(this._iconsetName),this._iconset?(this._iconset.applyIcon(this,this._iconName,this.theme),this.unlisten(window,"iron-iconset-added","_updateIcon")):this.listen(window,"iron-iconset-added","_updateIcon"))):(this._iconset&&this._iconset.removeIcon(this),this._img||(this._img=document.createElement("img"),this._img.style.width="100%",this._img.style.height="100%",this._img.draggable=!1),this._img.src=this.src,Object(we.a)(this.root).appendChild(this._img))}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(ye.a)({is:"iron-iconset-svg",properties:{name:{type:String,observer:"_nameChanged"},size:{type:Number,value:24},rtlMirroring:{type:Boolean,value:!1},useGlobalRtlAttribute:{type:Boolean,value:!1}},created:function(){this._meta=new be({type:"iconset",key:null,value:null})},attached:function(){this.style.display="none"},getIconNames:function(){return this._icons=this._createIconMap(),Object.keys(this._icons).map(function(e){return this.name+":"+e},this)},applyIcon:function(e,t){this.removeIcon(e);var n=this._cloneIcon(t,this.rtlMirroring&&this._targetIsRTL(e));if(n){var i=Object(we.a)(e.root||e);return i.insertBefore(n,i.childNodes[0]),e._svgIcon=n}return null},removeIcon:function(e){e._svgIcon&&(Object(we.a)(e.root||e).removeChild(e._svgIcon),e._svgIcon=null)},_targetIsRTL:function(e){if(null==this.__targetIsRTL)if(this.useGlobalRtlAttribute){var t=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL="rtl"===t.getAttribute("dir")}else e&&e.nodeType!==Node.ELEMENT_NODE&&(e=e.host),this.__targetIsRTL=e&&"rtl"===window.getComputedStyle(e).direction;return this.__targetIsRTL},_nameChanged:function(){this._meta.value=null,this._meta.key=this.name,this._meta.value=this,this.async(function(){this.fire("iron-iconset-added",this,{node:window})})},_createIconMap:function(){var e=Object.create(null);return Object(we.a)(this).querySelectorAll("[id]").forEach(function(t){e[t.id]=t}),e},_cloneIcon:function(e,t){return this._icons=this._icons||this._createIconMap(),this._prepareSvgClone(this._icons[e],this.size,t)},_prepareSvgClone:function(e,t,n){if(e){var i=e.cloneNode(!0),a=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=i.getAttribute("viewBox")||"0 0 "+t+" "+t,s="pointer-events: none; display: block; width: 100%; height: 100%;";return n&&i.hasAttribute("mirror-in-rtl")&&(s+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"),a.setAttribute("viewBox",r),a.setAttribute("preserveAspectRatio","xMidYMid meet"),a.setAttribute("focusable","false"),a.style.cssText=s,a.appendChild(i).removeAttribute("id"),a}return null}});
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const xe=le["a"]`<iron-iconset-svg name="icons" size="24">
<svg><defs>
<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>
<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>
<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>
<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>
<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>
<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>
<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>
<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>
<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>
<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>
<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>
<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>
<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>
<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>
<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>
<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>
<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>
<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>
<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>
<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>
<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>
<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>
<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>
<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>
<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>
<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>
<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>
<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>
<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>
<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>
<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>
<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>
<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>
<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>
<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>
<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>
<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>
<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>
<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>
<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>
<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>
<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>
<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>
<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>
<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>
<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>
<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>
<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>
<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>
<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>
<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>
<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>
<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>
<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>
<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>
<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>
<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>
<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>
<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>
<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>
<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>
<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>
<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>
<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>
<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>
<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>
<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>
<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>
<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>
<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>
<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>
<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>
<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>
<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>
<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>
<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>
<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>
<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>
<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>
<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>
<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>
<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>
<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>
<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>
<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>
<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>
<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>
<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>
<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>
<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>
<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>
<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>
<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>
<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>
<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>
<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>
<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>
<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>
<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>
<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>
<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>
<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>
<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>
<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>
<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>
<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>
<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>
<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>
<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>
<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>
<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>
<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>
<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>
<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>
<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>
<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>
<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>
<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>
<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>
<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>
<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>
<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>
<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>
<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>
<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>
<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>
<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>
<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>
<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>
<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>
<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>
<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>
<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>
<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>
<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>
<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>
<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>
<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>
<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>
<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>
<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>
<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>
<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>
<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>
<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>
<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>
<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>
<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>
<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>
<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>
<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>
<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>
<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>
<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>
<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>
<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>
<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>
<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>
<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>
<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>
<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>
<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>
<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>
<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>
<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>
<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>
<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>
<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>
<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>
<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>
<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>
<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>
<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>
<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>
<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>
<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>
<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>
<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>
<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>
<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>
<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>
<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>
<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>
<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>
<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>
<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>
<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>
<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>
<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>
<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>
<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>
<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>
<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>
<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>
<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>
<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>
<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>
<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(xe.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ke=le["a"]`
<dom-module id="paper-material-styles">
  <template>
    <style>
      html {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      .paper-material {
        @apply --paper-material;
      }
      .paper-material[elevation="1"] {
        @apply --paper-material-elevation-1;
      }
      .paper-material[elevation="2"] {
        @apply --paper-material-elevation-2;
      }
      .paper-material[elevation="3"] {
        @apply --paper-material-elevation-3;
      }
      .paper-material[elevation="4"] {
        @apply --paper-material-elevation-4;
      }
      .paper-material[elevation="5"] {
        @apply --paper-material-elevation-5;
      }

      /* Duplicate the styles because of https://github.com/webcomponents/shadycss/issues/193 */
      :host {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      :host(.paper-material) {
        @apply --paper-material;
      }
      :host(.paper-material[elevation="1"]) {
        @apply --paper-material-elevation-1;
      }
      :host(.paper-material[elevation="2"]) {
        @apply --paper-material-elevation-2;
      }
      :host(.paper-material[elevation="3"]) {
        @apply --paper-material-elevation-3;
      }
      :host(.paper-material[elevation="4"]) {
        @apply --paper-material-elevation-4;
      }
      :host(.paper-material[elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>
  </template>
</dom-module>`;ke.setAttribute("style","display: none;"),document.head.appendChild(ke.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ze={properties:{focused:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,notify:!0,observer:"_disabledChanged",reflectToAttribute:!0},_oldTabIndex:{type:String},_boundFocusBlurHandler:{type:Function,value:function(){return this._focusBlurHandler.bind(this)}}},observers:["_changedControlState(focused, disabled)"],ready:function(){this.addEventListener("focus",this._boundFocusBlurHandler,!0),this.addEventListener("blur",this._boundFocusBlurHandler,!0)},_focusBlurHandler:function(e){this._setFocused("focus"===e.type)},_disabledChanged:function(e,t){this.setAttribute("aria-disabled",e?"true":"false"),this.style.pointerEvents=e?"none":"",e?(this._oldTabIndex=this.getAttribute("tabindex"),this._setFocused(!1),this.tabIndex=-1,this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))},_changedControlState:function(){this._controlStateChanged&&this._controlStateChanged()}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var Se={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"},Ae={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"},Ce={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"},Ee=/[a-z0-9*]/,Me=/U\+/,Pe=/^arrow/,Oe=/^space(bar)?/,Te=/^escape$/;function Le(e,t){var n="";if(e){var i=e.toLowerCase();" "===i||Oe.test(i)?n="space":Te.test(i)?n="esc":1==i.length?t&&!Ee.test(i)||(n=i):n=Pe.test(i)?i.replace("arrow",""):"multiply"==i?"*":i}return n}function He(e,t){return e.key?Le(e.key,t):e.detail&&e.detail.key?Le(e.detail.key,t):(n=e.keyIdentifier,i="",n&&(n in Se?i=Se[n]:Me.test(n)?(n=parseInt(n.replace("U+","0x"),16),i=String.fromCharCode(n).toLowerCase()):i=n.toLowerCase()),i||function(e){var t="";return Number(e)&&(t=e>=65&&e<=90?String.fromCharCode(32+e):e>=112&&e<=123?"f"+(e-112+1):e>=48&&e<=57?String(e-48):e>=96&&e<=105?String(e-96):Ae[e]),t}(e.keyCode)||"");var n,i}function Ie(e,t){return He(t,e.hasModifiers)===e.key&&(!e.hasModifiers||!!t.shiftKey==!!e.shiftKey&&!!t.ctrlKey==!!e.ctrlKey&&!!t.altKey==!!e.altKey&&!!t.metaKey==!!e.metaKey)}function Ve(e){return e.trim().split(" ").map(function(e){return function(e){return 1===e.length?{combo:e,key:e,event:"keydown"}:e.split("+").reduce(function(e,t){var n=t.split(":"),i=n[0],a=n[1];return i in Ce?(e[Ce[i]]=!0,e.hasModifiers=!0):(e.key=i,e.event=a||"keydown"),e},{combo:e.split(":").shift()})}(e)})}const Re={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:!1},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(e,t){this._imperativeKeyBindings[e]=t,this._prepKeyBindings(),this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={},this._prepKeyBindings(),this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(e,t){for(var n=Ve(t),i=0;i<n.length;++i)if(Ie(n[i],e))return!0;return!1},_collectKeyBindings:function(){var e=this.behaviors.map(function(e){return e.keyBindings});return-1===e.indexOf(this.keyBindings)&&e.push(this.keyBindings),e},_prepKeyBindings:function(){for(var e in this._keyBindings={},this._collectKeyBindings().forEach(function(e){for(var t in e)this._addKeyBinding(t,e[t])},this),this._imperativeKeyBindings)this._addKeyBinding(e,this._imperativeKeyBindings[e]);for(var t in this._keyBindings)this._keyBindings[t].sort(function(e,t){var n=e[0].hasModifiers;return n===t[0].hasModifiers?0:n?-1:1})},_addKeyBinding:function(e,t){Ve(e).forEach(function(e){this._keyBindings[e.event]=this._keyBindings[e.event]||[],this._keyBindings[e.event].push([e,t])},this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners(),this.isAttached&&this._listenKeyEventListeners()},_listenKeyEventListeners:function(){this.keyEventTarget&&Object.keys(this._keyBindings).forEach(function(e){var t=this._keyBindings[e],n=this._onKeyBindingEvent.bind(this,t);this._boundKeyHandlers.push([this.keyEventTarget,e,n]),this.keyEventTarget.addEventListener(e,n)},this)},_unlistenKeyEventListeners:function(){for(var e,t,n,i;this._boundKeyHandlers.length;)t=(e=this._boundKeyHandlers.pop())[0],n=e[1],i=e[2],t.removeEventListener(n,i)},_onKeyBindingEvent:function(e,t){if(this.stopKeyboardEventPropagation&&t.stopPropagation(),!t.defaultPrevented)for(var n=0;n<e.length;n++){var i=e[n][0],a=e[n][1];if(Ie(i,t)&&(this._triggerKeyHandler(i,a,t),t.defaultPrevented))return}},_triggerKeyHandler:function(e,t,n){var i=Object.create(e);i.keyboardEvent=n;var a=new CustomEvent(e.event,{detail:i,cancelable:!0});this[t].call(this,a),a.defaultPrevented&&n.preventDefault()}},Ne={properties:{pressed:{type:Boolean,readOnly:!0,value:!1,reflectToAttribute:!0,observer:"_pressedChanged"},toggles:{type:Boolean,value:!1,reflectToAttribute:!0},active:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},pointerDown:{type:Boolean,readOnly:!0,value:!1},receivedFocusFromKeyboard:{type:Boolean,readOnly:!0},ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function(){this.toggles?this._userActivate(!this.active):this.active=!1},_focusChanged:function(e){this._detectKeyboardFocus(e),e||this._setPressed(!1)},_detectKeyboardFocus:function(e){this._setReceivedFocusFromKeyboard(!this.pointerDown&&e)},_userActivate:function(e){this.active!==e&&(this.active=e,this.fire("change"))},_downHandler:function(e){this._setPointerDown(!0),this._setPressed(!0),this._setReceivedFocusFromKeyboard(!1)},_upHandler:function(){this._setPointerDown(!1),this._setPressed(!1)},_spaceKeyDownHandler:function(e){var t=e.detail.keyboardEvent,n=Object(we.a)(t).localTarget;this.isLightDescendant(n)||(t.preventDefault(),t.stopImmediatePropagation(),this._setPressed(!0))},_spaceKeyUpHandler:function(e){var t=e.detail.keyboardEvent,n=Object(we.a)(t).localTarget;this.isLightDescendant(n)||(this.pressed&&this._asyncClick(),this._setPressed(!1))},_asyncClick:function(){this.async(function(){this.click()},1)},_pressedChanged:function(e){this._changedButtonState()},_ariaActiveAttributeChanged:function(e,t){t&&t!=e&&this.hasAttribute(t)&&this.removeAttribute(t)},_activeChanged:function(e,t){this.toggles?this.setAttribute(this.ariaActiveAttribute,e?"true":"false"):this.removeAttribute(this.ariaActiveAttribute),this._changedButtonState()},_controlStateChanged:function(){this.disabled?this._setPressed(!1):this._changedButtonState()},_changedButtonState:function(){this._buttonStateChanged&&this._buttonStateChanged()}},je=[Re,Ne];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var Be={distance:function(e,t,n,i){var a=e-n,r=t-i;return Math.sqrt(a*a+r*r)},now:window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now};function De(e){this.element=e,this.width=this.boundingRect.width,this.height=this.boundingRect.height,this.size=Math.max(this.width,this.height)}function $e(e){this.element=e,this.color=window.getComputedStyle(e).color,this.wave=document.createElement("div"),this.waveContainer=document.createElement("div"),this.wave.style.backgroundColor=this.color,this.wave.classList.add("wave"),this.waveContainer.classList.add("wave-container"),Object(we.a)(this.waveContainer).appendChild(this.wave),this.resetInteractionState()}De.prototype={get boundingRect(){return this.element.getBoundingClientRect()},furthestCornerDistanceFrom:function(e,t){var n=Be.distance(e,t,0,0),i=Be.distance(e,t,this.width,0),a=Be.distance(e,t,0,this.height),r=Be.distance(e,t,this.width,this.height);return Math.max(n,i,a,r)}},$e.MAX_RADIUS=300,$e.prototype={get recenters(){return this.element.recenters},get center(){return this.element.center},get mouseDownElapsed(){var e;return this.mouseDownStart?(e=Be.now()-this.mouseDownStart,this.mouseUpStart&&(e-=this.mouseUpElapsed),e):0},get mouseUpElapsed(){return this.mouseUpStart?Be.now()-this.mouseUpStart:0},get mouseDownElapsedSeconds(){return this.mouseDownElapsed/1e3},get mouseUpElapsedSeconds(){return this.mouseUpElapsed/1e3},get mouseInteractionSeconds(){return this.mouseDownElapsedSeconds+this.mouseUpElapsedSeconds},get initialOpacity(){return this.element.initialOpacity},get opacityDecayVelocity(){return this.element.opacityDecayVelocity},get radius(){var e=this.containerMetrics.width*this.containerMetrics.width,t=this.containerMetrics.height*this.containerMetrics.height,n=1.1*Math.min(Math.sqrt(e+t),$e.MAX_RADIUS)+5,i=1.1-n/$e.MAX_RADIUS*.2,a=this.mouseInteractionSeconds/i,r=n*(1-Math.pow(80,-a));return Math.abs(r)},get opacity(){return this.mouseUpStart?Math.max(0,this.initialOpacity-this.mouseUpElapsedSeconds*this.opacityDecayVelocity):this.initialOpacity},get outerOpacity(){var e=.3*this.mouseUpElapsedSeconds,t=this.opacity;return Math.max(0,Math.min(e,t))},get isOpacityFullyDecayed(){return this.opacity<.01&&this.radius>=Math.min(this.maxRadius,$e.MAX_RADIUS)},get isRestingAtMaxRadius(){return this.opacity>=this.initialOpacity&&this.radius>=Math.min(this.maxRadius,$e.MAX_RADIUS)},get isAnimationComplete(){return this.mouseUpStart?this.isOpacityFullyDecayed:this.isRestingAtMaxRadius},get translationFraction(){return Math.min(1,this.radius/this.containerMetrics.size*2/Math.sqrt(2))},get xNow(){return this.xEnd?this.xStart+this.translationFraction*(this.xEnd-this.xStart):this.xStart},get yNow(){return this.yEnd?this.yStart+this.translationFraction*(this.yEnd-this.yStart):this.yStart},get isMouseDown(){return this.mouseDownStart&&!this.mouseUpStart},resetInteractionState:function(){this.maxRadius=0,this.mouseDownStart=0,this.mouseUpStart=0,this.xStart=0,this.yStart=0,this.xEnd=0,this.yEnd=0,this.slideDistance=0,this.containerMetrics=new De(this.element)},draw:function(){var e,t,n;this.wave.style.opacity=this.opacity,e=this.radius/(this.containerMetrics.size/2),t=this.xNow-this.containerMetrics.width/2,n=this.yNow-this.containerMetrics.height/2,this.waveContainer.style.webkitTransform="translate("+t+"px, "+n+"px)",this.waveContainer.style.transform="translate3d("+t+"px, "+n+"px, 0)",this.wave.style.webkitTransform="scale("+e+","+e+")",this.wave.style.transform="scale3d("+e+","+e+",1)"},downAction:function(e){var t=this.containerMetrics.width/2,n=this.containerMetrics.height/2;this.resetInteractionState(),this.mouseDownStart=Be.now(),this.center?(this.xStart=t,this.yStart=n,this.slideDistance=Be.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)):(this.xStart=e?e.detail.x-this.containerMetrics.boundingRect.left:this.containerMetrics.width/2,this.yStart=e?e.detail.y-this.containerMetrics.boundingRect.top:this.containerMetrics.height/2),this.recenters&&(this.xEnd=t,this.yEnd=n,this.slideDistance=Be.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)),this.maxRadius=this.containerMetrics.furthestCornerDistanceFrom(this.xStart,this.yStart),this.waveContainer.style.top=(this.containerMetrics.height-this.containerMetrics.size)/2+"px",this.waveContainer.style.left=(this.containerMetrics.width-this.containerMetrics.size)/2+"px",this.waveContainer.style.width=this.containerMetrics.size+"px",this.waveContainer.style.height=this.containerMetrics.size+"px"},upAction:function(e){this.isMouseDown&&(this.mouseUpStart=Be.now())},remove:function(){Object(we.a)(this.waveContainer.parentNode).removeChild(this.waveContainer)}},Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: block;
        position: absolute;
        border-radius: inherit;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
         * creating a node (with a position:absolute) in the middle of an event
         * handler "interrupts" that event handler (which happens when the
         * ripple is created on demand) */
        pointer-events: none;
      }

      :host([animating]) {
        /* This resolves a rendering issue in Chrome (as of 40) where the
           ripple is not properly clipped by its parent (which may have
           rounded corners). See: http://jsbin.com/temexa/4

           Note: We only apply this style conditionally. Otherwise, the browser
           will create a new compositing layer for every ripple element on the
           page, and that would be bad. */
        -webkit-transform: translate(0, 0);
        transform: translate3d(0, 0, 0);
      }

      #background,
      #waves,
      .wave-container,
      .wave {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #background,
      .wave {
        opacity: 0;
      }

      #waves,
      .wave {
        overflow: hidden;
      }

      .wave-container,
      .wave {
        border-radius: 50%;
      }

      :host(.circle) #background,
      :host(.circle) #waves {
        border-radius: 50%;
      }

      :host(.circle) .wave-container {
        overflow: hidden;
      }
    </style>

    <div id="background"></div>
    <div id="waves"></div>
`,is:"paper-ripple",behaviors:[Re],properties:{initialOpacity:{type:Number,value:.25},opacityDecayVelocity:{type:Number,value:.8},recenters:{type:Boolean,value:!1},center:{type:Boolean,value:!1},ripples:{type:Array,value:function(){return[]}},animating:{type:Boolean,readOnly:!0,reflectToAttribute:!0,value:!1},holdDown:{type:Boolean,value:!1,observer:"_holdDownChanged"},noink:{type:Boolean,value:!1},_animating:{type:Boolean},_boundAnimate:{type:Function,value:function(){return this.animate.bind(this)}}},get target(){return this.keyEventTarget},keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},attached:function(){11==this.parentNode.nodeType?this.keyEventTarget=Object(we.a)(this).getOwnerRoot().host:this.keyEventTarget=this.parentNode;var e=this.keyEventTarget;this.listen(e,"up","uiUpAction"),this.listen(e,"down","uiDownAction")},detached:function(){this.unlisten(this.keyEventTarget,"up","uiUpAction"),this.unlisten(this.keyEventTarget,"down","uiDownAction"),this.keyEventTarget=null},get shouldKeepAnimating(){for(var e=0;e<this.ripples.length;++e)if(!this.ripples[e].isAnimationComplete)return!0;return!1},simulatedRipple:function(){this.downAction(null),this.async(function(){this.upAction()},1)},uiDownAction:function(e){this.noink||this.downAction(e)},downAction:function(e){this.holdDown&&this.ripples.length>0||(this.addRipple().downAction(e),this._animating||(this._animating=!0,this.animate()))},uiUpAction:function(e){this.noink||this.upAction(e)},upAction:function(e){this.holdDown||(this.ripples.forEach(function(t){t.upAction(e)}),this._animating=!0,this.animate())},onAnimationComplete:function(){this._animating=!1,this.$.background.style.backgroundColor=null,this.fire("transitionend")},addRipple:function(){var e=new $e(this);return Object(we.a)(this.$.waves).appendChild(e.waveContainer),this.$.background.style.backgroundColor=e.color,this.ripples.push(e),this._setAnimating(!0),e},removeRipple:function(e){var t=this.ripples.indexOf(e);t<0||(this.ripples.splice(t,1),e.remove(),this.ripples.length||this._setAnimating(!1))},animate:function(){if(this._animating){var e,t;for(e=0;e<this.ripples.length;++e)(t=this.ripples[e]).draw(),this.$.background.style.opacity=t.outerOpacity,t.isOpacityFullyDecayed&&!t.isRestingAtMaxRadius&&this.removeRipple(t);this.shouldKeepAnimating||0!==this.ripples.length?window.requestAnimationFrame(this._boundAnimate):this.onAnimationComplete()}},animateRipple:function(){return this.animate()},_onEnterKeydown:function(){this.uiDownAction(),this.async(this.uiUpAction,1)},_onSpaceKeydown:function(){this.uiDownAction()},_onSpaceKeyup:function(){this.uiUpAction()},_holdDownChanged:function(e,t){void 0!==t&&(e?this.downAction():this.upAction())}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Fe={properties:{noink:{type:Boolean,observer:"_noinkChanged"},_rippleContainer:{type:Object}},_buttonStateChanged:function(){this.focused&&this.ensureRipple()},_downHandler:function(e){Ne._downHandler.call(this,e),this.pressed&&this.ensureRipple(e)},ensureRipple:function(e){if(!this.hasRipple()){this._ripple=this._createRipple(),this._ripple.noink=this.noink;var t=this._rippleContainer||this.root;if(t&&Object(we.a)(t).appendChild(this._ripple),e){var n=Object(we.a)(this._rippleContainer||this),i=Object(we.a)(e).rootTarget;n.deepContains(i)&&this._ripple.uiDownAction(e)}}},getRipple:function(){return this.ensureRipple(),this._ripple},hasRipple:function(){return Boolean(this._ripple)},_createRipple:function(){return document.createElement("paper-ripple")},_noinkChanged:function(e){this.hasRipple()&&(this._ripple.noink=e)}},Ue={properties:{elevation:{type:Number,reflectToAttribute:!0,readOnly:!0}},observers:["_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)","_computeKeyboardClass(receivedFocusFromKeyboard)"],hostAttributes:{role:"button",tabindex:"0",animated:!0},_calculateElevation:function(){var e=1;this.disabled?e=0:this.active||this.pressed?e=4:this.receivedFocusFromKeyboard&&(e=3),this._setElevation(e)},_computeKeyboardClass:function(e){this.toggleClass("keyboard-focus",e)},_spaceKeyDownHandler:function(e){Ne._spaceKeyDownHandler.call(this,e),this.hasRipple()&&this.getRipple().ripples.length<1&&this._ripple.uiDownAction()},_spaceKeyUpHandler:function(e){Ne._spaceKeyUpHandler.call(this,e),this.hasRipple()&&this._ripple.uiUpAction()}},qe=[je,ze,Fe,Ue],Ke=oe["b"]`
  <style include="paper-material-styles">
    /* Need to specify the same specificity as the styles imported from paper-material. */
    :host {
      @apply --layout-inline;
      @apply --layout-center-center;
      position: relative;
      box-sizing: border-box;
      min-width: 5.14em;
      margin: 0 0.29em;
      background: transparent;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      font: inherit;
      text-transform: uppercase;
      outline-width: 0;
      border-radius: 3px;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      padding: 0.7em 0.57em;

      @apply --paper-font-common-base;
      @apply --paper-button;
    }

    :host([elevation="1"]) {
      @apply --paper-material-elevation-1;
    }

    :host([elevation="2"]) {
      @apply --paper-material-elevation-2;
    }

    :host([elevation="3"]) {
      @apply --paper-material-elevation-3;
    }

    :host([elevation="4"]) {
      @apply --paper-material-elevation-4;
    }

    :host([elevation="5"]) {
      @apply --paper-material-elevation-5;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([raised].keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-raised-keyboard-focus;
    }

    :host(:not([raised]).keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-flat-keyboard-focus;
    }

    :host([disabled]) {
      background: none;
      color: #a8a8a8;
      cursor: auto;
      pointer-events: none;

      @apply --paper-button-disabled;
    }

    :host([disabled][raised]) {
      background: #eaeaea;
    }


    :host([animated]) {
      @apply --shadow-transition;
    }

    paper-ripple {
      color: var(--paper-button-ink-color);
    }
  </style>

  <slot></slot>`;
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Ke.setAttribute("strip-whitespace",""),Object(ye.a)({_template:Ke,is:"paper-button",behaviors:[qe],properties:{raised:{type:Boolean,reflectToAttribute:!0,value:!1,observer:"_calculateElevation"}},_calculateElevation:function(){this.raised?Ue._calculateElevation.apply(this):this._setElevation(0)}});customElements.define("app-active-filters-panel",class extends ne{static get properties(){return{filters:{type:Array},hasFilters:{type:Boolean}}}constructor(){super(),this.render=function(){return L`

<style>
  :host {
    display: block;
  }

  /* @keyframes show-button {
    0%   { opacity: 0; transform: scale(0) }
    100% { opacity: 1; transform: scale(1) }
  } */
  paper-button {
    color: var(--secondary-text-color);
    border: 1px solid var(--secondary-text-color);
    border-radius: 3;
    padding: 4px;
    font-size: 14px;

    /* animation: show-button 300ms ease-out; */
  }
  paper-button:hover, paper-button:focus {
    color: var(--light-primary-color);
    border: 1px solid var(--light-primary-color);
  }

  [has-filters] {
    margin-bottom: 15px;
  }

  .btn-layout {
    display: flex;
    align-items: center;
  }
</style>

<div ?has-filters="${this.hasFilters}">
  ${this.filters.map((e,t)=>L`
    <paper-button index="${t}" @click="${this._onRemoveFilterClicked}">
      <div class="btn-layout">
        <iron-icon icon="close"></iron-icon>
        <span>${e.label}<span ?hidden="${e.noValueLabel}">: ${e.value}</span></span>
      </div>
    </paper-button>`)}
</div>

`}.bind(this),this.filters=[]}updated(e){e.has("filters")&&(this.hasFilters=!!this.filters.length)}_onRemoveFilterClicked(e){let t=parseInt(e.currentTarget.getAttribute("index")),n=this.filters[t];e=new CustomEvent("remove-filter",{bubbles:!0,composed:!0,detail:n}),this.dispatchEvent(e)}});customElements.define("app-search-header",class extends ne{static get properties(){return{text:{type:String},filters:{type:Array},suggestions:{type:Array},showSuggestions:{type:Boolean},placeholder:{type:String}}}constructor(){super(),this.render=function(){return L`

${ie(re.a)}

<style>
  :host {
    display: block;
    background-color: white;
    border-bottom: 1px solid #ddd;
  }
  .root {
    display: flex;
    justify-content: center;
  }
  input {
    display: block;
    width: 100%;
    padding: 5px;
    font-size: 22px;
    margin: 15px 0 0 0;
    height: 42px;
    background: #eee;
    color: var(--text-primary-color);
    border: none;
    box-sizing: border-box;
    border-radius: 0;
  }
  input:focus {
    border: none;
  }
  button {
    margin: 15px 0;
    color : white;
    background: var(--light-primary-color);
    border: 1px solid var(--light-primary-color);
    height: 42px;
    padding: 0 15px;
    border-left: none;
    border-radius: 0;
  }

  .suggest {
    position: relative;
  }

  .suggest > div {
    position: absolute;
    background: white;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 3px 3px;
    overflow: auto;
    max-height: 250px;
  }

  .suggest a {
    cursor: pointer;
  }

  .suggestion {
    padding: 5px;
    white-space: nowrap;
  }
</style>

<div class="root">
  <div style="flex:.66;">
    <input type="text" 
      placeholder="${this.placeholder}" 
      autocomplete="off"
      id="input" 
      @focus="${this._onFocus}"
      @keyup="${this._onKeyPress}" />
    <div class="suggest" ?hidden="${!this.showSuggestions}">
      <div>
        ${this.suggestions.map((e,t)=>L`
          <div class="suggestion"><a index="${t}" @click="${this._onSuggestClicked}">${e.label}</a></div>`)}
      </div>
    </div>
  </div>
  <div>
    <button @click="${this._onButtonClick}">
      <iron-icon icon="search"></iron-icon>
    </button>
  </div>
</div>

<div class="root">
  <app-active-filters-panel style="flex:.66" .filters="${this.filters}"></app-active-filters-panel>
</div>

`}.bind(this),this.text="",this.filters=[],this.suggestions=[],this.showSuggestions=!1,this.placeholder="Search Spectra",window.addEventListener("click",e=>{if(!this.showSuggestions)return;let t=e.composedPath();-1===t.indexOf(this.inputEle)&&-1===t.indexOf(this.popupEle)&&(this.showSuggestions=!1)})}set value(e){this.shadowRoot.querySelector("#input").value=e||""}get value(){return this.shadowRoot.querySelector("#input").value}firstUpdated(){this.inputEle=this.shadowRoot.querySelector("input"),this.popupEle=this.shadowRoot.querySelector(".suggest > div")}updated(e){e.has("text")&&(this.value=this.text),e.has("suggestions")&&(this.showSuggestions=this.suggestions.length>0)}_onKeyPress(e){if(27===e.which&&this.showSuggestions)return this.showSuggestions=!1;13===e.which&&(e=new CustomEvent("text-search",{bubbles:this,detail:this.value}),this.dispatchEvent(e))}_onButtonClick(e){e=new CustomEvent("text-search",{bubbles:this,detail:this.value}),this.dispatchEvent(e)}_onSuggestClicked(e){let t=parseInt(e.currentTarget.getAttribute("index")),n=this.suggestions[t];e=new CustomEvent("suggestion-selected",{bubbles:!0,detail:n}),this.dispatchEvent(e)}_onFocus(){this.suggestions.length>0&&(this.showSuggestions=!0)}});customElements.define("app-search-pagination",class extends ne{static get properties(){return{itemsPerPage:{type:Number,attribute:"items-per-page"},currentIndex:{type:Number,attribute:"current-index"},textMode:{type:Boolean,attribute:"text-mode"},textDisplay:{type:String,attribute:"text-display"},totalResults:{type:Number,attribute:"total-results"},numShownPages:{type:Number},pages:{type:Array},lastPageIndex:{type:Number},firstPage:{type:Boolean},lastPage:{type:Boolean},loading:{type:Boolean}}}constructor(){super(),this.render=function(){return L`

<style>
  :host {
    display: block;
  }
</style>  


<style>
  :host {
    display: block;
  }
  #root {
    display: flex;
    align-items: center;
  }
  .ellipsis {
    display: none;
  }
  paper-icon-button {
    color: var(--cork-color, --default-primary-color);
  }
  paper-icon-button[disabled] {
      color: var(--cork-disabled-color, var(--disabled-color, #ccc));
  }
  a {
    color: var(--cork-color, --default-primary-color);
    cursor: pointer;
    text-align: center;
    min-width: 20px;
    border-radius: 25px;
    display: inline-block;
    padding: 5px;
    margin: 0 3px;
    font-size: 14px;
    line-height: 20px;
  }
  a:hover {
    background: var(--cork-background-color-light, var(--light-background-color, #eee));
  }
  a[selected] {
    background: var(--cork-background-color, var(--medium-background-color, #ccc));
    color: white;
  }
  [hidden] {
    display: none;
  }
  .text-display {
    font-style: italic;
  }
</style>

<div id="root">
  <paper-icon-button 
    ?disabled="${this.firstPage}" 
    icon="arrow-back" 
    @click="${this.previous}">
  </paper-icon-button>

  <div style="flex:1"></div>

  <div ?hidden="${this.loading}">
    <div ?hidden="${!this.textMode}" class="text-display">${this.textDisplay}</div>
  </div>

  <div ?hidden="${this.textMode}">
    <a ?selected="${this.firstPage}" @click="${this._selectPage}" page="0">1</a>
    <a id="startEllipsis" class="ellipsis" @click="${this.previousSection}">...</a>

    ${this.pages.map(e=>L`<a ?selected="${e.selected}" @click="${this._selectPage}" page="${e.index}">${e.index}</a>`)}

    <a id="stopEllipsis" class="ellipsis" @click="${this.nextSection}">...</a>
    <a id="lastPage" ?selected="${this.lastPage}" @click="${this._selectPage}" page="${this.lastPageIndex}">${this.lastPageIndex}</a>
  </div>

  <div style="flex:1"></div>

  <paper-icon-button 
    ?disabled="${this.lastPage}" 
    icon="arrow-forward" 
    @click="${this.next}">
  </paper-icon-button>
</div>

  

`}.bind(this),this.itemsPerPage=10,this.currentIndex=1,this.textMode=!1,this.textDisplay="",this.totalResults=1,this.numShownPages=5,this.pages=[],this.lastPageIndex=1,this.firstPage=!0,this.lastPage=!1,this.loading=!1}updated(e){(e.has("currentIndex")||e.has("totalResults")||e.has("itemsPerPage"))&&(this.textDisplay=this._computeTextDisplay(this.currentIndex,this.totalResults,this.itemsPerPage),this._onPageChanged())}_computeTextDisplay(e,t,n){if(0===t)return"No results found";var i=e+n<t?e+n:t,a=e+1;return a>i&&(a=i),`Showing ${a} to ${i} of ${t}`}_onPageChanged(){this.firstPage=!1,this.lastPage=!1;var e=[];this.currentPage=Math.floor(this.currentIndex/this.itemsPerPage)+1;var t=Math.floor(this.numShownPages/2);this.lastPageIndex=Math.max(Math.ceil(this.totalResults/this.itemsPerPage),1);var n=this.currentPage-t,i=this.currentPage+t;n<1&&(i=1-n+i),i>this.lastPageIndex&&(n-=i-this.lastPageIndex,i=this.lastPageIndex),n<1&&(n=1),this.firstPage=1===this.currentPage,1===n&&(n=2),this.lastPage=this.currentPage===this.lastPageIndex,i===this.lastPageIndex&&(i=this.lastPageIndex-1);for(var a=n;a<=i;a++)e.push({index:a,selected:a===this.currentPage});this.shadowRoot.querySelector("#lastPage").style.display=this.lastPageIndex>1?"inline-block":"none",this.shadowRoot.querySelector("#startEllipsis").style.display=n>2?"inline-block":"none",this.shadowRoot.querySelector("#stopEllipsis").style.display=i<this.lastPageIndex-1?"inline-block":"none",this.pages=e}previous(){this._fireNav({page:this.currentPage-1,startIndex:(this.currentPage-2)*this.itemsPerPage})}next(){this._fireNav({page:this.currentPage+1,startIndex:this.currentPage*this.itemsPerPage})}_selectPage(e){var t=parseInt(e.currentTarget.getAttribute("page"));this._fireNav({page:t,startIndex:(t-1)*this.itemsPerPage})}previousSection(){var e=Math.floor(this.numShownPages/2)+1,t=this.pages[0].index-e;t<1&&(t=1),this._fireNav({page:t,startIndex:(t-1)*this.itemsPerPage})}nextSection(){var e=Math.floor(this.numShownPages/2)+1,t=this.pages[this.pages.length-1].index+e;t>this.lastPageIndex&&(t=this.lastPageIndex),this._fireNav({page:t,startIndex:(t-1)*this.itemsPerPage})}_fireNav(e){this.dispatchEvent(new CustomEvent("nav",{detail:e}))}});customElements.define("app-filter-list-row",class extends ne{static get properties(){return{index:{type:Number,reflect:!0},label:{type:String},count:{type:String}}}constructor(){super(),this.render=function(){return L`

<style>
  :host {
    display: block;
    font-size: 14px;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  a:hover {
    color: var(--default-primary-color);
  }
  .label {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 200px;
    display: block;
    overflow: hidden;
  }
</style>

<div style="display:flex; padding: 6px 5px">
  <div style="flex:1">
    <div class="label">
      <a tabindex="1">${this.label}</a>
    </div>
  </div>
  <div>${this.count}</div>
</div>

`}.bind(this),this.label="",this.count=""}_onKeyup(e){13===e.which&&this.dispatchEvent(new CustomEvent("click"))}setItem(e,t){this.index=e,this.label=t.label,this.count=t.count}});customElements.define("app-virtual-list",class extends ne{static get properties(){return{maxHeight:{type:Array},items:{type:Array},renderedItems:{type:Array},itemHeight:{type:Number,attribute:"item-height"},loading:{type:Boolean}}}constructor(){super(),this.render=function(){return L`

<style>
  :host {
    display: block;
    height: 200px;
  }

  .root {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #scroll-panel {
    position: relative;
  }

  .virtual-item {
    position: absolute;
  }

  [hidden] {
    display: none;
  }
</style>  

<div class="root" @scroll="${this._onScroll}">
  <div id="scroll-panel" ?hidden="${this.loading}"></div>
</div>
`}.bind(this),this.items=[],this.itemHeight=25,this.renderedItems=[],this.trash=[],this.loading=!1}update(e){super.update(e)}firstUpdated(){this.scrollPanel=this.shadowRoot.querySelector("#scroll-panel"),this.root=this.shadowRoot.querySelector(".root"),this.height=this.offsetHeight;let e=Math.min(this.items.length,Math.ceil(this.height/this.itemHeight));for(let t=0;t<e;t++){let e=this._createElement();e.setItem(t,this.items[t]),this.renderedItems.push({index:t,ele:e})}this._layoutItems()}createItemElement(){return document.createElement("div")}_createElement(){let e=this.createItemElement();return e.style.height=this.itemHeight,e.className="virtual-item",this.scrollPanel.appendChild(e),e}updated(e){this.scrollPanel.style.height=this.items.length*this.itemHeight+"px",this._layoutItems()}_onScroll(e){this._layoutItems()}_layoutItems(){let e=this.root.scrollTop,t=Math.floor(e/this.itemHeight);this.height=this.offsetHeight;let n=Math.min(this.items.length,Math.ceil(this.height/this.itemHeight));for(let e=this.renderedItems.length-1;e>=0;e--){let i=this.renderedItems[e];(i.index<t||i.index>=t+n)&&(this.renderedItems.splice(e,1),this.trash.push(i),this.scrollPanel.removeChild(i.ele))}for(let e=t;e<t+n;e++){if(e>=this.items.length)continue;let t=this.renderedItems.find(t=>t.index===e);t||(this.trash.length?(t=this.trash.pop(),this.scrollPanel.appendChild(t.ele)):t={index:e,ele:this._createElement()},t.index=e,this.renderedItems.push(t))}for(let e of this.renderedItems)e.ele.setItem(e.index,this.items[e.index]),e.ele.style.top=e.index*this.itemHeight+"px",e.ele.style.left="5px",e.ele.style.right="5px"}});customElements.define("app-filter-panel",class extends ne{static get properties(){return{label:{type:String},filter:{type:String},values:{type:Array},bucketsIronList:{type:Array},buckets:{type:Array},opened:{type:Boolean},radius:{type:String}}}constructor(){super(),this.render=function(){return L`

${ie(re.a)}

<style >
  :host {
    display: block;
    min-width: 250px;
  }
  .label {
    cursor: pointer;
    display: flex;
    color: var(--default-primary-color);
    padding: 10px 0;
    font-weight: bold;
    position: relative;
    /* outline: none !important; */
    background-color: white;
    border-bottom: 1px solid #ddd;
    padding-left: 15px;
  }
  .highlight {
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color:  var(--default-secondary-color);
    display: none;
  }
  .label:focus > .highlight {
    display: block;
  }
  #activeFilters > div {
    padding: 4px 5px;
  }
  .filter {
    display: flex;
    cursor: pointer;
    align-items: center;
    font-weight: bold;
    font-style: italic;
  }
  iron-icon[closed] {
    transform: rotate(-90deg);
  }
  iron-icon[clear] {
    color: var(--default-secondary-color);
    margin-right: 2px;
  }
  #smallList {
    overflow-y: auto;
    max-height: 200px;
  }
</style>

<div class="label" 
  @click="${this._onToggleClicked}" 
  @keyup="${this._onLabelKeyup}" 
  role="button" tabindex="1">
  <div style="flex:1">${this.label}</div>
  <iron-icon icon="arrow-drop-down" ?closed="${!this.opened}"></iron-icon>
  <div class="highlight"></div>
</div>

<div ?hidden="${!this.opened}">
  <!-- used for large lists -->
  <app-virtual-list 
    item-height="33"
    .items="${this.bucketsIronList}" 
    .createItemElement="${this._createVirtualListElement}">
  </app-virtual-list>
  
  <!-- used for small lists -->
  <div class="overflow" id="smallList">
    <div style="padding: 5px">
      ${this.buckets.map((e,t)=>L`<app-filter-list-row
          @click="${this._onListClicked}" 
          index="${t}"
          .label="${e.label}"
          .count="${e.count}">
        </app-filter-list-row>`)}
    </div>
  </div>
</div>

`}.bind(this),this._createVirtualListElement=this._createVirtualListElement.bind(this),this.filter="",this.values=[],this.buckets=[],this.bucketsIronList=[],this.opened=!1}firstUpdated(){this.radius&&(this.shadowRoot.querySelector(".label").style.borderRadius=this.radius)}updated(e){if(e.has("values")){let e=this.shadowRoot.querySelector("app-virtual-list"),t=this.shadowRoot.querySelector("#smallList");if(this.values.length>50){e.style.display="block",t.style.display="none";let n=e.scrollTop;this.bucketsIronList=this.values,this.buckets=[],e.scrollTop=n,requestAnimationFrame(()=>{e.scrollTop=n})}else e.style.display="none",t.style.display="block",this.bucketsIronList=[],this.buckets=this.values}e.has("opened")&&this.opened&&this.values.length>50&&this.shadowRoot.querySelector("app-virtual-list")._layoutItems()}_onLabelKeyup(e){13===e.which&&this._onToggleClicked()}_onToggleClicked(){this.opened=!this.opened}_createVirtualListElement(){let e=document.createElement("app-filter-list-row");return e.addEventListener("click",e=>{this._onListClicked(e)}),e}_onListClicked(e){let t=parseInt(e.currentTarget.getAttribute("index")),n=new CustomEvent("item-selected",{detail:{index:t,filter:this.filter,value:this.values[t]}});this.dispatchEvent(n)}});customElements.define("app-popup",class extends ne{static get properties(){return{title:{type:String}}}constructor(){super(),this.render=function(){return L`

<style>
  :host {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    overflow: auto;
    z-index: 10000;
  }

  .layout {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-root {
    margin: 50px 15px;
    max-width: 600px;
    width: 100%;
    background: white;
    box-shadow: 0 0 5px #333;
  }

  .header {
    margin: 15px;
    display: flex;
    align-items: center;
  }

  .header h2 {
    flex: 1;
    margin: 0;
  }

</style>  

<div class="layout">
  <div class="content-root"
      role="dialog"
      aria-modal="true">
    <div class="header">
      <h2>${this.title}</h2>
      <div><paper-icon-button @click="${this.close}" icon="close"></paper-icon-button></div>
    </div>
    <slot></slot>
  </div>
</div>

`}.bind(this),this.title=""}connectedCallback(){super.connectedCallback(),this.attachedToBody||(this.attachedToBody=!0,this.parentNode.removeChild(this),document.body.appendChild(this),this.children.length>0&&(this.children[0].addEventListener("open",this.open.bind(this)),this.children[0].addEventListener("close",this.close.bind(this))))}open(){document.body.style.overflow="none",this.style.display="block",this.children.length>0&&this.children[0]._onOpen&&this.children[0]._onOpen()}close(){document.body.style.overflow="auto",this.style.display="none",this.children.length>0&&this.children[0]._onClose&&this.children[0]._onClose()}});n(10),n(51);var Ge={AppStateModel:n(138),PackageModel:n(38),PackageEditor:n(131),SearchModel:n(125),StatsModel:n(123),AuthModel:n(121),vocabulary:n(24)},Ye=n(0);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const We=[je,ze,Fe,{observers:["_focusedChanged(receivedFocusFromKeyboard)"],_focusedChanged:function(e){e&&this.ensureRipple(),this.hasRipple()&&(this._ripple.holdDown=e)},_createRipple:function(){var e=Fe._createRipple();return e.id="ink",e.setAttribute("center",""),e.classList.add("circle"),e}}],Je=le["a"]`
<dom-module id="paper-icon-button">
  <template strip-whitespace>
    <style>
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;

        width: 40px;
        height: 40px;

        /* NOTE: Both values are needed, since some phones require the value to be \`transparent\`. */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        /* Because of polymer/2558, this style has lower specificity than * */
        box-sizing: border-box !important;

        @apply --paper-icon-button;
      }

      :host #ink {
        color: var(--paper-icon-button-ink-color, var(--primary-text-color));
        opacity: 0.6;
      }

      :host([disabled]) {
        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));
        pointer-events: none;
        cursor: auto;

        @apply --paper-icon-button-disabled;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:hover) {
        @apply --paper-icon-button-hover;
      }

      iron-icon {
        --iron-icon-width: 100%;
        --iron-icon-height: 100%;
      }
    </style>

    <iron-icon id="icon" src="[[src]]" icon="[[icon]]" alt\$="[[alt]]"></iron-icon>
  </template>
</dom-module>
`;Je.setAttribute("style","display: none;"),document.body.appendChild(Je.content),Object(ye.a)({is:"paper-icon-button",hostAttributes:{role:"button",tabindex:"0"},behaviors:[We],properties:{src:{type:String},icon:{type:String},alt:{type:String,observer:"_altChanged"}},_altChanged:function(e,t){var n=this.getAttribute("aria-label");n&&t!=n||this.setAttribute("aria-label",e)}});
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Xe=le["a"]`<iron-iconset-svg name="social" size="24">
<svg><defs>
<g id="cake"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"></path></g>
<g id="domain"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></g>
<g id="group"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></g>
<g id="group-add"><path d="M8 10H5V7H3v3H0v2h3v3h2v-3h3v-2zm10 1c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.04-.9 2.86c.28.09.59.14.91.14zm-5 0c1.66 0 2.99-1.34 2.99-3S14.66 5 13 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm6.62 2.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84zM13 13c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z"></path></g>
<g id="location-city"><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"></path></g>
<g id="mood"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></g>
<g id="mood-bad"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 3c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z"></path></g>
<g id="notifications"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></g>
<g id="notifications-active"><path d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z"></path></g>
<g id="notifications-none"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path></g>
<g id="notifications-off"><path d="M20 18.69L7.84 6.14 5.27 3.49 4 4.76l2.8 2.8v.01c-.52.99-.8 2.16-.8 3.42v5l-2 2v1h13.73l2 2L21 19.72l-1-1.03zM12 22c1.11 0 2-.89 2-2h-4c0 1.11.89 2 2 2zm6-7.32V11c0-3.08-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.15.03-.29.08-.42.12-.1.03-.2.07-.3.11h-.01c-.01 0-.01 0-.02.01-.23.09-.46.2-.68.31 0 0-.01 0-.01.01L18 14.68z"></path></g>
<g id="notifications-paused"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.93 6 11v5l-2 2v1h16v-1l-2-2zm-3.5-6.2l-2.8 3.4h2.8V15h-5v-1.8l2.8-3.4H9.5V8h5v1.8z"></path></g>
<g id="pages"><path d="M3 5v6h5L7 7l4 1V3H5c-1.1 0-2 .9-2 2zm5 8H3v6c0 1.1.9 2 2 2h6v-5l-4 1 1-4zm9 4l-4-1v5h6c1.1 0 2-.9 2-2v-6h-5l1 4zm2-14h-6v5l4-1-1 4h5V5c0-1.1-.9-2-2-2z"></path></g>
<g id="party-mode"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 3c1.63 0 3.06.79 3.98 2H12c-1.66 0-3 1.34-3 3 0 .35.07.69.18 1H7.1c-.06-.32-.1-.66-.1-1 0-2.76 2.24-5 5-5zm0 10c-1.63 0-3.06-.79-3.98-2H12c1.66 0 3-1.34 3-3 0-.35-.07-.69-.18-1h2.08c.07.32.1.66.1 1 0 2.76-2.24 5-5 5z"></path></g>
<g id="people"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></g>
<g id="people-outline"><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"></path></g>
<g id="person"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g>
<g id="person-add"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g>
<g id="person-outline"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>
<g id="plus-one"><path d="M10 8H8v4H4v2h4v4h2v-4h4v-2h-4zm4.5-1.92V7.9l2.5-.5V18h2V5z"></path></g>
<g id="poll"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="public"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></g>
<g id="school"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"></path></g>
<g id="sentiment-dissatisfied"><circle cx="15.5" cy="9.5" r="1.5"></circle><circle cx="8.5" cy="9.5" r="1.5"></circle><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"></path></g>
<g id="sentiment-neutral"><path d="M9 14h6v1.5H9z"></path><circle cx="15.5" cy="9.5" r="1.5"></circle><circle cx="8.5" cy="9.5" r="1.5"></circle><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="sentiment-satisfied"><circle cx="15.5" cy="9.5" r="1.5"></circle><circle cx="8.5" cy="9.5" r="1.5"></circle><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.7 1.19-1.97 2-3.45 2z"></path></g>
<g id="sentiment-very-dissatisfied"><path d="M11.99 2C6.47 2 2 6.47 2 12s4.47 10 9.99 10S22 17.53 22 12 17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm4.18-12.24l-1.06 1.06-1.06-1.06L13 8.82l1.06 1.06L13 10.94 14.06 12l1.06-1.06L16.18 12l1.06-1.06-1.06-1.06 1.06-1.06zM7.82 12l1.06-1.06L9.94 12 11 10.94 9.94 9.88 11 8.82 9.94 7.76 8.88 8.82 7.82 7.76 6.76 8.82l1.06 1.06-1.06 1.06zM12 14c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z"></path></g>
<g id="sentiment-very-satisfied"><path d="M11.99 2C6.47 2 2 6.47 2 12s4.47 10 9.99 10S22 17.53 22 12 17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-10.06L14.06 11l1.06-1.06L16.18 11l1.06-1.06-2.12-2.12zm-4.12 0L9.94 11 11 9.94 8.88 7.82 6.76 9.94 7.82 11zM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></g>
<g id="share"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path></g>
<g id="whatshot"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(Xe.content);
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Qe=le["a"]`<iron-iconset-svg name="editor" size="24">
<svg><defs>
<g id="attach-file"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path></g>
<g id="attach-money"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></g>
<g id="border-all"><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"></path></g>
<g id="border-bottom"><path d="M9 11H7v2h2v-2zm4 4h-2v2h2v-2zM9 3H7v2h2V3zm4 8h-2v2h2v-2zM5 3H3v2h2V3zm8 4h-2v2h2V7zm4 4h-2v2h2v-2zm-4-8h-2v2h2V3zm4 0h-2v2h2V3zm2 10h2v-2h-2v2zm0 4h2v-2h-2v2zM5 7H3v2h2V7zm14-4v2h2V3h-2zm0 6h2V7h-2v2zM5 11H3v2h2v-2zM3 21h18v-2H3v2zm2-6H3v2h2v-2z"></path></g>
<g id="border-clear"><path d="M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V7H3v2zm0-4h2V3H3v2zm8 8h2v-2h-2v2zm8 4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm0-12h2V7h-2v2zm-8 0h2V7h-2v2zm8-6v2h2V3h-2zm-8 2h2V3h-2v2zm4 16h2v-2h-2v2zm0-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g>
<g id="border-color"><path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>
<g id="border-horizontal"><path d="M3 21h2v-2H3v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zm4 4h2v-2H7v2zM5 3H3v2h2V3zm4 0H7v2h2V3zm8 0h-2v2h2V3zm-4 4h-2v2h2V7zm0-4h-2v2h2V3zm6 14h2v-2h-2v2zm-8 4h2v-2h-2v2zm-8-8h18v-2H3v2zM19 3v2h2V3h-2zm0 6h2V7h-2v2zm-8 8h2v-2h-2v2zm4 4h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="border-inner"><path d="M3 21h2v-2H3v2zm4 0h2v-2H7v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zM9 3H7v2h2V3zM5 3H3v2h2V3zm12 0h-2v2h2V3zm2 6h2V7h-2v2zm0-6v2h2V3h-2zm-4 18h2v-2h-2v2zM13 3h-2v8H3v2h8v8h2v-8h8v-2h-8V3zm6 18h2v-2h-2v2zm0-4h2v-2h-2v2z"></path></g>
<g id="border-left"><path d="M11 21h2v-2h-2v2zm0-4h2v-2h-2v2zm0-12h2V3h-2v2zm0 4h2V7h-2v2zm0 4h2v-2h-2v2zm-4 8h2v-2H7v2zM7 5h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2V3H3v18zM19 9h2V7h-2v2zm-4 12h2v-2h-2v2zm4-4h2v-2h-2v2zm0-14v2h2V3h-2zm0 10h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g>
<g id="border-outer"><path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z"></path></g>
<g id="border-right"><path d="M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"></path></g>
<g id="border-style"><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"></path></g>
<g id="border-top"><path d="M7 21h2v-2H7v2zm0-8h2v-2H7v2zm4 0h2v-2h-2v2zm0 8h2v-2h-2v2zm-8-4h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2v-2H3v2zm0-4h2V7H3v2zm8 8h2v-2h-2v2zm8-8h2V7h-2v2zm0 4h2v-2h-2v2zM3 3v2h18V3H3zm16 14h2v-2h-2v2zm-4 4h2v-2h-2v2zM11 9h2V7h-2v2zm8 12h2v-2h-2v2zm-4-8h2v-2h-2v2z"></path></g>
<g id="border-vertical"><path d="M3 9h2V7H3v2zm0-4h2V3H3v2zm4 16h2v-2H7v2zm0-8h2v-2H7v2zm-4 0h2v-2H3v2zm0 8h2v-2H3v2zm0-4h2v-2H3v2zM7 5h2V3H7v2zm12 12h2v-2h-2v2zm-8 4h2V3h-2v18zm8 0h2v-2h-2v2zm0-8h2v-2h-2v2zm0-10v2h2V3h-2zm0 6h2V7h-2v2zm-4-4h2V3h-2v2zm0 16h2v-2h-2v2zm0-8h2v-2h-2v2z"></path></g>
<g id="bubble-chart"><circle cx="7.2" cy="14.4" r="3.2"></circle><circle cx="14.8" cy="18" r="2"></circle><circle cx="15.2" cy="8.8" r="4.8"></circle></g>
<g id="drag-handle"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></g>
<g id="format-align-center"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></g>
<g id="format-align-justify"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path></g>
<g id="format-align-left"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></g>
<g id="format-align-right"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"></path></g>
<g id="format-bold"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>
<g id="format-clear"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"></path></g>
<g id="format-color-fill"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>
<g id="format-color-reset"><path d="M18 14c0-4-6-10.8-6-10.8s-1.33 1.51-2.73 3.52l8.59 8.59c.09-.42.14-.86.14-1.31zm-.88 3.12L12.5 12.5 5.27 5.27 4 6.55l3.32 3.32C6.55 11.32 6 12.79 6 14c0 3.31 2.69 6 6 6 1.52 0 2.9-.57 3.96-1.5l2.63 2.63 1.27-1.27-2.74-2.74z"></path></g>
<g id="format-color-text"><path fill-opacity=".36" d="M0 20h24v4H0z"></path><path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"></path></g>
<g id="format-indent-decrease"><path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g>
<g id="format-indent-increase"><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g>
<g id="format-italic"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></g>
<g id="format-line-spacing"><path d="M6 7h2.5L5 3.5 1.5 7H4v10H1.5L5 20.5 8.5 17H6V7zm4-2v2h12V5H10zm0 14h12v-2H10v2zm0-6h12v-2H10v2z"></path></g>
<g id="format-list-bulleted"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></g>
<g id="format-list-numbered"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></g>
<g id="format-paint"><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z"></path></g>
<g id="format-quote"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></g>
<g id="format-shapes"><path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2zm4 2h-2v-2h2v2zM19 5V3h2v2h-2zm-5.27 9h-3.49l-.73 2H7.89l3.4-9h1.4l3.41 9h-1.63l-.74-2zm-3.04-1.26h2.61L12 8.91l-1.31 3.83z"></path></g>
<g id="format-size"><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"></path></g>
<g id="format-strikethrough"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path></g>
<g id="format-textdirection-l-to-r"><path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z"></path></g>
<g id="format-textdirection-r-to-l"><path d="M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z"></path></g>
<g id="format-underlined"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path></g>
<g id="functions"><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z"></path></g>
<g id="highlight"><path d="M6 14l3 3v5h6v-5l3-3V9H6zm5-12h2v3h-2zM3.5 5.875L4.914 4.46l2.12 2.122L5.62 7.997zm13.46.71l2.123-2.12 1.414 1.414L18.375 8z"></path></g>
<g id="insert-chart"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="insert-comment"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></g>
<g id="insert-drive-file"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></g>
<g id="insert-emoticon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></g>
<g id="insert-invitation"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="insert-link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="insert-photo"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>
<g id="linear-scale"><path d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"></path></g>
<g id="merge-type"><path d="M17 20.41L18.41 19 15 15.59 13.59 17 17 20.41zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8z"></path></g>
<g id="mode-comment"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"></path></g>
<g id="mode-edit"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="monetization-on"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"></path></g>
<g id="money-off"><path d="M12.5 6.9c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-.53.12-1.03.3-1.48.54l1.47 1.47c.41-.17.91-.27 1.51-.27zM5.33 4.06L4.06 5.33 7.5 8.77c0 2.08 1.56 3.21 3.91 3.91l3.51 3.51c-.34.48-1.05.91-2.42.91-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c.96-.18 1.82-.55 2.45-1.12l2.22 2.22 1.27-1.27L5.33 4.06z"></path></g>
<g id="multiline-chart"><path d="M22 6.92l-1.41-1.41-2.85 3.21C15.68 6.4 12.83 5 9.61 5 6.72 5 4.07 6.16 2 8l1.42 1.42C5.12 7.93 7.27 7 9.61 7c2.74 0 5.09 1.26 6.77 3.24l-2.88 3.24-4-4L2 16.99l1.5 1.5 6-6.01 4 4 4.05-4.55c.75 1.35 1.25 2.9 1.44 4.55H21c-.22-2.3-.95-4.39-2.04-6.14L22 6.92z"></path></g>
<g id="pie-chart"><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"></path></g>
<g id="pie-chart-outlined"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 2.07c3.61.45 6.48 3.33 6.93 6.93H13V4.07zM4 12c0-4.06 3.07-7.44 7-7.93v15.87c-3.93-.5-7-3.88-7-7.94zm9 7.93V13h6.93c-.45 3.61-3.32 6.48-6.93 6.93z"></path></g>
<g id="publish"><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"></path></g>
<g id="short-text"><path d="M4 9h16v2H4zm0 4h10v2H4z"></path></g>
<g id="show-chart"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"></path></g>
<g id="space-bar"><path d="M18 9v4H6V9H4v6h16V9z"></path></g>
<g id="strikethrough-s"><path d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43.25.55.38 1.15.38 1.81h-3.01c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13-.29.09-.53.21-.72.36-.19.16-.34.34-.44.55-.1.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25zM21 12v-2H3v2h9.62c.18.07.4.14.55.2.37.17.66.34.87.51.21.17.35.36.43.57.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13s-.66-.23-.91-.42c-.25-.19-.45-.44-.59-.75-.14-.31-.25-.76-.25-1.21H6.4c0 .55.08 1.13.24 1.58.16.45.37.85.65 1.21.28.35.6.66.98.92.37.26.78.48 1.22.65.44.17.9.3 1.38.39.48.08.96.13 1.44.13.8 0 1.53-.09 2.18-.28s1.21-.45 1.67-.79c.46-.34.82-.77 1.07-1.27s.38-1.07.38-1.71c0-.6-.1-1.14-.31-1.61-.05-.11-.11-.23-.17-.33H21z"></path></g>
<g id="text-fields"><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></g>
<g id="title"><path d="M5 4v3h5.5v12h3V7H19V4z"></path></g>
<g id="vertical-align-bottom"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"></path></g>
<g id="vertical-align-center"><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path></g>
<g id="vertical-align-top"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></g>
<g id="wrap-text"><path d="M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3 3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(Qe.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Ze=le["a"]`
<dom-module id="paper-material-shared-styles">
  <template>
    <style>
      :host {
        display: block;
        position: relative;
      }

      :host([elevation="1"]) {
        @apply --shadow-elevation-2dp;
      }

      :host([elevation="2"]) {
        @apply --shadow-elevation-4dp;
      }

      :host([elevation="3"]) {
        @apply --shadow-elevation-6dp;
      }

      :host([elevation="4"]) {
        @apply --shadow-elevation-8dp;
      }

      :host([elevation="5"]) {
        @apply --shadow-elevation-16dp;
      }
    </style>
  </template>
</dom-module>
`;Ze.setAttribute("style","display: none;"),document.body.appendChild(Ze.content),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(ye.a)({_template:le["a"]`
    <style include="paper-material-shared-styles"></style>
    <style>
      :host([animated]) {
        @apply --shadow-transition;
      }
      :host {
        @apply --paper-material;
      }
    </style>

    <slot></slot>
`,is:"paper-material",properties:{elevation:{type:Number,reflectToAttribute:!0,value:1},animated:{type:Boolean,reflectToAttribute:!0,value:!1}}});var et=n(7),tt=new Set;
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const nt={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(tt.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach(function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)},this),this._fireResize())},assignParentResizable:function(e){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=e,e&&-1===e._interestedResizables.indexOf(this)&&(e._interestedResizables.push(this),e._subscribeIronResize(this))},stopResizeNotificationsFor:function(e){var t=this._interestedResizables.indexOf(e);t>-1&&(this._interestedResizables.splice(t,1),this._unsubscribeIronResize(e))},_subscribeIronResize:function(e){e.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(e){e.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(e){return!0},_onDescendantIronResize:function(e){this._notifyingDescendant?e.stopPropagation():et.h||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(e){var t=Object(we.a)(e).rootTarget;t!==this&&(t.assignParentResizable(this),this._notifyDescendant(t),e.stopPropagation())},_parentResizableChanged:function(e){e&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(e){this.isAttached&&(this._notifyingDescendant=!0,e.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var e=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",function t(){document.removeEventListener("readystatechange",t),e()})}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach(function(e){e!==this&&e._findParent()},this):(tt.forEach(function(e){e!==this&&e._findParent()},this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?tt.delete(this):tt.add(this)}};var it=n(17);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const at={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:!0},selectedItem:{type:Object,readOnly:!0,notify:!0},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this),this._selection=new class{constructor(e){this.selection=[],this.selectCallback=e}get(){return this.multi?this.selection.slice():this.selection[0]}clear(e){this.selection.slice().forEach(function(t){(!e||e.indexOf(t)<0)&&this.setItemSelected(t,!1)},this)}isSelected(e){return this.selection.indexOf(e)>=0}setItemSelected(e,t){if(null!=e&&t!==this.isSelected(e)){if(t)this.selection.push(e);else{var n=this.selection.indexOf(e);n>=0&&this.selection.splice(n,1)}this.selectCallback&&this.selectCallback(e,t)}}select(e){this.multi?this.toggle(e):this.get()!==e&&(this.setItemSelected(this.get(),!1),this.setItemSelected(e,!0))}toggle(e){this.setItemSelected(e,!this.isSelected(e))}}(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this),this._addListener(this.activateEvent)},detached:function(){this._observer&&Object(we.a)(this).unobserveNodes(this._observer),this._removeListener(this.activateEvent)},indexOf:function(e){return this.items?this.items.indexOf(e):-1},select:function(e){this.selected=e},selectPrevious:function(){var e=this.items.length,t=e-1;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))-1+e)%e),this.selected=this._indexToValue(t)},selectNext:function(){var e=0;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(e)},selectIndex:function(e){this.select(this._indexToValue(e))},forceSynchronousItemUpdate:function(){this._observer&&"function"==typeof this._observer.flush?this._observer.flush():this._updateItems()},get _shouldUpdateSelection(){return null!=this.selected},_checkFallback:function(){this._updateSelected()},_addListener:function(e){this.listen(this,e,"_activateHandler")},_removeListener:function(e){this.unlisten(this,e,"_activateHandler")},_activateEventChanged:function(e,t){this._removeListener(t),this._addListener(e)},_updateItems:function(){var e=Object(we.a)(this).queryDistributedElements(this.selectable||"*");e=Array.prototype.filter.call(e,this._bindFilterItem),this._setItems(e)},_updateAttrForSelected:function(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(e){if(this.items){var t=this._valueToItem(this.selected);t?this._selection.select(t):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}},_filterItem:function(e){return!this._excludedLocalNames[e.localName]},_valueToItem:function(e){return null==e?null:this.items[this._valueToIndex(e)]},_valueToIndex:function(e){if(!this.attrForSelected)return Number(e);for(var t,n=0;t=this.items[n];n++)if(this._valueForItem(t)==e)return n},_indexToValue:function(e){if(!this.attrForSelected)return e;var t=this.items[e];return t?this._valueForItem(t):void 0},_valueForItem:function(e){if(!e)return null;if(!this.attrForSelected){var t=this.indexOf(e);return-1===t?null:t}var n=e[Object(it.b)(this.attrForSelected)];return void 0!=n?n:e.getAttribute(this.attrForSelected)},_applySelection:function(e,t){this.selectedClass&&this.toggleClass(this.selectedClass,t,e),this.selectedAttribute&&this.toggleAttribute(this.selectedAttribute,t,e),this._selectionChange(),this.fire("iron-"+(t?"select":"deselect"),{item:e})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(e){return Object(we.a)(e).observeNodes(function(e){this._updateItems(),this._updateSelected(),this.fire("iron-items-changed",e,{bubbles:!1,cancelable:!1})})},_activateHandler:function(e){for(var t=e.target,n=this.items;t&&t!=this;){var i=n.indexOf(t);if(i>=0){var a=this._indexToValue(i);return void this._itemActivate(a,t)}t=t.parentNode}},_itemActivate:function(e,t){this.fire("iron-activate",{selected:e,item:t},{cancelable:!0}).defaultPrevented||this.select(e)}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: block;
      }

      :host > ::slotted(:not(slot):not(.iron-selected)) {
        display: none !important;
      }
    </style>

    <slot></slot>
`,is:"iron-pages",behaviors:[nt,at],properties:{activateEvent:{type:String,value:null}},observers:["_selectedPageChanged(selected)"],_selectedPageChanged:function(e,t){this.async(this.notifyResize)}});var rt=n(102),st=n.n(rt);customElements.define("app-title-card",class extends Ye.a{static get template(){return Object(Ye.b)([st.a])}});var ot=n(101),lt=n.n(ot);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ht=Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
      }
    </style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,is:"iron-a11y-announcer",properties:{mode:{type:String,value:"polite"},_text:{type:String,value:""}},created:function(){ht.instance||(ht.instance=this),document.body.addEventListener("iron-announce",this._onIronAnnounce.bind(this))},announce:function(e){this._text="",this.async(function(){this._text=e},100)},_onIronAnnounce:function(e){e.detail&&e.detail.text&&this.announce(e.detail.text)}});ht.instance=null,ht.requestAvailability=function(){ht.instance||(ht.instance=document.createElement("iron-a11y-announcer")),document.body.appendChild(ht.instance)};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
let ct=null;const dt={properties:{validator:{type:String},invalid:{notify:!0,reflectToAttribute:!0,type:Boolean,value:!1,observer:"_invalidChanged"}},registered:function(){ct=new be({type:"validator"})},_invalidChanged:function(){this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")},get _validator(){return ct&&ct.byKey(this.validator)},hasValidator:function(){return null!=this._validator},validate:function(e){return void 0===e&&void 0!==this.value?this.invalid=!this._getValidity(this.value):this.invalid=!this._getValidity(e),!this.invalid},_getValidity:function(e){return!this.hasValidator()||this._validator.validate(e)}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <slot id="content"></slot>
`,is:"iron-input",behaviors:[dt],properties:{bindValue:{type:String,value:""},value:{type:String,computed:"_computeValue(bindValue)"},allowedPattern:{type:String},autoValidate:{type:Boolean,value:!1},_inputElement:Object},observers:["_bindValueChanged(bindValue, _inputElement)"],listeners:{input:"_onInput",keypress:"_onKeypress"},created:function(){ht.requestAvailability(),this._previousValidInput="",this._patternAlreadyChecked=!1},attached:function(){this._observer=Object(we.a)(this).observeNodes(function(e){this._initSlottedInput()}.bind(this))},detached:function(){this._observer&&(Object(we.a)(this).unobserveNodes(this._observer),this._observer=null)},get inputElement(){return this._inputElement},_initSlottedInput:function(){this._inputElement=this.getEffectiveChildren()[0],this.inputElement&&this.inputElement.value&&(this.bindValue=this.inputElement.value),this.fire("iron-input-ready")},get _patternRegExp(){var e;if(this.allowedPattern)e=new RegExp(this.allowedPattern);else switch(this.inputElement.type){case"number":e=/[0-9.,e-]/}return e},_bindValueChanged:function(e,t){t&&(void 0===e?t.value=null:e!==t.value&&(this.inputElement.value=e),this.autoValidate&&this.validate(),this.fire("bind-value-changed",{value:e}))},_onInput:function(){this.allowedPattern&&!this._patternAlreadyChecked&&(this._checkPatternValidity()||(this._announceInvalidCharacter("Invalid string of characters not entered."),this.inputElement.value=this._previousValidInput));this.bindValue=this._previousValidInput=this.inputElement.value,this._patternAlreadyChecked=!1},_isPrintable:function(e){var t=8==e.keyCode||9==e.keyCode||13==e.keyCode||27==e.keyCode,n=19==e.keyCode||20==e.keyCode||45==e.keyCode||46==e.keyCode||144==e.keyCode||145==e.keyCode||e.keyCode>32&&e.keyCode<41||e.keyCode>111&&e.keyCode<124;return!(t||0==e.charCode&&n)},_onKeypress:function(e){if(this.allowedPattern||"number"===this.inputElement.type){var t=this._patternRegExp;if(t&&!(e.metaKey||e.ctrlKey||e.altKey)){this._patternAlreadyChecked=!0;var n=String.fromCharCode(e.charCode);this._isPrintable(e)&&!t.test(n)&&(e.preventDefault(),this._announceInvalidCharacter("Invalid character "+n+" not entered."))}}},_checkPatternValidity:function(){var e=this._patternRegExp;if(!e)return!0;for(var t=0;t<this.inputElement.value.length;t++)if(!e.test(this.inputElement.value[t]))return!1;return!0},validate:function(){if(!this.inputElement)return this.invalid=!1,!0;var e=this.inputElement.checkValidity();return e&&(this.required&&""===this.bindValue?e=!1:this.hasValidator()&&(e=dt.validate.call(this,this.bindValue))),this.invalid=!e,this.fire("iron-input-validate"),e},_announceInvalidCharacter:function(e){this.fire("iron-announce",{text:e})},_computeValue:function(e){return e}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const pt={attached:function(){this.fire("addon-attached")},update:function(e){}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: inline-block;
        float: right;

        @apply --paper-font-caption;
        @apply --paper-input-char-counter;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:dir(rtl)) {
        float: left;
      }
    </style>

    <span>[[_charCounterStr]]</span>
`,is:"paper-input-char-counter",behaviors:[pt],properties:{_charCounterStr:{type:String,value:"0"}},update:function(e){if(e.inputElement){e.value=e.value||"";var t=e.value.toString().length.toString();e.inputElement.hasAttribute("maxlength")&&(t+="/"+e.inputElement.getAttribute("maxlength")),this._charCounterStr=t}}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ut=le["a"]`
<custom-style>
  <style is="custom-style">
    html {
      --paper-input-container-shared-input-style: {
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        width: 100%;
        max-width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        -webkit-appearance: none;
        text-align: inherit;
        vertical-align: var(--paper-input-container-input-align, bottom);

        @apply --paper-font-subhead;
      };
    }
  </style>
</custom-style>
`;ut.setAttribute("style","display: none;"),document.head.appendChild(ut.content),Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: block;
        padding: 8px 0;
        @apply --paper-input-container;
      }

      :host([inline]) {
        display: inline-block;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.33;

        @apply --paper-input-container-disabled;
      }

      :host([hidden]) {
        display: none !important;
      }

      [hidden] {
        display: none !important;
      }

      .floated-label-placeholder {
        @apply --paper-font-caption;
      }

      .underline {
        height: 2px;
        position: relative;
      }

      .focused-line {
        @apply --layout-fit;
        border-bottom: 2px solid var(--paper-input-container-focus-color, var(--primary-color));

        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-transform: scale3d(0,1,1);
        transform: scale3d(0,1,1);

        @apply --paper-input-container-underline-focus;
      }

      .underline.is-highlighted .focused-line {
        -webkit-transform: none;
        transform: none;
        -webkit-transition: -webkit-transform 0.25s;
        transition: transform 0.25s;

        @apply --paper-transition-easing;
      }

      .underline.is-invalid .focused-line {
        border-color: var(--paper-input-container-invalid-color, var(--error-color));
        -webkit-transform: none;
        transform: none;
        -webkit-transition: -webkit-transform 0.25s;
        transition: transform 0.25s;

        @apply --paper-transition-easing;
      }

      .unfocused-line {
        @apply --layout-fit;
        border-bottom: 1px solid var(--paper-input-container-color, var(--secondary-text-color));
        @apply --paper-input-container-underline;
      }

      :host([disabled]) .unfocused-line {
        border-bottom: 1px dashed;
        border-color: var(--paper-input-container-color, var(--secondary-text-color));
        @apply --paper-input-container-underline-disabled;
      }

      .input-wrapper {
        @apply --layout-horizontal;
        @apply --layout-center;
        position: relative;
      }

      .input-content {
        @apply --layout-flex-auto;
        @apply --layout-relative;
        max-width: 100%;
      }

      .input-content ::slotted(label),
      .input-content ::slotted(.paper-input-label) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font: inherit;
        color: var(--paper-input-container-color, var(--secondary-text-color));
        -webkit-transition: -webkit-transform 0.25s, width 0.25s;
        transition: transform 0.25s, width 0.25s;
        -webkit-transform-origin: left top;
        transform-origin: left top;
        /* Fix for safari not focusing 0-height date/time inputs with -webkit-apperance: none; */
        min-height: 1px;

        @apply --paper-font-common-nowrap;
        @apply --paper-font-subhead;
        @apply --paper-input-container-label;
        @apply --paper-transition-easing;
      }

      .input-content.label-is-floating ::slotted(label),
      .input-content.label-is-floating ::slotted(.paper-input-label) {
        -webkit-transform: translateY(-75%) scale(0.75);
        transform: translateY(-75%) scale(0.75);

        /* Since we scale to 75/100 of the size, we actually have 100/75 of the
        original space now available */
        width: 133%;

        @apply --paper-input-container-label-floating;
      }

      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(label),
      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(.paper-input-label) {
        right: 0;
        left: auto;
        -webkit-transform-origin: right top;
        transform-origin: right top;
      }

      .input-content.label-is-highlighted ::slotted(label),
      .input-content.label-is-highlighted ::slotted(.paper-input-label) {
        color: var(--paper-input-container-focus-color, var(--primary-color));

        @apply --paper-input-container-label-focus;
      }

      .input-content.is-invalid ::slotted(label),
      .input-content.is-invalid ::slotted(.paper-input-label) {
        color: var(--paper-input-container-invalid-color, var(--error-color));
      }

      .input-content.label-is-hidden ::slotted(label),
      .input-content.label-is-hidden ::slotted(.paper-input-label) {
        visibility: hidden;
      }

      .input-content ::slotted(input),
      .input-content ::slotted(iron-input),
      .input-content ::slotted(textarea),
      .input-content ::slotted(iron-autogrow-textarea),
      .input-content ::slotted(.paper-input-input) {
        @apply --paper-input-container-shared-input-style;
        /* The apply shim doesn't apply the nested color custom property,
          so we have to re-apply it here. */
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        @apply --paper-input-container-input;
      }

      .input-content ::slotted(input)::-webkit-outer-spin-button,
      .input-content ::slotted(input)::-webkit-inner-spin-button {
        @apply --paper-input-container-input-webkit-spinner;
      }

      .input-content.focused ::slotted(input),
      .input-content.focused ::slotted(iron-input),
      .input-content.focused ::slotted(textarea),
      .input-content.focused ::slotted(iron-autogrow-textarea),
      .input-content.focused ::slotted(.paper-input-input) {
        @apply --paper-input-container-input-focus;
      }

      .input-content.is-invalid ::slotted(input),
      .input-content.is-invalid ::slotted(iron-input),
      .input-content.is-invalid ::slotted(textarea),
      .input-content.is-invalid ::slotted(iron-autogrow-textarea),
      .input-content.is-invalid ::slotted(.paper-input-input) {
        @apply --paper-input-container-input-invalid;
      }

      .prefix ::slotted(*) {
        display: inline-block;
        @apply --paper-font-subhead;
        @apply --layout-flex-none;
        @apply --paper-input-prefix;
      }

      .suffix ::slotted(*) {
        display: inline-block;
        @apply --paper-font-subhead;
        @apply --layout-flex-none;

        @apply --paper-input-suffix;
      }

      /* Firefox sets a min-width on the input, which can cause layout issues */
      .input-content ::slotted(input) {
        min-width: 0;
      }

      .input-content ::slotted(textarea) {
        resize: none;
      }

      .add-on-content {
        position: relative;
      }

      .add-on-content.is-invalid ::slotted(*) {
        color: var(--paper-input-container-invalid-color, var(--error-color));
      }

      .add-on-content.is-highlighted ::slotted(*) {
        color: var(--paper-input-container-focus-color, var(--primary-color));
      }
    </style>

    <div class="floated-label-placeholder" aria-hidden="true" hidden="[[noLabelFloat]]">&nbsp;</div>

    <div class="input-wrapper">
      <span class="prefix"><slot name="prefix"></slot></span>

      <div class\$="[[_computeInputContentClass(noLabelFloat,alwaysFloatLabel,focused,invalid,_inputHasContent)]]" id="labelAndInputContainer">
        <slot name="label"></slot>
        <slot name="input"></slot>
      </div>

      <span class="suffix"><slot name="suffix"></slot></span>
    </div>

    <div class\$="[[_computeUnderlineClass(focused,invalid)]]">
      <div class="unfocused-line"></div>
      <div class="focused-line"></div>
    </div>

    <div class\$="[[_computeAddOnContentClass(focused,invalid)]]">
      <slot name="add-on"></slot>
    </div>
`,is:"paper-input-container",properties:{noLabelFloat:{type:Boolean,value:!1},alwaysFloatLabel:{type:Boolean,value:!1},attrForValue:{type:String,value:"bind-value"},autoValidate:{type:Boolean,value:!1},invalid:{observer:"_invalidChanged",type:Boolean,value:!1},focused:{readOnly:!0,type:Boolean,value:!1,notify:!0},_addons:{type:Array},_inputHasContent:{type:Boolean,value:!1},_inputSelector:{type:String,value:"input,iron-input,textarea,.paper-input-input"},_boundOnFocus:{type:Function,value:function(){return this._onFocus.bind(this)}},_boundOnBlur:{type:Function,value:function(){return this._onBlur.bind(this)}},_boundOnInput:{type:Function,value:function(){return this._onInput.bind(this)}},_boundValueChanged:{type:Function,value:function(){return this._onValueChanged.bind(this)}}},listeners:{"addon-attached":"_onAddonAttached","iron-input-validate":"_onIronInputValidate"},get _valueChangedEvent(){return this.attrForValue+"-changed"},get _propertyForValue(){return Object(it.b)(this.attrForValue)},get _inputElement(){return Object(we.a)(this).querySelector(this._inputSelector)},get _inputElementValue(){return this._inputElement[this._propertyForValue]||this._inputElement.value},ready:function(){this.__isFirstValueUpdate=!0,this._addons||(this._addons=[]),this.addEventListener("focus",this._boundOnFocus,!0),this.addEventListener("blur",this._boundOnBlur,!0)},attached:function(){this.attrForValue?this._inputElement.addEventListener(this._valueChangedEvent,this._boundValueChanged):this.addEventListener("input",this._onInput),this._inputElementValue&&""!=this._inputElementValue?this._handleValueAndAutoValidate(this._inputElement):this._handleValue(this._inputElement)},_onAddonAttached:function(e){this._addons||(this._addons=[]);var t=e.target;-1===this._addons.indexOf(t)&&(this._addons.push(t),this.isAttached&&this._handleValue(this._inputElement))},_onFocus:function(){this._setFocused(!0)},_onBlur:function(){this._setFocused(!1),this._handleValueAndAutoValidate(this._inputElement)},_onInput:function(e){this._handleValueAndAutoValidate(e.target)},_onValueChanged:function(e){var t=e.target;this.__isFirstValueUpdate&&(this.__isFirstValueUpdate=!1,void 0===t.value||""===t.value)||this._handleValueAndAutoValidate(e.target)},_handleValue:function(e){var t=this._inputElementValue;t||0===t||"number"===e.type&&!e.checkValidity()?this._inputHasContent=!0:this._inputHasContent=!1,this.updateAddons({inputElement:e,value:t,invalid:this.invalid})},_handleValueAndAutoValidate:function(e){var t;this.autoValidate&&e&&(t=e.validate?e.validate(this._inputElementValue):e.checkValidity(),this.invalid=!t);this._handleValue(e)},_onIronInputValidate:function(e){this.invalid=this._inputElement.invalid},_invalidChanged:function(){this._addons&&this.updateAddons({invalid:this.invalid})},updateAddons:function(e){for(var t,n=0;t=this._addons[n];n++)t.update(e)},_computeInputContentClass:function(e,t,n,i,a){var r="input-content";if(e)a&&(r+=" label-is-hidden"),i&&(r+=" is-invalid");else{var s=this.querySelector("label");t||a?(r+=" label-is-floating",this.$.labelAndInputContainer.style.position="static",i?r+=" is-invalid":n&&(r+=" label-is-highlighted")):(s&&(this.$.labelAndInputContainer.style.position="relative"),i&&(r+=" is-invalid"))}return n&&(r+=" focused"),r},_computeUnderlineClass:function(e,t){var n="underline";return t?n+=" is-invalid":e&&(n+=" is-highlighted"),n},_computeAddOnContentClass:function(e,t){var n="add-on-content";return t?n+=" is-invalid":e&&(n+=" is-highlighted"),n}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: inline-block;
        visibility: hidden;

        color: var(--paper-input-container-invalid-color, var(--error-color));

        @apply --paper-font-caption;
        @apply --paper-input-error;
        position: absolute;
        left:0;
        right:0;
      }

      :host([invalid]) {
        visibility: visible;
      };
    </style>

    <slot></slot>
`,is:"paper-input-error",behaviors:[pt],properties:{invalid:{readOnly:!0,reflectToAttribute:!0,type:Boolean}},update:function(e){this._setInvalid(e.invalid)}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const gt={properties:{name:{type:String},value:{notify:!0,type:String},required:{type:Boolean,value:!1}},attached:function(){},detached:function(){}};n(33);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const ft={NextLabelID:1,NextAddonID:1,NextInputID:1},mt={properties:{label:{type:String},value:{notify:!0,type:String},disabled:{type:Boolean,value:!1},invalid:{type:Boolean,value:!1,notify:!0},allowedPattern:{type:String},type:{type:String},list:{type:String},pattern:{type:String},required:{type:Boolean,value:!1},errorMessage:{type:String},charCounter:{type:Boolean,value:!1},noLabelFloat:{type:Boolean,value:!1},alwaysFloatLabel:{type:Boolean,value:!1},autoValidate:{type:Boolean,value:!1},validator:{type:String},autocomplete:{type:String,value:"off"},autofocus:{type:Boolean,observer:"_autofocusChanged"},inputmode:{type:String},minlength:{type:Number},maxlength:{type:Number},min:{type:String},max:{type:String},step:{type:String},name:{type:String},placeholder:{type:String,value:""},readonly:{type:Boolean,value:!1},size:{type:Number},autocapitalize:{type:String,value:"none"},autocorrect:{type:String,value:"off"},autosave:{type:String},results:{type:Number},accept:{type:String},multiple:{type:Boolean},_ariaDescribedBy:{type:String,value:""},_ariaLabelledBy:{type:String,value:""},_inputId:{type:String,value:""}},listeners:{"addon-attached":"_onAddonAttached"},keyBindings:{"shift+tab:keydown":"_onShiftTabDown"},hostAttributes:{tabindex:0},get inputElement(){return this.$||(this.$={}),this.$.input||(this._generateInputId(),this.$.input=this.$$("#"+this._inputId)),this.$.input},get _focusableElement(){return this.inputElement},created:function(){this._typesThatHaveText=["date","datetime","datetime-local","month","time","week","file"]},attached:function(){this._updateAriaLabelledBy(),!Ye.a&&this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.inputElement.type)&&(this.alwaysFloatLabel=!0)},_appendStringWithSpace:function(e,t){return e=e?e+" "+t:t},_onAddonAttached:function(e){var t=Object(we.a)(e).rootTarget;if(t.id)this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,t.id);else{var n="paper-input-add-on-"+ft.NextAddonID++;t.id=n,this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,n)}},validate:function(){return this.inputElement.validate()},_focusBlurHandler:function(e){ze._focusBlurHandler.call(this,e),this.focused&&!this._shiftTabPressed&&this._focusableElement&&this._focusableElement.focus()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");this._shiftTabPressed=!0,this.setAttribute("tabindex","-1"),this.async(function(){this.setAttribute("tabindex",t),this._shiftTabPressed=!1},1)},_handleAutoValidate:function(){this.autoValidate&&this.validate()},updateValueAndPreserveCaret:function(e){try{var t=this.inputElement.selectionStart;this.value=e,this.inputElement.selectionStart=t,this.inputElement.selectionEnd=t}catch(t){this.value=e}},_computeAlwaysFloatLabel:function(e,t){return t||e},_updateAriaLabelledBy:function(){var e,t=Object(we.a)(this.root).querySelector("label");t?(t.id?e=t.id:(e="paper-input-label-"+ft.NextLabelID++,t.id=e),this._ariaLabelledBy=e):this._ariaLabelledBy=""},_generateInputId:function(){this._inputId&&""!==this._inputId||(this._inputId="input-"+ft.NextInputID++)},_onChange:function(e){this.shadowRoot&&this.fire(e.type,{sourceEvent:e},{node:this,bubbles:e.bubbles,cancelable:e.cancelable})},_autofocusChanged:function(){if(this.autofocus&&this._focusableElement){var e=document.activeElement;e instanceof HTMLElement&&e!==document.body&&e!==document.documentElement||this._focusableElement.focus()}}},vt=[ze,Re,mt];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(ye.a)({is:"paper-input",_template:le["a"]`
    <style>
      :host {
        display: block;
      }

      :host([focused]) {
        outline: none;
      }

      :host([hidden]) {
        display: none !important;
      }

      input {
        /* Firefox sets a min-width on the input, which can cause layout issues */
        min-width: 0;
      }

      /* In 1.x, the <input> is distributed to paper-input-container, which styles it.
      In 2.x the <iron-input> is distributed to paper-input-container, which styles
      it, but in order for this to work correctly, we need to reset some
      of the native input's properties to inherit (from the iron-input) */
      iron-input > input {
        @apply --paper-input-container-shared-input-style;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        word-spacing: inherit;
        line-height: inherit;
        text-shadow: inherit;
        color: inherit;
        cursor: inherit;
      }

      input:disabled {
        @apply --paper-input-container-input-disabled;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        @apply --paper-input-container-input-webkit-spinner;
      }

      input::-webkit-clear-button {
        @apply --paper-input-container-input-webkit-clear;
      }

      input::-webkit-calendar-picker-indicator {
        @apply --paper-input-container-input-webkit-calendar-picker-indicator;
      }

      input::-webkit-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input:-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-ms-clear {
        @apply --paper-input-container-ms-clear;
      }

      input::-ms-reveal {
        @apply --paper-input-container-ms-reveal;
      }

      input:-ms-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      label {
        pointer-events: none;
      }
    </style>

    <paper-input-container id="container" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate\$="[[autoValidate]]" disabled\$="[[disabled]]" invalid="[[invalid]]">

      <slot name="prefix" slot="prefix"></slot>

      <label hidden\$="[[!label]]" aria-hidden="true" for\$="[[_inputId]]" slot="label">[[label]]</label>

      <!-- Need to bind maxlength so that the paper-input-char-counter works correctly -->
      <iron-input bind-value="{{value}}" slot="input" class="input-element" id\$="[[_inputId]]" maxlength\$="[[maxlength]]" allowed-pattern="[[allowedPattern]]" invalid="{{invalid}}" validator="[[validator]]">
        <input aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" disabled\$="[[disabled]]" title\$="[[title]]" type\$="[[type]]" pattern\$="[[pattern]]" required\$="[[required]]" autocomplete\$="[[autocomplete]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" minlength\$="[[minlength]]" maxlength\$="[[maxlength]]" min\$="[[min]]" max\$="[[max]]" step\$="[[step]]" name\$="[[name]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" list\$="[[list]]" size\$="[[size]]" autocapitalize\$="[[autocapitalize]]" autocorrect\$="[[autocorrect]]" on-change="_onChange" tabindex\$="[[tabIndex]]" autosave\$="[[autosave]]" results\$="[[results]]" accept\$="[[accept]]" multiple\$="[[multiple]]">
      </iron-input>

      <slot name="suffix" slot="suffix"></slot>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

      <template is="dom-if" if="[[charCounter]]">
        <paper-input-char-counter slot="add-on"></paper-input-char-counter>
      </template>

    </paper-input-container>
  `,behaviors:[vt,gt],properties:{value:{type:String}},get _focusableElement(){return this.inputElement._inputElement},listeners:{"iron-input-ready":"_onIronInputReady"},_onIronInputReady:function(){this.$.nativeInput||(this.$.nativeInput=this.$$("input")),this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.$.nativeInput.type)&&(this.alwaysFloatLabel=!0),this.inputElement.bindValue&&this.$.container._handleValueAndAutoValidate(this.inputElement)}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        border: 1px solid;
        padding: 2px;
        -moz-appearance: textarea;
        -webkit-appearance: textarea;
        overflow: hidden;
      }

      .mirror-text {
        visibility: hidden;
        word-wrap: break-word;
        @apply --iron-autogrow-textarea;
      }

      .fit {
        @apply --layout-fit;
      }

      textarea {
        position: relative;
        outline: none;
        border: none;
        resize: none;
        background: inherit;
        color: inherit;
        /* see comments in template */
        width: 100%;
        height: 100%;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
        text-align: inherit;
        @apply --iron-autogrow-textarea;
      }

      textarea::-webkit-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea::-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-ms-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }
    </style>

    <!-- the mirror sizes the input/textarea so it grows with typing -->
    <!-- use &#160; instead &nbsp; of to allow this element to be used in XHTML -->
    <div id="mirror" class="mirror-text" aria-hidden="true">&nbsp;</div>

    <!-- size the input/textarea with a div, because the textarea has intrinsic size in ff -->
    <div class="textarea-container fit">
      <textarea id="textarea" name\$="[[name]]" aria-label\$="[[label]]" autocomplete\$="[[autocomplete]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" required\$="[[required]]" disabled\$="[[disabled]]" rows\$="[[rows]]" minlength\$="[[minlength]]" maxlength\$="[[maxlength]]"></textarea>
    </div>
`,is:"iron-autogrow-textarea",behaviors:[dt,ze],properties:{value:{observer:"_valueChanged",type:String,notify:!0},bindValue:{observer:"_bindValueChanged",type:String,notify:!0},rows:{type:Number,value:1,observer:"_updateCached"},maxRows:{type:Number,value:0,observer:"_updateCached"},autocomplete:{type:String,value:"off"},autofocus:{type:Boolean,value:!1},inputmode:{type:String},placeholder:{type:String},readonly:{type:String},required:{type:Boolean},minlength:{type:Number},maxlength:{type:Number},label:{type:String}},listeners:{input:"_onInput"},get textarea(){return this.$.textarea},get selectionStart(){return this.$.textarea.selectionStart},get selectionEnd(){return this.$.textarea.selectionEnd},set selectionStart(e){this.$.textarea.selectionStart=e},set selectionEnd(e){this.$.textarea.selectionEnd=e},attached:function(){navigator.userAgent.match(/iP(?:[oa]d|hone)/)&&(this.$.textarea.style.marginLeft="-3px")},validate:function(){var e=this.$.textarea.validity.valid;return e&&(this.required&&""===this.value?e=!1:this.hasValidator()&&(e=dt.validate.call(this,this.value))),this.invalid=!e,this.fire("iron-input-validate"),e},_bindValueChanged:function(e){this.value=e},_valueChanged:function(e){var t=this.textarea;t&&(t.value!==e&&(t.value=e||0===e?e:""),this.bindValue=e,this.$.mirror.innerHTML=this._valueForMirror(),this.fire("bind-value-changed",{value:this.bindValue}))},_onInput:function(e){var t=Object(we.a)(e).path;this.value=t?t[0].value:e.target.value},_constrain:function(e){var t;for(e=e||[""],t=this.maxRows>0&&e.length>this.maxRows?e.slice(0,this.maxRows):e.slice(0);this.rows>0&&t.length<this.rows;)t.push("");return t.join("<br/>")+"&#160;"},_valueForMirror:function(){var e=this.textarea;if(e)return this.tokens=e&&e.value?e.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this._constrain(this.tokens)},_updateCached:function(){this.$.mirror.innerHTML=this._constrain(this.tokens)}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }

      label {
        pointer-events: none;
      }
    </style>

    <paper-input-container no-label-float\$="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate\$="[[autoValidate]]" disabled\$="[[disabled]]" invalid="[[invalid]]">

      <label hidden\$="[[!label]]" aria-hidden="true" for\$="[[_inputId]]" slot="label">[[label]]</label>

      <iron-autogrow-textarea class="paper-input-input" slot="input" id\$="[[_inputId]]" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" bind-value="{{value}}" invalid="{{invalid}}" validator\$="[[validator]]" disabled\$="[[disabled]]" autocomplete\$="[[autocomplete]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" name\$="[[name]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" required\$="[[required]]" minlength\$="[[minlength]]" maxlength\$="[[maxlength]]" autocapitalize\$="[[autocapitalize]]" rows\$="[[rows]]" max-rows\$="[[maxRows]]" on-change="_onChange"></iron-autogrow-textarea>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

      <template is="dom-if" if="[[charCounter]]">
        <paper-input-char-counter slot="add-on"></paper-input-char-counter>
      </template>

    </paper-input-container>
`,is:"paper-textarea",behaviors:[vt,gt],properties:{_ariaLabelledBy:{observer:"_ariaLabelledByChanged",type:String},_ariaDescribedBy:{observer:"_ariaDescribedByChanged",type:String},value:{type:String},rows:{type:Number,value:1},maxRows:{type:Number,value:0}},get selectionStart(){return this.$.input.textarea.selectionStart},set selectionStart(e){this.$.input.textarea.selectionStart=e},get selectionEnd(){return this.$.input.textarea.selectionEnd},set selectionEnd(e){this.$.input.textarea.selectionEnd=e},_ariaLabelledByChanged:function(e){this._focusableElement.setAttribute("aria-labelledby",e)},_ariaDescribedByChanged:function(e){this._focusableElement.setAttribute("aria-describedby",e)},get _focusableElement(){return this.inputElement.textarea}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const yt={properties:{sizingTarget:{type:Object,value:function(){return this}},fitInto:{type:Object,value:window},noOverlap:{type:Boolean},positionTarget:{type:Element},horizontalAlign:{type:String},verticalAlign:{type:String},dynamicAlign:{type:Boolean},horizontalOffset:{type:Number,value:0,notify:!0},verticalOffset:{type:Number,value:0,notify:!0},autoFitOnAttach:{type:Boolean,value:!1},_fitInfo:{type:Object}},get _fitWidth(){return this.fitInto===window?this.fitInto.innerWidth:this.fitInto.getBoundingClientRect().width},get _fitHeight(){return this.fitInto===window?this.fitInto.innerHeight:this.fitInto.getBoundingClientRect().height},get _fitLeft(){return this.fitInto===window?0:this.fitInto.getBoundingClientRect().left},get _fitTop(){return this.fitInto===window?0:this.fitInto.getBoundingClientRect().top},get _defaultPositionTarget(){var e=Object(we.a)(this).parentNode;return e&&e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(e=e.host),e},get _localeHorizontalAlign(){if(this._isRTL){if("right"===this.horizontalAlign)return"left";if("left"===this.horizontalAlign)return"right"}return this.horizontalAlign},get __shouldPosition(){return(this.horizontalAlign||this.verticalAlign)&&this.positionTarget},attached:function(){void 0===this._isRTL&&(this._isRTL="rtl"==window.getComputedStyle(this).direction),this.positionTarget=this.positionTarget||this._defaultPositionTarget,this.autoFitOnAttach&&("none"===window.getComputedStyle(this).display?setTimeout(function(){this.fit()}.bind(this)):(window.ShadyDOM&&ShadyDOM.flush(),this.fit()))},detached:function(){this.__deferredFit&&(clearTimeout(this.__deferredFit),this.__deferredFit=null)},fit:function(){this.position(),this.constrain(),this.center()},_discoverInfo:function(){if(!this._fitInfo){var e=window.getComputedStyle(this),t=window.getComputedStyle(this.sizingTarget);this._fitInfo={inlineStyle:{top:this.style.top||"",left:this.style.left||"",position:this.style.position||""},sizerInlineStyle:{maxWidth:this.sizingTarget.style.maxWidth||"",maxHeight:this.sizingTarget.style.maxHeight||"",boxSizing:this.sizingTarget.style.boxSizing||""},positionedBy:{vertically:"auto"!==e.top?"top":"auto"!==e.bottom?"bottom":null,horizontally:"auto"!==e.left?"left":"auto"!==e.right?"right":null},sizedBy:{height:"none"!==t.maxHeight,width:"none"!==t.maxWidth,minWidth:parseInt(t.minWidth,10)||0,minHeight:parseInt(t.minHeight,10)||0},margin:{top:parseInt(e.marginTop,10)||0,right:parseInt(e.marginRight,10)||0,bottom:parseInt(e.marginBottom,10)||0,left:parseInt(e.marginLeft,10)||0}}}},resetFit:function(){var e=this._fitInfo||{};for(var t in e.sizerInlineStyle)this.sizingTarget.style[t]=e.sizerInlineStyle[t];for(var t in e.inlineStyle)this.style[t]=e.inlineStyle[t];this._fitInfo=null},refit:function(){var e=this.sizingTarget.scrollLeft,t=this.sizingTarget.scrollTop;this.resetFit(),this.fit(),this.sizingTarget.scrollLeft=e,this.sizingTarget.scrollTop=t},position:function(){if(this.__shouldPosition){this._discoverInfo(),this.style.position="fixed",this.sizingTarget.style.boxSizing="border-box",this.style.left="0px",this.style.top="0px";var e=this.getBoundingClientRect(),t=this.__getNormalizedRect(this.positionTarget),n=this.__getNormalizedRect(this.fitInto),i=this._fitInfo.margin,a={width:e.width+i.left+i.right,height:e.height+i.top+i.bottom},r=this.__getPosition(this._localeHorizontalAlign,this.verticalAlign,a,e,t,n),s=r.left+i.left,o=r.top+i.top,l=Math.min(n.right-i.right,s+e.width),h=Math.min(n.bottom-i.bottom,o+e.height);s=Math.max(n.left+i.left,Math.min(s,l-this._fitInfo.sizedBy.minWidth)),o=Math.max(n.top+i.top,Math.min(o,h-this._fitInfo.sizedBy.minHeight)),this.sizingTarget.style.maxWidth=Math.max(l-s,this._fitInfo.sizedBy.minWidth)+"px",this.sizingTarget.style.maxHeight=Math.max(h-o,this._fitInfo.sizedBy.minHeight)+"px",this.style.left=s-e.left+"px",this.style.top=o-e.top+"px"}},constrain:function(){if(!this.__shouldPosition){this._discoverInfo();var e=this._fitInfo;e.positionedBy.vertically||(this.style.position="fixed",this.style.top="0px"),e.positionedBy.horizontally||(this.style.position="fixed",this.style.left="0px"),this.sizingTarget.style.boxSizing="border-box";var t=this.getBoundingClientRect();e.sizedBy.height||this.__sizeDimension(t,e.positionedBy.vertically,"top","bottom","Height"),e.sizedBy.width||this.__sizeDimension(t,e.positionedBy.horizontally,"left","right","Width")}},_sizeDimension:function(e,t,n,i,a){this.__sizeDimension(e,t,n,i,a)},__sizeDimension:function(e,t,n,i,a){var r=this._fitInfo,s=this.__getNormalizedRect(this.fitInto),o="Width"===a?s.width:s.height,l=t===i,h=l?o-e[i]:e[n],c=r.margin[l?n:i],d="offset"+a,p=this[d]-this.sizingTarget[d];this.sizingTarget.style["max"+a]=o-c-h-p+"px"},center:function(){if(!this.__shouldPosition){this._discoverInfo();var e=this._fitInfo.positionedBy;if(!e.vertically||!e.horizontally){this.style.position="fixed",e.vertically||(this.style.top="0px"),e.horizontally||(this.style.left="0px");var t=this.getBoundingClientRect(),n=this.__getNormalizedRect(this.fitInto);if(!e.vertically){var i=n.top-t.top+(n.height-t.height)/2;this.style.top=i+"px"}if(!e.horizontally){var a=n.left-t.left+(n.width-t.width)/2;this.style.left=a+"px"}}}},__getNormalizedRect:function(e){return e===document.documentElement||e===window?{top:0,left:0,width:window.innerWidth,height:window.innerHeight,right:window.innerWidth,bottom:window.innerHeight}:e.getBoundingClientRect()},__getOffscreenArea:function(e,t,n){var i=Math.min(0,e.top)+Math.min(0,n.bottom-(e.top+t.height)),a=Math.min(0,e.left)+Math.min(0,n.right-(e.left+t.width));return Math.abs(i)*t.width+Math.abs(a)*t.height},__getPosition:function(e,t,n,i,a,r){var s,o=[{verticalAlign:"top",horizontalAlign:"left",top:a.top+this.verticalOffset,left:a.left+this.horizontalOffset},{verticalAlign:"top",horizontalAlign:"right",top:a.top+this.verticalOffset,left:a.right-n.width-this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"left",top:a.bottom-n.height-this.verticalOffset,left:a.left+this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"right",top:a.bottom-n.height-this.verticalOffset,left:a.right-n.width-this.horizontalOffset}];if(this.noOverlap){for(var l=0,h=o.length;l<h;l++){var c={};for(var d in o[l])c[d]=o[l][d];o.push(c)}o[0].top=o[1].top+=a.height,o[2].top=o[3].top-=a.height,o[4].left=o[6].left+=a.width,o[5].left=o[7].left-=a.width}t="auto"===t?null:t,(e="auto"===e?null:e)&&"center"!==e||(o.push({verticalAlign:"top",horizontalAlign:"center",top:a.top+this.verticalOffset+(this.noOverlap?a.height:0),left:a.left-i.width/2+a.width/2+this.horizontalOffset}),o.push({verticalAlign:"bottom",horizontalAlign:"center",top:a.bottom-n.height-this.verticalOffset-(this.noOverlap?a.height:0),left:a.left-i.width/2+a.width/2+this.horizontalOffset})),t&&"middle"!==t||(o.push({verticalAlign:"middle",horizontalAlign:"left",top:a.top-i.height/2+a.height/2+this.verticalOffset,left:a.left+this.horizontalOffset+(this.noOverlap?a.width:0)}),o.push({verticalAlign:"middle",horizontalAlign:"right",top:a.top-i.height/2+a.height/2+this.verticalOffset,left:a.right-n.width-this.horizontalOffset-(this.noOverlap?a.width:0)})),"middle"===t&&"center"===e&&o.push({verticalAlign:"middle",horizontalAlign:"center",top:a.top-i.height/2+a.height/2+this.verticalOffset,left:a.left-i.width/2+a.width/2+this.horizontalOffset});for(l=0;l<o.length;l++){var p=o[l],u=p.verticalAlign===t,g=p.horizontalAlign===e;if(!this.dynamicAlign&&!this.noOverlap&&u&&g){s=p;break}var f=(!t||u)&&(!e||g);if(this.dynamicAlign||f){if(p.offscreenArea=this.__getOffscreenArea(p,n,r),0===p.offscreenArea&&f){s=p;break}s=s||p;var m=p.offscreenArea-s.offscreenArea;(m<0||0===m&&(u||g))&&(s=p)}}return s}};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var bt=Element.prototype,_t=bt.matches||bt.matchesSelector||bt.mozMatchesSelector||bt.msMatchesSelector||bt.oMatchesSelector||bt.webkitMatchesSelector;const wt={getTabbableNodes:function(e){var t=[];return this._collectTabbableNodes(e,t)?this._sortByTabIndex(t):t},isFocusable:function(e){return _t.call(e,"input, select, textarea, button, object")?_t.call(e,":not([disabled])"):_t.call(e,"a[href], area[href], iframe, [tabindex], [contentEditable]")},isTabbable:function(e){return this.isFocusable(e)&&_t.call(e,':not([tabindex="-1"])')&&this._isVisible(e)},_normalizedTabIndex:function(e){if(this.isFocusable(e)){var t=e.getAttribute("tabindex")||0;return Number(t)}return-1},_collectTabbableNodes:function(e,t){if(e.nodeType!==Node.ELEMENT_NODE||!this._isVisible(e))return!1;var n,i=e,a=this._normalizedTabIndex(i),r=a>0;a>=0&&t.push(i),n="content"===i.localName||"slot"===i.localName?Object(we.a)(i).getDistributedNodes():Object(we.a)(i.root||i).children;for(var s=0;s<n.length;s++)r=this._collectTabbableNodes(n[s],t)||r;return r},_isVisible:function(e){var t=e.style;return"hidden"!==t.visibility&&"none"!==t.display&&("hidden"!==(t=window.getComputedStyle(e)).visibility&&"none"!==t.display)},_sortByTabIndex:function(e){var t=e.length;if(t<2)return e;var n=Math.ceil(t/2),i=this._sortByTabIndex(e.slice(0,n)),a=this._sortByTabIndex(e.slice(n));return this._mergeSortByTabIndex(i,a)},_mergeSortByTabIndex:function(e,t){for(var n=[];e.length>0&&t.length>0;)this._hasLowerTabOrder(e[0],t[0])?n.push(t.shift()):n.push(e.shift());return n.concat(e,t)},_hasLowerTabOrder:function(e,t){var n=Math.max(e.tabIndex,0),i=Math.max(t.tabIndex,0);return 0===n||0===i?i>n:n>i}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--iron-overlay-backdrop-background-color, #000);
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
        @apply --iron-overlay-backdrop;
      }

      :host(.opened) {
        opacity: var(--iron-overlay-backdrop-opacity, 0.6);
        pointer-events: auto;
        @apply --iron-overlay-backdrop-opened;
      }
    </style>

    <slot></slot>
`,is:"iron-overlay-backdrop",properties:{opened:{reflectToAttribute:!0,type:Boolean,value:!1,observer:"_openedChanged"}},listeners:{transitionend:"_onTransitionend"},created:function(){this.__openedRaf=null},attached:function(){this.opened&&this._openedChanged(this.opened)},prepare:function(){this.opened&&!this.parentNode&&Object(we.a)(document.body).appendChild(this)},open:function(){this.opened=!0},close:function(){this.opened=!1},complete:function(){this.opened||this.parentNode!==document.body||Object(we.a)(this.parentNode).removeChild(this)},_onTransitionend:function(e){e&&e.target===this&&this.complete()},_openedChanged:function(e){if(e)this.prepare();else{var t=window.getComputedStyle(this);"0s"!==t.transitionDuration&&0!=t.opacity||this.complete()}this.isAttached&&(this.__openedRaf&&(window.cancelAnimationFrame(this.__openedRaf),this.__openedRaf=null),this.scrollTop=this.scrollTop,this.__openedRaf=window.requestAnimationFrame(function(){this.__openedRaf=null,this.toggleClass("opened",this.opened)}.bind(this)))}});var xt=n(29);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const kt=function(){this._overlays=[],this._minimumZ=101,this._backdropElement=null,xt.a(document.documentElement,"tap",function(){}),document.addEventListener("tap",this._onCaptureClick.bind(this),!0),document.addEventListener("focus",this._onCaptureFocus.bind(this),!0),document.addEventListener("keydown",this._onCaptureKeyDown.bind(this),!0)};kt.prototype={constructor:kt,get backdropElement(){return this._backdropElement||(this._backdropElement=document.createElement("iron-overlay-backdrop")),this._backdropElement},get deepActiveElement(){var e=document.activeElement;for(e&&e instanceof Element!=!1||(e=document.body);e.root&&Object(we.a)(e.root).activeElement;)e=Object(we.a)(e.root).activeElement;return e},_bringOverlayAtIndexToFront:function(e){var t=this._overlays[e];if(t){var n=this._overlays.length-1,i=this._overlays[n];if(i&&this._shouldBeBehindOverlay(t,i)&&n--,!(e>=n)){var a=Math.max(this.currentOverlayZ(),this._minimumZ);for(this._getZ(t)<=a&&this._applyOverlayZ(t,a);e<n;)this._overlays[e]=this._overlays[e+1],e++;this._overlays[n]=t}}},addOrRemoveOverlay:function(e){e.opened?this.addOverlay(e):this.removeOverlay(e)},addOverlay:function(e){var t=this._overlays.indexOf(e);if(t>=0)return this._bringOverlayAtIndexToFront(t),void this.trackBackdrop();var n=this._overlays.length,i=this._overlays[n-1],a=Math.max(this._getZ(i),this._minimumZ),r=this._getZ(e);if(i&&this._shouldBeBehindOverlay(e,i)){this._applyOverlayZ(i,a),n--;var s=this._overlays[n-1];a=Math.max(this._getZ(s),this._minimumZ)}r<=a&&this._applyOverlayZ(e,a),this._overlays.splice(n,0,e),this.trackBackdrop()},removeOverlay:function(e){var t=this._overlays.indexOf(e);-1!==t&&(this._overlays.splice(t,1),this.trackBackdrop())},currentOverlay:function(){var e=this._overlays.length-1;return this._overlays[e]},currentOverlayZ:function(){return this._getZ(this.currentOverlay())},ensureMinimumZ:function(e){this._minimumZ=Math.max(this._minimumZ,e)},focusOverlay:function(){var e=this.currentOverlay();e&&e._applyFocus()},trackBackdrop:function(){var e=this._overlayWithBackdrop();(e||this._backdropElement)&&(this.backdropElement.style.zIndex=this._getZ(e)-1,this.backdropElement.opened=!!e,this.backdropElement.prepare())},getBackdrops:function(){for(var e=[],t=0;t<this._overlays.length;t++)this._overlays[t].withBackdrop&&e.push(this._overlays[t]);return e},backdropZ:function(){return this._getZ(this._overlayWithBackdrop())-1},_overlayWithBackdrop:function(){for(var e=this._overlays.length-1;e>=0;e--)if(this._overlays[e].withBackdrop)return this._overlays[e]},_getZ:function(e){var t=this._minimumZ;if(e){var n=Number(e.style.zIndex||window.getComputedStyle(e).zIndex);n==n&&(t=n)}return t},_setZ:function(e,t){e.style.zIndex=t},_applyOverlayZ:function(e,t){this._setZ(e,t+2)},_overlayInPath:function(e){e=e||[];for(var t=0;t<e.length;t++)if(e[t]._manager===this)return e[t]},_onCaptureClick:function(e){var t=this._overlays.length-1;if(-1!==t)for(var n,i=Object(we.a)(e).path;(n=this._overlays[t])&&this._overlayInPath(i)!==n&&(n._onCaptureClick(e),n.allowClickThrough);)t--},_onCaptureFocus:function(e){var t=this.currentOverlay();t&&t._onCaptureFocus(e)},_onCaptureKeyDown:function(e){var t=this.currentOverlay();t&&(Re.keyboardEventMatchesKeys(e,"esc")?t._onCaptureEsc(e):Re.keyboardEventMatchesKeys(e,"tab")&&t._onCaptureTab(e))},_shouldBeBehindOverlay:function(e,t){return!e.alwaysOnTop&&t.alwaysOnTop}};const zt=new kt;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var St,At,Ct={pageX:0,pageY:0},Et=null,Mt=[],Pt=["wheel","mousewheel","DOMMouseScroll","touchstart","touchmove"];function Ot(e){Lt.indexOf(e)>=0||(0===Lt.length&&function(){St=St||function(e){e.cancelable&&function(e){var t=Object(we.a)(e).rootTarget;"touchmove"!==e.type&&Et!==t&&(Et=t,Mt=function(e){for(var t=[],n=e.indexOf(At),i=0;i<=n;i++)if(e[i].nodeType===Node.ELEMENT_NODE){var a=e[i],r=a.style;"scroll"!==r.overflow&&"auto"!==r.overflow&&(r=window.getComputedStyle(a)),"scroll"!==r.overflow&&"auto"!==r.overflow||t.push(a)}return t}(Object(we.a)(e).path));if(!Mt.length)return!0;if("touchstart"===e.type)return!1;var n=function(e){var t={deltaX:e.deltaX,deltaY:e.deltaY};if("deltaX"in e);else if("wheelDeltaX"in e&&"wheelDeltaY"in e)t.deltaX=-e.wheelDeltaX,t.deltaY=-e.wheelDeltaY;else if("wheelDelta"in e)t.deltaX=0,t.deltaY=-e.wheelDelta;else if("axis"in e)t.deltaX=1===e.axis?e.detail:0,t.deltaY=2===e.axis?e.detail:0;else if(e.targetTouches){var n=e.targetTouches[0];t.deltaX=Ct.pageX-n.pageX,t.deltaY=Ct.pageY-n.pageY}return t}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/(e);return!function(e,t,n){if(!t&&!n)return;for(var i=Math.abs(n)>=Math.abs(t),a=0;a<e.length;a++){var r=e[a];if(i?n<0?r.scrollTop>0:r.scrollTop<r.scrollHeight-r.clientHeight:t<0?r.scrollLeft>0:r.scrollLeft<r.scrollWidth-r.clientWidth)return r}}(Mt,n.deltaX,n.deltaY)}(e)&&e.preventDefault();if(e.targetTouches){var t=e.targetTouches[0];Ct.pageX=t.pageX,Ct.pageY=t.pageY}}.bind(void 0);for(var e=0,t=Pt.length;e<t;e++)document.addEventListener(Pt[e],St,{capture:!0,passive:!1})}(),Lt.push(e),At=Lt[Lt.length-1],Ht=[],It=[])}function Tt(e){var t=Lt.indexOf(e);-1!==t&&(Lt.splice(t,1),At=Lt[Lt.length-1],Ht=[],It=[],0===Lt.length&&function(){for(var e=0,t=Pt.length;e<t;e++)document.removeEventListener(Pt[e],St,{capture:!0,passive:!1})}())}const Lt=[];let Ht=null,It=null;const Vt={properties:{opened:{observer:"_openedChanged",type:Boolean,value:!1,notify:!0},canceled:{observer:"_canceledChanged",readOnly:!0,type:Boolean,value:!1},withBackdrop:{observer:"_withBackdropChanged",type:Boolean},noAutoFocus:{type:Boolean,value:!1},noCancelOnEscKey:{type:Boolean,value:!1},noCancelOnOutsideClick:{type:Boolean,value:!1},closingReason:{type:Object},restoreFocusOnClose:{type:Boolean,value:!1},allowClickThrough:{type:Boolean},alwaysOnTop:{type:Boolean},scrollAction:{type:String},_manager:{type:Object,value:zt},_focusedChild:{type:Object}},listeners:{"iron-resize":"_onIronResize"},observers:["__updateScrollObservers(isAttached, opened, scrollAction)"],get backdropElement(){return this._manager.backdropElement},get _focusNode(){return this._focusedChild||Object(we.a)(this).querySelector("[autofocus]")||this},get _focusableNodes(){return wt.getTabbableNodes(this)},ready:function(){this.__isAnimating=!1,this.__shouldRemoveTabIndex=!1,this.__firstFocusableNode=this.__lastFocusableNode=null,this.__rafs={},this.__restoreFocusNode=null,this.__scrollTop=this.__scrollLeft=null,this.__onCaptureScroll=this.__onCaptureScroll.bind(this),this.__rootNodes=null,this._ensureSetup()},attached:function(){this.opened&&this._openedChanged(this.opened),this._observer=Object(we.a)(this).observeNodes(this._onNodesChange)},detached:function(){for(var e in Object(we.a)(this).unobserveNodes(this._observer),this._observer=null,this.__rafs)null!==this.__rafs[e]&&cancelAnimationFrame(this.__rafs[e]);this.__rafs={},this._manager.removeOverlay(this),this.__isAnimating&&(this.opened?this._finishRenderOpened():(this._applyFocus(),this._finishRenderClosed()))},toggle:function(){this._setCanceled(!1),this.opened=!this.opened},open:function(){this._setCanceled(!1),this.opened=!0},close:function(){this._setCanceled(!1),this.opened=!1},cancel:function(e){this.fire("iron-overlay-canceled",e,{cancelable:!0}).defaultPrevented||(this._setCanceled(!0),this.opened=!1)},invalidateTabbables:function(){this.__firstFocusableNode=this.__lastFocusableNode=null},_ensureSetup:function(){this._overlaySetup||(this._overlaySetup=!0,this.style.outline="none",this.style.display="none")},_openedChanged:function(e){e?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true"),this.isAttached&&(this.__isAnimating=!0,this.__deraf("__openedChanged",this.__openedChanged))},_canceledChanged:function(){this.closingReason=this.closingReason||{},this.closingReason.canceled=this.canceled},_withBackdropChanged:function(){this.withBackdrop&&!this.hasAttribute("tabindex")?(this.setAttribute("tabindex","-1"),this.__shouldRemoveTabIndex=!0):this.__shouldRemoveTabIndex&&(this.removeAttribute("tabindex"),this.__shouldRemoveTabIndex=!1),this.opened&&this.isAttached&&this._manager.trackBackdrop()},_prepareRenderOpened:function(){this.__restoreFocusNode=this._manager.deepActiveElement,this._preparePositioning(),this.refit(),this._finishPositioning(),this.noAutoFocus&&document.activeElement===this._focusNode&&(this._focusNode.blur(),this.__restoreFocusNode.focus())},_renderOpened:function(){this._finishRenderOpened()},_renderClosed:function(){this._finishRenderClosed()},_finishRenderOpened:function(){this.notifyResize(),this.__isAnimating=!1,this.fire("iron-overlay-opened")},_finishRenderClosed:function(){this.style.display="none",this.style.zIndex="",this.notifyResize(),this.__isAnimating=!1,this.fire("iron-overlay-closed",this.closingReason)},_preparePositioning:function(){this.style.transition=this.style.webkitTransition="none",this.style.transform=this.style.webkitTransform="none",this.style.display=""},_finishPositioning:function(){this.style.display="none",this.scrollTop=this.scrollTop,this.style.transition=this.style.webkitTransition="",this.style.transform=this.style.webkitTransform="",this.style.display="",this.scrollTop=this.scrollTop},_applyFocus:function(){if(this.opened)this.noAutoFocus||this._focusNode.focus();else{if(this.restoreFocusOnClose&&this.__restoreFocusNode){var e=this._manager.deepActiveElement;(e===document.body||Object(we.a)(this).deepContains(e))&&this.__restoreFocusNode.focus()}this.__restoreFocusNode=null,this._focusNode.blur(),this._focusedChild=null}},_onCaptureClick:function(e){this.noCancelOnOutsideClick||this.cancel(e)},_onCaptureFocus:function(e){if(this.withBackdrop){var t=Object(we.a)(e).path;-1===t.indexOf(this)?(e.stopPropagation(),this._applyFocus()):this._focusedChild=t[0]}},_onCaptureEsc:function(e){this.noCancelOnEscKey||this.cancel(e)},_onCaptureTab:function(e){if(this.withBackdrop){this.__ensureFirstLastFocusables();var t=e.shiftKey,n=t?this.__firstFocusableNode:this.__lastFocusableNode,i=t?this.__lastFocusableNode:this.__firstFocusableNode,a=!1;if(n===i)a=!0;else{var r=this._manager.deepActiveElement;a=r===n||r===this}a&&(e.preventDefault(),this._focusedChild=i,this._applyFocus())}},_onIronResize:function(){this.opened&&!this.__isAnimating&&this.__deraf("refit",this.refit)},_onNodesChange:function(){this.opened&&!this.__isAnimating&&(this.invalidateTabbables(),this.notifyResize())},__ensureFirstLastFocusables:function(){var e=this._focusableNodes;this.__firstFocusableNode=e[0],this.__lastFocusableNode=e[e.length-1]},__openedChanged:function(){this.opened?(this._prepareRenderOpened(),this._manager.addOverlay(this),this._applyFocus(),this._renderOpened()):(this._manager.removeOverlay(this),this._applyFocus(),this._renderClosed())},__deraf:function(e,t){var n=this.__rafs;null!==n[e]&&cancelAnimationFrame(n[e]),n[e]=requestAnimationFrame(function(){n[e]=null,t.call(this)}.bind(this))},__updateScrollObservers:function(e,t,n){e&&t&&this.__isValidScrollAction(n)?("lock"===n&&(this.__saveScrollPosition(),Ot(this)),this.__addScrollListeners()):(Tt(this),this.__removeScrollListeners())},__addScrollListeners:function(){if(!this.__rootNodes){if(this.__rootNodes=[],et.h)for(var e=this;e;)e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host&&this.__rootNodes.push(e),e=e.host||e.assignedSlot||e.parentNode;this.__rootNodes.push(document)}this.__rootNodes.forEach(function(e){e.addEventListener("scroll",this.__onCaptureScroll,{capture:!0,passive:!0})},this)},__removeScrollListeners:function(){this.__rootNodes&&this.__rootNodes.forEach(function(e){e.removeEventListener("scroll",this.__onCaptureScroll,{capture:!0,passive:!0})},this),this.isAttached||(this.__rootNodes=null)},__isValidScrollAction:function(e){return"lock"===e||"refit"===e||"cancel"===e},__onCaptureScroll:function(e){if(!(this.__isAnimating||Object(we.a)(e).path.indexOf(this)>=0))switch(this.scrollAction){case"lock":this.__restoreScrollPosition();break;case"refit":this.__deraf("refit",this.refit);break;case"cancel":this.cancel(e)}},__saveScrollPosition:function(){document.scrollingElement?(this.__scrollTop=document.scrollingElement.scrollTop,this.__scrollLeft=document.scrollingElement.scrollLeft):(this.__scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop),this.__scrollLeft=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft))},__restoreScrollPosition:function(){document.scrollingElement?(document.scrollingElement.scrollTop=this.__scrollTop,document.scrollingElement.scrollLeft=this.__scrollLeft):(document.documentElement.scrollTop=document.body.scrollTop=this.__scrollTop,document.documentElement.scrollLeft=document.body.scrollLeft=this.__scrollLeft)}},Rt=[yt,nt,Vt];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var Nt=null;Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        display: block;
        position: fixed;
        background-color: var(--paper-toast-background-color, #323232);
        color: var(--paper-toast-color, #f1f1f1);
        min-height: 48px;
        min-width: 288px;
        padding: 16px 24px;
        box-sizing: border-box;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        border-radius: 2px;
        margin: 12px;
        font-size: 14px;
        cursor: default;
        -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
        transition: transform 0.3s, opacity 0.3s;
        opacity: 0;
        -webkit-transform: translateY(100px);
        transform: translateY(100px);
        @apply --paper-font-common-base;
      }

      :host(.capsule) {
        border-radius: 24px;
      }

      :host(.fit-bottom) {
        width: 100%;
        min-width: 0;
        border-radius: 0;
        margin: 0;
      }

      :host(.paper-toast-open) {
        opacity: 1;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
      }
    </style>

    <span id="label">{{text}}</span>
    <slot></slot>
`,is:"paper-toast",behaviors:[Rt],properties:{fitInto:{type:Object,value:window,observer:"_onFitIntoChanged"},horizontalAlign:{type:String,value:"left"},verticalAlign:{type:String,value:"bottom"},duration:{type:Number,value:3e3},text:{type:String,value:""},noCancelOnOutsideClick:{type:Boolean,value:!0},noAutoFocus:{type:Boolean,value:!0}},listeners:{transitionend:"__onTransitionEnd"},get visible(){return oe.a._warn("`visible` is deprecated, use `opened` instead"),this.opened},get _canAutoClose(){return this.duration>0&&this.duration!==1/0},created:function(){this._autoClose=null,ht.requestAvailability()},show:function(e){for(var t in"string"==typeof e&&(e={text:e}),e)0===t.indexOf("_")?oe.a._warn('The property "'+t+'" is private and was not set.'):t in this?this[t]=e[t]:oe.a._warn('The property "'+t+'" is not valid.');this.open()},hide:function(){this.close()},__onTransitionEnd:function(e){e&&e.target===this&&"opacity"===e.propertyName&&(this.opened?this._finishRenderOpened():this._finishRenderClosed())},_openedChanged:function(){null!==this._autoClose&&(this.cancelAsync(this._autoClose),this._autoClose=null),this.opened?(Nt&&Nt!==this&&Nt.close(),Nt=this,this.fire("iron-announce",{text:this.text}),this._canAutoClose&&(this._autoClose=this.async(this.close,this.duration))):Nt===this&&(Nt=null),Vt._openedChanged.apply(this,arguments)},_renderOpened:function(){this.classList.add("paper-toast-open")},_renderClosed:function(){this.classList.remove("paper-toast-open")},_onFitIntoChanged:function(e){this.positionTarget=e}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const jt=le["a"]`<iron-iconset-svg name="paper-tabs" size="24">
<svg><defs>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(jt.content),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --layout-flex-auto;

        position: relative;
        padding: 0 12px;
        overflow: hidden;
        cursor: pointer;
        vertical-align: middle;

        @apply --paper-font-common-base;
        @apply --paper-tab;
      }

      :host(:focus) {
        outline: none;
      }

      :host([link]) {
        padding: 0;
      }

      .tab-content {
        height: 100%;
        transform: translateZ(0);
          -webkit-transform: translateZ(0);
        transition: opacity 0.1s cubic-bezier(0.4, 0.0, 1, 1);
        @apply --layout-horizontal;
        @apply --layout-center-center;
        @apply --layout-flex-auto;
        @apply --paper-tab-content;
      }

      :host(:not(.iron-selected)) > .tab-content {
        opacity: 0.8;

        @apply --paper-tab-content-unselected;
      }

      :host(:focus) .tab-content {
        opacity: 1;
        font-weight: 700;
      }

      paper-ripple {
        color: var(--paper-tab-ink, var(--paper-yellow-a100));
      }

      .tab-content > ::slotted(a) {
        @apply --layout-flex-auto;

        height: 100%;
      }
    </style>

    <div class="tab-content">
      <slot></slot>
    </div>
`,is:"paper-tab",behaviors:[ze,je,Fe],properties:{link:{type:Boolean,value:!1,reflectToAttribute:!0}},hostAttributes:{role:"tab"},listeners:{down:"_updateNoink",tap:"_onTap"},attached:function(){this._updateNoink()},get _parentNoink(){var e=Object(we.a)(this).parentNode;return!!e&&!!e.noink},_updateNoink:function(){this.noink=!!this.noink||!!this._parentNoink},_onTap:function(e){if(this.link){var t=this.queryEffectiveChildren("a");if(!t)return;if(e.target===t)return;t.click()}}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Bt={properties:{multi:{type:Boolean,value:!1,observer:"multiChanged"},selectedValues:{type:Array,notify:!0,value:function(){return[]}},selectedItems:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],select:function(e){this.multi?this._toggleSelected(e):this.selected=e},multiChanged:function(e){this._selection.multi=e,this._updateSelected()},get _shouldUpdateSelection(){return null!=this.selected||null!=this.selectedValues&&this.selectedValues.length},_updateAttrForSelected:function(){this.multi?this.selectedItems&&this.selectedItems.length>0&&(this.selectedValues=this.selectedItems.map(function(e){return this._indexToValue(this.indexOf(e))},this).filter(function(e){return null!=e},this)):at._updateAttrForSelected.apply(this)},_updateSelected:function(){this.multi?this._selectMulti(this.selectedValues):this._selectSelected(this.selected)},_selectMulti:function(e){e=e||[];var t=(this._valuesToItems(e)||[]).filter(function(e){return null!==e&&void 0!==e});this._selection.clear(t);for(var n=0;n<t.length;n++)this._selection.setItemSelected(t[n],!0);this.fallbackSelection&&!this._selection.get().length&&(this._valueToItem(this.fallbackSelection)&&this.select(this.fallbackSelection))},_selectionChange:function(){var e=this._selection.get();this.multi?(this._setSelectedItems(e),this._setSelectedItem(e.length?e[0]:null)):null!==e&&void 0!==e?(this._setSelectedItems([e]),this._setSelectedItem(e)):(this._setSelectedItems([]),this._setSelectedItem(null))},_toggleSelected:function(e){var t=this.selectedValues.indexOf(e);t<0?this.push("selectedValues",e):this.splice("selectedValues",t,1)},_valuesToItems:function(e){return null==e?null:e.map(function(e){return this._valueToItem(e)},this)}},Dt={properties:{focusedItem:{observer:"_focusedItemChanged",readOnly:!0,type:Object},attrForItemTitle:{type:String},disabled:{type:Boolean,value:!1,observer:"_disabledChanged"}},_MODIFIER_KEYS:["Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","OS","ScrollLock","Shift","Super","Symbol","SymbolLock"],_SEARCH_RESET_TIMEOUT_MS:1e3,_previousTabIndex:0,hostAttributes:{role:"menu"},observers:["_updateMultiselectable(multi)"],listeners:{focus:"_onFocus",keydown:"_onKeydown","iron-items-changed":"_onIronItemsChanged"},keyBindings:{up:"_onUpKey",down:"_onDownKey",esc:"_onEscKey","shift+tab:keydown":"_onShiftTabDown"},attached:function(){this._resetTabindices()},select:function(e){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null);var t=this._valueToItem(e);t&&t.hasAttribute("disabled")||(this._setFocusedItem(t),Bt.select.apply(this,arguments))},_resetTabindices:function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this.items.forEach(function(t){t.setAttribute("tabindex",t===e?"0":"-1")},this)},_updateMultiselectable:function(e){e?this.setAttribute("aria-multiselectable","true"):this.removeAttribute("aria-multiselectable")},_focusWithKeyboardEvent:function(e){if(-1===this._MODIFIER_KEYS.indexOf(e.key)){this.cancelDebouncer("_clearSearchText");for(var t,n=this._searchText||"",i=(n+=(e.key&&1==e.key.length?e.key:String.fromCharCode(e.keyCode)).toLocaleLowerCase()).length,a=0;t=this.items[a];a++)if(!t.hasAttribute("disabled")){var r=this.attrForItemTitle||"textContent",s=(t[r]||t.getAttribute(r)||"").trim();if(!(s.length<i)&&s.slice(0,i).toLocaleLowerCase()==n){this._setFocusedItem(t);break}}this._searchText=n,this.debounce("_clearSearchText",this._clearSearchText,this._SEARCH_RESET_TIMEOUT_MS)}},_clearSearchText:function(){this._searchText=""},_focusPrevious:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),n=1;n<e+1;n++){var i=this.items[(t-n+e)%e];if(!i.hasAttribute("disabled")){var a=Object(we.a)(i).getOwnerRoot()||document;if(this._setFocusedItem(i),Object(we.a)(a).activeElement==i)return}}},_focusNext:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),n=1;n<e+1;n++){var i=this.items[(t+n)%e];if(!i.hasAttribute("disabled")){var a=Object(we.a)(i).getOwnerRoot()||document;if(this._setFocusedItem(i),Object(we.a)(a).activeElement==i)return}}},_applySelection:function(e,t){t?e.setAttribute("aria-selected","true"):e.removeAttribute("aria-selected"),at._applySelection.apply(this,arguments)},_focusedItemChanged:function(e,t){t&&t.setAttribute("tabindex","-1"),!e||e.hasAttribute("disabled")||this.disabled||(e.setAttribute("tabindex","0"),e.focus())},_onIronItemsChanged:function(e){e.detail.addedNodes.length&&this._resetTabindices()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");Dt._shiftTabPressed=!0,this._setFocusedItem(null),this.setAttribute("tabindex","-1"),this.async(function(){this.setAttribute("tabindex",t),Dt._shiftTabPressed=!1},1)},_onFocus:function(e){if(!Dt._shiftTabPressed){var t=Object(we.a)(e).rootTarget;(t===this||void 0===t.tabIndex||this.isLightDescendant(t))&&(this._defaultFocusAsync=this.async(function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this._setFocusedItem(null),e?this._setFocusedItem(e):this.items[0]&&this._focusNext()}))}},_onUpKey:function(e){this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onEscKey:function(e){var t=this.focusedItem;t&&t.blur()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down esc")||this._focusWithKeyboardEvent(e),e.stopPropagation()},_activateHandler:function(e){at._activateHandler.call(this,e),e.stopPropagation()},_disabledChanged:function(e){e?(this._previousTabIndex=this.hasAttribute("tabindex")?this.tabIndex:0,this.removeAttribute("tabindex")):this.hasAttribute("tabindex")||this.setAttribute("tabindex",this._previousTabIndex)},_shiftTabPressed:!1},$t=[[[at,Bt],Re,Dt],{hostAttributes:{role:"menubar"},keyBindings:{left:"_onLeftKey",right:"_onRightKey"},_onUpKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},get _isRTL(){return"rtl"===window.getComputedStyle(this).direction},_onLeftKey:function(e){this._isRTL?this._focusNext():this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onRightKey:function(e){this._isRTL?this._focusPrevious():this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down left right esc")||this._focusWithKeyboardEvent(e)}}];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Object(ye.a)({_template:le["a"]`
    <style>
      :host {
        @apply --layout;
        @apply --layout-center;

        height: 48px;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        /* NOTE: Both values are needed, since some phones require the value to be \`transparent\`. */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        @apply --paper-tabs;
      }

      :host(:dir(rtl)) {
        @apply --layout-horizontal-reverse;
      }

      #tabsContainer {
        position: relative;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        @apply --layout-flex-auto;
        @apply --paper-tabs-container;
      }

      #tabsContent {
        height: 100%;
        -moz-flex-basis: auto;
        -ms-flex-basis: auto;
        flex-basis: auto;
        @apply --paper-tabs-content;
      }

      #tabsContent.scrollable {
        position: absolute;
        white-space: nowrap;
      }

      #tabsContent:not(.scrollable),
      #tabsContent.scrollable.fit-container {
        @apply --layout-horizontal;
      }

      #tabsContent.scrollable.fit-container {
        min-width: 100%;
      }

      #tabsContent.scrollable.fit-container > ::slotted(*) {
        /* IE - prevent tabs from compressing when they should scroll. */
        -ms-flex: 1 0 auto;
        -webkit-flex: 1 0 auto;
        flex: 1 0 auto;
      }

      .hidden {
        display: none;
      }

      .not-visible {
        opacity: 0;
        cursor: default;
      }

      paper-icon-button {
        width: 48px;
        height: 48px;
        padding: 12px;
        margin: 0 4px;
      }

      #selectionBar {
        position: absolute;
        height: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 2px solid var(--paper-tabs-selection-bar-color, var(--paper-yellow-a100));
          -webkit-transform: scale(0);
        transform: scale(0);
          -webkit-transform-origin: left center;
        transform-origin: left center;
          transition: -webkit-transform;
        transition: transform;

        @apply --paper-tabs-selection-bar;
      }

      #selectionBar.align-bottom {
        top: 0;
        bottom: auto;
      }

      #selectionBar.expand {
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
      }

      #selectionBar.contract {
        transition-duration: 0.18s;
        transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
      }

      #tabsContent > ::slotted(:not(#selectionBar)) {
        height: 100%;
      }
    </style>

    <paper-icon-button icon="paper-tabs:chevron-left" class\$="[[_computeScrollButtonClass(_leftHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onLeftScrollButtonDown" tabindex="-1"></paper-icon-button>

    <div id="tabsContainer" on-track="_scroll" on-down="_down">
      <div id="tabsContent" class\$="[[_computeTabsContentClass(scrollable, fitContainer)]]">
        <div id="selectionBar" class\$="[[_computeSelectionBarClass(noBar, alignBottom)]]" on-transitionend="_onBarTransitionEnd"></div>
        <slot></slot>
      </div>
    </div>

    <paper-icon-button icon="paper-tabs:chevron-right" class\$="[[_computeScrollButtonClass(_rightHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onRightScrollButtonDown" tabindex="-1"></paper-icon-button>
`,is:"paper-tabs",behaviors:[nt,$t],properties:{noink:{type:Boolean,value:!1,observer:"_noinkChanged"},noBar:{type:Boolean,value:!1},noSlide:{type:Boolean,value:!1},scrollable:{type:Boolean,value:!1},fitContainer:{type:Boolean,value:!1},disableDrag:{type:Boolean,value:!1},hideScrollButtons:{type:Boolean,value:!1},alignBottom:{type:Boolean,value:!1},selectable:{type:String,value:"paper-tab"},autoselect:{type:Boolean,value:!1},autoselectDelay:{type:Number,value:0},_step:{type:Number,value:10},_holdDelay:{type:Number,value:1},_leftHidden:{type:Boolean,value:!1},_rightHidden:{type:Boolean,value:!1},_previousTab:{type:Object}},hostAttributes:{role:"tablist"},listeners:{"iron-resize":"_onTabSizingChanged","iron-items-changed":"_onTabSizingChanged","iron-select":"_onIronSelect","iron-deselect":"_onIronDeselect"},keyBindings:{"left:keyup right:keyup":"_onArrowKeyup"},created:function(){this._holdJob=null,this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0,this._bindDelayedActivationHandler=this._delayedActivationHandler.bind(this),this.addEventListener("blur",this._onBlurCapture.bind(this),!0)},ready:function(){this.setScrollDirection("y",this.$.tabsContainer)},detached:function(){this._cancelPendingActivation()},_noinkChanged:function(e){Object(we.a)(this).querySelectorAll("paper-tab").forEach(e?this._setNoinkAttribute:this._removeNoinkAttribute)},_setNoinkAttribute:function(e){e.setAttribute("noink","")},_removeNoinkAttribute:function(e){e.removeAttribute("noink")},_computeScrollButtonClass:function(e,t,n){return!t||n?"hidden":e?"not-visible":""},_computeTabsContentClass:function(e,t){return e?"scrollable"+(t?" fit-container":""):" fit-container"},_computeSelectionBarClass:function(e,t){return e?"hidden":t?"align-bottom":""},_onTabSizingChanged:function(){this.debounce("_onTabSizingChanged",function(){this._scroll(),this._tabChanged(this.selectedItem)},10)},_onIronSelect:function(e){this._tabChanged(e.detail.item,this._previousTab),this._previousTab=e.detail.item,this.cancelDebouncer("tab-changed")},_onIronDeselect:function(e){this.debounce("tab-changed",function(){this._tabChanged(null,this._previousTab),this._previousTab=null},1)},_activateHandler:function(){this._cancelPendingActivation(),Dt._activateHandler.apply(this,arguments)},_scheduleActivation:function(e,t){this._pendingActivationItem=e,this._pendingActivationTimeout=this.async(this._bindDelayedActivationHandler,t)},_delayedActivationHandler:function(){var e=this._pendingActivationItem;this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0,e.fire(this.activateEvent,null,{bubbles:!0,cancelable:!0})},_cancelPendingActivation:function(){void 0!==this._pendingActivationTimeout&&(this.cancelAsync(this._pendingActivationTimeout),this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0)},_onArrowKeyup:function(e){this.autoselect&&this._scheduleActivation(this.focusedItem,this.autoselectDelay)},_onBlurCapture:function(e){e.target===this._pendingActivationItem&&this._cancelPendingActivation()},get _tabContainerScrollSize(){return Math.max(0,this.$.tabsContainer.scrollWidth-this.$.tabsContainer.offsetWidth)},_scroll:function(e,t){if(this.scrollable){var n=t&&-t.ddx||0;this._affectScroll(n)}},_down:function(e){this.async(function(){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null)},1)},_affectScroll:function(e){this.$.tabsContainer.scrollLeft+=e;var t=this.$.tabsContainer.scrollLeft;this._leftHidden=0===t,this._rightHidden=t===this._tabContainerScrollSize},_onLeftScrollButtonDown:function(){this._scrollToLeft(),this._holdJob=setInterval(this._scrollToLeft.bind(this),this._holdDelay)},_onRightScrollButtonDown:function(){this._scrollToRight(),this._holdJob=setInterval(this._scrollToRight.bind(this),this._holdDelay)},_onScrollButtonUp:function(){clearInterval(this._holdJob),this._holdJob=null},_scrollToLeft:function(){this._affectScroll(-this._step)},_scrollToRight:function(){this._affectScroll(this._step)},_tabChanged:function(e,t){if(!e)return this.$.selectionBar.classList.remove("expand"),this.$.selectionBar.classList.remove("contract"),void this._positionBar(0,0);var n=this.$.tabsContent.getBoundingClientRect(),i=n.width,a=e.getBoundingClientRect(),r=a.left-n.left;if(this._pos={width:this._calcPercent(a.width,i),left:this._calcPercent(r,i)},this.noSlide||null==t)return this.$.selectionBar.classList.remove("expand"),this.$.selectionBar.classList.remove("contract"),void this._positionBar(this._pos.width,this._pos.left);var s=t.getBoundingClientRect(),o=this.items.indexOf(t),l=this.items.indexOf(e);this.$.selectionBar.classList.add("expand");var h=o<l;this._isRTL&&(h=!h),h?this._positionBar(this._calcPercent(a.left+a.width-s.left,i)-5,this._left):this._positionBar(this._calcPercent(s.left+s.width-a.left,i)-5,this._calcPercent(r,i)+5),this.scrollable&&this._scrollToSelectedIfNeeded(a.width,r)},_scrollToSelectedIfNeeded:function(e,t){var n=t-this.$.tabsContainer.scrollLeft;n<0?this.$.tabsContainer.scrollLeft+=n:(n+=e-this.$.tabsContainer.offsetWidth)>0&&(this.$.tabsContainer.scrollLeft+=n)},_calcPercent:function(e,t){return 100*e/t},_positionBar:function(e,t){e=e||0,t=t||0,this._width=e,this._left=t,this.transform("translateX("+t+"%) scaleX("+e/100+")",this.$.selectionBar)},_onBarTransitionEnd:function(e){var t=this.$.selectionBar.classList;t.contains("expand")?(t.remove("expand"),t.add("contract"),this._positionBar(this._pos.width,this._pos.left)):t.contains("contract")&&t.remove("contract")}});var Ft=n(100),Ut=n.n(Ft);customElements.define("app-text-input",class extends Ye.a{static get template(){return Object(Ye.b)([Ut.a])}static get properties(){return{type:{type:String,value:"text"},label:{type:String,value:""},help:{type:String,value:""},placeholder:{type:String,value:""},disabled:{type:Boolean,value:!1}}}get value(){return this.$.input.value}set value(e){this.$.input.value=e}_onChange(e){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}}))}_onKeyUp(e){e={which:e.which,value:this.value},this.dispatchEvent(new CustomEvent("keyup",{detail:e}))}});var qt=n(99),Kt=n.n(qt);customElements.define("app-create-start",class extends(Mixin(Ye.a).with(EventInterface)){static get template(){return Object(Ye.b)([Kt.a])}static get properties(){return{githubOrg:{type:String,value:APP_CONFIG.env.github},source:{type:String,value:"",observer:"_sourceObserver"}}}constructor(){super(),this._injectModel("PackageEditor")}_onPackageEditorDataUpdate(e){e.reset?this.reset():this.source=e.payload.source||""}reset(){this.source="managed",this.$.repositoryTypeManaged.checked=!0,this.$.repositoryTypeRegistered.checked=!1}_sourceObserver(){this.hasSourceSet=!!this.source,this.$.repositoryTypeManaged.checked=!1,this.$.repositoryTypeRegistered.checked=!1,"managed"===this.source?this.$.repositoryTypeManaged.checked=!0:"registered"===this.source&&(this.$.repositoryTypeRegistered.checked=!0)}_onNextBtnClicked(){this.fire("next-tab")}_onSourceRadioChange(){if(!this.$)return;let e;e=this.$.repositoryTypeManaged.checked?this.$.repositoryTypeManaged.value:this.$.repositoryTypeRegistered.checked?this.$.repositoryTypeRegistered.value:"",this.PackageEditor.setData({source:e})}});var Gt=n(98),Yt=n.n(Gt),Wt=n(97),Jt=n.n(Wt),Xt=n(16),Qt=n.n(Xt);customElements.define("app-org-input",class extends(Mixin(Ye.a).with(EventInterface,Qt.a)){static get template(){return Object(Ye.b)([Jt.a])}static get properties(){return{orgs:{type:Array,value:()=>[]},selectedOrg:{type:String,value:""}}}constructor(){super(),this.active=!0}_onOrgsUpdate(e){"loaded"===e.state&&(this.orgs=e.payload,requestAnimationFrame(()=>{this.$.input.value=this.selectedOrg}))}_onInputChange(){this.selectedOrg=this.$.input.value,this.fire("change")}get value(){return this.selectedOrg}set value(e){this.selectedOrg=e,this.$.input.value=e}});var Zt=n(96),en=n.n(Zt);customElements.define("app-overview-input",class extends Ye.a{static get template(){return Object(Ye.b)([en.a])}static get properties(){return{creating:{type:Boolean,value:!1},isManagedSource:{type:Boolean,value:!1},value:{type:String,value:"",observer:"_valueObserver"}}}_overviewObserver(){this.$.overview.value=this.value}_onInputChange(){this.value=this.$.overview.value;let e=new CustomEvent("change",{detail:{value:this.value}});this.dispatchEvent(e)}});var tn=n(95),nn=n.n(tn);customElements.define("app-created-popup",class extends Ye.a{static get properties(){return{githubOrg:{type:String,value:APP_CONFIG.env.github},name:{type:String,value:""}}}static get template(){return Object(Ye.b)([nn.a])}connectedCallback(){super.connectedCallback(),console.log(this.githubOrg)}_cancel(){this.close()}close(){this.dispatchEvent(new CustomEvent("close"))}open(){}});var an=n(14),rn=n.n(an),sn=n(23),on=n.n(sn);const ln=["reponame","overview","organization","language","packageType"];customElements.define("app-basic-metadata",class extends(Mixin(Ye.a).with(EventInterface,on.a,rn.a)){static get template(){return Object(Ye.b)([Yt.a])}static get properties(){return{isManagedSource:{type:Boolean,value:!1},creating:{type:Boolean,value:!1},deleting:{type:Boolean,value:!1},syncing:{type:Boolean,value:!1},ecosisDataHost:{type:String,value:APP_CONFIG.ecosis.dataHost},hasRelease:{type:Boolean,value:!1}}}constructor(){super(),this.active=!0,this._injectModel("PackageEditor")}get reponame(){if(this.editorData&&"registered"===this.editorData.source){let{org:e,repo:t,valid:n}=this._checkValidUrl();return e+"/"+t}return this.$.name.value||""}set reponame(e){this.editorData&&"registered"===this.editorData.source&&(this.$.url.value=e||""),this.$.name.value=e||""}get overview(){return this.$?this.$.overview.value:""}set overview(e){this.$.overview.value=e||""}get language(){return this.$.language.value}set language(e){this.$.language.value=e||""}get packageType(){return this.$.packageInput.checked?"package":"standalone"}set packageType(e){"package"===e?this.$.packageInput.checked=!0:this.$.standaloneInput.checked=!0}get organization(){return this.$.organization.value}set organization(e){this.$.organization.value=e||""}get keywords(){return this.$.keywords.value}set keywords(e){this.$.keywords.value=e||""}ready(){super.ready(),this._checkNameAvailableTimer=-1,this._checkUrlTimer=-1}_onPackageEditorDataUpdate(e){this.packageId=e.payload.id||"",this.packageName=e.payload.name||"",this.editorData=e.payload,e.reset&&(this.$.url.value="",this.$.name.value=""),this.setValues(e.payload),this.isManagedSource="registered"!==e.payload.source,this.creating="create"===e.state,this.hasRelease=!!(e.payload.releaseCount&&e.payload.releaseCount>0)}setValues(e){for(let t of ln){let n=t;"reponame"===n&&(n="name"),this[t]=e[n]}}getValues(){let e={};return ln.forEach(t=>{let n=t;"reponame"===n&&(n="name"),e[n]=this[t]}),e}_checkUrl(){if(this._lastCheckedUrl===this.$.url.value)return;if(this._lastCheckedUrl=this.$.url.value,!this.$.url.value)return this.$.urlMessage.innerHTML="";let{org:e,repo:t,valid:n}=this._checkValidUrl();if(!n)return this.$.urlMessage.innerHTML="Not a valid Github Repository Url";this.$.urlMessage.innerHTML=`Checking (${e} / ${t})...`,-1===this._checkUrlTimer&&clearTimeout(this._checkUrlTimer),this._checkUrlTimer=setTimeout(()=>{this._checkUrlTimer=-1,this._checkUrlAsync(e,t)},300)}_onUrlInputChange(){this._checkUrl(),this._onInputChange()}_checkValidUrl(){let e=this.$.url.value,t=e;e.match(/^http/)?t=new URL(e).pathname:e.match(/github\.com/)&&(t=e.replace(/.*github\.com/));let[n,i]=t.replace(/^\//,"").split("/");return{org:n,repo:i,valid:!(!n||!i)}}async _checkUrlAsync(e,t){this.registeredUrlExists=!await this.PackageEditor.isNameAvailable(t,e),this.registeredUrlExists?this.$.urlMessage.innerHTML=`Valid: ${e} / ${t}`:this.$.urlMessage.innerHTML=`Unable to access or invalid: ${e} / ${t}`}_updateNamePreview(){this.name=this._getCleanName(),this._onInputChange()}_getCleanName(){return this.$.name.value.toLowerCase().replace(/ /g,"-").replace(/[^a-zA-Z0-9_-]/g,"")}_onNameInputKeyUp(){this._checkNameAvailable()}_checkNameAvailable(){this.$.nameMessage.innerHTML=this._getCleanName()+": Checking...",this.$.nameMessage.className="",-1!==this._checkNameAvailableTimer&&clearTimeout(this._checkNameAvailableTimer),this._checkNameAvailableTimer=setTimeout(async()=>{this._checkNameAvailableTimer=-1;let e=this._getCleanName();e?(this.nameAvailable=await this.PackageEditor.isNameAvailable(e),this.nameAvailable?(this.$.nameMessage.innerHTML=this._getCleanName()+": Available",this.$.nameMessage.className="ok"):(this.$.nameMessage.innerHTML=this._getCleanName()+": Unavailable",this.$.nameMessage.className="error")):this.$.nameMessage.innerHTML=""},300)}_onInputChange(){this.PackageEditor.setData(this.getValues())}async _onCreateBtnClicked(){let e=this.PackageEditor.getData();if(!e.source)return alert("Please select a repository type");if("managed"===e.source){if(!this.nameAvailable)return alert("Name is not available");if((e.name||"").length<4)return alert("Name must be at least 4 characters");if((e.overview||"").length<10)return alert("Please provide a longer overview")}else{if("registered"!==e.source)return alert("Unknown repository type: "+e.source);if(!this.registeredUrlExists)return alert("Invalid registered GitHub Url")}if(!e.organization)return alert("Please select an organization");if(!e.packageType)return alert("Please select a package type");try{await this.PackageModel.create(e.name,e.overview,e.organization,e.language,e.packageType,e.source),"managed"===e.source&&this.$.created.open()}catch(e){alert("Failed to create package: "+e.message)}}async _onDeleteBtnClicked(){confirm("Are you sure you want to delete package "+this.packageName+" and all its contents?")&&confirm("Are you really sure you want to delete "+this.packageName+"?")&&(this.deleting=!0,await this._deletePackage(this.packageId),this.deleting=!1,window.location="/account")}_onCreatePackageUpdate(e){return"loading"===e.state?(this.$.createBtn.setAttribute("disabled","disabled"),void(this.$.createBtn.innerHTML="Creating...")):(this.$.createBtn.removeAttribute("disabled","disabled"),this.$.createBtn.innerHTML="Create","error"===e.state?alert("Failed to create package :( "+e.error.message):void this._setWindowLocation("/edit/"+e.payload.id))}async _onSyncClicked(){if(!this.syncing){this.syncing=!0;try{await this.PackageEditor.syncRegProps(this.packageId)}catch(e){alert("Failed to sync repository: "+e.message)}this.syncing=!1}}});var hn=n(94),cn=n.n(hn),dn=n(93),pn=n.n(dn);customElements.define("app-keyword-input",class extends Ye.a{static get template(){return Object(Ye.b)([pn.a])}static get properties(){return{keywords:{type:Array,value:()=>[]},label:{type:String,value:""}}}get value(){return this.keywords}set value(e){this.keywords=this._clean(e)}_clean(e){"string"==typeof e&&(e=e.split(","));for(let t=(e=e.map(e=>e.trim().toLowerCase())).length-1;t>=0;t--)e[t]||e.splice(t,1);return e}_onKeyPress(e){13===e.which&&this._onChange()}_onChange(e){this.appendKeywords(this.$.input.value),this.$.input.value="",this.dispatchEvent(new CustomEvent("keyword-change",{detail:this.keywords}))}_onRemoveClicked(e){let t=e.currentTarget.getAttribute("value"),n=this.keywords.indexOf(t);this.keywords.splice(n,1),this.value=this.keywords.slice(0),this.dispatchEvent(new CustomEvent("keyword-change",{detail:this.keywords}))}appendKeywords(e){(e=this._clean(e)).forEach(e=>{-1===this.keywords.indexOf(e)&&this.keywords.push(e)}),this.value=this.keywords.slice(0)}});var un=n(92),gn=n.n(un),fn=n(91),mn=n.n(fn),vn=n(90),yn=n.n(vn),bn=n(89),_n=n.n(bn);n(117),n(116),n(115),n(114);customElements.define("app-markdown",class extends(Mixin(Ye.a).with(EventInterface,rn.a)){static get properties(){return{pkgName:{type:String,value:""}}}static get template(){return Object(Ye.b)([`\n      ${mn.a} \n      <style>${yn.a}</style>\n      <style>${_n.a}</style>\n    `])}async render(e,t,n){t&&(this.style.height=t+"px"),this.$.root.innerHTML="Rendering...";let i=await this.PackageModel.previewMarkdown(e,n||this.pkgName);this.show(i.payload),t&&(this.style.height="auto")}show(e){this.$.root.innerHTML=e;let t=this.$.root.querySelectorAll("code");for(let e=0;e<t.length;e++)Prism.highlightElement(t[e])}});customElements.define("app-markdown-editor",class extends(Mixin(Ye.a).with(EventInterface,rn.a)){static get template(){return Object(Ye.b)([gn.a])}static get properties(){return{selected:{type:String,value:"input",observer:"_onSelectedChange"},previewMode:{type:Boolean,value:!1},label:{type:String,value:""},pkgName:{type:String,value:""}}}get value(){return this.$.input.value}set value(e){this.$.input.value=e,this.autoSize(),this.previewMode&&this._updatePreview()}_triggerChangeEvent(){this.dispatchEvent(new CustomEvent("markdown-change",{detail:this.value}))}_onSelectedChange(){"input"===this.selected?this.previewMode=!1:this.previewMode=!0}_toggle(e){if("edit"===e.currentTarget.getAttribute("data"))this.selected="input",this.autoSize();else{let e=this.$.input.offsetHeight;this.selected="preview",this._updatePreview(e)}}async _updatePreview(e){this.$.preview.render(this.value,e)}_onTextAreaKeyUp(){this.autoSize()}autoSize(){setTimeout(()=>{this.$.input.style.height=this.$.input.scrollHeight+"px"},0),setTimeout(()=>{this.$.input.style.height=this.$.input.scrollHeight+"px"},100)}});var wn=n(88),xn=n.n(wn),kn=n(87),zn=n.n(kn),Sn=n(24),An=n.n(Sn);const Cn=[];for(let e in An.a)Cn.push(e);customElements.define("app-theme-input",class extends Ye.a{static get template(){return Object(Ye.b)([zn.a])}static get properties(){return{themeOptions:{type:Array,value:()=>Cn},familyOptions:{type:Array,value:()=>[]},specificOptions:{type:Array,value:()=>[]},selectedTheme:{type:String,value:"",observer:"_setValues"},selectedFamily:{type:String,value:"",observer:"_setValues"},selectedSpecific:{type:String,value:"",observer:"_setValues"},showSpecific:{type:Boolean,value:!1,computed:"_showSpecific(selectedFamily, specificOptions)"},index:{type:Number,value:-1},hideLabels:{type:Boolean,value:!1,computed:"_computeHideLabels(index)"}}}constructor(){super(),this._setValuesTimes=-1}_setValues(){-1!==this._setValuesTimer&&clearTimeout(this._setValuesTimer),this._setValuesTimer=setTimeout(()=>{this._setValuesTimer=-1,this._setValuesAsync()},50)}_setValuesAsync(){if(this.$.theme.value=this.selectedTheme,this.selectedTheme){let e=[];for(let t in An.a[this.selectedTheme])e.push(t);this.familyOptions=e}this.selectedFamily&&(this.specificOptions=An.a[this.selectedTheme][this.selectedFamily]),requestAnimationFrame(()=>{this.$.family.value=this.selectedFamily,this.$.specific.value=this.selectedSpecific})}_onThemeSelect(e){let t=e.currentTarget.value;if(this.selectedTheme===t)return;if(this.selectedTheme=t,this.selectedFamily="",this.$.family.value="",this.selectedSpecific="",this.$.specific.value="",!t)return void this._fireUpdateEvent();let n=[];for(let e in An.a[this.selectedTheme])n.push(e);this.familyOptions=n,this._fireUpdateEvent()}_onFamilySelect(e){let t=e.currentTarget.value;this.selectedFamily!==t&&(this.selectedFamily=t,this.selectedSpecific="",this.$.specific.value="",t&&(this.specificOptions=An.a[this.selectedTheme][this.selectedFamily],this._fireUpdateEvent()))}_onSpecificSelect(e){this.selectedSpecific=e.currentTarget.value,this._fireUpdateEvent()}_fireUpdateEvent(){let e={theme:this.selectedTheme,family:this.selectedFamily,specific:this.selectedSpecific};this.dispatchEvent(new CustomEvent("update",{detail:e}))}_showSpecific(e,t){return e&&t&&t.length}_computeHideLabels(){return this.index>0}});customElements.define("app-multi-theme-input",class extends Ye.a{static get template(){return Object(Ye.b)([xn.a])}static get properties(){return{themes:{type:Array,value:()=>[]}}}_onAddClicked(){this.push("themes",{theme:"",family:"",specific:""}),this._onUpdate()}_onDeleteClicked(e){let t=parseInt(e.currentTarget.getAttribute("index"));this.splice("themes",t,1),this._onUpdate()}_onThemeUpdate(e){let t=parseInt(e.currentTarget.getAttribute("index"));this.themes[t]=e.detail,this._onUpdate()}_onUpdate(){this.dispatchEvent(new CustomEvent("update",{detail:this.themes}))}});var En=n(50),Mn=n.n(En);const Pn=["description","keywords"];customElements.define("app-details-metadata",class extends(Mixin(Ye.a).with(EventInterface)){static get template(){return Object(Ye.b)([cn.a])}static get properties(){return{active:{type:Boolean,value:!1,observer:"_onActiveChange"},isManagedSource:{type:Boolean,value:!1},githubUrl:{type:String,value:""}}}get description(){return this.$.description.value}set description(e){this.$.description.value=e||""}get keywords(){return this.$.keywords.value}set keywords(e){this.$.keywords.value=e||[]}constructor(){super(),this._injectModel("PackageEditor")}_onActiveChange(){this.$.description.autoSize()}_onPackageEditorDataUpdate(e){this.packageId=e.payload.id||"",this.packageName=e.payload.name||"",this.editorData=e.payload,this.$.description.pkgName=this.packageName;for(let t of Pn)this[t]=e.payload[t];this.theme=e.payload.theme||[],this.family=e.payload.family||[],this.specific=e.payload.specific||[];let t=Mn.a.getThemeObjectArray(e.payload);this.$.theme.themes=t,this.isManagedSource="registered"!==e.payload.source,this.githubUrl=e.payload.htmlUrl}getValues(){let e={};return Pn.forEach(t=>{e[t]=this[t]}),e.theme=this.theme||[],e.family=this.family||[],e.specific=this.specific||[],e}_onInputChange(){this.PackageEditor.setData(this.getValues())}_onThemeUpdate(e){let t=Mn.a.themeObjectArrayToPackageArrays(this.$.theme.themes);this.theme=t.theme,this.family=t.family,this.specific=t.specific,this._onInputChange()}});var On=n(86),Tn=n.n(On),Ln=n(85),Hn=n.n(Ln),In=n(84),Vn=n.n(In);customElements.define("app-file-tree-branch",class extends Ye.a{static get template(){return Object(Ye.b)([Vn.a])}static get properties(){return{data:{type:Object,value:null,observer:"_onDataUpdate"},files:{type:Array,value:()=>[]},directories:{type:Array,value:()=>[]},open:{type:Boolean,value:!0}}}_onDataUpdate(){if(!this.data)return;let e=[];for(var t in this.data.files)e.push(this.data.files[t]);this.files=e;let n=[];for(var t in this.data.directories)n.push(this.data.directories[t]);this.directories=n}toggle(){this.open=!this.open}});var Rn=n(83),Nn=n.n(Rn),jn=n(82),Bn=n.n(jn);customElements.define("app-file-tree-leaf",class extends Ye.a{static get template(){return Object(Ye.b)([Nn.a])}static get properties(){return{data:{type:Object,value:null},bytes:{type:String,value:"",computed:"_computeBytes(data)"}}}_computeBytes(e){return e?Bn()(e.size):"0"}});customElements.define("app-file-tree",class extends(Mixin(Ye.a).with(EventInterface,rn.a)){static get template(){return Object(Ye.b)([Hn.a])}static get properties(){return{}}constructor(){super(),this.active=!0,this.data={name:"/",files:{},directories:{}},this.updateTimer=-1}_onSelectedPackageUpdate(){this.data={name:"/",files:{},directories:{}},this._onUpdate()}_onFileUpdate(e){let t=e.payload,n=this.data;e.payload.dir.replace(/^\//,"").split("/").forEach(t=>{t&&(n.directories[t]||(n.directories[t]={name:t,path:e.payload.dir,files:{},directories:{}}),n=n.directories[t])}),n.files[t.filename]=t,this._debounceUpdate()}_debounceUpdate(){-1!==this.updateTimer&&clearTimeout(this.updateTimer),this.updateTimer=setTimeout(()=>{this.updateTimer=-1,this._onUpdate()},100)}_onUpdate(){this.$.root.data=Object.assign({},this.data)}});n(113);customElements.define("app-files",class extends(Mixin(Ye.a).with(EventInterface)){static get template(){return Object(Ye.b)([Tn.a])}static get properties(){return{files:{type:Object,value:()=>({})},githubOrg:{type:String,value:APP_CONFIG.env.github},language:{type:String,value:""},packageName:{type:String,value:""},editorData:{type:Object,value:()=>({})},isManagedSource:{type:Boolean,value:!1}}}constructor(){super(),this._injectModel("PackageEditor")}_onPackageEditorDataUpdate(e){this.editorData=e.payload,this.isManagedSource="registered"!==e.payload.source}});var Dn=n(78),$n=n.n(Dn),Fn=n(77),Un=n.n(Fn);customElements.define("app-release",class extends Ye.a{static get template(){return Object(Ye.b)([Un.a])}static get properties(){return{release:{type:Object,value:null,observer:"_onReleaseUpdate"},name:{type:String,value:""},description:{type:String,value:""},published:{type:String,value:""},zipballUrl:{type:String,value:""}}}_onReleaseUpdate(){this.release&&(this.name=this.release.name||"",this.description=this.release.body||"",this.published=(this.release.publishedAt||"").replace(/T.*/,""),this.zipballUrl=this.release.zipballUrl)}});customElements.define("app-releases",class extends(Mixin(Ye.a).with(EventInterface,rn.a)){static get template(){return Object(Ye.b)([$n.a])}static get properties(){return{releases:{type:Array,value:()=>[]},package:{type:Object,value:()=>({})},creating:{type:Boolean,value:!1},saving:{type:Boolean,value:!1},release:{type:String,value:""},priorReleases:{type:Array,value:()=>[]},hasPriorReleases:{type:Boolean,value:!1},hasCurrentRelease:{type:Boolean,value:!1},currentRelease:{type:Object,value:null},isManagedSource:{type:Boolean,value:!1},packageHtmlUrl:{type:String,value:""}}}get major(){return parseInt(this.$.major.value)||0}set major(e){this.$.major.value=e+""}get minor(){return parseInt(this.$.minor.value)||0}set minor(e){this.$.minor.value=e+""}get patch(){return parseInt(this.$.patch.value)||0}set patch(e){this.$.patch.value=e+""}constructor(){super(),this._injectModel("PackageEditor")}_onPackageEditorDataUpdate(e){if(this.editorData=e.payload,this.isManagedSource="registered"!==e.payload.source,this.releases=e.payload.releases||[],this.pkg=e.payload,!this.releases.length)return this.release="",this.priorReleases=[],this.currentRelease=null,this.hasCurrentRelease=!1,this.hasPriorReleases=!1,this.packageHtmlUrl="",void this._render();this.packageHtmlUrl=this.pkg.htmlUrl;let t=this.releases.slice().reverse();this.hasCurrentRelease=!0,this.currentRelease=t.shift(),t.length?(this.priorReleases=t,this.hasPriorReleases=!0):(this.priorReleases=[],this.hasPriorReleases=!1),this.release=this.currentRelease.name,this._render()}_toggleCreate(){this.isManagedSource?(this.creating=!this.creating,this.creating&&(this.$.description.value="",this._render())):window.open(`${this.pkg.htmlUrl}/releases/new`,"_blank")}showList(){this.creating=!1}_render(){if(!this.release)return this.major=0,this.minor=0,void(this.patch=1);let e=this.release.replace(/^v/,"").split(".").map(e=>parseInt(e));e.length<3||(this.major=e[0],this.minor=e[1],this.patch=e[2]+1)}_onInputChange(){this.release=`v${this.major}.${this.minor}.${this.patch}`}async _onCreateClicked(){let e={name:`v${this.major||0}.${this.minor||0}.${this.patch||0}`,description:this.$.description.value};this.saving=!0,this.$.create.innerHTML="Creating...";let t=await this._createRelease(this.pkg.name,e);if(this.$.create.innerHTML="Create Release",this.saving=!1,"error"===t.state)alert("Error creating release: "+t.error.payload.message);else{let e=await this._getPackage(this.pkg.id);this.PackageEditor.setData(e.payload),this.showList()}}});n(107);customElements.define("app-package-metadata-editor",class extends(Mixin(Ye.a).with(EventInterface)){static get template(){return Object(Ye.b)([lt.a])}static get properties(){return{creating:{type:Boolean,value:!0},currentAction:{type:String,value:"Create"},selectedSection:{type:String,value:"basic"},schema:{type:Object,value:{}},name:{type:String,value:""},repoType:{type:String,value:""},hasRelease:{type:Boolean,value:!1},githubHtmlUrl:{type:String,value:""}}}constructor(){super(),this._injectModel("PackageEditor","AppStateModel","PackageModel"),this._autoUpdateTimer=-1,this.schema=this.PackageModel.schema}_onAppStateUpdate(e){if(this.unsavedData){if(!confirm("You have unsaved changes, are you sure you want to leave?"))return void this._setWindowLocation("/edit/"+this.packageId);this.unsavedData=null,this.$.savingToast.close()}let t=e.location.path[0];"edit"===t&&e.location.path.length>0?(this.packageId=e.location.path[1],this._fetchAndUpdatePackage(e.location.path[1])):"create"===t&&this.PackageEditor.reset(),setTimeout(()=>this.$.tabs.notifyResize(),25)}_onPackageEditorDataUpdate(e){this.packageId=e.payload.id||"",this.packageName=e.payload.name||"",this.creating="create"===e.state,this.hasRelease=!!(e.payload.releaseCount&&e.payload.releaseCount>0),this.githubHtmlUrl=e.payload.htmlUrl||"",(this.lastState!==e.state||e.reset)&&("create"===e.state?(this.selectedSection="source",this.currentAction="Create"):"edit"===e.state&&(this.selectedSection="basic",this.currentAction="Update",this.$.commitMsg.value=""),this.lastState=e.state),"edit"===e.state&&this.PackageEditor.hasDataChanged()?(this.$.unsavedMsg.style.display="block",this.$.savingMsg.style.display="none",this.$.savingToast.open()):this.$.savingToast.close()}async _fetchAndUpdatePackage(e){this.packageId=e;try{let t=await this.PackageModel.get(e);this.PackageEditor.setEditStartStateData(t.payload),this.PackageEditor.setData(t.payload,{state:"edit",merge:!1}),"managed"===t.payload.source?(this.$.files.files=await this.PackageModel.getFiles(e),this.repoType="EcoSML Managed Repository"):"registered"===t.payload.source&&(this.repoType="Registered Repository")}catch(t){return alert("Failed to fetch package "+e+": "+t.message)}}_onSaveChangesClicked(){let e=Object.assign(this.$.basic.getValues(),this.$.details.getValues());this.PackageModel.update(this.packageId,e,this.$.commitMsg.value)}_onEditPackageUpdate(e){"loading"===e.state?(this.$.unsavedMsg.style.display="none",this.$.savingMsg.style.display="block"):"loaded"===e.state?(this.unsavedData=null,this.$.savingToast.close(),this.$.savedToast.open(),this.PackageEditor.setEditStartStateData(e.payload),this.PackageEditor.setData(e.payload,{state:"edit",merge:!1})):"error"===e.state&&(this.$.unsavedMsg.style.display="block",this.$.savingMsg.style.display="none",alert("Failed to save package data :( "+e.error.message))}_onCreateStartNextTab(){this.selectedSection="basic"}_valueToArray(e){return e.split(",").map(e=>e.trim())}});var qn=n(76),Kn=n.n(qn);customElements.define("ecosml-search-header",class extends(Mixin(ne).with(LitCorkUtils)){static get properties(){return{filters:{type:Array},text:{type:String}}}constructor(){super(),this.render=function(){return L`

<style>
  :host {
    display: block;
  }
</style>  

<app-search-header
  .text="${this.text}"
  .filters="${this.filters}"
  @keyup="${this._onInputKeyup}"
  @text-search="${this._onTextSearch}"
  @remove-filter="${this._onRemoveFilter}"
  placeholder="Search Models">
</app-search-header>

`}.bind(this),this.page="home",this.filters=[],this.text="",this._injectModel("AppStateModel","PackageModel","SearchModel")}_onAppStateUpdate(e){this.page=e.page;let t="home"===e.page||"search"===e.page;this.style.display=t?"block":"none"}_onTextSearch(e){let t=this.SearchModel.getQuery();this.SearchModel.setText(e.detail,t),this.SearchModel.setOffset(0,t),this.AppStateModel.setLocation(this.SearchModel.toUrl(t))}_onRemoveFilter(e){let t=this.SearchModel.getQuery();this.SearchModel.removeFilter(e.detail.key,e.detail.value,t),this.AppStateModel.setLocation(this.SearchModel.toUrl(t))}_onSearchPackagesUpdate(e){"loaded"===e.state&&(this.text=e.query.text,this.filters=e.query.filters.map(e=>{let t=Object.keys(e);return 0===t.length?e:{label:t[0],key:t[0],value:e[t[0]]}}))}});var Gn=n(75),Yn=n.n(Gn);customElements.define("app-filters-panel",class extends(Mixin(Ye.a).with(EventInterface)){static get template(){return Object(Ye.b)([Yn.a])}static get properties(){return{filters:{type:Array,value:()=>[]},hasFilters:{type:Boolean,value:!0}}}constructor(){super(),this.active=!0,this._injectModel("SearchModel","AppStateModel")}_onSearchPackagesUpdate(e){if("loaded"!==e.state)return;let t=e.payload.filters||{},n=[];for(var i in t)n.push({key:i,label:i,values:t[i].map(e=>(e.label=e.filter,e))});this.filters=n,this.hasFilters=this.filters.length>0}_onFilterSelected(e){e=e.detail;let t=this.SearchModel.getQuery();this.SearchModel.appendFilter(e.filter,e.value.filter,t),this.SearchModel.setOffset(0,t),this.AppStateModel.setLocation(this.SearchModel.toUrl(t))}});var Wn=n(74),Jn=n.n(Wn),Xn=n(32),Qn=n.n(Xn),Zn=n(73),ei=n.n(Zn);customElements.define("app-search-result",class extends Ye.a{static get template(){return Object(Ye.b)([ei.a])}static get properties(){return{item:{type:Object,value:()=>{},observer:"_onItemUpdate"},latestRelease:{type:String,value:""}}}_onItemUpdate(){if(this.item)return 0===this.item.releases.length?this.latestRelease="No releases":void(this.latestRelease=this.item.releases[this.item.releases.length-1].name)}});customElements.define("app-search-results-panel",class extends(Mixin(Ye.a).with(EventInterface,Qn.a,on.a)){static get template(){return Object(Ye.b)([Jn.a])}static get properties(){return{loading:{type:Boolean,value:!1},hasError:{type:Boolean,value:!1},hasResults:{type:Boolean,value:!0},results:{type:Array,value:()=>[]},itemsPerPage:{type:Number,value:10},currentIndex:{type:Number,value:0},total:{type:Number,value:0}}}constructor(){super(),this.active=!0}_onSearchPackagesUpdate(e){this.hasError=!1,this.loading=!1,"loading"!==e.state?"error"!==e.state?(this.results=e.payload.results,this.itemsPerPage=e.payload.limit,this.currentIndex=e.payload.offset,this.total=e.payload.total,this.hasResults=this.results.length>0):this.hasError=!0:this.loading=!0}_onPaginationNav(e){this._setSearchOffset(e.detail.startIndex),this._setWindowLocation(this._searchQueryToUrl())}});customElements.define("app-package-search",class extends(Mixin(Ye.a).with(EventInterface)){static get template(){return Object(Ye.b)([Kn.a])}static get properties(){return{mobileFiltersOpen:{type:Boolean,value:!1}}}constructor(){super(),this.active=!0,window.addEventListener("resize",()=>{let e=window.innerWidth;this.mobileFiltersOpen&&e>768&&(this.mobileFiltersOpen=!1)})}_toggleMobileFilters(){this.mobileFiltersOpen=!this.mobileFiltersOpen}});n(62);var ti=n(72),ni=n.n(ti);customElements.define("app-home",class extends(Mixin(Ye.a).with(EventInterface)){static get template(){return Object(Ye.b)([ni.a])}static get properties(){return{loggedIn:{type:Boolean,value:!1},stats:{type:Object,value:()=>({organizations:[],themes:[],keywords:[]})},ecosisHost:{type:String,value:()=>APP_CONFIG.ecosis.host},sandbox:{type:Boolean,value:!1},gitenv:{type:Object,value:()=>APP_CONFIG.env.git}}}constructor(){super(),this._injectModel("StatsModel"),this._injectModel("AuthModel"),this._injectModel("SearchModel")}async ready(){super.ready(),"prod"!==APP_CONFIG.env.server&&(this.$.titleExtra.innerHTML=" - Sandbox",document.title=document.title+" Sandbox",this.sandbox=!0);let e=(await this.StatsModel.get()).payload;e.organizations=e.organizations.map(e=>{let t=this.SearchModel.getEmptyQuery();return this.SearchModel.appendFilter("organization",e.key,t),Object.assign({},e,{link:this.SearchModel.toUrl(t)})}),e.keywords=e.keywords.map(e=>{let t=this.SearchModel.getEmptyQuery();return this.SearchModel.appendFilter("keywords",e.key,t),Object.assign({},e,{link:this.SearchModel.toUrl(t)})}),e.themes=e.themes.map(e=>{let t=this.SearchModel.getEmptyQuery();return this.SearchModel.appendFilter("theme",e.key,t),Object.assign({},e,{link:this.SearchModel.toUrl(t)})}),this.stats=e}_onAuthUpdate(e){"loggedIn"===e.state?this.loggedIn=!0:this.loggedIn=!1}});var ii=n(71),ai=n.n(ii);customElements.define("app-about",class extends Ye.a{static get template(){return Object(Ye.b)([ai.a])}static get properties(){return{}}});var ri=n(70),si=n.n(ri);customElements.define("app-landing-page",class extends(Mixin(Ye.a).with(EventInterface,on.a,rn.a,Qn.a,Qt.a)){static get template(){return Object(Ye.b)([si.a])}static get properties(){return{package:{type:Object,value:null,observer:"render"},release:{type:Object,value:null},themeLink:{type:String,value:""},familyLink:{type:String,value:""},specificLink:{type:String,value:""},username:{type:String,value:""},githubOrg:{type:String,value:APP_CONFIG.env.github},userHasWriteAccess:{type:Boolean,value:!1},isPackageModule:{type:Boolean,value:!1},lastSearch:{type:String,value:"/search"},hasDois:{type:Boolean,value:!1},hasKeywords:{type:Boolean,value:!1}}}constructor(){super(),this.active=!0,this._onAuthUpdate(this._getAuthState())}async _onAppStateUpdate(e){if("search"===e.page&&(this.lastSearch=e.location.fullpath),"package"!==e.page)return;let t=await this._getPackage(e.location.path[1]);if(this.package=t.payload,console.log(this.package),this.package.keywords&&(this.$.keywords.innerHTML=this.package.keywords.map(e=>`<div><a href="${this._getLink("keywords",e)}">${e}</a></div>`).join("")),this.package.releases&&this.package.releases.length){let e=this.package.releases[this.package.releases.length-1];this.release={name:e.name,description:e.body,downloadUrl:e.zipballUrl}}else this.releases=null;this.themes=this._createThemeLinks("theme"),this.families=this._createThemeLinks("family"),this.specifics=this._createThemeLinks("specific"),this.showThemes=this.themes.length>0,this.showFamilies=this.families.length>0,this.showSpecifics=this.specifics.length>0,this.isPackageModule="package"===this.package.packageType,this.hasDois=(this.package.dois||[]).length>0,this.hasKeywords=(this.package.keywords||[]).length>0;let n=this.$.install.children;for(var i=0;i<n.length;i++)n[i].style.display="none";return this.$[`install-${this.package.language}`]&&(this.$[`install-${this.package.language}`].style.display="block"),this.userHasWriteAccess=!1,this.username?this.package.owner===this.username?this.userHasWriteAccess=!0:void((await this._getUserOrganizations()).payload.find(e=>e.name===this.package.organization)&&(this.userHasWriteAccess=!0)):void 0}_onAuthUpdate(e){this.username=e.username||""}_getLink(e,t){let n=this._getEmptySearchQuery();return t||(t=this.package[e]),t&&n.filters.push({[e]:t}),this._searchQueryToUrl(n)}_createThemeLinks(e){let t=this.package[e];return t?(Array.isArray(t)||(t=[t]),t.map(t=>({value:t,link:this._getLink(e,t)}))):[]}render(){this.package&&(this.$.readmeSm.render(this.package.description,null,this.package.name),this.$.readmeLg.render(this.package.description,null,this.package.name))}});var oi=n(69),li=n.n(oi),hi=n(68),ci=n.n(hi);customElements.define("app-login",class extends(Mixin(Ye.a).with(EventInterface,Qt.a)){static get template(){return Object(Ye.b)([ci.a])}static get properties(){return{ecosisHost:{type:String,value:APP_CONFIG.ecosis.dataHost}}}constructor(){super(),window.INTEGRATION_TESTING&&(window.INTEGRATION_TESTING["app-login"]=this)}async _attemptLogin(){let e=this.$.username.value,t=this.$.password.value;try{await this._login(e,t)}catch(e){alert(e.details.message)}}async _onPassKeyUp(e){13===e.which&&this._attemptLogin()}});var di=n(67),pi=n.n(di);customElements.define("app-github-authorize",class extends(Mixin(Ye.a).with(EventInterface)){static get template(){return Object(Ye.b)([pi.a])}static get properties(){return{linked:{type:Boolean,value:!1},githubUsername:{type:String,value:""},githubAvatar:{type:String,value:""}}}constructor(){super(),this._injectModel("AuthModel")}ready(){super.ready(),APP_CONFIG.github.username&&(this.linked=!0,this.githubUsername=APP_CONFIG.github.username,this.githubAvatar=APP_CONFIG.github.data.avatarUrl)}_onAuthUpdate(e){}_onAuthorizeClicked(){this.AuthModel.authorizeGithub()}_onRevokeClicked(){confirm("Are you sure you want to unlink your EcoSIS and GitHub accounts? You will lose access to EcoSML managed GitHub repositories via the GitHub website and git CLI")&&this.AuthModel.revokeGithub()}});customElements.define("app-user-account",class extends(Mixin(Ye.a).with(EventInterface,Qt.a,Qn.a)){static get template(){return Object(Ye.b)([li.a])}static get properties(){return{loggedIn:{type:Boolean,value:!1},view:{type:String,value:"login"},username:{type:String,value:""},organizations:{type:Array,value:()=>[]},ecosisHost:{type:String,value:APP_CONFIG.ecosis.dataHost}}}constructor(){super(),this.active=!0,this._setAuth(this._getAuthState())}_setAuth(e){"loggedIn"===e.state?(this.loggedIn=!0,this.view="account",this.username=e.username,this._renderOwnerPackages()):(this.loggedIn=!1,this.view="login",this.username="")}async _renderOwnerPackages(){if(this.renderedOwner===this.username)return;this.renderedOwner=this.username;let e=await this._getOwnerPackages(this.username);console.log(e.body.results),this.ownerPackages=e.body.results}_onOrgsUpdate(e){"loaded"===e.state&&(this.organizations=e.payload)}});customElements.define("app-doi-admin",class extends(Mixin(ne).with(LitCorkUtils)){static get properties(){return{items:{Array:String}}}constructor(){super(),this.render=function(){return L`

${ie(re.a)}
<style>
  :host {
    display: block;
  }

  .filter-layout {
    display: flex;
    align-items: center;
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }

  .input-layout {
    flex: 1;
    padding-right: 10px;
  }
</style>  

<h2>Admin DOI</h2>

<h4>Filters</h4>

<div class="filter-layout">
  <div>
    <select style="width:150px">
      <option></option>
      <option value="pending">Pending Approval</option>
      <option value="revision">Denied, Waiting For Revision</option>
      <option value="creating">Approved, Waiting for DOI</option>
      <option value="created">Approved, DOI Assigned</option>
    </select>
  </div>

  <div class="input-layout">
    <input type="text" id="text-filter" placeholder="Search" />
  </div>
</div>

<table>
  <tr>
    <th>Repository</th>
    <th>Status</th>
    <th>DOI</th>
  </tr>
  ${this.items.map(e=>L`<tr>
      <td><a href="${e.url}" target="_blank">${e.name}</a></td>
      <td>${e.status}</td>
      <td>${e.doi}</td>
    </tr>`)}
</table>

`}.bind(this),this.items=[],this._injectModel("AppStateModel")}_onAppStateUpdate(e){console.log(e)}});customElements.define("app-admin",class extends(Mixin(ne).with(LitCorkUtils)){static get properties(){return{subPage:{type:String}}}constructor(){super(),this.render=function(){return L`

<style>
  :host {
    display: block;
  }
</style>  


<iron-pages .selected="${this.subPage}" attr-for-selected="id">
  <app-doi-admin id="doi"></app-doi-admin>
</iron-pages>

`}.bind(this),this._injectModel("AppStateModel"),this.subPage="doi"}});var ui=n(66),gi=n.n(ui),fi=n(65),mi=n.n(fi);customElements.define("app-auth-icon",class extends(Mixin(Ye.a).with(EventInterface,Qt.a)){static get template(){return Object(Ye.b)([mi.a])}static get properties(){return{loggedIn:{type:Boolean,value:!1},username:{type:String,value:!1}}}constructor(){super(),this.active=!0}_onAuthUpdate(e){"loggedIn"===e.state?(this.loggedIn=!0,this.username=e.username):(this.loggedIn=!1,this.username="")}});customElements.define("app-header",class extends(Mixin(Ye.a).with(EventInterface,Qt.a)){static get template(){return Object(Ye.b)([gi.a])}static get properties(){return{menuActive:{type:Boolean,value:!1},loggedIn:{type:Boolean,value:!1},sandbox:{type:Boolean,value:!1},admin:{type:Boolean,value:!1}}}ready(){super.ready(),"prod"!==APP_CONFIG.env.server&&(this.$.titleExtra.innerHTML="Sandbox",window.title="EcoSML Sandbox - Spectral Model Library",this.sandbox=!0),this.admin=APP_CONFIG.admin}_onAuthUpdate(e){this.loggedIn="loggedIn"===e.state}_onMenuIconClicked(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("open-menu"))}});var vi=n(64),yi=n.n(vi);customElements.define("app-user-icon",class extends Ye.a{static get template(){return Object(Ye.b)([yi.a])}static get properties(){return{size:{type:Number,value:24,observer:"_setSize"},active:{type:Boolean,value:!1}}}_setSize(){this.size&&this.updateStyles({"--user-icon-size":this.size+"px"})}});var bi=n(63),_i=n.n(bi);n.d(t,"EcoSMLApp",function(){return wi}),window.APP=Ge;class wi extends(Mixin(Ye.a).with(EventInterface,on.a,rn.a)){static get template(){return Object(Ye.b)([_i.a])}static get properties(){return{appRoutes:{type:Array,value:()=>APP_CONFIG.appRoutes},page:{type:String,value:""},firstLoad:{type:Boolean,value:!0},searchHeader:{type:Boolean,value:!1},openMenu:{type:Boolean,value:!1},loggedIn:{type:Boolean,value:!1},ecosisHost:{type:String,value:()=>APP_CONFIG.ecosis.host}}}constructor(){super(),this.active=!0,window.addEventListener("click",e=>{if(this.openMenu)return e.composedPath?void(e.composedPath().indexOf(this.$.menu)>-1||e.composedPath().indexOf(this.$.header)>-1||(this.openMenu=!1)):console.warn("Browser does not support event.path")}),this._injectModel("AuthModel")}toggleDrawer(){this.$.drawer.toggle()}_onAppStateUpdate(e){e.page!==this.page&&("search"===e.page||"package"===e.page||"home"===e.page?this.searchHeader=!0:this.searchHeader=!1,window.scrollTo(0,0),this.page=e.page,this.openMenu=!1)}_onOpenMenu(){this.openMenu=!this.openMenu}_onAuthUpdate(e){"loggedIn"===e.state?this.loggedIn=!0:this.loggedIn=!1}}customElements.define("ecosml-app",wi)},function(e,t,n){"use strict";var i=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,n,o){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(s(e),function(s){var o=encodeURIComponent(i(s))+n;return a(e[s])?r(e[s],function(e){return o+encodeURIComponent(i(e))}).join(t):o+encodeURIComponent(i(e[s]))}).join(t):o?encodeURIComponent(i(o))+n+encodeURIComponent(i(e)):""};var a=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function r(e,t){if(e.map)return e.map(t);for(var n=[],i=0;i<e.length;i++)n.push(t(e[i],i));return n}var s=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},function(e,t,n){"use strict";function i(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,n,r){t=t||"&",n=n||"=";var s={};if("string"!=typeof e||0===e.length)return s;var o=/\+/g;e=e.split(t);var l=1e3;r&&"number"==typeof r.maxKeys&&(l=r.maxKeys);var h=e.length;l>0&&h>l&&(h=l);for(var c=0;c<h;++c){var d,p,u,g,f=e[c].replace(o,"%20"),m=f.indexOf(n);m>=0?(d=f.substr(0,m),p=f.substr(m+1)):(d=f,p=""),u=decodeURIComponent(d),g=decodeURIComponent(p),i(s,u)?a(s[u])?s[u].push(g):s[u]=[s[u],g]:s[u]=g}return s};var a=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},function(e,t,n){"use strict";t.decode=t.parse=n(106),t.encode=t.stringify=n(105)},function(e,t,n){"use strict";var i=n(0),a=n(79),r=n.n(a),s=n(38),o=n.n(s);customElements.define("app-file-diff",class extends i.a{static get template(){return Object(i.b)([r.a])}static get properties(){return{files:{type:Array,value:()=>[]},status:{type:String,value:""}}}connectedCallback(){super.connectedCallback(),this._init||(this._init=!0,(this.parentElement||this.parentNode).removeChild(this),document.body.appendChild(this))}show(e,t){this.packageId=t,this.files=e,this.$.popup.open(),this.saving=!1}_cancel(){this.saving=!1,this.hide()}hide(){this.$.popup.close()}_save(){this._upload()}_upload(){this.saving=!0,this.status="Committing changes ...";var e=new FormData,t=new XMLHttpRequest;t.open("POST",`/api/package/${this.packageId}/updateFiles`);let n=[];for(let t=0;t<this.files.length;t++)"removed"!==this.files[t].changeType?e.append(this.files[t].name,this.files[t].file):n.push(this.files[t].name);e.append("remove",JSON.stringify(n)),t.onload=(e=>{console.log("Request Status",e),200===t.status?JSON.parse(t.response).forEach(e=>o.a.store.onFileLoaded(this.packageId,e)):alert("Upload Error: "+t.response),this.saving=!1,this.hide()}),t.onprogress=(e=>{let t=Math.ceil(e.loaded/e.total*100);this.status=t<100?`Uploading ${t}% ...`:"Committing changes ..."}),t.send(e)}})},function(e,t,n){var i=n(31),a=n(52),r=n(30),s=n(26).Buffer,o=new Array(160);function l(){this.init(),this._w=o,r.call(this,128,112)}i(l,a),l.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},l.prototype._hash=function(){var e=s.allocUnsafe(48);function t(t,n,i){e.writeInt32BE(t,i),e.writeInt32BE(n,i+4)}return t(this._ah,this._al,0),t(this._bh,this._bl,8),t(this._ch,this._cl,16),t(this._dh,this._dl,24),t(this._eh,this._el,32),t(this._fh,this._fl,40),e},e.exports=l},function(e,t,n){var i=n(31),a=n(53),r=n(30),s=n(26).Buffer,o=new Array(64);function l(){this.init(),this._w=o,r.call(this,64,56)}i(l,a),l.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},l.prototype._hash=function(){var e=s.allocUnsafe(28);return e.writeInt32BE(this._a,0),e.writeInt32BE(this._b,4),e.writeInt32BE(this._c,8),e.writeInt32BE(this._d,12),e.writeInt32BE(this._e,16),e.writeInt32BE(this._f,20),e.writeInt32BE(this._g,24),e},e.exports=l},function(e,t,n){var i=n(31),a=n(30),r=n(26).Buffer,s=[1518500249,1859775393,-1894007588,-899497514],o=new Array(80);function l(){this.init(),this._w=o,a.call(this,64,56)}function h(e){return e<<5|e>>>27}function c(e){return e<<30|e>>>2}function d(e,t,n,i){return 0===e?t&n|~t&i:2===e?t&n|t&i|n&i:t^n^i}i(l,a),l.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},l.prototype._update=function(e){for(var t,n=this._w,i=0|this._a,a=0|this._b,r=0|this._c,o=0|this._d,l=0|this._e,p=0;p<16;++p)n[p]=e.readInt32BE(4*p);for(;p<80;++p)n[p]=(t=n[p-3]^n[p-8]^n[p-14]^n[p-16])<<1|t>>>31;for(var u=0;u<80;++u){var g=~~(u/20),f=h(i)+d(g,a,r,o)+l+n[u]+s[g]|0;l=o,o=r,r=c(a),a=i,i=f}this._a=i+this._a|0,this._b=a+this._b|0,this._c=r+this._c|0,this._d=o+this._d|0,this._e=l+this._e|0},l.prototype._hash=function(){var e=r.allocUnsafe(20);return e.writeInt32BE(0|this._a,0),e.writeInt32BE(0|this._b,4),e.writeInt32BE(0|this._c,8),e.writeInt32BE(0|this._d,12),e.writeInt32BE(0|this._e,16),e},e.exports=l},function(e,t,n){var i=n(31),a=n(30),r=n(26).Buffer,s=[1518500249,1859775393,-1894007588,-899497514],o=new Array(80);function l(){this.init(),this._w=o,a.call(this,64,56)}function h(e){return e<<30|e>>>2}function c(e,t,n,i){return 0===e?t&n|~t&i:2===e?t&n|t&i|n&i:t^n^i}i(l,a),l.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},l.prototype._update=function(e){for(var t,n=this._w,i=0|this._a,a=0|this._b,r=0|this._c,o=0|this._d,l=0|this._e,d=0;d<16;++d)n[d]=e.readInt32BE(4*d);for(;d<80;++d)n[d]=n[d-3]^n[d-8]^n[d-14]^n[d-16];for(var p=0;p<80;++p){var u=~~(p/20),g=0|((t=i)<<5|t>>>27)+c(u,a,r,o)+l+n[p]+s[u];l=o,o=r,r=h(a),a=i,i=g}this._a=i+this._a|0,this._b=a+this._b|0,this._c=r+this._c|0,this._d=o+this._d|0,this._e=l+this._e|0},l.prototype._hash=function(){var e=r.allocUnsafe(20);return e.writeInt32BE(0|this._a,0),e.writeInt32BE(0|this._b,4),e.writeInt32BE(0|this._c,8),e.writeInt32BE(0|this._d,12),e.writeInt32BE(0|this._e,16),e},e.exports=l},function(e,t,n){"use strict";(function(e){var t=n(0),i=n(81),a=n.n(i),r=n(80),s=n.n(r);n(108);customElements.define("app-folder-uploader",class extends(Mixin(t.a).with(EventInterface)){static get template(){return Object(t.b)([a.a])}static get properties(){return{}}constructor(){super(),this.files={},this._injectModel("PackageModel"),this.ignore=["ecosml-metadata.json"]}_onFileUpdate(e){let t=e.payload;this.files[("/"!==t.dir?t.dir+"/":"/")+t.filename]=t}_onSelectedPackageUpdate(e){this.packageId=e.id,this.files={}}async _onChange(e){let t=[];if(this.hasMetadataJson=!1,e.dataTransfer){var n=e.dataTransfer.items;if(0===n.length)return;await this._walkDragAndDropDir(n[0].webkitGetAsEntry(),t);for(var i=0;i<t.length;i++){let e=t[i].fullPath.replace(/^\//,"").split("/");e.splice(0,1),t[i].realPath="/"+e.join("/")}}else for(i=0;i<e.target.files.length;i++){let n=e.target.files[i];if(this.isDotPath(n))continue;if(this.ignoreFile(n))continue;let a=n.webkitRelativePath.split("/");a.splice(0,1),n.realPath="/"+a.join("/"),t.push(n)}let a=[];for(i=0;i<t.length;i++){let e=t[i],n=await this._getFileBlob(e),r=await this._hash(e.name,n);this.files[e.realPath]?r!==this.files[e.realPath].sha256&&a.push({name:e.realPath,changeType:"updated",file:n}):a.push({name:e.realPath,changeType:"added",file:n})}for(var r in this.files){let e={name:this.files[r].filename,fullPath:this.files[r].dir};this.ignoreFile(e)||this.isDotPath(e)||-1===t.findIndex(e=>e.realPath===r)&&a.push({name:r,changeType:"removed"})}await this._checkValidUpload(t,a)&&(a.sort((e,t)=>e.name<t.name?1:e.name>t.name?-1:0),this.$.diff.show(a,this.packageId))}async _checkValidUpload(e,t){if(!this.hasMetadataJson)return alert("No metadata.json file found in root directory, please upload the root repository directory"),!1;let n=await this._getFileBlob(this.hasMetadataJson);try{if(JSON.parse(await this._readAsText(n)).id!==this.packageId)return alert("You are attempting to upload the wrong repository, ecosml-metadata.json id does not match"),!1}catch(e){return alert("Failed to parse ecosml-metadata.json file.  Please make sure it is valid JSON."),!1}let i=0;return t.forEach(e=>{"removed"===e.changeType&&i++}),!(i>=e.length&&!confirm("It appears you have moved or deleted every file in the repository. Make sure you have uploaded  the root of your repository. Are you sure you want to continue?")||0===t.length&&(alert("No changes found, ignoring"),1))}_getFileBlob(e){return e.file?new Promise((t,n)=>{e.file(e=>t(e),e=>n(e))}):e}_hash(t,n){return new Promise((t,i)=>{var a=new FileReader;a.onload=(n=>{var i=e.from(n.target.result);t(s()("sha256").update(i).digest("hex"))}),a.readAsArrayBuffer(n)})}_readAsText(e){return new Promise((t,n)=>{var i=new FileReader;i.onload=(e=>{t(e.target.result)}),i.readAsText(e)})}async _walkDragAndDropDir(e,t){if(e.isDirectory){let i=await this._readFolder(e);for(var n=0;n<i.length;n++)await this._walkDragAndDropDir(i[n],t)}else{if(this.isDotPath(e))return;if(this.ignoreFile(e))return;t.push(e)}}_readFolder(e){return new Promise((t,n)=>{e.createReader().readEntries(e=>t(e))})}_onDropBoxDragOver(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy",this.$.dropbox.classList.add("hover")}_onDropBoxDragLeave(e){this.$.dropbox.classList.remove("hover")}_onDropBoxDrop(e){e.preventDefault(),e.stopPropagation(),this.$.dropbox.classList.remove("hover"),this._onChange(e)}_onChooseClicked(e){setTimeout(()=>this.$.fileInput.click(),100)}isDotPath(e){if("."===e.name.charAt(0))return!0;let t=(e.webkitRelativePath||e.fullPath).split("/");for(var n=0;n<t.length;n++)if("."===t[n].charAt(0))return!0;return!1}ignoreFile(e){return this.hasMetadataJson||"ecosml-metadata.json"!==e.name||(this.hasMetadataJson=e),this.ignore.indexOf(e.name)>-1}})}).call(this,n(44).Buffer)},function(e,t){Prism.languages.r={comment:/#.*/,string:{pattern:/(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},"percent-operator":{pattern:/%[^%\s]*%/,alias:"operator"},boolean:/\b(?:TRUE|FALSE)\b/,ellipsis:/\.\.(?:\.|\d+)/,number:[/\b(?:NaN|Inf)\b/,/(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/],keyword:/\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,operator:/->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,punctuation:/[(){}\[\],;]/}},function(e,t){!function(e){var t={variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\([^)]+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},/\$(?:[\w#?*!@]+|\{[^}]+\})/i]};e.languages.bash={shebang:{pattern:/^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,alias:"important"},comment:{pattern:/(^|[^"{\\])#.*/,lookbehind:!0},string:[{pattern:/((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,lookbehind:!0,greedy:!0,inside:t},{pattern:/(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,greedy:!0,inside:t}],variable:t.variable,function:{pattern:/(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,lookbehind:!0},boolean:{pattern:/(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,lookbehind:!0},operator:/&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];]/};var n=t.variable[1].inside;n.string=e.languages.bash.string,n.function=e.languages.bash.function,n.keyword=e.languages.bash.keyword,n.boolean=e.languages.bash.boolean,n.operator=e.languages.bash.operator,n.punctuation=e.languages.bash.punctuation,e.languages.shell=e.languages.bash}(Prism)},function(e,t){Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},"triple-quoted-string":{pattern:/("""|''')[\s\S]+?\1/,greedy:!0,alias:"string"},string:{pattern:/("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},keyword:/\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:True|False|None)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,punctuation:/[{}[\];(),.:]/}},function(e,t,n){(function(t){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},i=function(){var e=/\blang(?:uage)?-([\w-]+)\b/i,t=0,i=n.Prism={manual:n.Prism&&n.Prism.manual,disableWorkerMessageHandler:n.Prism&&n.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof a?new a(e.type,i.util.encode(e.content),e.alias):"Array"===i.util.type(e)?e.map(i.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e,t){var n=i.util.type(e);switch(t=t||{},n){case"Object":if(t[i.util.objId(e)])return t[i.util.objId(e)];var a={};for(var r in t[i.util.objId(e)]=a,e)e.hasOwnProperty(r)&&(a[r]=i.util.clone(e[r],t));return a;case"Array":if(t[i.util.objId(e)])return t[i.util.objId(e)];a=[];return t[i.util.objId(e)]=a,e.forEach(function(e,n){a[n]=i.util.clone(e,t)}),a}return e}},languages:{extend:function(e,t){var n=i.util.clone(i.languages[e]);for(var a in t)n[a]=t[a];return n},insertBefore:function(e,t,n,a){var r=(a=a||i.languages)[e];if(2==arguments.length){for(var s in n=arguments[1])n.hasOwnProperty(s)&&(r[s]=n[s]);return r}var o={};for(var l in r)if(r.hasOwnProperty(l)){if(l==t)for(var s in n)n.hasOwnProperty(s)&&(o[s]=n[s]);o[l]=r[l]}return i.languages.DFS(i.languages,function(t,n){n===a[e]&&t!=e&&(this[t]=o)}),a[e]=o},DFS:function(e,t,n,a){for(var r in a=a||{},e)e.hasOwnProperty(r)&&(t.call(e,r,e[r],n||r),"Object"!==i.util.type(e[r])||a[i.util.objId(e[r])]?"Array"!==i.util.type(e[r])||a[i.util.objId(e[r])]||(a[i.util.objId(e[r])]=!0,i.languages.DFS(e[r],t,r,a)):(a[i.util.objId(e[r])]=!0,i.languages.DFS(e[r],t,null,a)))}},plugins:{},highlightAll:function(e,t){i.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var a={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",a);for(var r,s=a.elements||e.querySelectorAll(a.selector),o=0;r=s[o++];)i.highlightElement(r,!0===t,a.callback)},highlightElement:function(t,a,r){for(var s,o,l=t;l&&!e.test(l.className);)l=l.parentNode;l&&(s=(l.className.match(e)||[,""])[1].toLowerCase(),o=i.languages[s]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+s,t.parentNode&&(l=t.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+s));var h={element:t,language:s,grammar:o,code:t.textContent};if(i.hooks.run("before-sanity-check",h),!h.code||!h.grammar)return h.code&&(i.hooks.run("before-highlight",h),h.element.textContent=h.code,i.hooks.run("after-highlight",h)),void i.hooks.run("complete",h);if(i.hooks.run("before-highlight",h),a&&n.Worker){var c=new Worker(i.filename);c.onmessage=function(e){h.highlightedCode=e.data,i.hooks.run("before-insert",h),h.element.innerHTML=h.highlightedCode,r&&r.call(h.element),i.hooks.run("after-highlight",h),i.hooks.run("complete",h)},c.postMessage(JSON.stringify({language:h.language,code:h.code,immediateClose:!0}))}else h.highlightedCode=i.highlight(h.code,h.grammar,h.language),i.hooks.run("before-insert",h),h.element.innerHTML=h.highlightedCode,r&&r.call(t),i.hooks.run("after-highlight",h),i.hooks.run("complete",h)},highlight:function(e,t,n){var r={code:e,grammar:t,language:n};return i.hooks.run("before-tokenize",r),r.tokens=i.tokenize(r.code,r.grammar),i.hooks.run("after-tokenize",r),a.stringify(i.util.encode(r.tokens),r.language)},matchGrammar:function(e,t,n,a,r,s,o){var l=i.Token;for(var h in n)if(n.hasOwnProperty(h)&&n[h]){if(h==o)return;var c=n[h];c="Array"===i.util.type(c)?c:[c];for(var d=0;d<c.length;++d){var p=c[d],u=p.inside,g=!!p.lookbehind,f=!!p.greedy,m=0,v=p.alias;if(f&&!p.pattern.global){var y=p.pattern.toString().match(/[imuy]*$/)[0];p.pattern=RegExp(p.pattern.source,y+"g")}p=p.pattern||p;for(var b=a,_=r;b<t.length;_+=t[b].length,++b){var w=t[b];if(t.length>e.length)return;if(!(w instanceof l)){if(f&&b!=t.length-1){if(p.lastIndex=_,!(C=p.exec(e)))break;for(var x=C.index+(g?C[1].length:0),k=C.index+C[0].length,z=b,S=_,A=t.length;z<A&&(S<k||!t[z].type&&!t[z-1].greedy);++z)x>=(S+=t[z].length)&&(++b,_=S);if(t[b]instanceof l)continue;E=z-b,w=e.slice(_,S),C.index-=_}else{p.lastIndex=0;var C=p.exec(w),E=1}if(C){g&&(m=C[1]?C[1].length:0);k=(x=C.index+m)+(C=C[0].slice(m)).length;var M=w.slice(0,x),P=w.slice(k),O=[b,E];M&&(++b,_+=M.length,O.push(M));var T=new l(h,u?i.tokenize(C,u):C,v,C,f);if(O.push(T),P&&O.push(P),Array.prototype.splice.apply(t,O),1!=E&&i.matchGrammar(e,t,n,b,_,!0,h),s)break}else if(s)break}}}}},tokenize:function(e,t,n){var a=[e],r=t.rest;if(r){for(var s in r)t[s]=r[s];delete t.rest}return i.matchGrammar(e,a,t,0,0,!1),a},hooks:{all:{},add:function(e,t){var n=i.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=i.hooks.all[e];if(n&&n.length)for(var a,r=0;a=n[r++];)a(t)}}},a=i.Token=function(e,t,n,i,a){this.type=e,this.content=t,this.alias=n,this.length=0|(i||"").length,this.greedy=!!a};if(a.stringify=function(e,t,n){if("string"==typeof e)return e;if("Array"===i.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var r={type:e.type,content:a.stringify(e.content,t,n),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:n};if(e.alias){var s="Array"===i.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(r.classes,s)}i.hooks.run("wrap",r);var o=Object.keys(r.attributes).map(function(e){return e+'="'+(r.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+r.tag+' class="'+r.classes.join(" ")+'"'+(o?" "+o:"")+">"+r.content+"</"+r.tag+">"},!n.document)return n.addEventListener?(i.disableWorkerMessageHandler||n.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,s=t.immediateClose;n.postMessage(i.highlight(r,i.languages[a],a)),s&&n.close()},!1),n.Prism):n.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(i.filename=r.src,i.manual||r.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(i.highlightAll):window.setTimeout(i.highlightAll,16):document.addEventListener("DOMContentLoaded",i.highlightAll))),n.Prism}();void 0!==e&&e.exports&&(e.exports=i),void 0!==t&&(t.Prism=i),i.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/(^|[^\\])["']/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},i.languages.markup.tag.inside["attr-value"].inside.entity=i.languages.markup.entity,i.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),i.languages.xml=i.languages.markup,i.languages.html=i.languages.markup,i.languages.mathml=i.languages.markup,i.languages.svg=i.languages.markup,i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(?:;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^{}\s][^{};]*?(?=\s*\{)/,string:{pattern:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},i.languages.css.atrule.inside.rest=i.languages.css,i.languages.markup&&(i.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:i.languages.css,alias:"language-css",greedy:!0}}),i.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:i.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:i.languages.css}},alias:"language-css"}},i.languages.markup.tag)),i.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},i.languages.javascript=i.languages.extend("clike",{keyword:/\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,function:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),i.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,alias:"function"},constant:/\b[A-Z][A-Z\d_]*\b/}),i.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\${[^}]+}/,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}}}),i.languages.javascript["template-string"].inside.interpolation.inside.rest=i.languages.javascript,i.languages.markup&&i.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:i.languages.javascript,alias:"language-javascript",greedy:!0}}),i.languages.js=i.languages.javascript,"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,a=t.getAttribute("data-src"),r=t,s=/\blang(?:uage)?-([\w-]+)\b/i;r&&!s.test(r.className);)r=r.parentNode;if(r&&(n=(t.className.match(s)||[,""])[1]),!n){var o=(a.match(/\.(\w+)$/)||[,""])[1];n=e[o]||o}var l=document.createElement("code");l.className="language-"+n,t.textContent="",l.textContent="Loading…",t.appendChild(l);var h=new XMLHttpRequest;h.open("GET",a,!0),h.onreadystatechange=function(){4==h.readyState&&(h.status<400&&h.responseText?(l.textContent=h.responseText,i.highlightElement(l)):h.status>=400?l.textContent="✖ Error "+h.status+" while fetching file: "+h.statusText:l.textContent="✖ Error: File does not exist or is empty")},h.send(null)}),i.plugins.toolbar&&i.plugins.toolbar.registerButton("download-file",function(e){var t=e.element.parentNode;if(t&&/pre/i.test(t.nodeName)&&t.hasAttribute("data-src")&&t.hasAttribute("data-download-link")){var n=t.getAttribute("data-src"),i=document.createElement("a");return i.textContent=t.getAttribute("data-download-link-label")||"Download",i.setAttribute("download",""),i.href=n,i}})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))}).call(this,n(58))},function(e,t,n){(e.exports=n(54)(!1)).push([e.i,'/**\n * okaidia theme for JavaScript, CSS and HTML\n * Loosely based on Monokai textmate theme by http://www.monokai.nl/\n * @author ocodia\n */\n\ncode[class*="language-"],\npre[class*="language-"] {\n\tcolor: #f8f8f2;\n\tbackground: none;\n\ttext-shadow: 0 1px rgba(0, 0, 0, 0.3);\n\tfont-family: Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\n/* Code blocks */\npre[class*="language-"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n\tborder-radius: 0.3em;\n}\n\n:not(pre) > code[class*="language-"],\npre[class*="language-"] {\n\tbackground: #272822;\n}\n\n/* Inline code */\n:not(pre) > code[class*="language-"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #f8f8f2;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #f92672;\n}\n\n.token.boolean,\n.token.number {\n\tcolor: #ae81ff;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #a6e22e;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n\tcolor: #f8f8f2;\n}\n\n.token.atrule,\n.token.attr-value,\n.token.function,\n.token.class-name {\n\tcolor: #e6db74;\n}\n\n.token.keyword {\n\tcolor: #66d9ef;\n}\n\n.token.regex,\n.token.important {\n\tcolor: #fd971f;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n',""])},function(e,t,n){(e.exports=n(54)(!1)).push([e.i,'@font-face {\n  font-family: octicons-link;\n  src: url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAZwABAAAAAACFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEU0lHAAAGaAAAAAgAAAAIAAAAAUdTVUIAAAZcAAAACgAAAAoAAQAAT1MvMgAAAyQAAABJAAAAYFYEU3RjbWFwAAADcAAAAEUAAACAAJThvmN2dCAAAATkAAAABAAAAAQAAAAAZnBnbQAAA7gAAACyAAABCUM+8IhnYXNwAAAGTAAAABAAAAAQABoAI2dseWYAAAFsAAABPAAAAZwcEq9taGVhZAAAAsgAAAA0AAAANgh4a91oaGVhAAADCAAAABoAAAAkCA8DRGhtdHgAAAL8AAAADAAAAAwGAACfbG9jYQAAAsAAAAAIAAAACABiATBtYXhwAAACqAAAABgAAAAgAA8ASm5hbWUAAAToAAABQgAAAlXu73sOcG9zdAAABiwAAAAeAAAAME3QpOBwcmVwAAAEbAAAAHYAAAB/aFGpk3jaTY6xa8JAGMW/O62BDi0tJLYQincXEypYIiGJjSgHniQ6umTsUEyLm5BV6NDBP8Tpts6F0v+k/0an2i+itHDw3v2+9+DBKTzsJNnWJNTgHEy4BgG3EMI9DCEDOGEXzDADU5hBKMIgNPZqoD3SilVaXZCER3/I7AtxEJLtzzuZfI+VVkprxTlXShWKb3TBecG11rwoNlmmn1P2WYcJczl32etSpKnziC7lQyWe1smVPy/Lt7Kc+0vWY/gAgIIEqAN9we0pwKXreiMasxvabDQMM4riO+qxM2ogwDGOZTXxwxDiycQIcoYFBLj5K3EIaSctAq2kTYiw+ymhce7vwM9jSqO8JyVd5RH9gyTt2+J/yUmYlIR0s04n6+7Vm1ozezUeLEaUjhaDSuXHwVRgvLJn1tQ7xiuVv/ocTRF42mNgZGBgYGbwZOBiAAFGJBIMAAizAFoAAABiAGIAznjaY2BkYGAA4in8zwXi+W2+MjCzMIDApSwvXzC97Z4Ig8N/BxYGZgcgl52BCSQKAA3jCV8CAABfAAAAAAQAAEB42mNgZGBg4f3vACQZQABIMjKgAmYAKEgBXgAAeNpjYGY6wTiBgZWBg2kmUxoDA4MPhGZMYzBi1AHygVLYQUCaawqDA4PChxhmh/8ODDEsvAwHgMKMIDnGL0x7gJQCAwMAJd4MFwAAAHjaY2BgYGaA4DAGRgYQkAHyGMF8NgYrIM3JIAGVYYDT+AEjAwuDFpBmA9KMDEwMCh9i/v8H8sH0/4dQc1iAmAkALaUKLgAAAHjaTY9LDsIgEIbtgqHUPpDi3gPoBVyRTmTddOmqTXThEXqrob2gQ1FjwpDvfwCBdmdXC5AVKFu3e5MfNFJ29KTQT48Ob9/lqYwOGZxeUelN2U2R6+cArgtCJpauW7UQBqnFkUsjAY/kOU1cP+DAgvxwn1chZDwUbd6CFimGXwzwF6tPbFIcjEl+vvmM/byA48e6tWrKArm4ZJlCbdsrxksL1AwWn/yBSJKpYbq8AXaaTb8AAHja28jAwOC00ZrBeQNDQOWO//sdBBgYGRiYWYAEELEwMTE4uzo5Zzo5b2BxdnFOcALxNjA6b2ByTswC8jYwg0VlNuoCTWAMqNzMzsoK1rEhNqByEyerg5PMJlYuVueETKcd/89uBpnpvIEVomeHLoMsAAe1Id4AAAAAAAB42oWQT07CQBTGv0JBhagk7HQzKxca2sJCE1hDt4QF+9JOS0nbaaYDCQfwCJ7Au3AHj+LO13FMmm6cl7785vven0kBjHCBhfpYuNa5Ph1c0e2Xu3jEvWG7UdPDLZ4N92nOm+EBXuAbHmIMSRMs+4aUEd4Nd3CHD8NdvOLTsA2GL8M9PODbcL+hD7C1xoaHeLJSEao0FEW14ckxC+TU8TxvsY6X0eLPmRhry2WVioLpkrbp84LLQPGI7c6sOiUzpWIWS5GzlSgUzzLBSikOPFTOXqly7rqx0Z1Q5BAIoZBSFihQYQOOBEdkCOgXTOHA07HAGjGWiIjaPZNW13/+lm6S9FT7rLHFJ6fQbkATOG1j2OFMucKJJsxIVfQORl+9Jyda6Sl1dUYhSCm1dyClfoeDve4qMYdLEbfqHf3O/AdDumsjAAB42mNgYoAAZQYjBmyAGYQZmdhL8zLdDEydARfoAqIAAAABAAMABwAKABMAB///AA8AAQAAAAAAAAAAAAAAAAABAAAAAA==) format(\'woff\');\n}\n\n.markdown-body {\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n  line-height: 1.5;\n  color: #24292e;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  font-size: 16px;\n  line-height: 1.5;\n  word-wrap: break-word;\n}\n\n.markdown-body .pl-c {\n  color: #6a737d;\n}\n\n.markdown-body .pl-c1,\n.markdown-body .pl-s .pl-v {\n  color: #005cc5;\n}\n\n.markdown-body .pl-e,\n.markdown-body .pl-en {\n  color: #6f42c1;\n}\n\n.markdown-body .pl-smi,\n.markdown-body .pl-s .pl-s1 {\n  color: #24292e;\n}\n\n.markdown-body .pl-ent {\n  color: #22863a;\n}\n\n.markdown-body .pl-k {\n  color: #d73a49;\n}\n\n.markdown-body .pl-s,\n.markdown-body .pl-pds,\n.markdown-body .pl-s .pl-pse .pl-s1,\n.markdown-body .pl-sr,\n.markdown-body .pl-sr .pl-cce,\n.markdown-body .pl-sr .pl-sre,\n.markdown-body .pl-sr .pl-sra {\n  color: #032f62;\n}\n\n.markdown-body .pl-v,\n.markdown-body .pl-smw {\n  color: #e36209;\n}\n\n.markdown-body .pl-bu {\n  color: #b31d28;\n}\n\n.markdown-body .pl-ii {\n  color: #fafbfc;\n  background-color: #b31d28;\n}\n\n.markdown-body .pl-c2 {\n  color: #fafbfc;\n  background-color: #d73a49;\n}\n\n.markdown-body .pl-c2::before {\n  content: "^M";\n}\n\n.markdown-body .pl-sr .pl-cce {\n  font-weight: bold;\n  color: #22863a;\n}\n\n.markdown-body .pl-ml {\n  color: #735c0f;\n}\n\n.markdown-body .pl-mh,\n.markdown-body .pl-mh .pl-en,\n.markdown-body .pl-ms {\n  font-weight: bold;\n  color: #005cc5;\n}\n\n.markdown-body .pl-mi {\n  font-style: italic;\n  color: #24292e;\n}\n\n.markdown-body .pl-mb {\n  font-weight: bold;\n  color: #24292e;\n}\n\n.markdown-body .pl-md {\n  color: #b31d28;\n  background-color: #ffeef0;\n}\n\n.markdown-body .pl-mi1 {\n  color: #22863a;\n  background-color: #f0fff4;\n}\n\n.markdown-body .pl-mc {\n  color: #e36209;\n  background-color: #ffebda;\n}\n\n.markdown-body .pl-mi2 {\n  color: #f6f8fa;\n  background-color: #005cc5;\n}\n\n.markdown-body .pl-mdr {\n  font-weight: bold;\n  color: #6f42c1;\n}\n\n.markdown-body .pl-ba {\n  color: #586069;\n}\n\n.markdown-body .pl-sg {\n  color: #959da5;\n}\n\n.markdown-body .pl-corl {\n  text-decoration: underline;\n  color: #032f62;\n}\n\n.markdown-body .octicon {\n  display: inline-block;\n  vertical-align: text-top;\n  fill: currentColor;\n}\n\n.markdown-body a {\n  background-color: transparent;\n}\n\n.markdown-body a:active,\n.markdown-body a:hover {\n  outline-width: 0;\n}\n\n.markdown-body strong {\n  font-weight: inherit;\n}\n\n.markdown-body strong {\n  font-weight: bolder;\n}\n\n.markdown-body h1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n.markdown-body img {\n  border-style: none;\n}\n\n.markdown-body code,\n.markdown-body kbd,\n.markdown-body pre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n.markdown-body hr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible;\n}\n\n.markdown-body input {\n  font: inherit;\n  margin: 0;\n}\n\n.markdown-body input {\n  overflow: visible;\n}\n\n.markdown-body [type="checkbox"] {\n  box-sizing: border-box;\n  padding: 0;\n}\n\n.markdown-body * {\n  box-sizing: border-box;\n}\n\n.markdown-body input {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n\n.markdown-body a {\n  color: #0366d6;\n  text-decoration: none;\n}\n\n.markdown-body a:hover {\n  text-decoration: underline;\n}\n\n.markdown-body strong {\n  font-weight: 600;\n}\n\n.markdown-body hr {\n  height: 0;\n  margin: 15px 0;\n  overflow: hidden;\n  background: transparent;\n  border: 0;\n  border-bottom: 1px solid #dfe2e5;\n}\n\n.markdown-body hr::before {\n  display: table;\n  content: "";\n}\n\n.markdown-body hr::after {\n  display: table;\n  clear: both;\n  content: "";\n}\n\n.markdown-body table {\n  border-spacing: 0;\n  border-collapse: collapse;\n}\n\n.markdown-body td,\n.markdown-body th {\n  padding: 0;\n}\n\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3,\n.markdown-body h4,\n.markdown-body h5,\n.markdown-body h6 {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.markdown-body h1 {\n  font-size: 32px;\n  font-weight: 600;\n}\n\n.markdown-body h2 {\n  font-size: 24px;\n  font-weight: 600;\n}\n\n.markdown-body h3 {\n  font-size: 20px;\n  font-weight: 600;\n}\n\n.markdown-body h4 {\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.markdown-body h5 {\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.markdown-body h6 {\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.markdown-body p {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\n\n.markdown-body blockquote {\n  margin: 0;\n}\n\n.markdown-body ul,\n.markdown-body ol {\n  padding-left: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.markdown-body ol ol,\n.markdown-body ul ol {\n  list-style-type: lower-roman;\n}\n\n.markdown-body ul ul ol,\n.markdown-body ul ol ol,\n.markdown-body ol ul ol,\n.markdown-body ol ol ol {\n  list-style-type: lower-alpha;\n}\n\n.markdown-body dd {\n  margin-left: 0;\n}\n\n.markdown-body code {\n  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;\n  font-size: 12px;\n}\n\n.markdown-body pre {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;\n  font-size: 12px;\n}\n\n.markdown-body .octicon {\n  vertical-align: text-bottom;\n}\n\n.markdown-body .pl-0 {\n  padding-left: 0 !important;\n}\n\n.markdown-body .pl-1 {\n  padding-left: 4px !important;\n}\n\n.markdown-body .pl-2 {\n  padding-left: 8px !important;\n}\n\n.markdown-body .pl-3 {\n  padding-left: 16px !important;\n}\n\n.markdown-body .pl-4 {\n  padding-left: 24px !important;\n}\n\n.markdown-body .pl-5 {\n  padding-left: 32px !important;\n}\n\n.markdown-body .pl-6 {\n  padding-left: 40px !important;\n}\n\n.markdown-body::before {\n  display: table;\n  content: "";\n}\n\n.markdown-body::after {\n  display: table;\n  clear: both;\n  content: "";\n}\n\n.markdown-body>*:first-child {\n  margin-top: 0 !important;\n}\n\n.markdown-body>*:last-child {\n  margin-bottom: 0 !important;\n}\n\n.markdown-body a:not([href]) {\n  color: inherit;\n  text-decoration: none;\n}\n\n.markdown-body .anchor {\n  float: left;\n  padding-right: 4px;\n  margin-left: -20px;\n  line-height: 1;\n}\n\n.markdown-body .anchor:focus {\n  outline: none;\n}\n\n.markdown-body p,\n.markdown-body blockquote,\n.markdown-body ul,\n.markdown-body ol,\n.markdown-body dl,\n.markdown-body table,\n.markdown-body pre {\n  margin-top: 0;\n  margin-bottom: 16px;\n}\n\n.markdown-body hr {\n  height: 0.25em;\n  padding: 0;\n  margin: 24px 0;\n  background-color: #e1e4e8;\n  border: 0;\n}\n\n.markdown-body blockquote {\n  padding: 0 1em;\n  color: #6a737d;\n  border-left: 0.25em solid #dfe2e5;\n}\n\n.markdown-body blockquote>:first-child {\n  margin-top: 0;\n}\n\n.markdown-body blockquote>:last-child {\n  margin-bottom: 0;\n}\n\n.markdown-body kbd {\n  display: inline-block;\n  padding: 3px 5px;\n  font-size: 11px;\n  line-height: 10px;\n  color: #444d56;\n  vertical-align: middle;\n  background-color: #fafbfc;\n  border: solid 1px #c6cbd1;\n  border-bottom-color: #959da5;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 #959da5;\n}\n\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3,\n.markdown-body h4,\n.markdown-body h5,\n.markdown-body h6 {\n  margin-top: 24px;\n  margin-bottom: 16px;\n  font-weight: 600;\n  line-height: 1.25;\n}\n\n.markdown-body h1 .octicon-link,\n.markdown-body h2 .octicon-link,\n.markdown-body h3 .octicon-link,\n.markdown-body h4 .octicon-link,\n.markdown-body h5 .octicon-link,\n.markdown-body h6 .octicon-link {\n  color: #1b1f23;\n  vertical-align: middle;\n  visibility: hidden;\n}\n\n.markdown-body h1:hover .anchor,\n.markdown-body h2:hover .anchor,\n.markdown-body h3:hover .anchor,\n.markdown-body h4:hover .anchor,\n.markdown-body h5:hover .anchor,\n.markdown-body h6:hover .anchor {\n  text-decoration: none;\n}\n\n.markdown-body h1:hover .anchor .octicon-link,\n.markdown-body h2:hover .anchor .octicon-link,\n.markdown-body h3:hover .anchor .octicon-link,\n.markdown-body h4:hover .anchor .octicon-link,\n.markdown-body h5:hover .anchor .octicon-link,\n.markdown-body h6:hover .anchor .octicon-link {\n  visibility: visible;\n}\n\n.markdown-body h1 {\n  padding-bottom: 0.3em;\n  font-size: 2em;\n  border-bottom: 1px solid #eaecef;\n}\n\n.markdown-body h2 {\n  padding-bottom: 0.3em;\n  font-size: 1.5em;\n  border-bottom: 1px solid #eaecef;\n}\n\n.markdown-body h3 {\n  font-size: 1.25em;\n}\n\n.markdown-body h4 {\n  font-size: 1em;\n}\n\n.markdown-body h5 {\n  font-size: 0.875em;\n}\n\n.markdown-body h6 {\n  font-size: 0.85em;\n  color: #6a737d;\n}\n\n.markdown-body ul,\n.markdown-body ol {\n  padding-left: 2em;\n}\n\n.markdown-body ul ul,\n.markdown-body ul ol,\n.markdown-body ol ol,\n.markdown-body ol ul {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.markdown-body li {\n  word-wrap: break-all;\n}\n\n.markdown-body li>p {\n  margin-top: 16px;\n}\n\n.markdown-body li+li {\n  margin-top: 0.25em;\n}\n\n.markdown-body dl {\n  padding: 0;\n}\n\n.markdown-body dl dt {\n  padding: 0;\n  margin-top: 16px;\n  font-size: 1em;\n  font-style: italic;\n  font-weight: 600;\n}\n\n.markdown-body dl dd {\n  padding: 0 16px;\n  margin-bottom: 16px;\n}\n\n.markdown-body table {\n  display: block;\n  width: 100%;\n  overflow: auto;\n}\n\n.markdown-body table th {\n  font-weight: 600;\n}\n\n.markdown-body table th,\n.markdown-body table td {\n  padding: 6px 13px;\n  border: 1px solid #dfe2e5;\n}\n\n.markdown-body table tr {\n  background-color: #fff;\n  border-top: 1px solid #c6cbd1;\n}\n\n.markdown-body table tr:nth-child(2n) {\n  background-color: #f6f8fa;\n}\n\n.markdown-body img {\n  max-width: 100%;\n  box-sizing: content-box;\n  background-color: #fff;\n}\n\n.markdown-body img[align=right] {\n  padding-left: 20px;\n}\n\n.markdown-body img[align=left] {\n  padding-right: 20px;\n}\n\n.markdown-body code {\n  padding: 0.2em 0.4em;\n  margin: 0;\n  font-size: 85%;\n  background-color: rgba(27,31,35,0.05);\n  border-radius: 3px;\n}\n\n.markdown-body pre {\n  word-wrap: normal;\n}\n\n.markdown-body pre>code {\n  padding: 0;\n  margin: 0;\n  font-size: 100%;\n  word-break: normal;\n  white-space: pre;\n  background: transparent;\n  border: 0;\n}\n\n.markdown-body .highlight {\n  margin-bottom: 16px;\n}\n\n.markdown-body .highlight pre {\n  margin-bottom: 0;\n  word-break: normal;\n}\n\n.markdown-body .highlight pre,\n.markdown-body pre {\n  padding: 16px;\n  overflow: auto;\n  font-size: 85%;\n  line-height: 1.45;\n  background-color: #f6f8fa;\n  border-radius: 3px;\n}\n\n.markdown-body pre code {\n  display: inline;\n  max-width: auto;\n  padding: 0;\n  margin: 0;\n  overflow: visible;\n  line-height: inherit;\n  word-wrap: normal;\n  background-color: transparent;\n  border: 0;\n}\n\n.markdown-body .full-commit .btn-outline:not(:disabled):hover {\n  color: #005cc5;\n  border-color: #005cc5;\n}\n\n.markdown-body kbd {\n  display: inline-block;\n  padding: 3px 5px;\n  font: 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;\n  line-height: 10px;\n  color: #444d56;\n  vertical-align: middle;\n  background-color: #fafbfc;\n  border: solid 1px #d1d5da;\n  border-bottom-color: #c6cbd1;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 #c6cbd1;\n}\n\n.markdown-body :checked+.radio-label {\n  position: relative;\n  z-index: 1;\n  border-color: #0366d6;\n}\n\n.markdown-body .task-list-item {\n  list-style-type: none;\n}\n\n.markdown-body .task-list-item+.task-list-item {\n  margin-top: 3px;\n}\n\n.markdown-body .task-list-item input {\n  margin: 0 0.2em 0.25em -1.6em;\n  vertical-align: middle;\n}\n\n.markdown-body hr {\n  border-bottom-color: #eee;\n}\n',""])},function(e,t,n){const{BaseService:i}=n(10),a=n(55);e.exports=new class extends i{constructor(){super(),this.store=a,this.baseUrl="/auth"}async login(e,t){return this.request({url:`${this.baseUrl}/login`,fetchOptions:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})},onLoading:t=>this.store.setAuthLoading(t,e),onLoad:e=>this.store.setAuthLoaded(e.body),onError:e=>this.store.setAuthError(e)})}logout(){return this.request({url:`${this.baseUrl}/logout`,onLoading:e=>{},onLoad:e=>this.store.logout(),onError:e=>console.error(e)})}getUserOrgs(){return this.request({url:`${this.baseUrl}/organizations`,onLoading:e=>this.store.setOrgsLoading(e),onLoad:e=>{e.body&&e.body.sort((e,t)=>e.displayName.toLowerCase()<t.displayName.toLowerCase()?-1:e.displayName.toLowerCase()>t.displayName.toLowerCase()?1:0),this.store.setOrgsLoaded(e.body)},onError:e=>this.store.setOrgsError(e)})}}},function(e,t,n){const{BaseModel:i}=n(10),a=n(120),r=n(55);e.exports=new class extends i{constructor(){super(),this.store=r,this.service=a,this.register("AuthModel"),"undefined"!=typeof APP_CONFIG&&APP_CONFIG.user&&(this.store.setAuthLoaded({username:APP_CONFIG.user}),this.getUserOrganizations())}get(){return this.store.data.auth}async login(e,t){await this.service.login(e,t),"loggedIn"===this.store.data.auth.state&&void 0!==typeof window&&window.location.reload()}async logout(){await this.service.logout(),void 0!==typeof window&&window.location.reload()}async getUserOrganizations(e=!1){return(e||this.store.data.organizations.state===this.store.STATE.INIT)&&this.service.getUserOrgs(),this.store.data.organizations.state===this.store.STATE.LOADING&&await this.store.data.organizations.request,this.store.data.organizations}authorizeGithub(){void 0!==typeof window&&(window.location="/auth/github-authorize")}revokeGithub(){void 0!==typeof window&&(window.location="/auth/github-revoke")}}},function(e,t,n){const{BaseService:i}=n(10),a=n(56);e.exports=new class extends i{constructor(){super(),this.store=a,this.baseUrl="/api/stats"}get(){return this.request({url:this.baseUrl,checkCached:()=>!!this.store.data,onLoading:e=>this.store.setLoading(e),onLoad:e=>this.store.setLoaded(e.body),onError:e=>this.store.setError(e)})}}},function(e,t,n){const{BaseModel:i}=n(10),a=n(122),r=n(56);e.exports=new class extends i{constructor(){super(),this.store=r,this.service=a,this.register("StatsModel")}async get(){return await this.service.get(),this.store.data}}},function(e,t,n){const{BaseService:i}=n(10),a=n(57);e.exports=new class extends i{constructor(){super(),this.store=a,this.baseUrl="/api/search",this.currentSearchId=0}async search(e){this.currentSearchId++;let t=this.currentSearchId;return this.request({url:this.baseUrl,fetchOptions:{method:"POST",body:e},json:!0,onLoading:n=>{this._isCurrentSearch(t)&&this.store.setSearchLoading(n,e)},onLoad:n=>{this._isCurrentSearch(t)&&this.store.setSearchSuccess(n.body,e)},onError:n=>{this._isCurrentSearch(t)&&this.store.setSearchError(n,e)}})}_isCurrentSearch(e){return e===this.currentSearchId}async getOwnerPackages(e){return this.request({url:this.baseUrl+"/owner",fetchOptions:{method:"POST",body:e},json:!0})}}},function(e,t,n){const{BaseModel:i}=n(10),a=n(124),r=n(57);let s,o;s="undefined"!=typeof decodeURIComponent?decodeURIComponent:e=>e,o="undefined"!=typeof encodeURIComponent?encodeURIComponent:e=>e;e.exports=new class extends i{constructor(){super(),this.store=r,this.service=a,this.EventBus.on("app-state-update",e=>{"search"===e.page&&this.search(this.fromUrl(window.location.pathname))}),this.register("SearchModel")}getEmptyQuery(){return{text:"",filters:[],sort:null,limit:10,offset:0}}toUrl(e){return e||(e=this.getQuery()),"/search/"+[o(e.text||""),o(e.filters?JSON.stringify(e.filters):""),o(e.sort||""),e.limit||"",e.offset||""].join("/")}fromUrl(e){"string"==typeof e&&(e=e.replace(/^\//,"").split("/"));let t=e.slice(0);t.length&&"search"===t[0]&&t.shift();let n=this.getEmptyQuery(),i=0;for(;t.length>0;){let e=s(t.splice(0,1)[0]);switch(i){case 0:n.text=e;break;case 1:n.filters=e?JSON.parse(e):[];break;case 2:n.sort=e||null;break;case 3:n.limit=e?parseInt(e):10;break;case 4:n.offset=e?parseInt(e):0}i++}return n}getQuery(){let e=this.store.getSearchQuery();return e||this.getEmptyQuery()}setOffset(e,t){return t||(t=this.getQuery()),t.offset=e,t}setLimit(e,t){return t||(t=this.getQuery()),t.limit=e,t}setText(e,t){return t||(t=this.getQuery()),t.text=e,t}appendFilter(e,t,n){if(n||(n=this.getQuery()),!this._hasFilter(n.filters,e,t))return n.filters.push({[e]:t}),n}removeFilter(e,t,n){n||(n=this.getQuery());let i=n.filters;for(var a=i.length-1;a>=0;a--)if(i[a][e])if(t){if(i[a][e]===t)return void i.splice(a,1)}else i.splice(a,1);return n}_hasFilter(e,t,n){for(var i=0;i<e.length;i++)if(e[i][t]===n)return!0;return!1}search(e){return this.service.search(e)}getOwnerPackages(e){let t=this.getEmptyQuery();return t.limit=1e3,this.service.getOwnerPackages(t)}}},function(e,t){var n={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},function(e,t){t.read=function(e,t,n,i,a){var r,s,o=8*a-i-1,l=(1<<o)-1,h=l>>1,c=-7,d=n?a-1:0,p=n?-1:1,u=e[t+d];for(d+=p,r=u&(1<<-c)-1,u>>=-c,c+=o;c>0;r=256*r+e[t+d],d+=p,c-=8);for(s=r&(1<<-c)-1,r>>=-c,c+=i;c>0;s=256*s+e[t+d],d+=p,c-=8);if(0===r)r=1-h;else{if(r===l)return s?NaN:1/0*(u?-1:1);s+=Math.pow(2,i),r-=h}return(u?-1:1)*s*Math.pow(2,r-i)},t.write=function(e,t,n,i,a,r){var s,o,l,h=8*r-a-1,c=(1<<h)-1,d=c>>1,p=23===a?Math.pow(2,-24)-Math.pow(2,-77):0,u=i?0:r-1,g=i?1:-1,f=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(o=isNaN(t)?1:0,s=c):(s=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-s))<1&&(s--,l*=2),(t+=s+d>=1?p/l:p*Math.pow(2,1-d))*l>=2&&(s++,l/=2),s+d>=c?(o=0,s=c):s+d>=1?(o=(t*l-1)*Math.pow(2,a),s+=d):(o=t*Math.pow(2,d-1)*Math.pow(2,a),s=0));a>=8;e[n+u]=255&o,u+=g,o/=256,a-=8);for(s=s<<a|o,h+=a;h>0;e[n+u]=255&s,u+=g,s/=256,h-=8);e[n+u-g]|=128*f}},function(e,t,n){"use strict";t.byteLength=function(e){var t=h(e),n=t[0],i=t[1];return 3*(n+i)/4-i},t.toByteArray=function(e){for(var t,n=h(e),i=n[0],s=n[1],o=new r(function(e,t,n){return 3*(t+n)/4-n}(0,i,s)),l=0,c=s>0?i-4:i,d=0;d<c;d+=4)t=a[e.charCodeAt(d)]<<18|a[e.charCodeAt(d+1)]<<12|a[e.charCodeAt(d+2)]<<6|a[e.charCodeAt(d+3)],o[l++]=t>>16&255,o[l++]=t>>8&255,o[l++]=255&t;2===s&&(t=a[e.charCodeAt(d)]<<2|a[e.charCodeAt(d+1)]>>4,o[l++]=255&t);1===s&&(t=a[e.charCodeAt(d)]<<10|a[e.charCodeAt(d+1)]<<4|a[e.charCodeAt(d+2)]>>2,o[l++]=t>>8&255,o[l++]=255&t);return o},t.fromByteArray=function(e){for(var t,n=e.length,a=n%3,r=[],s=0,o=n-a;s<o;s+=16383)r.push(c(e,s,s+16383>o?o:s+16383));1===a?(t=e[n-1],r.push(i[t>>2]+i[t<<4&63]+"==")):2===a&&(t=(e[n-2]<<8)+e[n-1],r.push(i[t>>10]+i[t>>4&63]+i[t<<2&63]+"="));return r.join("")};for(var i=[],a=[],r="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=0,l=s.length;o<l;++o)i[o]=s[o],a[s.charCodeAt(o)]=o;function h(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}function c(e,t,n){for(var a,r,s=[],o=t;o<n;o+=3)a=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(255&e[o+2]),s.push(i[(r=a)>>18&63]+i[r>>12&63]+i[r>>6&63]+i[63&r]);return s.join("")}a["-".charCodeAt(0)]=62,a["_".charCodeAt(0)]=63},function(e,t,n){(function(t){var n=function(){"use strict";function e(e,t){return null!=t&&e instanceof t}var n,i,a;try{n=Map}catch(e){n=function(){}}try{i=Set}catch(e){i=function(){}}try{a=Promise}catch(e){a=function(){}}function r(s,l,h,c,d){"object"==typeof l&&(h=l.depth,c=l.prototype,d=l.includeNonEnumerable,l=l.circular);var p=[],u=[],g=void 0!==t;return void 0===l&&(l=!0),void 0===h&&(h=1/0),function s(h,f){if(null===h)return null;if(0===f)return h;var m,v;if("object"!=typeof h)return h;if(e(h,n))m=new n;else if(e(h,i))m=new i;else if(e(h,a))m=new a(function(e,t){h.then(function(t){e(s(t,f-1))},function(e){t(s(e,f-1))})});else if(r.__isArray(h))m=[];else if(r.__isRegExp(h))m=new RegExp(h.source,o(h)),h.lastIndex&&(m.lastIndex=h.lastIndex);else if(r.__isDate(h))m=new Date(h.getTime());else{if(g&&t.isBuffer(h))return m=t.allocUnsafe?t.allocUnsafe(h.length):new t(h.length),h.copy(m),m;e(h,Error)?m=Object.create(h):void 0===c?(v=Object.getPrototypeOf(h),m=Object.create(v)):(m=Object.create(c),v=c)}if(l){var y=p.indexOf(h);if(-1!=y)return u[y];p.push(h),u.push(m)}for(var b in e(h,n)&&h.forEach(function(e,t){var n=s(t,f-1),i=s(e,f-1);m.set(n,i)}),e(h,i)&&h.forEach(function(e){var t=s(e,f-1);m.add(t)}),h){var _;v&&(_=Object.getOwnPropertyDescriptor(v,b)),_&&null==_.set||(m[b]=s(h[b],f-1))}if(Object.getOwnPropertySymbols){var w=Object.getOwnPropertySymbols(h);for(b=0;b<w.length;b++){var x=w[b];(!(z=Object.getOwnPropertyDescriptor(h,x))||z.enumerable||d)&&(m[x]=s(h[x],f-1),z.enumerable||Object.defineProperty(m,x,{enumerable:!1}))}}if(d){var k=Object.getOwnPropertyNames(h);for(b=0;b<k.length;b++){var z,S=k[b];(z=Object.getOwnPropertyDescriptor(h,S))&&z.enumerable||(m[S]=s(h[S],f-1),Object.defineProperty(m,S,{enumerable:!1}))}}return m}(s,h)}function s(e){return Object.prototype.toString.call(e)}function o(e){var t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),t}return r.clonePrototype=function(e){if(null===e)return null;var t=function(){};return t.prototype=e,new t},r.__objToStr=s,r.__isDate=function(e){return"object"==typeof e&&"[object Date]"===s(e)},r.__isArray=function(e){return"object"==typeof e&&"[object Array]"===s(e)},r.__isRegExp=function(e){return"object"==typeof e&&"[object RegExp]"===s(e)},r.__getRegExpFlags=o,r}();"object"==typeof e&&e.exports&&(e.exports=n)}).call(this,n(44).Buffer)},function(e,t,n){const{BaseService:i}=n(10),a=n(59);n(45);e.exports=new class extends i{constructor(){super(),this.store=a,this.baseUrl="/api/package"}isNameAvailable(e,t=""){return t&&(t="?org="+t),this.request({url:`${this.baseUrl}/available/${e}${t}`})}syncRegProps(e){return this.request({url:`${this.baseUrl}/${e}/syncRegProps`,onLoad:e=>this.store.setData({description:e.body.description,overview:e.body.overview,releases:e.body.releases,releaseCount:e.body.releaseCount},{merge:!0})})}}},function(e,t,n){const{BaseModel:i}=n(10),a=n(130),r=n(59);e.exports=new class extends i{constructor(){super(),this.store=r,this.service=a,this.register("PackageEditor")}syncRegProps(e){return this.service.syncRegProps(e)}async isNameAvailable(e,t){try{let{body:n}=await this.service.isNameAvailable(e,t);return n.isAvailable}catch(e){console.error(e)}return!1}setData(e,t={}){this.store.setData(e,t)}setEditStartStateData(e){this.store.setEditStartStateData(e)}hasDataChanged(){return this.store.hasDataChanged()}getData(){return this.store.data.package.payload}reset(){this.store.reset()}}},function(e,t){e.exports=(e=>{let t={"@context":"http://schema.org","@type":"dataset",provider:{"@type":"Organization",url:"https://ecosml.org",name:"EcoSML",description:"EcoSML is a repository for the spectral models that can used to predict variables of interest from spectral data."},name:e.name,description:e.overview,url:"https://ecosml.org/package/"+e.id,datePublished:e.createdAt,genre:"spectroscopy",distribution:[{"@type":"DataDownload",name:"EcoSML Webpage",contentUrl:"https://ecosml.org/package/"+e.id},{"@type":"DataDownload",name:"Git Access",contentUrl:e.htmlUrl.replace(/^https?/,"git")+".git"},{"@type":"DataDownload",name:"Releases",contentUrl:e.htmlUrl+"/releases"}],author:{name:e.owner},keywords:e.keywords||[]};return e.organizationInfo&&(e.publisher={"@type":"Organization",name:e.organizationInfo.displayName,description:e.organizationInfo.description,image:e.organizationInfo.logo}),t})},function(e,t){e.exports={package:{name:{type:String,label:"Name"},overview:{type:String,label:"",description:""},description:{type:String,label:"Description",description:"Long package description.  Markdown supported."},keywords:{type:Array,label:"Keywords",description:"Faceted keywords for package discovery"}}}},function(e,t,n){const{BaseService:i}=n(10),a=n(45);e.exports=new class extends i{constructor(){super(),this.store=a,this.baseUrl="/api/package"}async create(e,t,n,i,a,r){let s={name:e,overview:t,organization:n,language:i,packageType:a,source:r};return console.log(s),this.request({url:this.baseUrl,fetchOptions:{method:"POST",body:s},json:!0,onLoading:e=>this.store.setCreatePackageLoading(e,s),onLoad:e=>this.store.setCreatePackageSuccess(e.body),onError:e=>this.store.setCreatePackageError(e)})}async update(e,t,n){let i={update:t,message:n};return this.request({url:this.baseUrl+"/"+e,fetchOptions:{method:"PATCH",body:i},json:!0,onLoading:e=>this.store.setUpdatePackageLoading(e,i),onLoad:e=>this.store.setUpdatePackageSuccess(e.body),onError:e=>this.store.setUpdatePackageError(e)})}async createRelease(e,t){return this.request({url:`${this.baseUrl}/${e}/createRelease`,fetchOptions:{method:"POST",body:t},json:!0,onLoading:e=>this.store.setCreateReleaseLoading(e,t),onLoad:e=>this.store.setCreateReleaseSuccess(e.body),onError:e=>this.store.setCreateReleaseError(e)})}async get(e){return this.request({url:`${this.baseUrl}/${e}`,onLoading:t=>this.store.setGetPackageLoading(e,t),onLoad:t=>this.store.setGetPackageSuccess(e,t.body),onError:t=>this.store.setGetPackageError(e,t)})}async getFiles(e){return this.request({url:`${this.baseUrl}/${e}/files`,onLoad:t=>this.store.onFilesLoaded(e,t.body.files)})}async delete(e){return this.request({url:`${this.baseUrl}/${e}`,fetchOptions:{method:"DELETE"},onLoading:t=>this.store.setDeletingPackage(t,e),onLoad:e=>this.store.setDeletePackageSuccess(e.body),onError:e=>this.store.setDeletePackageError(e)})}previewMarkdown(e,t){return this.request({url:`/api/markdown/${t}`,fetchOptions:{method:"POST",headers:{"Content-Type":"text/plain"},body:e},onLoading:e=>this.store.setMarkdownLoading(t,e),onLoad:e=>this.store.setMarkdownLoaded(t,e.body),onError:e=>this.store.setMarkdownError(t,e)})}}},function(e,t,n){var{AppStateStore:i}=n(46);e.exports=new class extends i{}},function(e,t,n){const{BaseStore:i}=n(10);e.exports=class extends i{constructor(){super(),this.data={location:{}},this.events={APP_STATE_UPDATE:"app-state-update"}}set(e){this.stateChanged(this.data,e)&&(this.data=Object.assign({},this.data,e),this.emit(this.events.APP_STATE_UPDATE,this.data))}get(){return this.data}}},function(e,t,n){var{BaseModel:i}=n(10);e.exports=class extends i{constructor(){super(),this.register("AppStateModel")}setLocationElement(e){this.locationElement=e}setLocation(e){if(!this.locationElement)return console.warn("Call to setWindowLocation but no locationElement set");this.locationElement.setWindowLocation(e)}async get(){return this.store.data}set(e){return this.store.set(e),this.get()}}},function(e,t,n){const{AppStateModel:i}=n(46);var a=n(135);const r=n(38),s=n(132);e.exports=new class extends i{constructor(){super(),this.store=a,function(e){e||(e=location.search);var t=e.substr(1),n={};return t?(t.split("&").forEach(function(e){var t=e.split("=");t.length>1?n[t[0]]=decodeURIComponent(t[1]):n[t[0]]=!0}),n):n}()["integration-testing"]&&(window.INTEGRATION_TESTING={}),this.seoPackageId="",this.analyticsLocation=""}async set(e){if(e.location&&e.location.path&&e.location.path.length&&(e.page=e.location.path[0]),e.page||(e.page="home"),"create"===e.page&&(e.page="edit"),("edit"===e.page||"package"===e.page)&&e.location.path.length>1?e.selectedPackageId=e.location.path[1]:e.selectedPackageId="","admin"===e.page){if(!APP_CONFIG.user)return this.setLocation("/");if(!APP_CONFIG.admin)return this.setLocation("/")}this.seo(e),this.analytics(e),super.set(e)}analytics(e){void 0!==window.gtag&&void 0!==APP_CONFIG.googleAnalyticsKey&&this.analyticsLocation!==e.location.pathname&&(this.analyticsLocation=e.location.pathname,gtag("config",APP_CONFIG.googleAnalyticsKey,{page_path:e.location.pathname}))}async seo(e){let t=e.location.path||[];if(t.length>=2&&"package"===t[0]){if(t[1]!==this.seoPackageId){let e=await r.get(t[1]);e=JSON.stringify(s(e.payload),"  ","  "),this.seoPackageId=t[1],document.querySelector("#jsonld").innerHTML=e}}else this.seoPackageId="",document.querySelector("#jsonld").innerHTML=""}}},function(e,t,n){"use strict";var i=new RegExp("%[a-f0-9]{2}","gi"),a=new RegExp("(%[a-f0-9]{2})+","gi");function r(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),i=e.slice(t);return Array.prototype.concat.call([],r(n),r(i))}function s(e){try{return decodeURIComponent(e)}catch(a){for(var t=e.match(i),n=1;n<t.length;n++)t=(e=r(t,n).join("")).match(i);return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},n=a.exec(e);n;){try{t[n[0]]=decodeURIComponent(n[0])}catch(e){var i=s(n[0]);i!==n[0]&&(t[n[0]]=i)}n=a.exec(e)}t["%C2"]="�";for(var r=Object.keys(t),o=0;o<r.length;o++){var l=r[o];e=e.replace(new RegExp(l,"g"),t[l])}return e}(e)}}},function(e,t,n){"use strict";e.exports=(e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))},function(e,t){e.exports=(e=>(class extends e{_attachDom(e){if(window.ShadyDOM&&window.ShadyDOM.inUse)return super._attachDom(e);let t=e.querySelectorAll("style");for(var n=0;n<t.length;n++)t[n].parentNode.removeChild(t[n]),this._stylesInserted||(t[n].setAttribute("id",this.nodeName.toLowerCase()+"-styles"),document.head.appendChild(t[n]));return this.appendChild(e),e}querySelector(e){return this.shadowRoot?this.shadowRoot.querySelector(e):super.querySelector(e)}querySelectorAll(e){return this.shadowRoot?this.shadowRoot.querySelectorAll(e):super.querySelectorAll(e)}}))},function(e,t,n){const i=n(35),a=n(47),r=e=>(class extends e{static get properties(){return{listening:{type:Boolean}}}set bind(e){this._bind=Object.assign(this.bind,e)}get bind(){return this._bind||(this._bind={}),this._bind}constructor(){super(),this.bind={},this._eb_handlers={},this._eb_handlersSet=!1,this._eb_unregisterOnDetach=!0,this._debounce_handlers={},this.listening=!0}connectedCallback(){super.connectedCallback(),this._eb_init()}_eb_init(){if(!this._eb_handlersSet)for(var e in this._eb_handlersSet=!0,this._debugLitCorkUtils&&console.log(this.nodeName,"ready and connected to DOM, attaching event listeners",this.bind),this.bind)this[this.bind[e]]?this._eb_init_fn(e):console.warn(`${this.nodeName} could not bind event ${e} to ${this.bind[e]}`)}_eb_init_fn(e){this[this.bind[e]]=this[this.bind[e]].bind(this),this._eb_handlers[e]=((...t)=>{this.listening?(this._debugLitCorkUtils&&console.log(this.nodeName,"received event",e,", triggering function:",this.bind[e]),this[this.bind[e]].apply(this,t)):this._debugLitCorkUtils&&console.warn(this.nodeName,"ignoring",e,"event, element not listening")}),i.on(e,this._eb_handlers[e])}disconnectedCallback(){if(super.disconnectedCallback(),this._debugLitCorkUtils&&console.log(this.nodeName,"disconnected from DOM, removing event listeners"),this._eb_unregisterOnDetach&&this._eb_handlersSet)for(var e in this._eb_handlersSet=!1,this.bind){if(!this[this.bind[e]])continue;let t=i.listenerCount(e);i.removeListener(e,this._eb_handlers[e]),i.listenerCount(e)!==t-1&&console.warn(this.nodeName,"On element detach, failed to remove event listener for: ",e),this._debugLitCorkUtils&&console.log(this.nodeName,"removing event listener for:",e)}}EventBus(){return i}_injectModel(...e){e.forEach(e=>{"string"==typeof e?this._injectModelStr(e):this._bindModelObj(e)})}_injectModelStr(e){this[e]=a.getModel(e),this._bindModelObj(this[e])}_bindModelObj(e){e.events&&this._registerModelEvents(e.events),e.store&&e.store.events&&this._registerModelEvents(e.store.events)}_registerModelEvents(e){for(var t in e){var n=this._getMethodNameFromEvent(e[t]);this[n]?(this._debugLitCorkUtils&&console.log(this.nodeName,"auto-bind:",n+" -> "+e[t],!0),this.bind[e[t]]=n):this._debugLitCorkUtils&&console.log(this.nodeName,"auto-bind:",n+" -> "+e[t],!1)}}_getMethodNameFromEvent(e){return"_on"+e.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join("")}emit(e,t){i.emit(e,t)}fire(e,t={}){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}byId(e){return this.shadowRoot?this.shadowRoot.getElementById("#"+e):this.getElementById("#"+e)}updated(e){e.has("listening")&&this._onListenUpdate()}_onListenUpdate(){}});"undefined"!=typeof window&&(window.LitCorkUtils=r),e.exports=r},function(e,t,n){const i=n(35),a=n(47),r=e=>(class extends e{static get properties(){return{listening:{type:Boolean,value:!0,observer:"_onListenUpdate"}}}set bind(e){this._bind=Object.assign(this.bind,e)}get bind(){return this._bind||(this._bind={}),this._bind}constructor(){super(),this.bind={},this._eb_handlers={},this._eb_handlersSet=!1,this._eb_unregisterOnDetach=!0,this._debounce_handlers={}}ready(){super.ready(),this._eb_init()}connectedCallback(){super.connectedCallback(),this._eb_init()}_eb_init(){if(!this._eb_handlersSet)for(var e in this._eb_handlersSet=!0,this._debugEventInterface&&console.log(this.nodeName,"ready and connected to DOM, attaching event listeners",this.bind),this.bind)this[this.bind[e]]?this._eb_init_fn(e):console.warn(`${this.nodeName} could not bind event ${e} to ${this.bind[e]}`)}_eb_init_fn(e){this[this.bind[e]]=this[this.bind[e]].bind(this),this._eb_handlers[e]=((...t)=>{this.listening?(this._debugEventInterface&&console.log(this.nodeName,"received event",e,", triggering function:",this.bind[e]),this[this.bind[e]].apply(this,t)):this._debugEventInterface&&console.warn(this.nodeName,"ignoring",e,"event, element not listening")}),i.on(e,this._eb_handlers[e])}disconnectedCallback(){if(super.disconnectedCallback(),this._debugEventInterface&&console.log(this.nodeName,"disconnected from DOM, removing event listeners"),this._eb_unregisterOnDetach&&this._eb_handlersSet)for(var e in this._eb_handlersSet=!1,this.bind){if(!this[this.bind[e]])continue;let t=i.listenerCount(e);i.removeListener(e,this._eb_handlers[e]),i.listenerCount(e)!==t-1&&console.warn(this.nodeName,"On element detach, failed to remove event listener for: ",e),this._debugEventInterface&&console.log(this.nodeName,"removing event listener for:",e)}}EventBus(){return i}_injectModel(...e){e.forEach(e=>{"string"==typeof e?this._injectModelStr(e):this._bindModelObj(e)})}_injectModelStr(e){this[e]=a.getModel(e),this._bindModelObj(this[e])}_bindModelObj(e){e.events&&this._registerModelEvents(e.events),e.store&&e.store.events&&this._registerModelEvents(e.store.events)}_registerModelEvents(e){for(var t in e){var n=this._getMethodNameFromEvent(e[t]);this[n]?(this._debugEventInterface&&console.log(this.nodeName,"auto-bind:",n+" -> "+e[t],!0),this.bind[e[t]]=n):this._debugEventInterface&&console.log(this.nodeName,"auto-bind:",n+" -> "+e[t],!1)}}_getMethodNameFromEvent(e){return"_on"+e.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join("")}emit(e,t){i.emit(e,t)}fire(e,t={}){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}debounce(e,t,n){this._debounce_handlers[e]&&clearTimeout(this._debounce_handlers[e]),this._debounce_handlers[e]=setTimeout(()=>{delete this._debounce_handlers[e],t()},n)}_onListenUpdate(){}});"undefined"!=typeof window&&(window.EventInterface=r),e.exports=r},function(e,t){const n=e=>new class{constructor(e){this.superclass=e}with(...e){return e.reduce((e,t)=>t(e),this.superclass)}}(e);"undefined"!=typeof window&&(window.Mixin=n),e.exports=n},function(e,t){class n{ready(){this.listening=!0}}"undefined"!=typeof window&&(window.BaseMixin=n),e.exports=n},function(e,t,n){"use strict";n.r(t),n.d(t,"Headers",function(){return h}),n.d(t,"Request",function(){return m}),n.d(t,"Response",function(){return y}),n.d(t,"DOMException",function(){return _}),n.d(t,"fetch",function(){return w});var i={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(i.arrayBuffer)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=ArrayBuffer.isView||function(e){return e&&a.indexOf(Object.prototype.toString.call(e))>-1};function s(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function o(e){return"string"!=typeof e&&(e=String(e)),e}function l(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return i.iterable&&(t[Symbol.iterator]=function(){return t}),t}function h(e){this.map={},e instanceof h?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function c(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function d(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function p(e){var t=new FileReader,n=d(t);return t.readAsArrayBuffer(e),n}function u(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function g(){return this.bodyUsed=!1,this._initBody=function(e){var t;this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:i.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:i.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:i.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():i.arrayBuffer&&i.blob&&((t=e)&&DataView.prototype.isPrototypeOf(t))?(this._bodyArrayBuffer=u(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):i.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||r(e))?this._bodyArrayBuffer=u(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):i.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},i.blob&&(this.blob=function(){var e=c(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?c(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(p)}),this.text=function(){var e,t,n,i=c(this);if(i)return i;if(this._bodyBlob)return e=this._bodyBlob,t=new FileReader,n=d(t),t.readAsText(e),n;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),i=0;i<t.length;i++)n[i]=String.fromCharCode(t[i]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i.formData&&(this.formData=function(){return this.text().then(v)}),this.json=function(){return this.text().then(JSON.parse)},this}h.prototype.append=function(e,t){e=s(e),t=o(t);var n=this.map[e];this.map[e]=n?n+", "+t:t},h.prototype.delete=function(e){delete this.map[s(e)]},h.prototype.get=function(e){return e=s(e),this.has(e)?this.map[e]:null},h.prototype.has=function(e){return this.map.hasOwnProperty(s(e))},h.prototype.set=function(e,t){this.map[s(e)]=o(t)},h.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},h.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),l(e)},h.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),l(e)},h.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),l(e)},i.iterable&&(h.prototype[Symbol.iterator]=h.prototype.entries);var f=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function m(e,t){var n,i,a=(t=t||{}).body;if(e instanceof m){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new h(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,a||null==e._bodyInit||(a=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new h(t.headers)),this.method=(n=t.method||this.method||"GET",i=n.toUpperCase(),f.indexOf(i)>-1?i:n),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&a)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(a)}function v(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),i=n.shift().replace(/\+/g," "),a=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(i),decodeURIComponent(a))}}),t}function y(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new h(t.headers),this.url=t.url||"",this._initBody(e)}m.prototype.clone=function(){return new m(this,{body:this._bodyInit})},g.call(m.prototype),g.call(y.prototype),y.prototype.clone=function(){return new y(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},y.error=function(){var e=new y(null,{status:0,statusText:""});return e.type="error",e};var b=[301,302,303,307,308];y.redirect=function(e,t){if(-1===b.indexOf(t))throw new RangeError("Invalid status code");return new y(null,{status:t,headers:{location:e}})};var _=self.DOMException;try{new _}catch(e){(_=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack}).prototype=Object.create(Error.prototype),_.prototype.constructor=_}function w(e,t){return new Promise(function(n,a){var r=new m(e,t);if(r.signal&&r.signal.aborted)return a(new _("Aborted","AbortError"));var s=new XMLHttpRequest;function o(){s.abort()}s.onload=function(){var e,t,i={status:s.status,statusText:s.statusText,headers:(e=s.getAllResponseHeaders()||"",t=new h,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var n=e.split(":"),i=n.shift().trim();if(i){var a=n.join(":").trim();t.append(i,a)}}),t)};i.url="responseURL"in s?s.responseURL:i.headers.get("X-Request-URL");var a="response"in s?s.response:s.responseText;n(new y(a,i))},s.onerror=function(){a(new TypeError("Network request failed"))},s.ontimeout=function(){a(new TypeError("Network request failed"))},s.onabort=function(){a(new _("Aborted","AbortError"))},s.open(r.method,r.url,!0),"include"===r.credentials?s.withCredentials=!0:"omit"===r.credentials&&(s.withCredentials=!1),"responseType"in s&&i.blob&&(s.responseType="blob"),r.headers.forEach(function(e,t){s.setRequestHeader(t,e)}),r.signal&&(r.signal.addEventListener("abort",o),s.onreadystatechange=function(){4===s.readyState&&r.signal.removeEventListener("abort",o)}),s.send(void 0===r._bodyInit?null:r._bodyInit)})}w.polyfill=!0,self.fetch||(self.fetch=w,self.Headers=h,self.Request=m,self.Response=y)},function(e,t,n){const i=n(60);e.exports=class{constructor(){this.rootUrl="","undefined"!=typeof window&&(this.rootUrl=window.location.protocol+"//"+window.location.host),this.ERROR_MESSAGES={REQUEST:"Request Error",STATUS_CODE:"Invalid status code",JSON:"Invalid JSON response",APPLICATION_ERROR:"Application Error"}}async request(e){if(!e.store){if(!this.store)return console.error(new Error("No store provided"));e.store=this.store}if(e.fetchOptions||(e.fetchOptions={}),e.fetchOptions.credentials||(e.fetchOptions.credentials="include"),e.json&&e.fetchOptions&&e.fetchOptions.body&&"object"==typeof e.fetchOptions.body&&(e.fetchOptions.body=JSON.stringify(e.fetchOptions.body),e.fetchOptions.headers||(e.fetchOptions.headers={}),e.fetchOptions.headers["Content-Type"]="application/json"),e.qs){let n=[];for(var t in e.qs)n.push(`${t}=${e.qs[t]}`);e.url+="?"+n.join("&")}if(e.checkCached){var n=e.checkCached();if(this.isLoaded(n))return n;if(this.isLoading(n)){if(!n.request)throw new Error("checkCached set but no request object found",n);return n.request}}let i=this._request(e);return e.onLoading&&e.onLoading(i),await i}_request(e){return e.fetchOptions||(e.fetchOptions={}),new Promise(async(t,n)=>{var a=null;try{a=await i(e.url,e.fetchOptions)}catch(t){return this._handleError(e,n,{error:!0,details:t,response:a,message:this.ERROR_MESSAGES.REQUEST})}if(a.status<200||a.status>299)return this._handleError(e,n,{error:!0,response:a,message:this.ERROR_MESSAGES.STATUS_CODE});if(a.headers.has("Content-Type")&&a.headers.get("Content-Type").match(/application\/json/i)){var r=null;try{r=await a.json()}catch(t){return this._handleError(e,n,{error:!0,details:t,response:a,message:this.ERROR_MESSAGES.JSON})}if(r.error)return this._handleError(e,n,{error:!0,details:r,response:a,message:this.ERROR_MESSAGES.APPLICATION_ERROR})}else r=await a.text();e.onLoad&&e.onLoad({response:a,body:r}),t({response:a,body:r})})}async _handleError(e,t,n){if(n.response&&!n.payload)if(n.response.headers.has("Content-Type")&&n.response.headers.get("Content-Type").match(/application\/json/i))try{n.payload=await n.response.json()}catch(e){n.payload={}}else n.payload=await n.response.text();e.onError&&e.onError(n),t(n)}isLoaded(e){return this.store?!(!e||e.state!==this.store.STATE.LOADED):console.warn("Checking LOADED state but no store set for service")}isLoading(e){return this.store?!(!e||e.state!==this.store.STATE.LOADING):console.warn("Checking LOADED state but no store set for service")}}},function(e,t,n){"use strict";var i=Array.isArray,a=Object.keys,r=Object.prototype.hasOwnProperty;e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){var s,o,l,h=i(t),c=i(n);if(h&&c){if((o=t.length)!=n.length)return!1;for(s=o;0!=s--;)if(!e(t[s],n[s]))return!1;return!0}if(h!=c)return!1;var d=t instanceof Date,p=n instanceof Date;if(d!=p)return!1;if(d&&p)return t.getTime()==n.getTime();var u=t instanceof RegExp,g=n instanceof RegExp;if(u!=g)return!1;if(u&&g)return t.toString()==n.toString();var f=a(t);if((o=f.length)!==a(n).length)return!1;for(s=o;0!=s--;)if(!r.call(n,f[s]))return!1;for(s=o;0!=s--;)if(!e(t[l=f[s]],n[l]))return!1;return!0}return t!=t&&n!=n}},function(e,t,n){const i=n(35),a=n(148);e.exports=class{constructor(){this.STATE={INIT:"init",LOADING:"loading",LOADED:"loaded",ERROR:"error",SAVING:"saving",SAVE_ERROR:"save-error",SAVE_SUCCESS:"save-success",DELETING:"deleting",DELETE_ERROR:"delete-error",DELETED:"deleted"}}get EventBus(){return i}emit(e,t){setTimeout(()=>{i.emit(e,t)},0)}stateChanged(e,t){return!((e||!t)&&(!e||t)&&(!e&&!t||e.state===t.state&&a(e,t)))}}},function(e,t,n){const i=n(35),a=n(47);e.exports=class{get EventBus(){return i}register(e){e||console.warn("Name not passed to register().  This will fail in IE, cause, you know, IE.");var t=e||this.__proto__.constructor.name;a.registerModel(t,this)}emit(e,t){setTimeout(()=>{i.emit(e,t)},0)}}}]);