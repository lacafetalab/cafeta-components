import { h, Host } from "@stencil/core";
export class CcWrapperField {
    constructor() {
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
            } },
            h("slot", null),
            h("div", { class: "wrapper-field__wrapper-icon" }, this.loader ? (h("cc-loader", null)) : (h("cc-icon", { class: {
                    "wrapper-field__icon": true,
                    "wrapper-field__icon--inverted": this.isActive && this.IconRotate
                }, name: this.error ? "x" : this.iconName }))),
            this.helperText && this.error && !this.disabled && (h("span", { class: "wrapper-field__helperText" }, this.helperText))));
    }
    static get is() { return "cc-wrapper-field"; }
    static get originalStyleUrls() { return {
        "$": ["cc-wrapper-field.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-wrapper-field.css"]
    }; }
    static get properties() { return {
        "fieldReadonly": {
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
            "attribute": "field-readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "iconOnly": {
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
            "attribute": "icon-only",
            "reflect": false,
            "defaultValue": "false"
        },
        "loader": {
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
            "attribute": "loader",
            "reflect": false,
            "defaultValue": "false"
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
        "isFocus": {
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
            "attribute": "is-focus",
            "reflect": false,
            "defaultValue": "false"
        },
        "isActive": {
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
            "attribute": "is-active",
            "reflect": false,
            "defaultValue": "false"
        },
        "IconRotate": {
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
            "attribute": "icon-rotate",
            "reflect": false,
            "defaultValue": "true"
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
        }
    }; }
}
