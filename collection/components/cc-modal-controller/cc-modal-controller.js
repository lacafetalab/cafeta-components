import { Host, h, Component, Prop, Element } from "@stencil/core";
export class CcModalController {
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
    static get is() { return "cc-modal-controller"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "modalRef": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLElement",
                "resolved": "HTMLElement",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
