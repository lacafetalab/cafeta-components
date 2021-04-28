import { C as CSS, p as plt, w as win, a as promiseResolve, d as doc, N as NAMESPACE } from './index-105344ad.js';
/*
 Stencil Client Patch v1.17.4 | MIT Licensed | https://stenciljs.com
 */
var noop = function () {
    /* noop*/
};
var IS_DENO_ENV = typeof Deno !== 'undefined';
var IS_NODE_ENV = !IS_DENO_ENV &&
    typeof global !== 'undefined' &&
    typeof require === 'function' &&
    !!global.process &&
    typeof __filename === 'string' &&
    (!global.origin || typeof global.origin !== 'string');
var IS_DENO_WINDOWS_ENV = IS_DENO_ENV && Deno.build.os === 'windows';
var getCurrentDirectory = IS_NODE_ENV ? process.cwd : IS_DENO_ENV ? Deno.cwd : function () { return '/'; };
var exit = IS_NODE_ENV ? process.exit : IS_DENO_ENV ? Deno.exit : noop;
var getDynamicImportFunction = function (namespace) { return "__sc_import_" + namespace.replace(/\s|-/g, '_'); };
var patchEsm = function () {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if (!(CSS && CSS.supports && CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return import(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-5ce2b5c4.js').then(function () {
            if ((plt.$cssShim$ = win.__cssshim)) {
                return plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return promiseResolve();
};
var patchBrowser = function () {
    {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    // @ts-ignore
    var scriptElm = Array.from(doc.querySelectorAll('script')).find(function (s) { return new RegExp("/" + NAMESPACE + "(\\.esm)?\\.js($|\\?|#)").test(s.src) || s.getAttribute('data-stencil-namespace') === NAMESPACE; });
    var opts = scriptElm['data-opts'] || {};
    if ('onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then: function () {
                /* promise noop */
            },
        };
    }
    {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (!win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-91ed8d21.js').then(function () { return opts; });
        }
    }
    return promiseResolve(opts);
};
var patchDynamicImport = function (base, orgScriptElm) {
    var importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', "return import(w);//" + Math.random());
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        var moduleMap_1 = new Map();
        win[importFunctionName] = function (src) {
            var url = new URL(src, base).href;
            var mod = moduleMap_1.get(url);
            if (!mod) {
                var script_1 = doc.createElement('script');
                script_1.type = 'module';
                script_1.crossOrigin = orgScriptElm.crossOrigin;
                script_1.src = URL.createObjectURL(new Blob(["import * as m from '" + url + "'; window." + importFunctionName + ".m = m;"], { type: 'application/javascript' }));
                mod = new Promise(function (resolve) {
                    script_1.onload = function () {
                        resolve(win[importFunctionName].m);
                        script_1.remove();
                    };
                });
                moduleMap_1.set(url, mod);
                doc.head.appendChild(script_1);
            }
            return mod;
        };
    }
};
/*
 * This code is distributed under both CC-BY and the following ISC licence.
 *
 * Copyright 2015-2019 Jocki84
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
if (!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
        function makeRange(start, length) {
            return { start: start, length: length, end: start + length };
        }
        function coverRange(inner, outer) {
            if (false === centerIfNeeded ||
                (outer.start < inner.end && inner.start < outer.end)) {
                return Math.max(inner.end - outer.length, Math.min(outer.start, inner.start));
            }
            return (inner.start + inner.end - outer.length) / 2;
        }
        function makePoint(x, y) {
            return {
                x: x,
                y: y,
                translate: function translate(dX, dY) {
                    return makePoint(x + dX, y + dY);
                }
            };
        }
        function absolute(elem, pt) {
            while (elem) {
                pt = pt.translate(elem.offsetLeft, elem.offsetTop);
                elem = elem.offsetParent;
            }
            return pt;
        }
        var target = absolute(this, makePoint(0, 0)), extent = makePoint(this.offsetWidth, this.offsetHeight), elem = this.parentNode, origin;
        while (elem instanceof HTMLElement) {
            // Apply desired scroll amount.
            origin = absolute(elem, makePoint(elem.clientLeft, elem.clientTop));
            elem.scrollLeft = coverRange(makeRange(target.x - origin.x, extent.x), makeRange(elem.scrollLeft, elem.clientWidth));
            elem.scrollTop = coverRange(makeRange(target.y - origin.y, extent.y), makeRange(elem.scrollTop, elem.clientHeight));
            // Determine actual scroll amount by reading back scroll properties.
            target = target.translate(-elem.scrollLeft, -elem.scrollTop);
            elem = elem.parentNode;
        }
    };
}
export { patchEsm as a, patchBrowser as p };
