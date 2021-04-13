import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-f424fde7.js';
import './choices.min-a0236ef3.js';
var ccNavbarWebCss = ".navbar{width:8.8rem;overflow:hidden}.navbar__toggle .button.sc-cc-button{border-radius:0;width:8.8rem;height:7.2rem}.navbar__list{background-color:var(--neutral-04);width:8.8rem}.navbar__list--vertical .button__text{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center}.navbar__item-text{font-size:1.1rem}.navbar__item{width:8.8rem;height:7.2rem}.navbar__item .button.sc-cc-button{border-radius:0;width:8.8rem;height:7.2rem}.navbar__item a.button--clear{color:var(--neutral-02);width:8.8rem}.navbar__item--selected a.button--clear{color:var(--primary)}";
var CcNavbarWeb = /** @class */ (function () {
    function CcNavbarWeb(hostRef) {
        registerInstance(this, hostRef);
        this.changeChoice = createEvent(this, "changeChoice", 7);
        this.clickProfileMenu = createEvent(this, "clickProfileMenu", 7);
        this.iconOnly = false;
        this.disabled = false;
        this.openProfileMenu = false;
        this.toggleProfileMenu = function (e) {
            e.stopPropagation();
        };
    }
    CcNavbarWeb.prototype.componentWillLoad = function () {
    };
    CcNavbarWeb.prototype.componentDidLoad = function () {
        this.loadMenu();
    };
    CcNavbarWeb.prototype.loadMenu = function () {
        this.datalist = [
            { url: "123", label: "Option 1", icon: "home", active: true },
            { url: "124", label: "Opción 2", icon: "calendar", active: false },
            { url: "125", label: "Opción 3", icon: "user", active: false },
            { url: "126", label: "Opción 4", icon: "globe", active: false },
            { url: "127", label: "Opción 5", icon: "book", active: false },
            { url: "128", label: "Opción 6", icon: "dollar-sign", active: false },
            { url: "123", label: "Option 7", icon: "send", active: false },
        ];
    };
    CcNavbarWeb.prototype.render = function () {
        return (h(Host, null, this.datalist && this.datalist.length
            ?
                h("div", { class: 'navbar' }, h("div", null, h("cc-button", { class: 'navbar__toggle', href: "#", target: "_blank" }, h("cc-icon", { name: "menu", class: 'menu' })), h("ul", { class: { 'navbar__list--vertical': true, navbar__list: true } }, this.datalist.map(function (list) { return h("li", { class: { navbar__item: true, 'navbar__item--selected': list.active } }, h("cc-button", { fill: 'clear', href: list.url, target: "_blank" }, h("cc-icon", { size: 24, name: list.icon }), h("span", { class: 'navbar__item-text' }, list.label))); }))))
            : h("div", null, "Loading...")));
    };
    Object.defineProperty(CcNavbarWeb.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return CcNavbarWeb;
}());
CcNavbarWeb.style = ccNavbarWebCss;
export { CcNavbarWeb as cc_navbar_web };
