import { r as registerInstance, h, H as Host } from './core-2b8afa15.js';

const CcWrapperField = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fieldReadonly = false;
        this.iconOnly = false;
        this.loader = false;
        this.disabled = false;
        this.color = "primary";
        this.error = false;
        this.border = true;
        this.bgField = "";
        this.isFocus = false;
        this.isActive = false;
        this.IconRotate = true;
    }
    render() {
        return (h(Host, { class: {
                "wrapper-field": true,
                "wrapper-field--is-focus": this.isActive,
                "wrapper-field--readonly": this.fieldReadonly || this.loader || this.iconOnly,
                "wrapper-field--disabled": this.disabled,
                "wrapper-field--secondary": this.color === "secondary" && !this.disabled && !this.error,
                "wrapper-field--error": this.error && !this.disabled,
                "wrapper-field--no-border": !this.border,
                "wrapper-field--no-background": !this.bgField,
                "wrapper-field--icon-only": this.iconOnly,
                "wrapper-field--helperText": this.helperText && this.error && !this.disabled
            } }, h("slot", null), h("div", { class: "wrapper-field__wrapper-icon" }, this.loader ? (h("cc-loader", null)) : (h("cc-icon", { class: {
                "wrapper-field__icon": true,
                "wrapper-field__icon--inverted": this.isActive && this.IconRotate
            }, name: this.error ? "x" : this.iconName }))), this.helperText && this.error && !this.disabled && (h("span", { class: "wrapper-field__helperText" }, this.helperText))));
    }
    static get style() { return ".wrapper-field {\n  position: relative;\n  width: 100%;\n  background-color: var(--neutral-04);\n  border-radius: 0.4rem;\n  border-width: 1px;\n  border-style: solid;\n  border-color: var(--neutral-02);\n  font-size: 1.4rem;\n  display: block;\n  cursor: pointer;\n  min-height: 42px;\n}\n\n.wrapper-field:hover {\n  border-color: var(--primary);\n}\n\n.wrapper-field .wrapper-field__icon {\n  color: var(--primary);\n}\n\n.wrapper-field cc-loader {\n  color: var(--primary);\n}\n\n.wrapper-field--readonly:after {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  content: \"\";\n  background: transparent;\n}\n\n.wrapper-field--no-border {\n  border-width: 0;\n}\n\n.wrapper-field--no-border:focus-within, .wrapper-field--no-border:hover {\n  border-width: 0;\n}\n\n.wrapper-field--no-background {\n  background: transparent;\n}\n\n.wrapper-field--secondary .wrapper-field__icon {\n  color: var(--secondary);\n}\n\n.wrapper-field--secondary cc-loader {\n  color: var(--secondary);\n}\n\n.wrapper-field--secondary:focus-within, .wrapper-field--secondary:hover {\n  border-color: var(--secondary);\n}\n\n.wrapper-field--secondary:focus-within .wrapper-field__icon, .wrapper-field--secondary:hover .wrapper-field__icon {\n  color: var(--secondary);\n}\n\n.wrapper-field--disabled {\n  border-color: var(--disabled-background);\n  cursor: not-allowed;\n}\n\n.wrapper-field--disabled .wrapper-field__icon {\n  color: var(--disabled-text);\n}\n\n.wrapper-field--disabled:focus-within, .wrapper-field--disabled:hover {\n  border-color: var(--disabled-background);\n  color: var(--disabled-text);\n}\n\n.wrapper-field--error {\n  border-color: var(--error);\n}\n\n.wrapper-field--error:focus-within, .wrapper-field--error:hover {\n  border-color: var(--error);\n}\n\n.wrapper-field--error .wrapper-field__icon {\n  color: var(--error);\n}\n\n.wrapper-field--helperText {\n  margin-bottom: 1.6rem;\n}\n\n.wrapper-field--is-focus {\n  border-color: var(--primary);\n}\n\n.wrapper-field--is-focus:hover {\n  border-color: var(--primary);\n}\n\n.wrapper-field--is-focus.wrapper-field--secondary {\n  border-color: var(--secondary);\n}\n\n.wrapper-field--is-focus.wrapper-field--secondary:hover {\n  border-color: var(--secondary);\n}\n\n.wrapper-field--is-focus.wrapper-field--error {\n  border-color: var(--error);\n}\n\n.wrapper-field--is-focus.wrapper-field--error:focus-within, .wrapper-field--is-focus.wrapper-field--error:hover {\n  border-color: var(--error);\n}\n\n.wrapper-field--is-focus.wrapper-field--error .wrapper-field__icon {\n  color: var(--error);\n}\n\n.wrapper-field__wrapper-icon {\n  pointer-events: none;\n  position: absolute;\n  right: 8px;\n  bottom: 8px;\n  max-height: 2.4rem;\n}\n\n.wrapper-field__icon--inverted {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.wrapper-field__helperText {\n  position: absolute;\n  font-size: 1.1rem;\n  margin-top: 0.4rem;\n  color: var(--error);\n  left: 0;\n}"; }
};

export { CcWrapperField as cc_wrapper_field };
