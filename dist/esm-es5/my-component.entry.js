import { r as registerInstance, h } from './core-1129956f.js';
function format(first, middle, last) {
    return ((first || '') +
        (middle ? " " + middle : '') +
        (last ? " " + last : ''));
}
var MyComponent = /** @class */ (function () {
    function MyComponent(hostRef) {
        registerInstance(this, hostRef);
    }
    MyComponent.prototype.getText = function () {
        return format(this.first, this.middle, this.last);
    };
    MyComponent.prototype.render = function () {
        return h("div", { class: "button" }, "Hello, World! I' aaa jj", this.getText());
    };
    Object.defineProperty(MyComponent, "style", {
        get: function () { return ".button{color:#2c5282}"; },
        enumerable: true,
        configurable: true
    });
    return MyComponent;
}());
export { MyComponent as my_component };
