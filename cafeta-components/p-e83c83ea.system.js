var __extends=this&&this.__extends||function(){var e=function(t,i){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)if(t.hasOwnProperty(i))e[i]=t[i]};return e(t,i)};return function(t,i){e(t,i);function n(){this.constructor=t}t.prototype=i===null?Object.create(i):(n.prototype=i.prototype,new n)}}();System.register(["./p-595df214.system.js"],(function(e){"use strict";var t,i,n,r,o,a,s,u,d,c,l,g,h,p,f,M,x,m,v,w,b,T,y,_,I,D;return{setters:[function(e){t=e.E;i=e.G;n=e.H;r=e.J;o=e.V;a=e.B;s=e.L;u=e.F;d=e.K;c=e.w;l=e.N;g=e.D;h=e.C;p=e.s;f=e.P;M=e.O;x=e.Q;m=e.S;v=e.y;w=e.U;b=e.R;T=e.n;y=e.M;_=e.X;I=e.Y;D=e.I}],execute:function(){var C="[object Symbol]";function L(e){return typeof e=="symbol"||t(e)&&i(e)==C}var H=/\s/;function z(e){var t=e.length;while(t--&&H.test(e.charAt(t))){}return t}var A=/^\s+/;function S(e){return e?e.slice(0,z(e)+1).replace(A,""):e}var F=0/0;var Y=/^[-+]0x[0-9a-f]+$/i;var j=/^0b[01]+$/i;var N=/^0o[0-7]+$/i;var W=parseInt;function E(e){if(typeof e=="number"){return e}if(L(e)){return F}if(n(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=n(t)?t+"":t}if(typeof e!="string"){return e===0?e:+e}e=S(e);var i=j.test(e);return i||N.test(e)?W(e.slice(2),i?2:8):Y.test(e)?F:+e}var V=function(){return r.Date.now()};var R="Expected a function";var k=Math.max,O=Math.min;function X(e,t,i){var r,o,a,s,u,d,c=0,l=false,g=false,h=true;if(typeof e!="function"){throw new TypeError(R)}t=E(t)||0;if(n(i)){l=!!i.leading;g="maxWait"in i;a=g?k(E(i.maxWait)||0,t):a;h="trailing"in i?!!i.trailing:h}function p(t){var i=r,n=o;r=o=undefined;c=t;s=e.apply(n,i);return s}function f(e){c=e;u=setTimeout(m,t);return l?p(e):s}function M(e){var i=e-d,n=e-c,r=t-i;return g?O(r,a-n):r}function x(e){var i=e-d,n=e-c;return d===undefined||i>=t||i<0||g&&n>=a}function m(){var e=V();if(x(e)){return v(e)}u=setTimeout(m,M(e))}function v(e){u=undefined;if(h&&r){return p(e)}r=o=undefined;return s}function w(){if(u!==undefined){clearTimeout(u)}c=0;r=d=o=u=undefined}function b(){return u===undefined?s:v(V())}function T(){var e=V(),i=x(e);r=arguments;o=this;d=e;if(i){if(u===undefined){return f(d)}if(g){clearTimeout(u);u=setTimeout(m,t);return p(d)}}if(u===undefined){u=setTimeout(m,t)}return s}T.cancel=w;T.flush=b;return T}var P="Expected a function";function B(e,t,i){var r=true,o=true;if(typeof e!="function"){throw new TypeError(P)}if(n(i)){r="leading"in i?!!i.leading:r;o="trailing"in i?!!i.trailing:o}return X(e,t,{leading:r,maxWait:t,trailing:o})}
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var J=function(e){__extends(t,e);function t(t){var i=e.call(this,t)||this;var n=i.bindTemplate;i.set("isVisible",false);i.set("position","se");i.children=i.createCollection();i.setTemplate({tag:"div",attributes:{class:["ck","ck-reset","ck-dropdown__panel",n.to("position",(function(e){return"ck-dropdown__panel_"+e})),n.if("isVisible","ck-dropdown__panel-visible")]},children:i.children,on:{selectstart:n.to((function(e){return e.preventDefault()}))}});return i}t.prototype.focus=function(){if(this.children.length){this.children.first.focus()}};t.prototype.focusLast=function(){if(this.children.length){var e=this.children.last;if(typeof e.focusLast==="function"){e.focusLast()}else{e.focus()}}};return t}(o);var U="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAgMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTS45NDEgNC41MjNhLjc1Ljc1IDAgMSAxIDEuMDYtMS4wNmwzLjAwNiAzLjAwNSAzLjAwNS0zLjAwNWEuNzUuNzUgMCAxIDEgMS4wNiAxLjA2bC0zLjU0OSAzLjU1YS43NS43NSAwIDAgMS0xLjE2OC0uMTM2TC45NDEgNC41MjN6Ii8+PC9zdmc+";
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var Z=function(e){__extends(t,e);function t(t){var i=e.call(this,t)||this;i.arrowView=i._createArrowView();i.extendTemplate({attributes:{"aria-haspopup":true}});i.delegate("execute").to(i,"open");return i}t.prototype.render=function(){e.prototype.render.call(this);this.children.add(this.arrowView)};t.prototype._createArrowView=function(){var e=new s;e.content=U;e.extendTemplate({attributes:{class:"ck-dropdown__arrow"}});return e};return t}(a);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var G=function(e){__extends(t,e);function t(){var t=e.call(this)||this;t.items=t.createCollection();t.focusTracker=new u;t.keystrokes=new d;t._focusCycler=new c({focusables:t.items,focusTracker:t.focusTracker,keystrokeHandler:t.keystrokes,actions:{focusPrevious:"arrowup",focusNext:"arrowdown"}});t.setTemplate({tag:"ul",attributes:{class:["ck","ck-reset","ck-list"]},children:t.items});return t}t.prototype.render=function(){var t=this;e.prototype.render.call(this);for(var i=0,n=this.items;i<n.length;i++){var r=n[i];this.focusTracker.add(r.element)}this.items.on("add",(function(e,i){t.focusTracker.add(i.element)}));this.items.on("remove",(function(e,i){t.focusTracker.remove(i.element)}));this.keystrokes.listenTo(this.element)};t.prototype.focus=function(){this._focusCycler.focusFirst()};t.prototype.focusLast=function(){this._focusCycler.focusLast()};return t}(o);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var Q=function(e){__extends(t,e);function t(t){var i=e.call(this,t)||this;i.children=i.createCollection();i.setTemplate({tag:"li",attributes:{class:["ck","ck-list__item"]},children:i.children});return i}t.prototype.focus=function(){this.children.first.focus()};return t}(o);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var q=function(e){__extends(t,e);function t(t){var i=e.call(this,t)||this;i.setTemplate({tag:"li",attributes:{class:["ck","ck-list__separator"]}});return i}return t}(o);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var $=function(e){__extends(t,e);function t(t){var i=e.call(this,t)||this;i.isToggleable=true;i.toggleSwitchView=i._createToggleView();i.extendTemplate({attributes:{class:"ck-switchbutton"}});return i}t.prototype.render=function(){e.prototype.render.call(this);this.children.add(this.toggleSwitchView)};t.prototype._createToggleView=function(){var e=new o;e.setTemplate({tag:"span",attributes:{class:["ck","ck-button__toggle"]},children:[{tag:"span",attributes:{class:["ck","ck-button__toggle__inner"]}}]});return e};return t}(a);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */function K(e,t){if(t===void 0){t=Z}var i=new t(e);var n=new J(e);var r=new l(e,i,n);i.bind("isEnabled").to(r);if(i instanceof Z){i.bind("isOn").to(r,"isOpen")}else{i.arrowView.bind("isOn").to(r,"isOpen")}te(r);return r}function ee(e,t){var i=e.locale;var n=e.listView=new G(i);n.items.bindTo(t).using((function(e){var t=e.type,n=e.model;if(t==="separator"){return new q(i)}else if(t==="button"||t==="switchbutton"){var r=new Q(i);var o=void 0;if(t==="button"){o=new a(i)}else{o=new $(i)}o.bind.apply(o,Object.keys(n)).to(n);o.delegate("execute").to(r);r.children.add(o);return r}}));e.panelView.children.add(n);n.items.delegate("execute").to(e)}function te(e){ie(e);ne(e);re(e)}function ie(e){e.on("render",(function(){g({emitter:e,activator:function(){return e.isOpen},callback:function(){e.isOpen=false},contextElements:[e.element]})}))}function ne(e){e.on("execute",(function(t){if(t.source instanceof $){return}e.isOpen=false}))}function re(e){e.keystrokes.set("arrowdown",(function(t,i){if(e.isOpen){e.panelView.focus();i()}}));e.keystrokes.set("arrowup",(function(t,i){if(e.isOpen){e.panelView.focusLast();i()}}))}
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var oe=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.refresh=function(){var e=this.editor.model.document.selection.getSelectedElement();this.isEnabled=p(e);if(!e||!e.hasAttribute("width")){this.value=null}else{this.value={width:e.getAttribute("width"),height:null}}};t.prototype.execute=function(e){var t=this.editor.model;var i=t.document.selection.getSelectedElement();this.value={width:e.width,height:null};if(i){t.change((function(t){t.setAttribute("width",e.width,i)}))}};return t}(h);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var ae=function(e){__extends(t,e);function t(t){var i=e.call(this,t)||this;t.config.define("image",{resizeUnit:"%",resizeOptions:[{name:"imageResize:original",value:null,icon:"original"},{name:"imageResize:25",value:"25",icon:"small"},{name:"imageResize:50",value:"50",icon:"medium"},{name:"imageResize:75",value:"75",icon:"large"}]});return i}Object.defineProperty(t,"pluginName",{get:function(){return"ImageResizeEditing"},enumerable:false,configurable:true});t.prototype.init=function(){var e=this.editor;var t=new oe(e);this._registerSchema();this._registerConverters();e.commands.add("imageResize",t)};t.prototype._registerSchema=function(){this.editor.model.schema.extend("image",{allowAttributes:"width"});this.editor.model.schema.setAttributeProperties("width",{isFormatting:true})};t.prototype._registerConverters=function(){var e=this.editor;e.conversion.for("downcast").add((function(e){return e.on("attribute:width:image",(function(e,t,i){if(!i.consumable.consume(t.item,e.name)){return}var n=i.writer;var r=i.mapper.toViewElement(t.item);if(t.attributeNewValue!==null){n.setStyle("width",t.attributeNewValue,r);n.addClass("image_resized",r)}else{n.removeStyle("width",r);n.removeClass("image_resized",r)}}))}));e.conversion.for("upcast").attributeToAttribute({view:{name:"figure",styles:{width:/.+/}},model:{key:"width",value:function(e){return e.getStyle("width")}}})};return t}(f);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var se=function(){function e(e,t){if(t){M(this,t)}if(e){this.set(e)}}return e}();x(se,m);var ue="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTIuNSAxN3YxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6TTEgMTUuNXYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0tMTktMnYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0wLTJ2MWgtMXYtMWgxem0tMTkgMHYxSDB2LTFoMXpNMTQuNSAydjFoLTFWMmgxem0yIDB2MWgtMVYyaDF6bTIgMHYxaC0xVjJoMXptLTggMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptOCAwdjFoLTFWMmgxem0tMTAgMHYxaC0xVjJoMXoiLz48cGF0aCBkPSJNNyAxMEgyYTIgMiAwIDAgMC0yIDJ2NGEyIDIgMCAwIDAgMiAyaDVhMiAyIDAgMCAwIDItMnYtNGEyIDIgMCAwIDAtMi0yem0wIDEuNWEuNS41IDAgMCAxIC41LjV2NGEuNS41IDAgMCAxLS41LjVIMmEuNS41IDAgMCAxLS41LS41di00YS41LjUgMCAwIDEgLjUtLjVoNXoiLz48L3N2Zz4=";var de="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTIuNSAxN3YxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6TTEgMTUuNXYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0tMTktMnYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0wLTJ2MWgtMXYtMWgxem0tMTkgMHYxSDB2LTFoMXpNMTQuNSAydjFoLTFWMmgxem0yIDB2MWgtMVYyaDF6bTIgMHYxaC0xVjJoMXptLTggMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptOCAwdjFoLTFWMmgxem0tMTAgMHYxaC0xVjJoMXoiLz48cGF0aCBkPSJNMTAgOEgyYTIgMiAwIDAgMC0yIDJ2NmEyIDIgMCAwIDAgMiAyaDhhMiAyIDAgMCAwIDItMnYtNmEyIDIgMCAwIDAtMi0yem0wIDEuNWEuNS41IDAgMCAxIC41LjV2NmEuNS41IDAgMCAxLS41LjVIMmEuNS41IDAgMCAxLS41LS41di02YS41LjUgMCAwIDEgLjUtLjVoOHoiLz48L3N2Zz4=";var ce="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTIuNSAxN3YxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6TTEgMTUuNXYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0tMTktMnYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0wLTJ2MWgtMXYtMWgxem0tMTkgMHYxSDB2LTFoMXpNMTQuNSAydjFoLTFWMmgxem0yIDB2MWgtMVYyaDF6bTIgMHYxaC0xVjJoMXptLTggMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptOCAwdjFoLTFWMmgxem0tMTAgMHYxaC0xVjJoMXoiLz48cGF0aCBkPSJNMTMgNkgyYTIgMiAwIDAgMC0yIDJ2OGEyIDIgMCAwIDAgMiAyaDExYTIgMiAwIDAgMCAyLTJWOGEyIDIgMCAwIDAtMi0yem0wIDEuNWEuNS41IDAgMCAxIC41LjV2OGEuNS41IDAgMCAxLS41LjVIMmEuNS41IDAgMCAxLS41LS41VjhhLjUuNSAwIDAgMSAuNS0uNWgxMXoiLz48L3N2Zz4=";var le="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTIuNSAxN3YxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6TTEgMTUuNXYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0tMTktMnYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0wLTJ2MWgtMXYtMWgxem0tMTkgMHYxSDB2LTFoMXpNMTQuNSAydjFoLTFWMmgxem0yIDB2MWgtMVYyaDF6bTIgMHYxaC0xVjJoMXptLTggMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptOCAwdjFoLTFWMmgxem0tMTAgMHYxaC0xVjJoMXoiLz48cGF0aCBkPSJNMTguMDk1IDJIMS45MDVDLjg1MyAyIDAgMi44OTUgMCA0djEyYzAgMS4xMDUuODUzIDIgMS45MDUgMmgxNi4xOUMxOS4xNDcgMTggMjAgMTcuMTA1IDIwIDE2VjRjMC0xLjEwNS0uODUzLTItMS45MDUtMnptMCAxLjVjLjI2MyAwIC40NzYuMjI0LjQ3Ni41djEyYzAgLjI3Ni0uMjEzLjUtLjQ3Ni41SDEuOTA1YS40ODkuNDg5IDAgMCAxLS40NzYtLjVWNGMwLS4yNzYuMjEzLS41LjQ3Ni0uNWgxNi4xOXoiLz48L3N2Zz4=";
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var ge={small:ue,medium:de,large:ce,original:le};var he=function(e){__extends(t,e);function t(t){var i=e.call(this,t)||this;i._resizeUnit=t.config.get("image.resizeUnit");return i}Object.defineProperty(t,"requires",{get:function(){return[ae]},enumerable:false,configurable:true});Object.defineProperty(t,"pluginName",{get:function(){return"ImageResizeButtons"},enumerable:false,configurable:true});t.prototype.init=function(){var e=this.editor;var t=e.config.get("image.resizeOptions");var i=e.commands.get("imageResize");this.bind("isEnabled").to(i);for(var n=0,r=t;n<r.length;n++){var o=r[n];this._registerImageResizeButton(o)}this._registerImageResizeDropdown(t)};t.prototype._registerImageResizeButton=function(e){var t=this;var i=this.editor;var n=e.name,r=e.value,o=e.icon;var s=r?r+this._resizeUnit:null;i.ui.componentFactory.add(n,(function(n){var r=new a(n);var u=i.commands.get("imageResize");var d=t._getOptionLabelValue(e,true);if(!ge[o]){throw new v("imageresizebuttons-missing-icon",i,e)}r.set({label:d,icon:ge[o],tooltip:d,isToggleable:true});r.bind("isEnabled").to(t);r.bind("isOn").to(u,"value",pe(s));t.listenTo(r,"execute",(function(){i.execute("imageResize",{width:s})}));return r}))};t.prototype._registerImageResizeDropdown=function(e){var t=this;var i=this.editor;var n=i.t;var r=e.find((function(e){return!e.value}));i.ui.componentFactory.add("imageResize",(function(o){var a=i.commands.get("imageResize");var s=K(o,Z);var u=s.buttonView;u.set({tooltip:n("Resize image"),commandValue:r.value,icon:de,isToggleable:true,label:t._getOptionLabelValue(r),withText:true,class:"ck-resize-image-button"});u.bind("label").to(a,"value",(function(e){if(e&&e.width){return e.width}else{return t._getOptionLabelValue(r)}}));s.bind("isOn").to(a);s.bind("isEnabled").to(t);ee(s,t._getResizeDropdownListItemDefinitions(e,a));s.listView.ariaLabel=n("Image resize list");t.listenTo(s,"execute",(function(e){i.execute(e.source.commandName,{width:e.source.commandValue});i.editing.view.focus()}));return s}))};t.prototype._getOptionLabelValue=function(e,t){var i=this.editor.t;if(e.label){return e.label}else if(t){if(e.value){return i("Resize image to %0",e.value+this._resizeUnit)}else{return i("Resize image to the original size")}}else{if(e.value){return e.value+this._resizeUnit}else{return i("Original")}}};t.prototype._getResizeDropdownListItemDefinitions=function(e,t){var i=this;var n=new w;e.map((function(e){var r=e.value?e.value+i._resizeUnit:null;var o={type:"button",model:new se({commandName:"imageResize",commandValue:r,label:i._getOptionLabelValue(e),withText:true,icon:null})};o.model.bind("isOn").to(t,"value",pe(r));n.add(o)}));return n};return t}(f);function pe(e){return function(t){if(e===null&&t===e){return true}return t&&t.width===e}}
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */function fe(e,t){var i=Math.min(e.length,t.length);for(var n=0;n<i;n++){if(e[n]!=t[n]){return n}}if(e.length==t.length){return"same"}else if(e.length<t.length){return"prefix"}else{return"extension"}}
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var Me=function(){function e(e){this.set("activeHandlePosition",null);this.set("proposedWidthPercents",null);this.set("proposedWidth",null);this.set("proposedHeight",null);this.set("proposedHandleHostWidth",null);this.set("proposedHandleHostHeight",null);this._options=e;this._referenceCoordinates=null}e.prototype.begin=function(e,t,i){var n=new b(t);this.activeHandlePosition=we(e);this._referenceCoordinates=me(t,be(this.activeHandlePosition));this.originalWidth=n.width;this.originalHeight=n.height;this.aspectRatio=n.width/n.height;var r=i.style.width;if(r&&r.match(/^\d+\.?\d*%$/)){this.originalWidthPercents=parseFloat(r)}else{this.originalWidthPercents=xe(i,n)}};e.prototype.update=function(e){this.proposedWidth=e.width;this.proposedHeight=e.height;this.proposedWidthPercents=e.widthPercents;this.proposedHandleHostWidth=e.handleHostWidth;this.proposedHandleHostHeight=e.handleHostHeight};return e}();x(Me,m);function xe(e,t){var i=e.parentElement;var n=parseFloat(i.ownerDocument.defaultView.getComputedStyle(i).width);return t.width/n*100}function me(e,t){var i=new b(e);var n=t.split("-");var r={x:n[1]=="right"?i.right:i.left,y:n[0]=="bottom"?i.bottom:i.top};r.x+=e.ownerDocument.defaultView.scrollX;r.y+=e.ownerDocument.defaultView.scrollY;return r}function ve(e){return"ck-widget__resizer__handle-"+e}function we(e){var t=["top-left","top-right","bottom-right","bottom-left"];for(var i=0,n=t;i<n.length;i++){var r=n[i];if(e.classList.contains(ve(r))){return r}}}function be(e){var t=e.split("-");var i={top:"bottom",bottom:"top",left:"right",right:"left"};return i[t[0]]+"-"+i[t[1]]}
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var Te=function(){function e(e){var t=this;this._options=e;this._domResizerWrapper=null;this._viewResizerWrapper=null;this.set("isEnabled",true);this.decorate("begin");this.decorate("cancel");this.decorate("commit");this.decorate("updateSize");this.on("commit",(function(e){if(!t.state.proposedWidth&&!t.state.proposedWidthPercents){t._cleanup();e.stop()}}),{priority:"high"});this.on("change:isEnabled",(function(){if(t.isEnabled){t.redraw()}}))}e.prototype.attach=function(){var e=this;var t=this;var i=this._options.viewElement;var n=this._options.editor.editing.view;n.change((function(n){var r=n.createUIElement("div",{class:"ck ck-reset_all ck-widget__resizer"},(function(e){var i=this.toDomElement(e);t._appendHandles(i);t._appendSizeUI(i);t._domResizerWrapper=i;t.on("change:isEnabled",(function(e,t,n){i.style.display=n?"":"none"}));i.style.display=t.isEnabled?"":"none";return i}));n.insert(n.createPositionAt(i,"end"),r);n.addClass("ck-widget_with-resizer",i);e._viewResizerWrapper=r}))};e.prototype.begin=function(e){this.state=new Me(this._options);this._sizeUI.bindToState(this._options,this.state);this._initialViewWidth=this._options.viewElement.getStyle("width");this.state.begin(e,this._getHandleHost(),this._getResizeHost())};e.prototype.updateSize=function(e){var t=this;var i=this._proposeNewSize(e);var n=this._options.editor.editing.view;n.change((function(e){var n=t._options.unit||"%";var r=(n==="%"?i.widthPercents:i.width)+n;e.setStyle("width",r,t._options.viewElement)}));var r=this._getHandleHost();var o=new b(r);i.handleHostWidth=Math.round(o.width);i.handleHostHeight=Math.round(o.height);var a=new b(r);i.width=Math.round(a.width);i.height=Math.round(a.height);this.redraw(o);this.state.update(i)};e.prototype.commit=function(){var e=this;var t=this._options.unit||"%";var i=(t==="%"?this.state.proposedWidthPercents:this.state.proposedWidth)+t;this._options.editor.editing.view.change((function(){e._cleanup();e._options.onCommit(i)}))};e.prototype.cancel=function(){this._cleanup()};e.prototype.destroy=function(){this.cancel()};e.prototype.redraw=function(e){var t=this._domResizerWrapper;if(!De(t)){return}var i=t.parentElement;var n=this._getHandleHost();var r=this._viewResizerWrapper;var o=[r.getStyle("width"),r.getStyle("height"),r.getStyle("left"),r.getStyle("top")];var a;if(i.isSameNode(n)){var s=e||new b(n);a=[s.width+"px",s.height+"px",undefined,undefined]}else{a=[n.offsetWidth+"px",n.offsetHeight+"px",n.offsetLeft+"px",n.offsetTop+"px"]}if(fe(o,a)!=="same"){this._options.editor.editing.view.change((function(e){e.setStyle({width:a[0],height:a[1],left:a[2],top:a[3]},r)}))}};e.prototype.containsHandle=function(e){return this._domResizerWrapper.contains(e)};e.isResizeHandle=function(e){return e.classList.contains("ck-widget__resizer__handle")};e.prototype._cleanup=function(){var e=this;this._sizeUI.dismiss();this._sizeUI.isVisible=false;var t=this._options.editor.editing.view;t.change((function(t){t.setStyle("width",e._initialViewWidth,e._options.viewElement)}))};e.prototype._proposeNewSize=function(e){var t=this.state;var i=Ie(e);var n=this._options.isCentered?this._options.isCentered(this):true;var r={x:t._referenceCoordinates.x-(i.x+t.originalWidth),y:i.y-t.originalHeight-t._referenceCoordinates.y};if(n&&t.activeHandlePosition.endsWith("-right")){r.x=i.x-(t._referenceCoordinates.x+t.originalWidth)}if(n){r.x*=2}var o={width:Math.abs(t.originalWidth+r.x),height:Math.abs(t.originalHeight+r.y)};o.dominant=o.width/t.aspectRatio>o.height?"width":"height";o.max=o[o.dominant];var a={width:o.width,height:o.height};if(o.dominant=="width"){a.height=a.width/t.aspectRatio}else{a.width=a.height*t.aspectRatio}return{width:Math.round(a.width),height:Math.round(a.height),widthPercents:Math.min(Math.round(t.originalWidthPercents/t.originalWidth*a.width*100)/100,100)}};e.prototype._getResizeHost=function(){var e=this._domResizerWrapper.parentElement;return this._options.getResizeHost(e)};e.prototype._getHandleHost=function(){var e=this._domResizerWrapper.parentElement;return this._options.getHandleHost(e)};e.prototype._appendHandles=function(e){var t=["top-left","top-right","bottom-right","bottom-left"];for(var i=0,n=t;i<n.length;i++){var r=n[i];e.appendChild(new T({tag:"div",attributes:{class:"ck-widget__resizer__handle "+_e(r)}}).render())}};e.prototype._appendSizeUI=function(e){var t=new ye;t.render();this._sizeUI=t;e.appendChild(t.element)};return e}();x(Te,m);var ye=function(e){__extends(t,e);function t(){var t=e.call(this)||this;var i=t.bindTemplate;t.setTemplate({tag:"div",attributes:{class:["ck","ck-size-view",i.to("activeHandlePosition",(function(e){return e?"ck-orientation-"+e:""}))],style:{display:i.if("isVisible","none",(function(e){return!e}))}},children:[{text:i.to("label")}]});return t}t.prototype.bindToState=function(e,t){this.bind("isVisible").to(t,"proposedWidth",t,"proposedHeight",(function(e,t){return e!==null&&t!==null}));this.bind("label").to(t,"proposedHandleHostWidth",t,"proposedHandleHostHeight",t,"proposedWidthPercents",(function(t,i,n){if(e.unit==="px"){return t+"×"+i}else{return n+"%"}}));this.bind("activeHandlePosition").to(t)};t.prototype.dismiss=function(){this.unbind();this.isVisible=false};return t}(o);function _e(e){return"ck-widget__resizer__handle-"+e}function Ie(e){return{x:e.pageX,y:e.pageY}}function De(e){return e&&e.ownerDocument&&e.ownerDocument.contains(e)}
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var Ce=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}Object.defineProperty(t,"pluginName",{get:function(){return"WidgetResize"},enumerable:false,configurable:true});t.prototype.init=function(){var e=this;this.set("visibleResizer",null);this.set("_activeResizer",null);this._resizers=new Map;var t=I.window.document;this.editor.model.schema.setAttributeProperties("width",{isFormatting:true});this.editor.editing.view.addObserver(y);this._observer=Object.create(_);this.listenTo(this.editor.editing.view.document,"mousedown",this._mouseDownListener.bind(this),{priority:"high"});this._observer.listenTo(t,"mousemove",this._mouseMoveListener.bind(this));this._observer.listenTo(t,"mouseup",this._mouseUpListener.bind(this));var i=function(){if(e.visibleResizer){e.visibleResizer.redraw()}};var n=B(i,200);this.on("change:visibleResizer",i);this.editor.ui.on("update",n);this._observer.listenTo(I.window,"resize",n);var r=this.editor.editing.view.document.selection;r.on("change",(function(){var t=r.getSelectedElement();e.visibleResizer=e.getResizerByViewElement(t)||null}))};t.prototype.destroy=function(){this._observer.stopListening();for(var e=0,t=this._resizers.values();e<t.length;e++){var i=t[e];i.destroy()}};t.prototype.attachTo=function(e){var t=new Te(e);var i=this.editor.plugins;t.attach();if(i.has("WidgetToolbarRepository")){var n=i.get("WidgetToolbarRepository");t.on("begin",(function(){n.forceDisabled("resize")}),{priority:"lowest"});t.on("cancel",(function(){n.clearForceDisabled("resize")}),{priority:"highest"});t.on("commit",(function(){n.clearForceDisabled("resize")}),{priority:"highest"})}this._resizers.set(e.viewElement,t);var r=this.editor.editing.view.document.selection;var o=r.getSelectedElement();if(this.getResizerByViewElement(o)==t){this.visibleResizer=t}return t};t.prototype.getResizerByViewElement=function(e){return this._resizers.get(e)};t.prototype._getResizerByHandle=function(e){for(var t=0,i=this._resizers.values();t<i.length;t++){var n=i[t];if(n.containsHandle(e)){return n}}};t.prototype._mouseDownListener=function(e,t){var i=t.domTarget;if(!Te.isResizeHandle(i)){return}this._activeResizer=this._getResizerByHandle(i);if(this._activeResizer){this._activeResizer.begin(i);e.stop();t.preventDefault()}};t.prototype._mouseMoveListener=function(e,t){if(this._activeResizer){this._activeResizer.updateSize(t)}};t.prototype._mouseUpListener=function(){if(this._activeResizer){this._activeResizer.commit();this._activeResizer=null}};return t}(f);x(Ce,m);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var Le=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}Object.defineProperty(t,"requires",{get:function(){return[Ce]},enumerable:false,configurable:true});Object.defineProperty(t,"pluginName",{get:function(){return"ImageResizeHandles"},enumerable:false,configurable:true});t.prototype.init=function(){var e=this.editor.commands.get("imageResize");this.bind("isEnabled").to(e);this._setupResizerCreator()};t.prototype._setupResizerCreator=function(){var e=this;var t=this.editor;var i=t.editing.view;i.addObserver(D);this.listenTo(i.document,"imageLoaded",(function(n,r){if(!r.target.matches("figure.image.ck-widget > img, figure.image.ck-widget > a > img")){return}var o=t.editing.view.domConverter.domToView(r.target);var a=o.findAncestor("figure");var s=e.editor.plugins.get(Ce).getResizerByViewElement(a);if(s){s.redraw();return}var u=t.editing.mapper;var d=u.toModelElement(a);s=t.plugins.get(Ce).attachTo({unit:t.config.get("image.resizeUnit"),modelElement:d,viewElement:a,editor:t,getHandleHost:function(e){return e.querySelector("img")},getResizeHost:function(e){return e},isCentered:function(){var e=d.getAttribute("imageStyle");return!e||e=="full"||e=="alignCenter"},onCommit:function(e){t.execute("imageResize",{width:e})}});s.on("updateSize",(function(){if(!a.hasClass("image_resized")){i.change((function(e){e.addClass("image_resized",a)}))}}));s.bind("isEnabled").to(e)}))};return t}(f);
/**
             * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
             * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
             */var He=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}Object.defineProperty(t,"requires",{get:function(){return[ae,Le,he]},enumerable:false,configurable:true});Object.defineProperty(t,"pluginName",{get:function(){return"ImageResize"},enumerable:false,configurable:true});return t}(f);e("default",He)}}}));