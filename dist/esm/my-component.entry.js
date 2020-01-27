import { r as registerInstance, h } from './core-8392cfc6.js';

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
    static get style() { return ".button{background-color:var(--color-primary)}"; }
};

export { MyComponent as my_component };
