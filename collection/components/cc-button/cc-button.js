import { h, Host } from "@stencil/core";
export class CcButton {
    constructor() {
        this.iconName = "";
        this.iconReverse = false;
        this.iconOnly = false;
        this.disabled = false;
        this.fill = "solid";
        this.expand = false;
        this.color = "primary";
        this.size = "lg";
        this.glow = false;
        this.type = "button";
        this.loading = false;
        this.download = false;
    }
    render() {
        const BtnElem = this.href ? "a" : "button";
        const attrs = {
            disabled: this.href ? false : this.disabled,
            href: this.href,
            download: this.download,
            target: this.target,
            type: this.type
        };
        return (h(Host, { class: {
                button__host: true,
                "button--block": this.expand,
                "button--secondary": this.color === "secondary"
            }, "data-testid": "cc-button" },
            h(BtnElem, Object.assign({ "data-testid": "cc-button__element", class: {
                    button: true,
                    "button--reverse": this.iconReverse,
                    "button--disabled": this.href ? false : this.disabled,
                    "button--outline": this.fill === "outline",
                    "button--clear": this.fill === "clear",
                    "button--md": this.size === "md",
                    "button--sm": this.size === "sm",
                    "button--iconOnly": this.iconOnly,
                    "button--glow": this.glow
                } }, attrs),
                this.iconName && !this.loading && (h("cc-icon", { class: {
                        button__icon: true
                    }, name: this.iconName, size: this.size === "sm" ? 16 : 24 })),
                this.loading && (h("cc-loader", { class: {
                        button__icon: true
                    }, size: this.size === "sm" ? 16 : 24 })),
                h("span", { "data-testid": "cc-button__text", class: { button__text: !this.iconOnly, hidden: this.iconOnly } },
                    h("slot", null)))));
    }
    static get is() { return "cc-button"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() { return {
        "$": ["cc-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-button.css"]
    }; }
    static get properties() { return {
        "iconName": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "icon-name",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "iconReverse": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "icon-reverse",
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "icon-only",
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "fill": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"outline\" | \"clear\" | \"solid\"",
                "resolved": "\"clear\" | \"outline\" | \"solid\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "fill",
            "reflect": false,
            "defaultValue": "\"solid\""
        },
        "expand": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "expand",
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
        "href": {
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
            "attribute": "href",
            "reflect": false
        },
        "target": {
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
            "attribute": "target",
            "reflect": false
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"lg\" | \"md\" | \"sm\"",
                "resolved": "\"lg\" | \"md\" | \"sm\"",
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
            "defaultValue": "\"lg\""
        },
        "glow": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "glow",
            "reflect": false,
            "defaultValue": "false"
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"button\" | \"submit\"",
                "resolved": "\"button\" | \"submit\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"button\""
        },
        "loading": {
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
            "attribute": "loading",
            "reflect": false,
            "defaultValue": "false"
        },
        "download": {
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
            "attribute": "download",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
}
