import { r as registerInstance, h, H as Host } from './core-15d86d4a.js';

const CcButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.iconName = "";
        this.iconReverse = false;
        this.iconOnly = false;
        this.disabled = false;
        this.fill = "solid";
        this.expand = false;
        this.color = "primary";
        this.size = "lg";
    }
    render() {
        const BtnElem = this.href ? "a" : "button";
        const attrs = {
            disabled: this.href ? false : this.disabled,
            href: this.href,
            target: this.target
        };
        return (h(Host, { class: {
                "button--block": this.expand,
                "button--secondary": this.color === "secondary"
            } }, h(BtnElem, Object.assign({ class: {
                button: true,
                "button--reverse": this.iconReverse,
                "button--disabled": this.href ? false : this.disabled,
                "button--outline": this.fill === "outline",
                "button--clear": this.fill === "clear",
                "button--md": this.size === "md",
                "button--sm": this.size === "sm",
                "button--iconOnly": this.iconOnly
            } }, attrs), this.iconName && (h("cc-icon", { class: {
                button__icon: true
            }, name: this.iconName, size: this.size === "sm" ? 20 : 24 })), !this.iconOnly && (h("span", { class: "button__text" }, h("slot", null))))));
    }
    static get style() { return ":host {\n  display: inline-block;\n  --cc-button-color-base: var(--primary);\n  --cc-button-color-contrast: var(--color-text-03);\n}\n\n:host(.button--block) {\n  display: block;\n}\n\n:host(.button--secondary) {\n  --cc-button-color-base: var(--secondary);\n  --cc-button-color-contrast: var(--color-text-03);\n}\n\n.button {\n  border-width: 0;\n  padding: 1.2rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 1.4rem;\n  font-weight: 700;\n  border-radius: 0.4rem;\n  outline: 0;\n  width: 100%;\n  line-height: 2.4rem;\n  border: 1px solid transparent;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  font-family: inherit;\n  height: 4.8rem;\n  background-color: var(--cc-button-color-base);\n  color: var(--cc-button-color-contrast);\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.button__text {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n\n.button__icon {\n  margin-right: 0.8rem;\n}\n\n.button--reverse .button__icon {\n  margin-right: 0;\n  margin-left: 0.8rem;\n}\n\n.button--iconOnly .button__icon {\n  margin: 0;\n}\n\n.button--iconOnly {\n  width: 4.8rem;\n}\n\n.button--md {\n  padding: 0.8rem;\n  height: 4rem;\n}\n\n.button--md.button--iconOnly {\n  width: 4rem;\n}\n\n.button--sm {\n  font-size: 1.2rem;\n  padding: 0.6rem;\n  line-height: 2rem;\n  height: 3.2rem;\n}\n\n.button--sm.button--iconOnly {\n  width: 3.2rem;\n}\n\n.button--reverse {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: reverse;\n          -ms-flex-direction: row-reverse;\n          flex-direction: row-reverse;\n}\n\n.button--outline {\n  border-color: var(--cc-button-color-base);\n  color: var(--cc-button-color-base);\n  background: var(--cc-button-color-contrast);\n}\n\n.button--clear {\n  background: transparent;\n  color: var(--cc-button-color-base);\n}\n\n.button:disabled, .button--disabled {\n  background-color: var(--disabled-background);\n  color: var(--disabled-text);\n  cursor: not-allowed;\n}\n\n.button:disabled.button--clear, .button--disabled.button--clear {\n  background: transparent;\n}\n\n.button:disabled.button--outline, .button--disabled.button--outline {\n  background-color: var(--background-06);\n  border-color: var(--disabled-background);\n}"; }
};

export { CcButton as cc_button };
