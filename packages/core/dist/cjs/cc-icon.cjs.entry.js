'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-a20b60bb.js');

const CcIcon = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.size = 24;
    }
    render() {
        return (core.h(core.Host, null, core.h("svg", { class: "cc-icon", width: this.size, height: this.size }, core.h("use", { xlinkHref: `${core.getAssetPath(`./assets/feather-sprite.svg`)}#${this.name}` }))));
    }
    static get assetsDirs() { return ["assets"]; }
    static get style() { return ".cc-icon{stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none}"; }
};

exports.cc_icon = CcIcon;
