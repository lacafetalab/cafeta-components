import { r as registerInstance, h, H as Host } from './core-2b8afa15.js';

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
            }, "data-testid": "cc-button" }, h(BtnElem, Object.assign({ "data-testid": "cc-button__element", class: {
                button: true,
                "button--reverse": this.iconReverse,
                "button--disabled": this.href ? false : this.disabled,
                "button--outline": this.fill === "outline",
                "button--clear": this.fill === "clear",
                "button--md": this.size === "md",
                "button--sm": this.size === "sm",
                "button--iconOnly": this.iconOnly,
                "button--glow": this.glow
            } }, attrs), this.iconName && !this.loading && (h("cc-icon", { class: {
                button__icon: true
            }, name: this.iconName, size: this.size === "sm" ? 16 : 24 })), this.loading && (h("cc-loader", { class: {
                button__icon: true
            }, size: this.size === "sm" ? 16 : 24 })), h("span", { "data-testid": "cc-button__text", class: { button__text: !this.iconOnly, hidden: this.iconOnly } }, h("slot", null)))));
    }
    static get style() { return ".button__host.sc-cc-button-h {\n  display: inline-block;\n  --cc-button-color-base: var(--primary);\n  --cc-button-color-dark: var(--primary-dark);\n  --cc-button-color-lightest: var(--primary-10);\n  --cc-button-color-contrast: var(--neutral-04);\n}\n\n.button--block.sc-cc-button-h {\n  display: block;\n}\n\n.button--secondary.sc-cc-button-h {\n  --cc-button-color-base: var(--secondary);\n  --cc-button-color-dark: var(--secondary-dark);\n  --cc-button-color-lightest: var(--secondary-10);\n  --cc-button-color-contrast: var(--neutral-04);\n}\n\n.button.sc-cc-button {\n  border-width: 0;\n  padding-left: 1.6rem;\n  padding-right: 1.6rem;\n  padding-top: 0.4rem;\n  padding-bottom: 0.4rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 1.4rem;\n  font-weight: 700;\n  border-radius: 0.4rem;\n  outline: 0;\n  width: 100%;\n  line-height: 2rem;\n  border: 1px solid transparent;\n  line-height: 2.4rem;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  font-family: inherit;\n  height: 4.8rem;\n  background-color: var(--cc-button-color-base);\n  color: var(--cc-button-color-contrast);\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.button--glow.sc-cc-button {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(var(--cc-button-color-base)), color-stop(50%, var(--cc-button-color-base)), color-stop(50%, var(--cc-button-color-dark)), to(var(--cc-button-color-dark)));\n  background-image: linear-gradient(var(--cc-button-color-base) 0%, var(--cc-button-color-base) 50%, var(--cc-button-color-dark) 50%, var(--cc-button-color-dark) 100%);\n}\n\n.button__text.sc-cc-button {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n\n.button__icon.sc-cc-button {\n  margin-right: 0.4rem;\n}\n\n.button--reverse.sc-cc-button .button__icon.sc-cc-button {\n  margin-right: 0;\n  margin-left: 0.4rem;\n}\n\n.button--iconOnly.sc-cc-button .button__icon.sc-cc-button {\n  margin: 0;\n}\n\n.button--iconOnly.sc-cc-button {\n  width: 4.8rem;\n}\n\n.button--md.sc-cc-button {\n  height: 4rem;\n}\n\n.button--md.button--iconOnly.sc-cc-button {\n  width: 4rem;\n}\n\n.button--sm.sc-cc-button {\n  font-size: 1.2rem;\n  font-weight: 900;\n  line-height: 1.6rem;\n  height: 3.2rem;\n}\n\n.button--sm.button--iconOnly.sc-cc-button {\n  width: 3.2rem;\n}\n\n.button--reverse.sc-cc-button {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: reverse;\n          -ms-flex-direction: row-reverse;\n          flex-direction: row-reverse;\n}\n\n.button--outline.sc-cc-button {\n  border-color: var(--cc-button-color-base);\n  color: var(--cc-button-color-base);\n  background: var(--cc-button-color-contrast);\n}\n\n.button--outline.button--glow.sc-cc-button {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(var(--cc-button-color-contrast)), color-stop(50%, var(--cc-button-color-contrast)), color-stop(50%, var(--cc-button-color-lightest)), to(var(--cc-button-color-lightest)));\n  background-image: linear-gradient(var(--cc-button-color-contrast) 0%, var(--cc-button-color-contrast) 50%, var(--cc-button-color-lightest) 50%, var(--cc-button-color-lightest) 100%);\n}\n\n.button--clear.sc-cc-button {\n  background: transparent;\n  color: var(--cc-button-color-base);\n}\n\n.button.sc-cc-button:disabled, .button--disabled.sc-cc-button {\n  background: none;\n  background-color: var(--disabled-background);\n  color: var(--disabled-text);\n  cursor: not-allowed;\n}\n\n.button.sc-cc-button:disabled.button--clear, .button--disabled.button--clear.sc-cc-button {\n  background: transparent;\n}\n\n.button.sc-cc-button:disabled.button--outline, .button--disabled.button--outline.sc-cc-button {\n  background: transparent;\n  border-color: var(--disabled-background);\n}"; }
};

export { CcButton as cc_button };
