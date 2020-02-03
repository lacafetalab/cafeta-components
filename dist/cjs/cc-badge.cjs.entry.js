'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-a20b60bb.js');

const CcBadge = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.color = "interactive-01";
    }
    render() {
        return (core.h(core.Host, { class: `badge--${this.color}` }, core.h("div", { class: "badge" }, core.h("slot", null))));
    }
    static get style() { return ".badge{font-size:1.2rem;padding:.8rem;border-radius:9999px;font-weight:400;display:inline-block;line-height:1;background-color:var(--cc-badge-color-base);color:var(--cc-badge-color-contrast)}"; }
};

exports.cc_badge = CcBadge;
