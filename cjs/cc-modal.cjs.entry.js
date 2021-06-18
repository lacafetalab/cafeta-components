'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5c45a7c9.js');

const ccModalCss = ".modal.sc-cc-modal-h{display:block}.modal__overlay.sc-cc-modal,.modal__wrap.sc-cc-modal{position:fixed;top:0;right:0;bottom:0;left:0;height:100%;z-index:1000}.modal__overlay.sc-cc-modal{background-color:var(--neutral-03)}.modal__overlay--fadeIn.sc-cc-modal{-webkit-animation:fadeInModal 0.4s linear forwards;animation:fadeInModal 0.4s linear forwards}.modal__overlay--fadeOut.sc-cc-modal{-webkit-animation:fadeOutModal 0.4s linear forwards;animation:fadeOutModal 0.4s linear forwards}.modal__overlay--visible.sc-cc-modal{display:block;opacity:0.8}.modal__overlay--hidden.sc-cc-modal{display:none;opacity:0}.modal__wrap.sc-cc-modal{overflow:auto;outline:2px solid transparent;outline-offset:2px;padding:6rem 2.4rem}@media (min-width: 992px){.modal__wrap.sc-cc-modal{padding:4.8rem 0}}.modal__wrap--hidden.sc-cc-modal{display:none}.modal__close.sc-cc-modal{position:absolute;top:0;right:0;margin-top:1.6rem;margin-right:1.6rem;outline:2px solid transparent;outline-offset:2px;display:block}.modal__close--primary.sc-cc-modal{color:var(--primary)}.modal__close--secondary.sc-cc-modal{color:var(--secondary)}.modal__content.sc-cc-modal{background-color:var(--neutral-04);margin-left:auto;margin-right:auto;border-radius:0.4rem;position:relative;-webkit-box-shadow:0 8px 32px -16px #4a4a4a;box-shadow:0 8px 32px -16px #4a4a4a;padding:4.8rem 3.2rem 3.2rem;-webkit-transform-origin:top center;transform-origin:top center}.modal__content--sm.sc-cc-modal{max-width:32rem}.modal__content--md.sc-cc-modal{max-width:57.6rem}.modal__content--zoomIn.sc-cc-modal{-webkit-animation:zoomInModal 0.3s ease forwards;animation:zoomInModal 0.3s ease forwards}.modal__content--zoomOut.sc-cc-modal{-webkit-animation:zoomOutModal 0.3s ease forwards;animation:zoomOutModal 0.3s ease forwards}@-webkit-keyframes fadeInModal{from{opacity:0}to{opacity:0.8}}@keyframes fadeInModal{from{opacity:0}to{opacity:0.8}}@-webkit-keyframes fadeOutModal{from{opacity:0.8}to{opacity:0}}@keyframes fadeOutModal{from{opacity:0.8}to{opacity:0}}@-webkit-keyframes zoomInModal{from{opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes zoomInModal{from{opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes zoomOutModal{from{opacity:1;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}}@keyframes zoomOutModal{from{opacity:1;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}}";

const CcModal = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.close = index.createEvent(this, "close", 7);
        this.cancel = index.createEvent(this, "cancel", 7);
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
        return (index.h(index.Host, { class: "modal" }, index.h("cc-modal-controller", { modalRef: this.el }), index.h("div", { ref: el => (this.overlayEl = el), class: "modal__overlay modal__overlay--hidden", onAnimationEnd: this.overlayAnimationEnd }), index.h("div", { ref: el => (this.wrapEl = el), class: "modal__wrap modal__wrap--hidden", onClick: this.handleWrapClick }, index.h("div", { ref: el => (this.contentEl = el), onAnimationEnd: this.contentAnimationEnd, class: {
                modal__content: true,
                "modal__content--sm": this.size === "sm" && !this.customWidth,
                "modal__content--md": this.size === "md" && !this.customWidth
            }, style: {
                width: this.customWidth || undefined
            } }, index.h("slot", null), !this.hideCloseButton && (index.h("button", { class: {
                modal__close: true,
                "modal__close--primary": this.color === "primary",
                "modal__close--secondary": this.color === "secondary"
            }, onClick: this.cancelHandler }, index.h("cc-icon", { size: 16, name: "x" })))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "visible": ["toggleBodyScroll"]
    }; }
};
CcModal.style = ccModalCss;

exports.cc_modal = CcModal;
