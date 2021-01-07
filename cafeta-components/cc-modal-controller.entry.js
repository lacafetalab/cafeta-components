import { r as registerInstance, h, H as Host, d as getElement } from './core-2b8afa15.js';

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
