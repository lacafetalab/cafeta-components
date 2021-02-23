import { h, Component, Host, Prop } from "@stencil/core";
export class CcLoader {
    constructor() {
        this.size = 24;
    }
    render() {
        return (h(Host, { "data-testid": "cc-loader", class: "loader" },
            h("svg", { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", width: this.size, height: this.size, class: "loader__svg" },
                h("circle", { class: "loader__circle", cx: "50", cy: "50", r: "45" }))));
    }
    static get is() { return "cc-loader"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["cc-loader.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-loader.css"]
    }; }
    static get properties() { return {
        "size": {
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
            "attribute": "size",
            "reflect": false,
            "defaultValue": "24"
        }
    }; }
}
