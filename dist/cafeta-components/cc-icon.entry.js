import { r as registerInstance, h, H as Host, c as getAssetPath } from './core-a336405d.js';

const CcIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 24;
    }
    render() {
        return (h(Host, null, h("svg", { class: "cc-icon", width: this.size, height: this.size }, h("use", { xlinkHref: `${getAssetPath(`./assets/feather-sprite.svg`)}#${this.name}` }))));
    }
    static get assetsDirs() { return ["assets"]; }
    static get style() { return ":host {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n\n.cc-icon {\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  fill: none;\n}"; }
};

export { CcIcon as cc_icon };
