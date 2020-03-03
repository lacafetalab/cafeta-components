import { r as registerInstance, h } from './core-15d86d4a.js';

const CcText = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.strong = false;
        this.tag = "";
    }
    render() {
        const types = {
            "heading-01": {
                tag: this.tag ? this.tag : "h1",
                cssClass: `heading-01`
            },
            "heading-02": {
                tag: this.tag ? this.tag : "h2",
                cssClass: `heading-02`
            },
            "subheading-01": {
                tag: this.tag ? this.tag : "h3",
                cssClass: `subheading-01`
            },
            "subheading-02": {
                tag: this.tag ? this.tag : "h4",
                cssClass: `subheading-02`
            },
            body: {
                tag: this.tag ? this.tag : "span",
                cssClass: `body`
            },
            "body-02": {
                tag: this.tag ? this.tag : "span",
                cssClass: `body-02`
            },
            "small-01": {
                tag: this.tag ? this.tag : "span",
                cssClass: `small-01`
            },
            "small-02": {
                tag: this.tag ? this.tag : "span",
                cssClass: `small-02`
            },
            "small-03": {
                tag: this.tag ? this.tag : "span",
                cssClass: `small-03`
            },
            "display-01": {
                tag: this.tag ? this.tag : "h1",
                cssClass: `display-01`
            },
            "display-02": {
                tag: this.tag ? this.tag : "h2",
                cssClass: `display-02`
            }
        };
        const CustomTag = types[this.type].tag;
        return (h(CustomTag, { class: `text--reset ${types[this.type].cssClass} ${this.strong ? "text--strong" : "text--normal"}` }, h("slot", null)));
    }
    static get style() { return ".text--reset {\n  margin: 0;\n  padding: 0;\n}\n\n.text--normal {\n  font-weight: 400;\n}\n\n.text--strong {\n  font-weight: 900;\n}\n\n.heading-01 {\n  font-size: 2.4rem;\n}\n\n.heading-02 {\n  font-size: 2rem;\n}\n\n.subheading-01 {\n  font-size: 1.8rem;\n}\n\n.subheading-02 {\n  font-size: 1.6rem;\n}\n\n.body {\n  font-size: 1.4rem;\n}\n\n.body-02 {\n  font-size: 1.6rem;\n}\n\n.small-01 {\n  font-size: 1.1rem;\n}\n\n.small-02 {\n  font-size: 1.2rem;\n}\n\n.small-03 {\n  font-size: 1rem;\n}\n\n.display-01 {\n  font-size: 4.8rem;\n}\n\n.display-02 {\n  font-size: 4rem;\n}"; }
};

export { CcText as cc_text };
