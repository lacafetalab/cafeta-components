import { h, Host } from "@stencil/core";
export class CcCheckfield {
    constructor() {
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
        return (h(Host, { "data-testid": "cc-checkfield", class: "CheckField" },
            h("label", { class: "checkfield__wrapper" },
                h("div", { class: {
                        "checkfield__wrapper-input": true,
                        "checkfield__wrapper-input--medium": this.size === "medium"
                    } },
                    h("input", { type: this.type, name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, ref: this.setInputRef, class: {
                            checkfield__input: true,
                            "checkfield__input--secondary": this.color === "secondary",
                            "checkfield__input--circle": this.shape === "circle",
                            "checkfield__input--square": this.shape === "square",
                            "checkfield__input--medium": this.size === "medium",
                            "checkfield__input--error": this.error
                        } }),
                    this.shape === "square" && (h("cc-icon", { name: "check", class: "checkfield__check", size: this.size === "medium" ? 12 : 10 }))),
                this.label && h("span", { class: "checkfield__label" }, this.label))));
    }
    static get is() { return "cc-checkfield"; }
    static get originalStyleUrls() { return {
        "$": ["cc-checkfield.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-checkfield.css"]
    }; }
    static get properties() { return {
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"checkbox\" | \"radio\"",
                "resolved": "\"checkbox\" | \"radio\"",
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
            "defaultValue": "\"checkbox\""
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
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"small\" | \"medium\"",
                "resolved": "\"medium\" | \"small\"",
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
            "defaultValue": "\"small\""
        },
        "shape": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"circle\" | \"square\"",
                "resolved": "\"circle\" | \"square\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "shape",
            "reflect": false,
            "defaultValue": "\"square\""
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
        }
    }; }
}
