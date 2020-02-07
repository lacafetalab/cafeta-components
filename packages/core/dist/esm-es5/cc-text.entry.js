import { r as registerInstance, h } from './core-5f86e29c.js';
var CcText = /** @class */ (function () {
    function CcText(hostRef) {
        registerInstance(this, hostRef);
        this.strong = false;
        this.tag = "";
    }
    CcText.prototype.render = function () {
        var types = {
            "heading-01": {
                tag: this.tag ? this.tag : "h1",
                cssClass: "heading-01"
            },
            "heading-02": {
                tag: this.tag ? this.tag : "h2",
                cssClass: "heading-02"
            },
            "subheading-01": {
                tag: this.tag ? this.tag : "h3",
                cssClass: "subheading-01"
            },
            "subheading-02": {
                tag: this.tag ? this.tag : "h4",
                cssClass: "subheading-02"
            },
            body: {
                tag: this.tag ? this.tag : "span",
                cssClass: "body"
            },
            "body-02": {
                tag: this.tag ? this.tag : "span",
                cssClass: "body-02"
            },
            "small-01": {
                tag: this.tag ? this.tag : "span",
                cssClass: "small-01"
            },
            "small-02": {
                tag: this.tag ? this.tag : "span",
                cssClass: "small-02"
            },
            "small-03": {
                tag: this.tag ? this.tag : "span",
                cssClass: "small-03"
            },
            "display-01": {
                tag: this.tag ? this.tag : "h1",
                cssClass: "display-01"
            },
            "display-02": {
                tag: this.tag ? this.tag : "h2",
                cssClass: "display-02"
            }
        };
        var CustomTag = types[this.type].tag;
        return (h(CustomTag, { class: "text--reset " + types[this.type].cssClass + " " + (this.strong ? "text--strong" : "text--normal") }, h("slot", null)));
    };
    Object.defineProperty(CcText, "style", {
        get: function () { return ".text--reset{margin:0;padding:0}.text--normal{font-weight:400}.text--strong{font-weight:900}.heading-01{font-size:2.4rem}.heading-02{font-size:2rem}.subheading-01{font-size:1.8rem}.subheading-02{font-size:1.6rem}.body{font-size:1.4rem}.body-02{font-size:1.6rem}.small-01{font-size:1.1rem}.small-02{font-size:1.2rem}.small-03{font-size:1rem}.display-01{font-size:4.8rem}.display-02{font-size:4rem}"; },
        enumerable: true,
        configurable: true
    });
    return CcText;
}());
export { CcText as cc_text };
