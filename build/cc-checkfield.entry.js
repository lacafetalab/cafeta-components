import { r as registerInstance, h, H as Host } from './core-2b8afa15.js';

const CcCheckfield = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.type = "checkbox";
        this.checked = false;
        this.disabled = false;
        this.size = "small";
        this.shape = "square";
        this.error = false;
        this.color = "primary";
        this.setInputRef = (el) => {
            this.inputEl = el;
            if (this.inputRef) {
                this.inputRef(this.inputEl);
            }
        };
    }
    render() {
        return (h(Host, { "data-testid": "cc-checkfield", class: "CheckField" }, h("label", { class: "checkfield__wrapper" }, h("div", { class: {
                "checkfield__wrapper-input": true,
                "checkfield__wrapper-input--medium": this.size === "medium"
            } }, h("input", { type: this.type, name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, ref: this.setInputRef, class: {
                checkfield__input: true,
                "checkfield__input--secondary": this.color === "secondary",
                "checkfield__input--circle": this.shape === "circle",
                "checkfield__input--square": this.shape === "square",
                "checkfield__input--medium": this.size === "medium",
                "checkfield__input--error": this.error
            } }), this.shape === "square" && (h("cc-icon", { name: "check", class: "checkfield__check", size: this.size === "medium" ? 12 : 10 }))), this.label && h("span", { class: "checkfield__label" }, this.label))));
    }
    static get style() { return ".checkfield__wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n}\n\n.checkfield__wrapper-input {\n  width: 16px;\n  height: 16px;\n  position: relative;\n}\n\n.checkfield__wrapper-input--medium {\n  width: 20px;\n  height: 20px;\n}\n\n.checkfield__input {\n  border-color: var(--primary);\n  border-width: 1px;\n  border-color: var(--neutral-02);\n  border-style: solid;\n  cursor: pointer;\n  margin: 0;\n  width: 16px;\n  height: 16px;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n\n.checkfield__input:hover {\n  border-color: var(--primary-dark);\n}\n\n.checkfield__input:focus {\n  outline: 0;\n}\n\n.checkfield__input:checked {\n  border-color: var(--primary-dark);\n}\n\n.checkfield__input--secondary:focus-within, .checkfield__input--secondary:hover {\n  border-color: var(--secondary-dark);\n}\n\n.checkfield__input--secondary:checked {\n  border-color: var(--secondary-dark);\n}\n\n.checkfield__input--secondary:checked.checkfield__input--square {\n  background-color: var(--secondary-dark);\n}\n\n.checkfield__input--medium {\n  width: 20px;\n  height: 20px;\n}\n\n.checkfield__input--circle {\n  border-radius: 9999px;\n}\n\n.checkfield__input--circle:checked {\n  border-width: 4px;\n  border-style: solid inset solid solid;\n}\n\n.checkfield__input--circle.checkfield__input--medium:checked {\n  border-width: 5px;\n}\n\n.checkfield__input--square {\n  border-radius: 0.2rem;\n}\n\n.checkfield__input--square:checked {\n  background-color: var(--primary);\n  border-color: var(--primary);\n}\n\n.checkfield__input--square:checked + cc-icon {\n  display: block;\n}\n\n.checkfield__input--square.checkfield__input--secondary:checked {\n  background-color: var(--secondary);\n  border-color: var(--secondary);\n}\n\n.checkfield__input--square.checkfield__input--secondary:checked + cc-icon {\n  display: block;\n}\n\n.checkfield__input--square:disabled {\n  border-color: var(--disabled-background);\n}\n\n.checkfield__input--square:disabled:checked + cc-icon {\n  color: var(--disabled-text);\n  cursor: not-allowed;\n}\n\n.checkfield__input--error {\n  border-color: var(--error);\n}\n\n.checkfield__input--error:hover {\n  border-color: var(--error);\n}\n\n.checkfield__input--error:disabled:hover {\n  border-color: var(--disabled-background);\n}\n\n.checkfield__input--error:checked {\n  border-color: var(--error);\n}\n\n.checkfield__input--error.checkfield__input--square:checked {\n  background-color: var(--error);\n  border-color: var(--error);\n}\n\n.checkfield__input:disabled {\n  border-color: var(--disabled-background);\n  cursor: not-allowed;\n}\n\n.checkfield__input:disabled.checkfield__input--square:checked {\n  background-color: var(--disabled-background);\n  border-color: var(--disabled-background);\n}\n\n.checkfield__label {\n  margin-left: 0.8rem;\n  font-size: 1.2rem;\n  color: var(--neutral-02);\n  line-height: 1.6rem;\n}\n\n.checkfield__check {\n  cursor: pointer;\n  position: absolute;\n  color: var(--neutral-04);\n  display: none;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}"; }
};

export { CcCheckfield as cc_checkfield };
