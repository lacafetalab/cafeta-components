import { r as registerInstance, h } from './core-d501c814.js';

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
        return h("div", { class: "button" }, "Hello, World! I'", this.getText());
    }
    static get style() { return ".button {\n  background-color: var(--color-primary);\n  color: #edf2f7;\n}"; }
};

export { MyComponent as my_component };
