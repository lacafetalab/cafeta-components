import { Host, h } from "@stencil/core";
export class CcModal {
    constructor() {
        this.size = "md";
        this.visible = false;
        this.color = "primary";
        this.hideCloseButton = false;
        this.disableESC = false;
        this.cancelHandler = () => {
            this.cancel.emit();
        };
        this.handleWrapClick = (e) => {
            if (e.target === this.wrapEl)
                this.cancelHandler();
        };
        this.overlayAnimationEnd = (e) => {
            if (e.animationName === "fadeInModal") {
                this.overlayEl.classList.remove("modal__overlay--fadeIn");
                this.overlayEl.classList.add("modal__overlay--visible");
            }
            if (e.animationName === "fadeOutModal") {
                this.overlayEl.classList.add("modal__overlay--hidden");
                this.overlayEl.classList.remove("modal__overlay--fadeOut");
                this.closeHandler();
            }
        };
        this.contentAnimationEnd = (e) => {
            if (e.animationName === "zoomInModal") {
                this.contentEl.classList.remove("modal__content--zoomIn");
            }
            if (e.animationName === "zoomOutModal") {
                this.contentEl.classList.remove("modal__content--zoomOut");
                this.wrapEl.classList.add("modal__wrap--hidden");
            }
        };
    }
    toggleBodyScroll(newVisible) {
        if (newVisible) {
            this.animatedShow();
        }
        else {
            this.animatedHide();
        }
    }
    handleKeyDown(ev) {
        if (ev.key === "Escape" && this.visible && !this.disableESC) {
            this.cancelHandler();
        }
    }
    closeHandler() {
        this.enableBodyScroll();
        this.close.emit();
    }
    animatedShow() {
        this.disableBodyScroll();
        this.overlayEl.classList.remove("modal__overlay--hidden");
        this.overlayEl.classList.add("modal__overlay--fadeIn");
        this.wrapEl.classList.remove("modal__wrap--hidden");
        this.contentEl.classList.add("modal__content--zoomIn");
    }
    animatedHide() {
        this.overlayEl.classList.remove("modal__overlay--visible");
        this.overlayEl.classList.add("modal__overlay--fadeOut");
        this.contentEl.classList.add("modal__content--zoomOut");
    }
    enableBodyScroll() {
        document.body.style.overflow = "";
    }
    disableBodyScroll() {
        if (!this.otherModalIsVisible())
            document.body.style.overflow = "hidden";
    }
    otherModalIsVisible() {
        return !![...document.querySelectorAll("cc-modal")].find(e => e.visible).length;
    }
    componentDidLoad() {
        if (this.visible) {
            this.animatedShow();
        }
    }
    componentDidUnload() {
        this.enableBodyScroll();
    }
    render() {
        return (h(Host, { class: "modal" },
            h("cc-modal-controller", { modalRef: this.el }),
            h("div", { ref: el => (this.overlayEl = el), class: "modal__overlay modal__overlay--hidden", onAnimationEnd: this.overlayAnimationEnd }),
            h("div", { ref: el => (this.wrapEl = el), class: "modal__wrap modal__wrap--hidden", onClick: this.handleWrapClick },
                h("div", { ref: el => (this.contentEl = el), onAnimationEnd: this.contentAnimationEnd, class: {
                        modal__content: true,
                        "modal__content--sm": this.size === "sm" && !this.customWidth,
                        "modal__content--md": this.size === "md" && !this.customWidth
                    }, style: {
                        width: this.customWidth || undefined
                    } },
                    h("slot", null),
                    !this.hideCloseButton && (h("button", { class: {
                            modal__close: true,
                            "modal__close--primary": this.color === "primary",
                            "modal__close--secondary": this.color === "secondary"
                        }, onClick: this.cancelHandler },
                        h("cc-icon", { size: 16, name: "x" })))))));
    }
    static get is() { return "cc-modal"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() { return {
        "$": ["cc-modal.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-modal.css"]
    }; }
    static get properties() { return {
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"sm\" | \"md\"",
                "resolved": "\"md\" | \"sm\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "\"md\""
        },
        "visible": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "visible",
            "reflect": false,
            "defaultValue": "false"
        },
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"primary\" | \"secondary\"",
                "resolved": "\"primary\" | \"secondary\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "\"primary\""
        },
        "hideCloseButton": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "hide-close-button",
            "reflect": false,
            "defaultValue": "false"
        },
        "disableESC": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "disable-e-s-c",
            "reflect": false,
            "defaultValue": "false"
        },
        "customWidth": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "custom-width",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "close",
            "name": "close",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "cancel",
            "name": "cancel",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "visible",
            "methodName": "toggleBodyScroll"
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyDown",
            "target": "document",
            "capture": false,
            "passive": false
        }]; }
}
