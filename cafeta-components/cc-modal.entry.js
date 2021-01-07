import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-2b8afa15.js';

const CcModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.close = createEvent(this, "close", 7);
        this.cancel = createEvent(this, "cancel", 7);
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
        return (h(Host, { class: "modal" }, h("cc-modal-controller", { modalRef: this.el }), h("div", { ref: el => (this.overlayEl = el), class: "modal__overlay modal__overlay--hidden", onAnimationEnd: this.overlayAnimationEnd }), h("div", { ref: el => (this.wrapEl = el), class: "modal__wrap modal__wrap--hidden", onClick: this.handleWrapClick }, h("div", { ref: el => (this.contentEl = el), onAnimationEnd: this.contentAnimationEnd, class: {
                modal__content: true,
                "modal__content--sm": this.size === "sm" && !this.customWidth,
                "modal__content--md": this.size === "md" && !this.customWidth
            }, style: {
                width: this.customWidth || undefined
            } }, h("slot", null), !this.hideCloseButton && (h("button", { class: {
                modal__close: true,
                "modal__close--primary": this.color === "primary",
                "modal__close--secondary": this.color === "secondary"
            }, onClick: this.cancelHandler }, h("cc-icon", { size: 16, name: "x" })))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "visible": ["toggleBodyScroll"]
    }; }
    static get style() { return ".modal.sc-cc-modal-h {\n  display: block;\n}\n\n.modal__overlay.sc-cc-modal, .modal__wrap.sc-cc-modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 100%;\n  z-index: 1000;\n}\n\n.modal__overlay.sc-cc-modal {\n  background-color: var(--neutral-03);\n}\n\n.modal__overlay--fadeIn.sc-cc-modal {\n  -webkit-animation: fadeInModal 0.4s linear forwards;\n          animation: fadeInModal 0.4s linear forwards;\n}\n\n.modal__overlay--fadeOut.sc-cc-modal {\n  -webkit-animation: fadeOutModal 0.4s linear forwards;\n          animation: fadeOutModal 0.4s linear forwards;\n}\n\n.modal__overlay--visible.sc-cc-modal {\n  display: block;\n  opacity: 0.8;\n}\n\n.modal__overlay--hidden.sc-cc-modal {\n  display: none;\n  opacity: 0;\n}\n\n.modal__wrap.sc-cc-modal {\n  overflow: auto;\n  outline: 0;\n  padding: 4.8rem 0;\n}\n\n.modal__wrap--hidden.sc-cc-modal {\n  display: none;\n}\n\n.modal__close.sc-cc-modal {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin-top: 1.6rem;\n  margin-right: 1.6rem;\n  outline: 0;\n  display: block;\n}\n\n.modal__close--primary.sc-cc-modal {\n  color: var(--primary);\n}\n\n.modal__close--secondary.sc-cc-modal {\n  color: var(--secondary);\n}\n\n.modal__content.sc-cc-modal {\n  background-color: var(--neutral-04);\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 0.4rem;\n  position: relative;\n  -webkit-box-shadow: 0 8px 32px -16px #4a4a4a;\n  box-shadow: 0 8px 32px -16px #4a4a4a;\n  padding: 4.8rem 3.2rem 3.2rem;\n  -webkit-transform-origin: top center;\n          transform-origin: top center;\n}\n\n.modal__content--sm.sc-cc-modal {\n  max-width: 32rem;\n}\n\n.modal__content--md.sc-cc-modal {\n  max-width: 57.6rem;\n}\n\n.modal__content--zoomIn.sc-cc-modal {\n  -webkit-animation: zoomInModal 0.3s ease forwards;\n          animation: zoomInModal 0.3s ease forwards;\n}\n\n.modal__content--zoomOut.sc-cc-modal {\n  -webkit-animation: zoomOutModal 0.3s ease forwards;\n          animation: zoomOutModal 0.3s ease forwards;\n}\n\n\@-webkit-keyframes fadeInModal {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 0.8;\n  }\n}\n\n\@keyframes fadeInModal {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 0.8;\n  }\n}\n\n\@-webkit-keyframes fadeOutModal {\n  from {\n    opacity: 0.8;\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n\n\@keyframes fadeOutModal {\n  from {\n    opacity: 0.8;\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n\n\@-webkit-keyframes zoomInModal {\n  from {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n}\n\n\@keyframes zoomInModal {\n  from {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n}\n\n\@-webkit-keyframes zoomOutModal {\n  from {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n  }\n}\n\n\@keyframes zoomOutModal {\n  from {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n  }\n}"; }
};

export { CcModal as cc_modal };
