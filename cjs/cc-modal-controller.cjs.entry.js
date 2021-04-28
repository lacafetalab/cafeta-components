'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5c45a7c9.js');

const CcModalController = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return index.h(index.Host, { style: { display: "none" } });
    }
    get el() { return index.getElement(this); }
};

exports.cc_modal_controller = CcModalController;
