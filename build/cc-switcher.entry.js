import { r as registerInstance, h, H as Host } from './core-2b8afa15.js';

const CcSwitcher = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.color = "primary";
        this.error = false;
        this.disabled = false;
        this.checked = false;
        this.size = "md";
        this.setInputRef = (el) => {
            this.inputEl = el;
            if (this.inputRef) {
                this.inputRef(this.inputEl);
            }
        };
    }
    render() {
        return (h(Host, { class: {
                "switch--secondary": this.color === "secondary",
                "switch--error": this.error,
                "switch--disabled": this.disabled
            } }, h("label", { class: { switch: true, "switch--sm": this.size === "sm" } }, h("input", { type: "checkbox", class: "switch__input", value: this.value, name: this.name, disabled: this.disabled, ref: this.setInputRef, checked: this.checked }), h("span", { class: {
                switch__slider: true,
                "switch__slider--sm": this.size === "sm"
            } }))));
    }
    static get style() { return ":host {\n  display: block;\n  --cc-switcher-color-base: var(--neutral-02);\n  --cc-switcher-color-active: var(--primary);\n}\n\n:host(.switch--secondary) {\n  --cc-switcher-color-active: var(--secondary);\n}\n\n:host(.switch--error) {\n  --cc-switcher-color-active: var(--error);\n}\n\n:host(.switch--disabled) {\n  --cc-switcher-color-base: var(--disabled-text);\n  --cc-switcher-color-active: var(--disabled-text);\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 5.2rem;\n  height: 2.8rem;\n}\n\n.switch--sm {\n  width: 3.6rem;\n  height: 1.6rem;\n}\n\n.switch__input {\n  visibility: hidden;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.switch__slider {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 9999px;\n  -webkit-transition: background-color 0.3s ease 0s;\n  transition: background-color 0.3s ease 0s;\n  background-color: var(--cc-switcher-color-base);\n}\n\n.switch__input:checked + .switch__slider {\n  background-color: var(--cc-switcher-color-active);\n}\n\n.switch__slider::before {\n  border-width: 2px;\n  border-style: solid;\n  position: absolute;\n  left: 0;\n  background-color: var(--neutral-04);\n  border-radius: 9999px;\n  content: \"\";\n  height: 3.2rem;\n  width: 3.2rem;\n  top: -0.2rem;\n  -webkit-transition: -webkit-transform 0.3s ease;\n  transition: -webkit-transform 0.3s ease;\n  transition: transform 0.3s ease;\n  transition: transform 0.3s ease, -webkit-transform 0.3s ease;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  border-color: var(--cc-switcher-color-base);\n}\n\n.switch__input:checked + .switch__slider::before {\n  border-color: var(--cc-switcher-color-active);\n  -webkit-transform: translateX(2rem);\n          transform: translateX(2rem);\n}\n\n.switch__slider.switch__slider--sm::before {\n  height: 2rem;\n  width: 2rem;\n}\n\n.switch__input:checked + .switch__slider.switch__slider--sm::before {\n  -webkit-transform: translateX(1.6rem);\n          transform: translateX(1.6rem);\n}"; }
};

export { CcSwitcher as cc_switcher };
