import { r as registerInstance, h, H as Host } from './index-f424fde7.js';
var ccButtonCss = ".button__host.sc-cc-button-h{display:inline-block;--cc-button-color-base:var(--primary);--cc-button-color-dark:var(--primary-dark);--cc-button-color-lightest:var(--primary-10);--cc-button-color-contrast:var(--neutral-04)}.button--block.sc-cc-button-h{display:block}.button--secondary.sc-cc-button-h{--cc-button-color-base:var(--secondary);--cc-button-color-dark:var(--secondary-dark);--cc-button-color-lightest:var(--secondary-10);--cc-button-color-contrast:var(--neutral-04)}.button.sc-cc-button{border-width:0;padding-left:1.6rem;padding-right:1.6rem;padding-top:0.4rem;padding-bottom:0.4rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-size:1.4rem;font-weight:700;border-radius:0.4rem;outline:2px solid transparent;outline-offset:2px;width:100%;line-height:2rem;border:1px solid transparent;line-height:2.4rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:inherit;height:4.8rem;background-color:var(--cc-button-color-base);color:var(--cc-button-color-contrast);cursor:pointer;text-decoration:none}.button--glow.sc-cc-button{background-image:-webkit-gradient(linear, left top, left bottom, from(var(--cc-button-color-base)), color-stop(50%, var(--cc-button-color-base)), color-stop(50%, var(--cc-button-color-dark)), to(var(--cc-button-color-dark)));background-image:linear-gradient(var(--cc-button-color-base) 0%, var(--cc-button-color-base) 50%, var(--cc-button-color-dark) 50%, var(--cc-button-color-dark) 100%)}.button__text.sc-cc-button{display:-ms-inline-flexbox;display:inline-flex}.button__icon.sc-cc-button{margin-right:0.4rem}.button--reverse.sc-cc-button .button__icon.sc-cc-button{margin-right:0;margin-left:0.4rem}.button--iconOnly.sc-cc-button .button__icon.sc-cc-button{margin:0}.button--iconOnly.sc-cc-button{width:4.8rem}.button--md.sc-cc-button{height:4rem}.button--md.button--iconOnly.sc-cc-button{width:4rem}.button--sm.sc-cc-button{font-size:1.2rem;font-weight:900;line-height:1.6rem;height:3.2rem}.button--sm.button--iconOnly.sc-cc-button{width:3.2rem}.button--reverse.sc-cc-button{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.button--outline.sc-cc-button{border-color:var(--cc-button-color-base);color:var(--cc-button-color-base);background:var(--cc-button-color-contrast)}.button--outline.button--glow.sc-cc-button{background-image:-webkit-gradient(linear, left top, left bottom, from(var(--cc-button-color-contrast)), color-stop(50%, var(--cc-button-color-contrast)), color-stop(50%, var(--cc-button-color-lightest)), to(var(--cc-button-color-lightest)));background-image:linear-gradient(var(--cc-button-color-contrast) 0%, var(--cc-button-color-contrast) 50%, var(--cc-button-color-lightest) 50%, var(--cc-button-color-lightest) 100%)}.button--clear.sc-cc-button{background:transparent;color:var(--cc-button-color-base)}.button.sc-cc-button:disabled,.button--disabled.sc-cc-button{background:none;background-color:var(--disabled-background);color:var(--disabled-text);cursor:not-allowed}.button.sc-cc-button:disabled.button--clear,.button--disabled.button--clear.sc-cc-button{background:transparent}.button.sc-cc-button:disabled.button--outline,.button--disabled.button--outline.sc-cc-button{background:transparent;border-color:var(--disabled-background)}";
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
        this.glow = false;
        this.type = "button";
        this.download = false;
        this.loading = false;
    }
    CcButton.prototype.render = function () {
        var BtnElem = this.href ? "a" : "button";
        var attrs = {
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
    };
    return CcButton;
}());
CcButton.style = ccButtonCss;
export { CcButton as cc_button };
