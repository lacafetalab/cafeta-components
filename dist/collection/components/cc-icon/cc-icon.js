import { h, getAssetPath, Host } from "@stencil/core";
export class CcIcon {
    constructor() {
        this.size = 24;
    }
    render() {
        return (h(Host, null,
            h("svg", { class: "cc-icon", width: this.size, height: this.size },
                h("use", { xlinkHref: `${getAssetPath(`./assets/feather-sprite.svg`)}#${this.name}` }))));
    }
    static get is() { return "cc-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["cc-icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-icon.css"]
    }; }
    static get assetsDirs() { return ["assets"]; }
    static get properties() { return {
        "name": {
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
            "attribute": "name",
            "reflect": false
        },
        "size": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
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
