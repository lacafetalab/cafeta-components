'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-aa9e4bf2.js');

const CcButton = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        return (core.h(core.Host, { class: {
                "button--block": this.expand,
                "button--secondary": this.color === "secondary"
            } }, core.h(BtnElem, Object.assign({ class: {
                button: true,
                "button--reverse": this.iconReverse,
                "button--disabled": this.href ? false : this.disabled,
                "button--outline": this.fill === "outline",
                "button--clear": this.fill === "clear",
                "button--md": this.size === "md",
                "button--sm": this.size === "sm",
                "button--iconOnly": this.iconOnly
            } }, attrs), this.iconName && (core.h("cc-icon", { class: {
                button__icon: true
            }, name: this.iconName, size: this.size === "sm" ? 20 : 24 })), !this.iconOnly && (core.h("span", { class: "button__text" }, core.h("slot", null))))));
    }
    static get style() { return ".button{border-width:0;padding:1.2rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:1.4rem;font-weight:700;border-radius:.4rem;outline:0;width:100%;border:1px solid transparent;line-height:2.4rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:inherit;height:4.8rem;background-color:var(--cc-button-color-base);color:var(--cc-button-color-contrast);cursor:pointer;text-decoration:none}.button__text{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.button--iconOnly{width:4.8rem}.button--md{padding:.8rem;height:4rem}.button--md.button--iconOnly{width:4rem}.button--sm{font-size:1.2rem;padding:.6rem;line-height:2rem;height:3.2rem}.button--sm.button--iconOnly{width:3.2rem}.button--reverse{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.button--outline{border-color:var(--cc-button-color-base);background:var(--cc-button-color-contrast)}.button--clear,.button--outline{color:var(--cc-button-color-base)}.button--clear{background:transparent}.button--disabled,.button:disabled{background-color:var(--disabled-background);color:var(--disabled-text);cursor:not-allowed}.button--disabled.button--clear,.button:disabled.button--clear{background:transparent}.button--disabled.button--outline,.button:disabled.button--outline{background-color:var(--background-06);border-color:var(--disabled-background)}"; }
};

exports.cc_button = CcButton;
