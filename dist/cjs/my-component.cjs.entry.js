'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-5afc52e3.js');

function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}

const MyComponent = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return core.h("div", { class: "button" }, "Hello, World! I' aaa jj", this.getText());
    }
    static get style() { return ".button{color:#2c5282}"; }
};

exports.my_component = MyComponent;
