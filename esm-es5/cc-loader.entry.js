import { r as registerInstance, h, H as Host } from './index-105344ad.js';
var ccLoaderCss = ":host{display:-ms-inline-flexbox;display:inline-flex}.loader__svg{-webkit-animation:2s linear infinite svg-animation;animation:2s linear infinite svg-animation}.loader__circle{-webkit-animation:4s ease-in-out infinite both circle-animation;animation:4s ease-in-out infinite both circle-animation;display:block;fill:transparent;stroke:currentColor;stroke-linecap:round;stroke-dasharray:321;stroke-dashoffset:320;stroke-width:10px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}@-webkit-keyframes svg-animation{0%{-webkit-transform:rotateZ(0deg);transform:rotateZ(0deg)}100%{-webkit-transform:rotateZ(360deg);transform:rotateZ(360deg)}}@keyframes svg-animation{0%{-webkit-transform:rotateZ(0deg);transform:rotateZ(0deg)}100%{-webkit-transform:rotateZ(360deg);transform:rotateZ(360deg)}}@-webkit-keyframes circle-animation{0%{stroke-dashoffset:320;-webkit-transform:rotate(0);transform:rotate(0)}50%{stroke-dashoffset:75;-webkit-transform:rotate(45deg);transform:rotate(45deg)}100%{stroke-dashoffset:320;-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes circle-animation{0%{stroke-dashoffset:320;-webkit-transform:rotate(0);transform:rotate(0)}50%{stroke-dashoffset:75;-webkit-transform:rotate(45deg);transform:rotate(45deg)}100%{stroke-dashoffset:320;-webkit-transform:rotate(360deg);transform:rotate(360deg)}}";
var CcLoader = /** @class */ (function () {
    function CcLoader(hostRef) {
        registerInstance(this, hostRef);
        this.size = 24;
    }
    CcLoader.prototype.render = function () {
        return (h(Host, { "data-testid": "cc-loader", class: "loader" }, h("svg", { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, class: "loader__svg" }, h("circle", { class: "loader__circle", cx: "50", cy: "50", r: "45" }))));
    };
    return CcLoader;
}());
CcLoader.style = ccLoaderCss;
export { CcLoader as cc_loader };
