import { r as registerInstance, h, g as getElement, H as Host } from './index-b08024e3.js';
var CcModalController = /** @class */ (function () {
    function CcModalController(hostRef) {
        registerInstance(this, hostRef);
    }
    CcModalController.prototype.componentDidLoad = function () {
        var modalParent = this.modalRef.parentElement;
        var body = document.querySelector("body > div");
        modalParent.appendChild(this.el);
        body.appendChild(this.modalRef);
    };
    CcModalController.prototype.componentDidUnload = function () {
        this.modalRef.remove();
    };
    CcModalController.prototype.render = function () {
        return h(Host, { style: { display: "none" } });
    };
    Object.defineProperty(CcModalController.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return CcModalController;
}());
export { CcModalController as cc_modal_controller };
