import { r as registerInstance, h } from './core-1129956f.js';

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
    static get style() { return ".button{color:#2c5282}"; }
};

export { MyComponent as my_component };
