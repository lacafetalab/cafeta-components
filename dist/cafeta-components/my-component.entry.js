import { r as registerInstance, h } from './core-5e60bc60.js';

function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", { class: "button" }, "Hello, World! I' aaa jj", this.getText());
    }
    static get style() { return ".button {\n  color: var(--color-primary);\n}"; }
};

export { MyComponent as my_component };
