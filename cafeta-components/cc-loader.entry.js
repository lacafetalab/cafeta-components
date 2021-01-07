import { r as registerInstance, h, H as Host } from './core-2b8afa15.js';

const CcLoader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 24;
    }
    render() {
        return (h(Host, { "data-testid": "cc-loader", class: "loader" }, h("svg", { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, class: "loader__svg" }, h("circle", { class: "loader__circle", cx: "50", cy: "50", r: "45" }))));
    }
    static get style() { return ":host {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n\n.loader__svg {\n  -webkit-animation: 2s linear infinite svg-animation;\n          animation: 2s linear infinite svg-animation;\n}\n\n.loader__circle {\n  -webkit-animation: 4s ease-in-out infinite both circle-animation;\n          animation: 4s ease-in-out infinite both circle-animation;\n  display: block;\n  fill: transparent;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-dasharray: 321;\n  stroke-dashoffset: 320;\n  stroke-width: 10px;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n}\n\n\@-webkit-keyframes svg-animation {\n  0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n  }\n\n  100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n  }\n}\n\n\@keyframes svg-animation {\n  0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n  }\n\n  100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n  }\n}\n\n\@-webkit-keyframes circle-animation {\n  0% {\n    stroke-dashoffset: 320;\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n  }\n\n  50% {\n    stroke-dashoffset: 75;\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg);\n  }\n\n  100% {\n    stroke-dashoffset: 320;\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n\@keyframes circle-animation {\n  0% {\n    stroke-dashoffset: 320;\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n  }\n\n  50% {\n    stroke-dashoffset: 75;\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg);\n  }\n\n  100% {\n    stroke-dashoffset: 320;\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}"; }
};

export { CcLoader as cc_loader };
