import { r as registerInstance, h } from './core-8392cfc6.js';
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
        return h("div", { class: "button" }, "Hello, World! I'", this.getText());
    };
    Object.defineProperty(MyComponent, "style", {
        get: function () { return ".button{background-color:var(--color-primary)}"; },
        enumerable: true,
        configurable: true
    });
    return MyComponent;
}());
export { MyComponent as my_component };
