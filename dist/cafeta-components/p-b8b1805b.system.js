var __extends=this&&this.__extends||function(){var e=function(r,t){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)if(r.hasOwnProperty(t))e[t]=r[t]};return e(r,t)};return function(r,t){e(r,t);function n(){this.constructor=r}r.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}}();var __awaiter=this&&this.__awaiter||function(e,r,t,n){function a(e){return e instanceof t?e:new t((function(r){r(e)}))}return new(t||(t=Promise))((function(t,i){function s(e){try{l(n.next(e))}catch(r){i(r)}}function o(e){try{l(n["throw"](e))}catch(r){i(r)}}function l(e){e.done?t(e.value):a(e.value).then(s,o)}l((n=n.apply(e,r||[])).next())}))};var __generator=this&&this.__generator||function(e,r){var t={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,a,i,s;return s={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(e){return function(r){return l([e,r])}}function l(s){if(n)throw new TypeError("Generator is already executing.");while(t)try{if(n=1,a&&(i=s[0]&2?a["return"]:s[0]?a["throw"]||((i=a["return"])&&i.call(a),0):a.next)&&!(i=i.call(a,s[1])).done)return i;if(a=0,i)s=[s[0]&2,i.value];switch(s[0]){case 0:case 1:i=s;break;case 4:t.label++;return{value:s[1],done:false};case 5:t.label++;a=s[1];s=[0];continue;case 7:s=t.ops.pop();t.trys.pop();continue;default:if(!(i=t.trys,i=i.length>0&&i[i.length-1])&&(s[0]===6||s[0]===2)){t=0;continue}if(s[0]===3&&(!i||s[1]>i[0]&&s[1]<i[3])){t.label=s[1];break}if(s[0]===6&&t.label<i[1]){t.label=i[1];i=s;break}if(i&&t.label<i[2]){t.label=i[2];t.ops.push(s);break}if(i[2])t.ops.pop();t.trys.pop();continue}s=r.call(e,t)}catch(o){s=[6,o];a=0}finally{n=i=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};var __spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;for(var n=Array(e),a=0,r=0;r<t;r++)for(var i=arguments[r],s=0,o=i.length;s<o;s++,a++)n[a]=i[s];return n};System.register([],(function(e,r){"use strict";return{execute:function(){var t=this;var n="cafeta-components";var a=0;var i=false;var s;var o;var l=false;var f=typeof window!=="undefined"?window:{};var u=f.document||{head:{}};var c={$flags$:0,$resourcesUrl$:"",jmp:function(e){return e()},raf:function(e){return requestAnimationFrame(e)},ael:function(e,r,t,n){return e.addEventListener(r,t,n)},rel:function(e,r,t,n){return e.removeEventListener(r,t,n)}};var $=function(){return(u.head.attachShadow+"").includes("[native")}();var v=function(){try{new CSSStyleSheet;return true}catch(e){}return false}();var h=new WeakMap;var d=function(e){return h.get(e)};var m=e("r",(function(e,r){return h.set(r.$lazyInstance$=e,r)}));var p=function(e){var r={$flags$:0,$hostElement$:e,$instanceValues$:new Map};{r.$onReadyPromise$=new Promise((function(e){return r.$onReadyResolve$=e}));e["s-p"]=[];e["s-rc"]=[]}return h.set(e,r)};var g=function(e,r){return r in e};var y=function(e){return console.error(e)};var w=new Map;var b=function(e,t,n){var a=e.$tagName$.replace(/-/g,"_");var i=e.$lazyBundleIds$;var s=w.get(i);if(s){return s[a]}return r.import("./"+i+".entry.js"+"").then((function(e){{w.set(i,e)}return e[a]}),y)};var S=new Map;var _=[];var R=[];var x=[];var j=function(e,r){return function(t){e.push(t);if(!i){i=true;if(r&&c.$flags$&4){L(E)}else{c.raf(E)}}}};var C=function(e){for(var r=0;r<e.length;r++){try{e[r](performance.now())}catch(t){y(t)}}e.length=0};var N=function(e,r){var t=0;var n=0;while(t<e.length&&(n=performance.now())<r){try{e[t++](n)}catch(a){y(a)}}if(t===e.length){e.length=0}else if(t!==0){e.splice(0,t)}};var E=function(){a++;C(_);var e=(c.$flags$&6)===2?performance.now()+10*Math.ceil(a*(1/22)):Infinity;N(R,e);N(x,e);if(R.length>0){x.push.apply(x,R);R.length=0}if(i=_.length+R.length+x.length>0){c.raf(E)}else{a=0}};var L=function(e){return Promise.resolve().then(e)};var U=j(R,true);var A={};var P=function(e){return e!=null};var k=function(e){e=typeof e;return e==="object"||e==="function"};var O=function(e){return"__sc_import_"+e.replace(/\s|-/g,"_")};var M=e("a",(function(){if(!(f.CSS&&f.CSS.supports&&f.CSS.supports("color","var(--c)"))){return r.import("./p-447ccb56.system.js").then((function(){c.$cssShim$=f.__stencil_cssshim;if(c.$cssShim$){return c.$cssShim$.initShim()}}))}return Promise.resolve()}));var B=e("p",(function(){{c.$cssShim$=f.__stencil_cssshim}var e=Array.from(u.querySelectorAll("script")).find((function(e){return new RegExp("/"+n+"(\\.esm)?\\.js($|\\?|#)").test(e.src)||e.getAttribute("data-stencil-namespace")===n}));var t=e["data-opts"]||{};var a=r.meta.url;if("onbeforeload"in e&&!history.scrollRestoration&&false){return{then:function(){}}}if(a!==""){t.resourcesUrl=new URL(".",a).href}else{t.resourcesUrl=new URL(".",new URL(e.getAttribute("data-resources-url")||e.src,f.location.href)).href;T(t.resourcesUrl,e);if(!window.customElements){return r.import("./p-7f10eb01.system.js").then((function(){return t}))}}return Promise.resolve(t)}));var T=function(e,r){var t=O(n);try{f[t]=new Function("w","return import(w);//"+Math.random())}catch(i){var a=new Map;f[t]=function(n){var i=new URL(n,e).href;var s=a.get(i);if(!s){var o=u.createElement("script");o.type="module";o.crossOrigin=r.crossOrigin;o.src=URL.createObjectURL(new Blob(["import * as m from '"+i+"'; window."+t+".m = m;"],{type:"application/javascript"}));s=new Promise((function(e){o.onload=function(){e(f[t].m);o.remove()}}));a.set(i,s);u.head.appendChild(o)}return s}}};var I=function(e,r){if(e!=null&&!k(e)){if(r&1){return String(e)}return e}return e};var H="hydrated";var z=function(e,r){if(r===void 0){r=""}{return function(){return}}};var q=function(e,r){{return function(){return}}};var V=new WeakMap;var F=function(e,r,t){var n=S.get(e);if(v&&t){n=n||new CSSStyleSheet;n.replace(r)}else{n=r}S.set(e,n)};var W=function(e,r,t,n){var a=Q(r.$tagName$);var i=S.get(a);e=e.nodeType===11?e:u;if(i){if(typeof i==="string"){e=e.head||e;var s=V.get(e);var o=void 0;if(!s){V.set(e,s=new Set)}if(!s.has(a)){{if(c.$cssShim$){o=c.$cssShim$.createHostStyle(n,a,i,!!(r.$flags$&10));var l=o["s-sc"];if(l){a=l;s=null}}else{o=u.createElement("style");o.innerHTML=i}e.insertBefore(o,e.querySelector("link"))}if(s){s.add(a)}}}else if(!e.adoptedStyleSheets.includes(i)){e.adoptedStyleSheets=__spreadArrays(e.adoptedStyleSheets,[i])}}return a};var G=function(e,r,t){var n=z("attachStyles",r.$tagName$);var a=W($&&e.shadowRoot?e.shadowRoot:e.getRootNode(),r,t,e);if(r.$flags$&10){e["s-sc"]=a;e.classList.add(a+"-h")}n()};var Q=function(e,r){return"sc-"+e};var D=e("h",(function(e,r){var t=[];for(var n=2;n<arguments.length;n++){t[n-2]=arguments[n]}var a=null;var i=false;var s=false;var o=[];var l=function(r){for(var t=0;t<r.length;t++){a=r[t];if(Array.isArray(a)){l(a)}else if(a!=null&&typeof a!=="boolean"){if(i=typeof e!=="function"&&!k(a)){a=String(a)}if(i&&s){o[o.length-1].$text$+=a}else{o.push(i?J(null,a):a)}s=i}}};l(t);if(r){{var f=r.className||r.class;if(f){r.class=typeof f!=="object"?f:Object.keys(f).filter((function(e){return f[e]})).join(" ")}}}var u=J(e,null);u.$attrs$=r;if(o.length>0){u.$children$=o}return u}));var J=function(e,r){var t={$flags$:0,$tag$:e,$text$:r,$elm$:null,$children$:null};{t.$attrs$=null}return t};var K={};var X=function(e){return e&&e.$tag$===K};var Y=function(e,r,t,n,a,i){if(t===n){return}var s=g(e,r);var o=r.toLowerCase();if(r==="class"){var l=e.classList;var f=ee(t);var u=ee(n);l.remove.apply(l,f.filter((function(e){return e&&!u.includes(e)})));l.add.apply(l,u.filter((function(e){return e&&!f.includes(e)})))}else{var c=k(n);if((s||c&&n!==null)&&!a){try{if(!e.tagName.includes("-")){var $=n==null?"":n;if(r==="list"){s=false}else if(t==null||e[r]!=$){e[r]=$}}else{e[r]=n}}catch(v){}}if(n==null||n===false){{e.removeAttribute(r)}}else if((!s||i&4||a)&&!c){n=n===true?"":n;{e.setAttribute(r,n)}}}};var Z=/\s/;var ee=function(e){return!e?[]:e.split(Z)};var re=function(e,r,t,n){var a=r.$elm$.nodeType===11&&r.$elm$.host?r.$elm$.host:r.$elm$;var i=e&&e.$attrs$||A;var s=r.$attrs$||A;{for(n in i){if(!(n in s)){Y(a,n,i[n],undefined,t,r.$flags$)}}}for(n in s){Y(a,n,i[n],s[n],t,r.$flags$)}};var te=function(e,r,t,n){var a=r.$children$[t];var i=0;var o;var f;if(a.$text$!==null){o=a.$elm$=u.createTextNode(a.$text$)}else{o=a.$elm$=u.createElement(a.$tag$);{re(null,a,l)}if(P(s)&&o["s-si"]!==s){o.classList.add(o["s-si"]=s)}if(a.$children$){for(i=0;i<a.$children$.length;++i){f=te(e,a,i);if(f){o.appendChild(f)}}}}return o};var ne=function(e,r,t,n,a,i){var s=e;var l;if(s.shadowRoot&&s.tagName===o){s=s.shadowRoot}for(;a<=i;++a){if(n[a]){l=te(null,t,a);if(l){n[a].$elm$=l;s.insertBefore(l,r)}}}};var ae=function(e,r,t,n,a){for(;r<=t;++r){if(n=e[r]){a=n.$elm$;a.remove()}}};var ie=function(e,r,t,n){var a=0;var i=0;var s=r.length-1;var o=r[0];var l=r[s];var f=n.length-1;var u=n[0];var c=n[f];var $;while(a<=s&&i<=f){if(o==null){o=r[++a]}else if(l==null){l=r[--s]}else if(u==null){u=n[++i]}else if(c==null){c=n[--f]}else if(se(o,u)){oe(o,u);o=r[++a];u=n[++i]}else if(se(l,c)){oe(l,c);l=r[--s];c=n[--f]}else if(se(o,c)){oe(o,c);e.insertBefore(o.$elm$,l.$elm$.nextSibling);o=r[++a];c=n[--f]}else if(se(l,u)){oe(l,u);e.insertBefore(l.$elm$,o.$elm$);l=r[--s];u=n[++i]}else{{$=te(r&&r[i],t,i);u=n[++i]}if($){{o.$elm$.parentNode.insertBefore($,o.$elm$)}}}}if(a>s){ne(e,n[f+1]==null?null:n[f+1].$elm$,t,n,i,f)}else if(i>f){ae(r,a,s)}};var se=function(e,r){if(e.$tag$===r.$tag$){return true}return false};var oe=function(e,r){var t=r.$elm$=e.$elm$;var n=e.$children$;var a=r.$children$;if(r.$text$===null){{{re(e,r,l)}}if(n!==null&&a!==null){ie(t,n,r,a)}else if(a!==null){if(e.$text$!==null){t.textContent=""}ne(t,null,r,a,0,a.length-1)}else if(n!==null){ae(n,0,n.length-1)}}else if(e.$text$!==r.$text$){t.data=r.$text$}};var le=function(e,r,t,n){o=e.tagName;var a=r.$vnode$||J(null,null);var i=X(n)?n:D(null,null,n);i.$tag$=null;i.$flags$|=4;r.$vnode$=i;i.$elm$=a.$elm$=e.shadowRoot||e;{s=e["s-sc"]}oe(a,i)};var fe=function(e,r){if(r&&!e.$onRenderResolve$){r["s-p"].push(new Promise((function(r){return e.$onRenderResolve$=r})))}};var ue=function(e,r,t,n){{r.$flags$|=16}if(r.$flags$&4){r.$flags$|=512;return}var a=z("scheduleUpdate",t.$tagName$);var i=r.$ancestorComponent$;var s=r.$lazyInstance$;var o=function(){return ce(e,r,t,s,n)};fe(r,i);var l;a();return me(l,(function(){return U(o)}))};var ce=function(e,r,t,n,a){var i=z("update",t.$tagName$);var s=e["s-rc"];if(a){G(e,t,r.$modeName$)}var o=z("render",t.$tagName$);{{le(e,r,t,$e(n))}}if(c.$cssShim$){c.$cssShim$.updateHost(e)}{r.$flags$&=~16}{r.$flags$|=2}if(s){s.forEach((function(e){return e()}));e["s-rc"]=undefined}o();i();{var l=e["s-p"];var f=function(){return ve(e,r,t)};if(l.length===0){f()}else{Promise.all(l).then(f);r.$flags$|=4;l.length=0}}};var $e=function(e,r){try{e=e.render()}catch(t){y(t)}return e};var ve=function(e,r,t){var n=z("postUpdate",t.$tagName$);var a=r.$ancestorComponent$;if(!(r.$flags$&64)){r.$flags$|=64;{e.classList.add(H)}n();{r.$onReadyResolve$(e);if(!a){de()}}}else{n()}{if(r.$onRenderResolve$){r.$onRenderResolve$();r.$onRenderResolve$=undefined}if(r.$flags$&512){L((function(){return ue(e,r,t,false)}))}r.$flags$&=~(4|512)}};var he=function(e,r){{var t=d(e);var n=t.$hostElement$.isConnected;if(n&&(t.$flags$&(2|16))===2){ue(e,t,r,false)}return n}};var de=function(e){{u.documentElement.classList.add(H)}{c.$flags$|=2}};var me=function(e,r){return e&&e.then?e.then(r):r()};var pe=function(e,r){return d(e).$instanceValues$.get(r)};var ge=function(e,r,t,n){var a=d(e);var i=a.$hostElement$;var s=a.$instanceValues$.get(r);var o=a.$flags$;var l=a.$lazyInstance$;t=I(t,n.$members$[r][0]);if(t!==s&&(!(o&8)||s===undefined)){a.$instanceValues$.set(r,t);if(l){if((o&(2|16))===2){ue(i,a,n,false)}}}};var ye=function(e,r,t){if(r.$members$){var n=Object.entries(r.$members$);var a=e.prototype;n.forEach((function(e){var n=e[0],i=e[1][0];if(i&31||t&2&&i&32){Object.defineProperty(a,n,{get:function(){return pe(this,n)},set:function(e){ge(this,n,e,r)},configurable:true,enumerable:true})}}));if(t&1){var i=new Map;a.attributeChangedCallback=function(e,r,t){var n=this;c.jmp((function(){var r=i.get(e);n[r]=t===null&&typeof n[r]==="boolean"?false:t}))};e.observedAttributes=n.filter((function(e){var r=e[0],t=e[1];return t[0]&15})).map((function(e){var r=e[0],t=e[1];var n=t[1]||r;i.set(n,r);return n}))}}return e};var we=function(e,n,a,i,s){return __awaiter(t,void 0,void 0,(function(){var t,i,o,l,f,u,c;return __generator(this,(function($){switch($.label){case 0:if(!((n.$flags$&32)===0))return[3,5];n.$flags$|=32;s=b(a);if(!s.then)return[3,2];t=q();return[4,s];case 1:s=$.sent();t();$.label=2;case 2:if(!s.isProxied){ye(s,a,2);s.isProxied=true}i=z("createInstance",a.$tagName$);{n.$flags$|=8}try{new s(n)}catch(v){y(v)}{n.$flags$&=~8}i();o=Q(a.$tagName$);if(!(!S.has(o)&&s.style))return[3,5];l=z("registerStyles",a.$tagName$);f=s.style;if(!(a.$flags$&8))return[3,4];return[4,r.import("./p-ed968002.system.js").then((function(e){return e.scopeCss(f,o,false)}))];case 3:f=$.sent();$.label=4;case 4:F(o,f,!!(a.$flags$&1));l();$.label=5;case 5:u=n.$ancestorComponent$;c=function(){return ue(e,n,a,true)};if(u&&u["s-rc"]){u["s-rc"].push(c)}else{c()}return[2]}}))}))};var be=function(e,r){if((c.$flags$&1)===0){var t=z("connectedCallback",r.$tagName$);var n=d(e);if(!(n.$flags$&1)){n.$flags$|=1;{var a=e;while(a=a.parentNode||a.host){if(a["s-p"]){fe(n,n.$ancestorComponent$=a);break}}}if(r.$members$){Object.entries(r.$members$).forEach((function(r){var t=r[0],n=r[1][0];if(n&31&&e.hasOwnProperty(t)){var a=e[t];delete e[t];e[t]=a}}))}{L((function(){return we(e,n,r)}))}}t()}};var Se=function(e){if((c.$flags$&1)===0){var r=d(e);if(c.$cssShim$){c.$cssShim$.removeHost(e)}}};var _e=e("b",(function(e,r){if(r===void 0){r={}}var t=z();var n=[];var a=r.exclude||[];var i=u.head;var s=f.customElements;var o=i.querySelector("meta[charset]");var l=u.createElement("style");var v=[];var h;var m=true;Object.assign(c,r);c.$resourcesUrl$=new URL(r.resourcesUrl||"./",u.baseURI).href;if(r.syncQueue){c.$flags$|=4}e.forEach((function(e){return e[1].forEach((function(r){var t={$flags$:r[0],$tagName$:r[1],$members$:r[2],$listeners$:r[3]};{t.$members$=r[2]}if(!$&&t.$flags$&1){t.$flags$|=8}var i=t.$tagName$;var o=function(e){__extends(r,e);function r(r){var n=e.call(this,r)||this;r=n;p(r);if(t.$flags$&1){if($){{r.attachShadow({mode:"open"})}}else if(!("shadowRoot"in r)){r.shadowRoot=r}}return n}r.prototype.connectedCallback=function(){var e=this;if(h){clearTimeout(h);h=null}if(m){v.push(this)}else{c.jmp((function(){return be(e,t)}))}};r.prototype.disconnectedCallback=function(){var e=this;c.jmp((function(){return Se(e)}))};r.prototype.forceUpdate=function(){he(this,t)};r.prototype.componentOnReady=function(){return d(this).$onReadyPromise$};return r}(HTMLElement);t.$lazyBundleIds$=e[0];if(!a.includes(i)&&!s.get(i)){n.push(i);s.define(i,ye(o,t,1))}}))}));l.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}";l.setAttribute("data-styles","");i.insertBefore(l,o?o.nextSibling:i.firstChild);m=false;if(v.length>0){v.forEach((function(e){return e.connectedCallback()}))}else{c.jmp((function(){return h=setTimeout(de,30,"timeout")}))}t()}))}}}));