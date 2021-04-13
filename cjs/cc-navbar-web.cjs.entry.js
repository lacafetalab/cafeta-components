'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-87a60bbb.js');
require('./choices.min-4507dd7c.js');

const ccNavbarWebCss = ".navbar{width:8.8rem;overflow:hidden}.navbar__toggle .button.sc-cc-button{border-radius:0;width:8.8rem;height:7.2rem}.navbar__list{background-color:var(--neutral-04);width:8.8rem}.navbar__list--vertical .button__text{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center}.navbar__item-text{font-size:1.1rem}.navbar__item{width:8.8rem;height:7.2rem}.navbar__item .button.sc-cc-button{border-radius:0;width:8.8rem;height:7.2rem}.navbar__item a.button--clear{color:var(--neutral-02);width:8.8rem}.navbar__item--selected a.button--clear{color:var(--primary)}";

const CcNavbarWeb = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.changeChoice = index.createEvent(this, "changeChoice", 7);
        this.clickProfileMenu = index.createEvent(this, "clickProfileMenu", 7);
        this.iconOnly = false;
        this.disabled = false;
        this.openProfileMenu = false;
        this.toggleProfileMenu = e => {
            e.stopPropagation();
        };
    }
    componentWillLoad() {
    }
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
            { url: "123", label: "Option 7", icon: "send", active: false },
        ];
    }
    render() {
        return (index.h(index.Host, null, this.datalist && this.datalist.length
            ?
                index.h("div", { class: 'navbar' }, index.h("div", null, index.h("cc-button", { class: 'navbar__toggle', href: "#", target: "_blank" }, index.h("cc-icon", { name: "menu", class: 'menu' })), index.h("ul", { class: { 'navbar__list--vertical': true, navbar__list: true } }, this.datalist.map(list => index.h("li", { class: { navbar__item: true, 'navbar__item--selected': list.active } }, index.h("cc-button", { fill: 'clear', href: list.url, target: "_blank" }, index.h("cc-icon", { size: 24, name: list.icon }), index.h("span", { class: 'navbar__item-text' }, list.label)))))))
            : index.h("div", null, "Loading...")));
    }
    get el() { return index.getElement(this); }
};
CcNavbarWeb.style = ccNavbarWebCss;

exports.cc_navbar_web = CcNavbarWeb;
