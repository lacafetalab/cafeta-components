import { r as registerInstance, h, g as getAssetPath, H as Host } from './core-d1147b68.js';
var CcIcon = /** @class */ (function () {
    function CcIcon(hostRef) {
        registerInstance(this, hostRef);
        this.size = 24;
    }
    CcIcon.prototype.render = function () {
        return (h(Host, null, h("svg", { class: "cc-icon", width: this.size, height: this.size }, h("use", { xlinkHref: getAssetPath("./assets/feather-sprite.svg") + "#" + this.name }))));
    };
    Object.defineProperty(CcIcon, "assetsDirs", {
        get: function () { return ["assets"]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CcIcon, "style", {
        get: function () { return ".cc-icon{stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none}"; },
        enumerable: true,
        configurable: true
    });
    return CcIcon;
}());
export { CcIcon as cc_icon };
