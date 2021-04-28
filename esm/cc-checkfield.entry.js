import { r as registerInstance, h, H as Host } from './index-105344ad.js';

const ccCheckfieldCss = ".checkfield__wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:-webkit-max-content;width:-moz-max-content;width:max-content}.checkfield__wrapper-input{width:16px;height:16px;position:relative}.checkfield__wrapper-input--medium{width:20px;height:20px}.checkfield__input{border-color:var(--primary);border-width:1px;border-color:var(--neutral-02);border-style:solid;cursor:pointer;margin:0;width:16px;height:16px;-webkit-appearance:none;-moz-appearance:none;appearance:none}.checkfield__input:hover{border-color:var(--primary-dark)}.checkfield__input:focus{outline:0}.checkfield__input:checked{border-color:var(--primary-dark)}.checkfield__input--secondary:focus-within,.checkfield__input--secondary:hover{border-color:var(--secondary-dark)}.checkfield__input--secondary:checked{border-color:var(--secondary-dark)}.checkfield__input--secondary:checked.checkfield__input--square{background-color:var(--secondary-dark)}.checkfield__input--medium{width:20px;height:20px}.checkfield__input--circle{border-radius:9999px}.checkfield__input--circle:checked{border-width:4px;border-style:solid inset solid solid}.checkfield__input--circle.checkfield__input--medium:checked{border-width:5px}.checkfield__input--square{border-radius:0.2rem}.checkfield__input--square:checked{background-color:var(--primary);border-color:var(--primary)}.checkfield__input--square:checked+cc-icon{display:block}.checkfield__input--square.checkfield__input--secondary:checked{background-color:var(--secondary);border-color:var(--secondary)}.checkfield__input--square.checkfield__input--secondary:checked+cc-icon{display:block}.checkfield__input--square:disabled{border-color:var(--disabled-background)}.checkfield__input--square:disabled:checked+cc-icon{color:var(--disabled-text);cursor:not-allowed}.checkfield__input--error{border-color:var(--error)}.checkfield__input--error:hover{border-color:var(--error)}.checkfield__input--error:disabled:hover{border-color:var(--disabled-background)}.checkfield__input--error:checked{border-color:var(--error)}.checkfield__input--error.checkfield__input--square:checked{background-color:var(--error);border-color:var(--error)}.checkfield__input:disabled{border-color:var(--disabled-background);cursor:not-allowed}.checkfield__input:disabled.checkfield__input--square:checked{background-color:var(--disabled-background);border-color:var(--disabled-background)}.checkfield__label{margin-left:0.8rem;font-size:1.2rem;color:var(--neutral-02);line-height:1.6rem}.checkfield__check{cursor:pointer;position:absolute;color:var(--neutral-04);display:none;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}";

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
};
CcCheckfield.style = ccCheckfieldCss;

export { CcCheckfield as cc_checkfield };
