import { r as registerInstance, h, H as Host, d as getElement } from './core-2b8afa15.js';

const CcInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.color = "primary";
        this.type = "text";
        this.disabled = false;
        this.error = false;
        this.success = false;
        this.bgField = "";
        this.autocomplete = "";
        this.border = true;
        this.focusInput = () => {
            this.inputEl.focus();
        };
        this.setInputRef = (el) => {
            this.inputEl = el;
            if (this.inputRef) {
                this.inputRef(this.inputEl);
            }
        };
    }
    render() {
        const hasAdornment = this.el.querySelector("[slot='adornment']");
        return (h(Host, { class: {
                input: true,
                "input--primary": this.color === "primary",
                "input--secondary": this.color === "secondary",
                "input--success": this.success && !this.error && !this.disabled,
                "input--error": this.error && !this.success && !this.disabled,
                "input--disabled": this.disabled,
                "input--without-border": !this.border
            }, "data-testid": "cc-input" }, this.label && (h("label", { class: "input__label", onClick: this.focusInput }, this.label)), h("div", { class: "input__wrapper" }, h("input", { class: {
                input__field: true,
                "input__field--icon": !!this.iconName || !!hasAdornment,
                "input__field--default-bg": !this.bgField,
                [this.bgField]: !!this.bgField
            }, type: this.type, placeholder: this.placeholder, disabled: this.disabled, name: this.name, value: this.value, ref: this.setInputRef, autocomplete: this.autocomplete, maxLength: this.maxLength }), this.iconName && (h("cc-icon", { class: {
                input__icon: true,
                "input__icon--primary": this.color === "primary",
                "input__icon--secondary": this.color === "secondary"
            }, name: this.iconName })), hasAdornment && (h("div", { class: "input__icon" }, h("slot", { name: "adornment" })))), this.helperText && this.error && !this.success && !this.disabled && (h("span", { class: "input__helperText", onClick: this.focusInput }, this.helperText))));
    }
    get el() { return getElement(this); }
    static get style() { return ".input {\n  display: block;\n}\n\n.input__wrapper {\n  position: relative;\n}\n\n.input__icon {\n  position: absolute;\n  right: 0;\n  margin-right: 0.8rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.input__icon--primary {\n  color: var(--primary);\n}\n\n.input__icon--secondary {\n  color: var(--secondary);\n}\n\n.input__field {\n  width: 100%;\n  border-radius: 0.4rem;\n  border-width: 1px;\n  border-color: var(--neutral-02);\n  padding-left: 1.6rem;\n  padding-right: 1.6rem;\n  padding-top: 0.8rem;\n  padding-bottom: 0.8rem;\n  font-size: 1.4rem;\n  display: block;\n  line-height: 2.4rem;\n}\n\n.input__field:disabled {\n  border-color: var(--disabled-background);\n}\n\n.input--success .input__field {\n  border-color: var(--success);\n}\n\n.input--error .input__field {\n  border-color: var(--error);\n}\n\n.input--without-border .input__field {\n  border-width: 0;\n}\n\n.input--without-border .input__field:focus-within, .input--without-border .input__field:hover {\n  border-width: 0;\n}\n\n.input__field:focus {\n  outline: 0;\n}\n\n.input--primary .input__field:focus {\n  border-color: var(--primary);\n}\n\n.input--secondary .input__field:focus {\n  border-color: var(--secondary);\n}\n\n.input--success .input__field:focus {\n  border-color: var(--success);\n}\n\n.input--error .input__field:focus {\n  border-color: var(--error);\n}\n\n.input__field::-webkit-input-placeholder {\n  color: var(--neutral-02);\n}\n\n.input__field::-moz-placeholder {\n  color: var(--neutral-02);\n}\n\n.input__field:-ms-input-placeholder {\n  color: var(--neutral-02);\n}\n\n.input__field::-ms-input-placeholder {\n  color: var(--neutral-02);\n}\n\n.input__field::placeholder {\n  color: var(--neutral-02);\n}\n\n.input__field--default-bg {\n  background-color: var(--neutral-04);\n}\n\n.input__field--icon {\n  padding-right: 3.8rem;\n}\n\n.input__helperText {\n  display: block;\n  font-size: 1.1rem;\n  margin-top: 0.4rem;\n  color: var(--error);\n}\n\n.input__label {\n  display: block;\n  padding-top: 0.4rem;\n  padding-bottom: 0.4rem;\n  font-size: 1.1rem;\n  font-weight: 900;\n  color: var(--neutral-03);\n}\n\n.textarea--disabled .input__label {\n  color: var(--disabled-text);\n}"; }
};

export { CcInput as cc_input };
