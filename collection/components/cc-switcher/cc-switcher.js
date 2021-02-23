import { Component, h, Host, Prop } from "@stencil/core";
export class CcSwitcher {
    constructor() {
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
            } },
            h("label", { class: { switch: true, "switch--sm": this.size === "sm" } },
                h("input", { type: "checkbox", class: "switch__input", value: this.value, name: this.name, disabled: this.disabled, ref: this.setInputRef, checked: this.checked }),
                h("span", { class: {
                        switch__slider: true,
                        "switch__slider--sm": this.size === "sm"
                    } }))));
    }
    static get is() { return "cc-switcher"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["cc-switcher.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-switcher.css"]
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
            "optional": true,
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
        "checked": {
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
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"sm\" | \"md\"",
                "resolved": "\"md\" | \"sm\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "\"md\""
        }
    }; }
}
