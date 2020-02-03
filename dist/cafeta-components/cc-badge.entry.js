import { r as registerInstance, h, H as Host } from './core-a336405d.js';

const CcBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.color = "interactive-01";
    }
    render() {
        return (h(Host, { class: `badge--${this.color}` }, h("div", { class: "badge" }, h("slot", null))));
    }
    static get style() { return "::slotted(strong) {\n  font-weight: 700;\n}\n\n:host {\n  display: inline-block;\n  --cc-badge-color-contrast: var(--text-03);\n  --cc-badge-color-base: var(--interactive-01);\n}\n\n:host(.badge--interactive-01) {\n  --cc-badge-color-base: var(--interactive-01);\n}\n\n:host(.badge--interactive-02) {\n  --cc-badge-color-base: var(--interactive-02);\n}\n\n:host(.badge--support-success) {\n  --cc-badge-color-base: var(--support-success);\n}\n\n:host(.badge--support-error) {\n  --cc-badge-color-base: var(--support-error);\n}\n\n:host(.badge--support-alert) {\n  --cc-badge-color-base: var(--support-alert);\n}\n\n.badge {\n  font-size: 1.2rem;\n  padding: 0.8rem;\n  border-radius: 9999px;\n  font-weight: 400;\n  display: inline-block;\n  line-height: 1;\n  background-color: var(--cc-badge-color-base);\n  color: var(--cc-badge-color-contrast);\n}"; }
};

export { CcBadge as cc_badge };
