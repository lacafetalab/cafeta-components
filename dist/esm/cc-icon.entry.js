import { r as registerInstance, h, g as getAssetPath, H as Host } from './core-d1147b68.js';

const CcIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 24;
    }
    render() {
        return (h(Host, null, h("svg", { class: "cc-icon", width: this.size, height: this.size }, h("use", { xlinkHref: `${getAssetPath(`./assets/feather-sprite.svg`)}#${this.name}` }))));
    }
    static get assetsDirs() { return ["assets"]; }
    static get style() { return ".cc-icon{stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none}"; }
};

export { CcIcon as cc_icon };
