import { r as registerInstance, h, H as Host } from './index-b08024e3.js';
var ccSwitcherCss = ":host{display:block;--cc-switcher-color-base:var(--neutral-02);--cc-switcher-color-active:var(--primary)}:host(.switch--secondary){--cc-switcher-color-active:var(--secondary)}:host(.switch--error){--cc-switcher-color-active:var(--error)}:host(.switch--disabled){--cc-switcher-color-base:var(--disabled-text);--cc-switcher-color-active:var(--disabled-text)}.switch{position:relative;display:inline-block;width:5.2rem;height:2.8rem}.switch--sm{width:3.6rem;height:1.6rem}.switch__input{visibility:hidden;opacity:0;width:0;height:0}.switch__slider{cursor:pointer;position:absolute;top:0;left:0;right:0;bottom:0;border-radius:9999px;-webkit-transition:background-color 0.3s ease 0s;transition:background-color 0.3s ease 0s;background-color:var(--cc-switcher-color-base)}.switch__input:checked+.switch__slider{background-color:var(--cc-switcher-color-active)}.switch__slider::before{border-width:2px;border-style:solid;position:absolute;left:0;background-color:var(--neutral-04);border-radius:9999px;content:\"\";height:3.2rem;width:3.2rem;top:-0.2rem;-webkit-transition:-webkit-transform 0.3s ease;transition:-webkit-transform 0.3s ease;transition:transform 0.3s ease;transition:transform 0.3s ease, -webkit-transform 0.3s ease;-webkit-box-sizing:border-box;box-sizing:border-box;border-color:var(--cc-switcher-color-base)}.switch__input:checked+.switch__slider::before{border-color:var(--cc-switcher-color-active);-webkit-transform:translateX(2rem);transform:translateX(2rem)}.switch__slider.switch__slider--sm::before{height:2rem;width:2rem}.switch__input:checked+.switch__slider.switch__slider--sm::before{-webkit-transform:translateX(1.6rem);transform:translateX(1.6rem)}";
var CcSwitcher = /** @class */ (function () {
    function CcSwitcher(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.color = "primary";
        this.error = false;
        this.disabled = false;
        this.checked = false;
        this.size = "md";
        this.setInputRef = function (el) {
            _this.inputEl = el;
            if (_this.inputRef) {
                _this.inputRef(_this.inputEl);
            }
        };
    }
    CcSwitcher.prototype.render = function () {
        return (h(Host, { class: {
                "switch--secondary": this.color === "secondary",
                "switch--error": this.error,
                "switch--disabled": this.disabled
            } }, h("label", { class: { switch: true, "switch--sm": this.size === "sm" } }, h("input", { type: "checkbox", class: "switch__input", value: this.value, name: this.name, disabled: this.disabled, ref: this.setInputRef, checked: this.checked }), h("span", { class: {
                switch__slider: true,
                "switch__slider--sm": this.size === "sm"
            } }))));
    };
    return CcSwitcher;
}());
CcSwitcher.style = ccSwitcherCss;
export { CcSwitcher as cc_switcher };
