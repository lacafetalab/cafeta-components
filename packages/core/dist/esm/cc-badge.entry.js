import { r as registerInstance, h, H as Host } from './core-d1147b68.js';

const CcBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.color = "interactive-01";
    }
    render() {
        return (h(Host, { class: `badge--${this.color}` }, h("div", { class: "badge" }, h("slot", null))));
    }
    static get style() { return ".badge{font-size:1.2rem;padding:.8rem;border-radius:9999px;font-weight:400;display:inline-block;line-height:1;background-color:var(--cc-badge-color-base);color:var(--cc-badge-color-contrast)}"; }
};

export { CcBadge as cc_badge };
