import { h } from "@stencil/core";
export class CcText {
    constructor() {
        this.strong = false;
        this.tag = "";
    }
    render() {
        const types = {
            "heading-01": {
                tag: this.tag ? this.tag : "h1",
                cssClass: `heading-01`
            },
            "heading-02": {
                tag: this.tag ? this.tag : "h2",
                cssClass: `heading-02`
            },
            "subheading-01": {
                tag: this.tag ? this.tag : "h3",
                cssClass: `subheading-01`
            },
            "subheading-02": {
                tag: this.tag ? this.tag : "h4",
                cssClass: `subheading-02`
            },
            body: {
                tag: this.tag ? this.tag : "span",
                cssClass: `body`
            },
            "body-02": {
                tag: this.tag ? this.tag : "span",
                cssClass: `body-02`
            },
            "small-01": {
                tag: this.tag ? this.tag : "span",
                cssClass: `small-01`
            },
            "small-02": {
                tag: this.tag ? this.tag : "span",
                cssClass: `small-02`
            },
            "small-03": {
                tag: this.tag ? this.tag : "span",
                cssClass: `small-03`
            },
            "display-01": {
                tag: this.tag ? this.tag : "h1",
                cssClass: `display-01`
            },
            "display-02": {
                tag: this.tag ? this.tag : "h2",
                cssClass: `display-02`
            }
        };
        const CustomTag = types[this.type].tag;
        return (h(CustomTag, { class: `text--reset ${types[this.type].cssClass} ${this.strong ? "text--strong" : "text--normal"}` },
            h("slot", null)));
    }
    static get is() { return "cc-text"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["cc-text.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-text.css"]
    }; }
    static get properties() { return {
        "type": {
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
            "attribute": "type",
            "reflect": false
        },
        "strong": {
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
            "attribute": "strong",
            "reflect": false,
            "defaultValue": "false"
        },
        "tag": {
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
            "attribute": "tag",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
}
