import { h, Host } from "@stencil/core";
export class CcBadge {
    constructor() {
        this.color = "interactive-01";
    }
    render() {
        return (h(Host, { class: `badge--${this.color}` },
            h("div", { class: "badge" },
                h("slot", null))));
    }
    static get is() { return "cc-badge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["cc-badge.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-badge.css"]
    }; }
    static get properties() { return {
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "| \"interactive-01\"\n    | \"interactive-02\"\n    | \"support-success\"\n    | \"support-error\"\n    | \"support-alert\"",
                "resolved": "\"interactive-01\" | \"interactive-02\" | \"support-alert\" | \"support-error\" | \"support-success\"",
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
            "defaultValue": "\"interactive-01\""
        }
    }; }
}
