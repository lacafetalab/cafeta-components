import { h, Host } from "@stencil/core";
import iconPaths from "./selection";
export class CcIcon {
    constructor() {
        this.size = 24;
        this.getPath = (iconName) => {
            const icon = iconPaths.icons.find(icon => icon.properties.name === iconName);
            if (icon) {
                return icon.icon.paths.join(" ");
            }
            else {
                return "";
            }
        };
    }
    render() {
        if (this.name === "") {
            return h(Host, null);
        }
        return (h(Host, { "data-testid": "cc-icon" },
            h("svg", { "data-testid": "cc-icon__svg", class: "cc-icon", width: this.size, height: this.size, viewBox: "0 0 1024 1024" },
                h("path", { d: this.getPath(this.name) }))));
    }
    static get is() { return "cc-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["cc-icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-icon.css"]
    }; }
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
