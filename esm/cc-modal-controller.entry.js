import { r as registerInstance, h, g as getElement, H as Host } from './index-f424fde7.js';

const CcModalController = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentDidLoad() {
        const modalParent = this.modalRef.parentElement;
        const body = document.querySelector("body > div");
        modalParent.appendChild(this.el);
        body.appendChild(this.modalRef);
    }
    componentDidUnload() {
        this.modalRef.remove();
    }
    render() {
        return h(Host, { style: { display: "none" } });
    }
    get el() { return getElement(this); }
};

export { CcModalController as cc_modal_controller };
