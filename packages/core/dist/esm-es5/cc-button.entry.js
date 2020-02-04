import { r as registerInstance, h, H as Host } from './core-d1147b68.js';
var CcButton = /** @class */ (function () {
    function CcButton(hostRef) {
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
    CcButton.prototype.render = function () {
        var BtnElem = this.href ? "a" : "button";
        var attrs = {
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
    };
    Object.defineProperty(CcButton, "style", {
        get: function () { return ".button{border-width:0;padding:1.2rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:1.4rem;font-weight:700;border-radius:.4rem;outline:0;width:100%;line-height:2.4rem;border:1px solid transparent;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:inherit;height:4.8rem;background-color:var(--cc-button-color-base);color:var(--cc-button-color-contrast);cursor:pointer;text-decoration:none}.button__text{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.button--iconOnly{width:4.8rem}.button--md{padding:.8rem;height:4rem}.button--md.button--iconOnly{width:4rem}.button--sm{font-size:1.2rem;padding:.6rem;line-height:2rem;height:3.2rem}.button--sm.button--iconOnly{width:3.2rem}.button--reverse{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.button--outline{border-color:var(--cc-button-color-base);background:var(--cc-button-color-contrast)}.button--clear,.button--outline{color:var(--cc-button-color-base)}.button--clear{background:transparent}.button--disabled,.button:disabled{background-color:var(--disabled-background);color:var(--disabled-text);cursor:not-allowed}.button--disabled.button--clear,.button:disabled.button--clear{background:transparent}.button--disabled.button--outline,.button:disabled.button--outline{background-color:var(--background-06);border-color:var(--disabled-background)}"; },
        enumerable: true,
        configurable: true
    });
    return CcButton;
}());
export { CcButton as cc_button };
