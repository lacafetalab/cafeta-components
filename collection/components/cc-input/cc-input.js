import { h, Component, Host, Prop, Element } from "@stencil/core";
export class CcInput {
    constructor() {
        this.color = "primary";
        this.type = "text";
        this.disabled = false;
        this.error = false;
        this.success = false;
        this.bgField = "";
        this.autocomplete = "";
        this.border = true;
        this.defaultValue = "";
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
            }, "data-testid": "cc-input" },
            this.label && (h("label", { class: "input__label", onClick: this.focusInput }, this.label)),
            h("div", { class: "input__wrapper" },
                h("input", { class: {
                        input__field: true,
                        "input__field--icon": !!this.iconName || !!hasAdornment,
                        "input__field--default-bg": !this.bgField,
                        [this.bgField]: !!this.bgField
                    }, type: this.type, placeholder: this.placeholder, disabled: this.disabled, name: this.name, value: this.value, ref: this.setInputRef, autocomplete: this.autocomplete, maxLength: this.maxLength, defaultValue: this.defaultValue }),
                this.iconName && (h("cc-icon", { class: {
                        input__icon: true,
                        "input__icon--primary": this.color === "primary",
                        "input__icon--secondary": this.color === "secondary"
                    }, name: this.iconName })),
                hasAdornment && (h("div", { class: "input__icon" },
                    h("slot", { name: "adornment" })))),
            this.helperText && this.error && !this.success && !this.disabled && (h("span", { class: "input__helperText", onClick: this.focusInput }, this.helperText))));
    }
    static get is() { return "cc-input"; }
    static get originalStyleUrls() { return {
        "$": ["cc-input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-input.css"]
    }; }
    static get properties() { return {
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
        "label": {
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
            "attribute": "label",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"text\" | \"password\" | \"number\"",
                "resolved": "\"number\" | \"password\" | \"text\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"text\""
        },
        "value": {
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
            "attribute": "value",
            "reflect": false
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "placeholder": {
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
            "attribute": "placeholder",
            "reflect": false
        },
        "inputRef": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(el: HTMLInputElement) => void",
                "resolved": "(el: HTMLInputElement) => void",
                "references": {
                    "HTMLInputElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "error": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "success": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "success",
            "reflect": false,
            "defaultValue": "false"
        },
        "helperText": {
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
            "attribute": "helper-text",
            "reflect": false
        },
        "name": {
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
            "attribute": "name",
            "reflect": false
        },
        "iconName": {
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
            "attribute": "icon-name",
            "reflect": false
        },
        "bgField": {
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
            "attribute": "bg-field",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "autocomplete": {
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
            "attribute": "autocomplete",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "maxLength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "max-length",
            "reflect": false
        },
        "border": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "border",
            "reflect": false,
            "defaultValue": "true"
        },
        "defaultValue": {
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
            "attribute": "default-value",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
    static get elementRef() { return "el"; }
}
