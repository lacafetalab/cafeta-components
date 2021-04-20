import { Component, h, Host, Prop, Element, State, Event } from "@stencil/core";
import "choices.js/public/assets/scripts/choices.min.js";
import "choicesjs-stencil";
export class CcNavbarWeb {
    constructor() {
        this.iconOnly = false;
        this.disabled = false;
        this.openProfileMenu = false;
        this.toggleProfileMenu = e => {
            e.stopPropagation();
        };
    }
    componentWillLoad() { }
    componentDidLoad() {
        this.loadMenu();
    }
    loadMenu() {
        this.datalist = [
            { url: "123", label: "Option 1", icon: "home", active: true },
            { url: "124", label: "Opción 2", icon: "calendar", active: false },
            { url: "125", label: "Opción 3", icon: "user", active: false },
            { url: "126", label: "Opción 4", icon: "globe", active: false },
            { url: "127", label: "Opción 5", icon: "book", active: false },
            { url: "128", label: "Opción 6", icon: "dollar-sign", active: false },
            { url: "123", label: "Option 7", icon: "send", active: false }
        ];
    }
    render() {
        return (h(Host, null, this.datalist && this.datalist.length ? (h("div", { class: "navbar" },
            h("div", null,
                h("cc-button", { class: "navbar__toggle", href: "#", target: "_blank" },
                    h("cc-icon", { name: "menu", class: "menu" })),
                h("ul", { class: { "navbar__list--vertical": true, navbar__list: true } }, this.datalist.map(list => (h("li", { class: {
                        navbar__item: true,
                        "navbar__item--selected": list.active
                    } },
                    h("cc-button", { fill: "clear", href: list.url, target: "_blank" },
                        h("cc-icon", { size: 24, name: list.icon }),
                        h("span", { class: "navbar__item-text" }, list.label))))))))) : (h("div", null, "Cargando..."))));
    }
    static get is() { return "cc-navbar-web"; }
    static get originalStyleUrls() { return {
        "$": ["cc-navbar-web.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-navbar-web.css"]
    }; }
    static get properties() { return {
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
        }
    }; }
    static get states() { return {
        "openProfileMenu": {},
        "datalist": {}
    }; }
    static get events() { return [{
            "method": "changeChoice",
            "name": "changeChoice",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clickProfileMenu",
            "name": "clickProfileMenu",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
