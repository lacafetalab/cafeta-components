var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-f424fde7.js';
var ccModalCss = ".modal.sc-cc-modal-h{display:block}.modal__overlay.sc-cc-modal,.modal__wrap.sc-cc-modal{position:fixed;top:0;right:0;bottom:0;left:0;height:100%;z-index:1000}.modal__overlay.sc-cc-modal{background-color:var(--neutral-03)}.modal__overlay--fadeIn.sc-cc-modal{-webkit-animation:fadeInModal 0.4s linear forwards;animation:fadeInModal 0.4s linear forwards}.modal__overlay--fadeOut.sc-cc-modal{-webkit-animation:fadeOutModal 0.4s linear forwards;animation:fadeOutModal 0.4s linear forwards}.modal__overlay--visible.sc-cc-modal{display:block;opacity:0.8}.modal__overlay--hidden.sc-cc-modal{display:none;opacity:0}.modal__wrap.sc-cc-modal{overflow:auto;outline:2px solid transparent;outline-offset:2px;padding:4.8rem 0}.modal__wrap--hidden.sc-cc-modal{display:none}.modal__close.sc-cc-modal{position:absolute;top:0;right:0;margin-top:1.6rem;margin-right:1.6rem;outline:2px solid transparent;outline-offset:2px;display:block}.modal__close--primary.sc-cc-modal{color:var(--primary)}.modal__close--secondary.sc-cc-modal{color:var(--secondary)}.modal__content.sc-cc-modal{background-color:var(--neutral-04);margin-left:auto;margin-right:auto;border-radius:0.4rem;position:relative;-webkit-box-shadow:0 8px 32px -16px #4a4a4a;box-shadow:0 8px 32px -16px #4a4a4a;padding:4.8rem 3.2rem 3.2rem;-webkit-transform-origin:top center;transform-origin:top center}.modal__content--sm.sc-cc-modal{max-width:32rem}.modal__content--md.sc-cc-modal{max-width:57.6rem}.modal__content--zoomIn.sc-cc-modal{-webkit-animation:zoomInModal 0.3s ease forwards;animation:zoomInModal 0.3s ease forwards}.modal__content--zoomOut.sc-cc-modal{-webkit-animation:zoomOutModal 0.3s ease forwards;animation:zoomOutModal 0.3s ease forwards}@-webkit-keyframes fadeInModal{from{opacity:0}to{opacity:0.8}}@keyframes fadeInModal{from{opacity:0}to{opacity:0.8}}@-webkit-keyframes fadeOutModal{from{opacity:0.8}to{opacity:0}}@keyframes fadeOutModal{from{opacity:0.8}to{opacity:0}}@-webkit-keyframes zoomInModal{from{opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes zoomInModal{from{opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes zoomOutModal{from{opacity:1;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}}@keyframes zoomOutModal{from{opacity:1;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform:scale(0.5);transform:scale(0.5)}}";
var CcModal = /** @class */ (function () {
    function CcModal(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.close = createEvent(this, "close", 7);
        this.cancel = createEvent(this, "cancel", 7);
        this.size = "md";
        this.visible = false;
        this.color = "primary";
        this.hideCloseButton = false;
        this.disableESC = false;
        this.cancelHandler = function () {
            _this.cancel.emit();
        };
        this.handleWrapClick = function (e) {
            if (e.target === _this.wrapEl)
                _this.cancelHandler();
        };
        this.overlayAnimationEnd = function (e) {
            if (e.animationName === "fadeInModal") {
                _this.overlayEl.classList.remove("modal__overlay--fadeIn");
                _this.overlayEl.classList.add("modal__overlay--visible");
            }
            if (e.animationName === "fadeOutModal") {
                _this.overlayEl.classList.add("modal__overlay--hidden");
                _this.overlayEl.classList.remove("modal__overlay--fadeOut");
                _this.closeHandler();
            }
        };
        this.contentAnimationEnd = function (e) {
            if (e.animationName === "zoomInModal") {
                _this.contentEl.classList.remove("modal__content--zoomIn");
            }
            if (e.animationName === "zoomOutModal") {
                _this.contentEl.classList.remove("modal__content--zoomOut");
                _this.wrapEl.classList.add("modal__wrap--hidden");
            }
        };
    }
    CcModal.prototype.toggleBodyScroll = function (newVisible) {
        if (newVisible) {
            this.animatedShow();
        }
        else {
            this.animatedHide();
        }
    };
    CcModal.prototype.handleKeyDown = function (ev) {
        if (ev.key === "Escape" && this.visible && !this.disableESC) {
            this.cancelHandler();
        }
    };
    CcModal.prototype.closeHandler = function () {
        this.enableBodyScroll();
        this.close.emit();
    };
    CcModal.prototype.animatedShow = function () {
        this.disableBodyScroll();
        this.overlayEl.classList.remove("modal__overlay--hidden");
        this.overlayEl.classList.add("modal__overlay--fadeIn");
        this.wrapEl.classList.remove("modal__wrap--hidden");
        this.contentEl.classList.add("modal__content--zoomIn");
    };
    CcModal.prototype.animatedHide = function () {
        this.overlayEl.classList.remove("modal__overlay--visible");
        this.overlayEl.classList.add("modal__overlay--fadeOut");
        this.contentEl.classList.add("modal__content--zoomOut");
    };
    CcModal.prototype.enableBodyScroll = function () {
        document.body.style.overflow = "";
    };
    CcModal.prototype.disableBodyScroll = function () {
        if (!this.otherModalIsVisible())
            document.body.style.overflow = "hidden";
    };
    CcModal.prototype.otherModalIsVisible = function () {
        return !!__spreadArrays(document.querySelectorAll("cc-modal")).find(function (e) { return e.visible; }).length;
    };
    CcModal.prototype.componentDidLoad = function () {
        if (this.visible) {
            this.animatedShow();
        }
    };
    CcModal.prototype.componentDidUnload = function () {
        this.enableBodyScroll();
    };
    CcModal.prototype.render = function () {
        var _this = this;
        return (h(Host, { class: "modal" }, h("cc-modal-controller", { modalRef: this.el }), h("div", { ref: function (el) { return (_this.overlayEl = el); }, class: "modal__overlay modal__overlay--hidden", onAnimationEnd: this.overlayAnimationEnd }), h("div", { ref: function (el) { return (_this.wrapEl = el); }, class: "modal__wrap modal__wrap--hidden", onClick: this.handleWrapClick }, h("div", { ref: function (el) { return (_this.contentEl = el); }, onAnimationEnd: this.contentAnimationEnd, class: {
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
    };
    Object.defineProperty(CcModal.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CcModal, "watchers", {
        get: function () {
            return {
                "visible": ["toggleBodyScroll"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CcModal;
}());
CcModal.style = ccModalCss;
export { CcModal as cc_modal };
