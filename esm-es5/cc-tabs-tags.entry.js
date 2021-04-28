var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host } from './index-105344ad.js';
var ccTabsTagsCss = ":host{display:block}.tabTags{overflow:hidden}.tabTags__wrap{margin:-1rem -0.6rem}.tabTags__button{-webkit-appearance:button;padding:0;margin:0;font-family:inherit;cursor:pointer;background-color:transparent;background-image:none;color:inherit;border:none;font-size:100%;outline:0;font-weight:900;font-size:1.2rem;padding-left:1.2rem;padding-right:1.2rem;border-radius:9999px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:var(--neutral-04);height:3.2rem;margin:1rem 0.6rem}.tabTags__button--active{background-color:var(--primary);color:var(--neutral-04)}.tabTags__button--active.tabTags__button--secondary{background-color:var(--secondary)}.tabTags__button--disabled{color:var(--disabled-text);background-color:var(--disabled-background)}";
var CcTabsTags = /** @class */ (function () {
    function CcTabsTags(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.changeOption = createEvent(this, "changeOption", 7);
        this.color = "primary";
        this.options = [];
        this.handleOptionClick = function (index) { return function () {
            var option = _this._options[index];
            if (option.disabled) {
                return;
            }
            _this.updateOptions(index);
            _this.changeOption.emit(option.value);
        }; };
    }
    CcTabsTags.prototype.setOptions = function (newValue, oldValue) {
        var newValueStringify = JSON.stringify(newValue);
        var oldValueStringify = JSON.stringify(oldValue);
        if (newValueStringify !== oldValueStringify) {
            this._options = newValue;
        }
    };
    CcTabsTags.prototype.updateOptions = function (index) {
        var newOptions = __spreadArrays(this._options).map(function (option) { return (Object.assign(Object.assign({}, option), { active: false })); });
        newOptions[index].active = true;
        this._options = newOptions;
    };
    CcTabsTags.prototype.componentWillLoad = function () {
        this._options = this.options;
    };
    CcTabsTags.prototype.render = function () {
        var _this = this;
        return (h(Host, null, h("div", { class: {
                tabTags: true
            } }, h("div", { class: "tabTags__wrap" }, this._options.map(function (option, index) { return (h("button", { key: "tabTagItem_" + index, class: {
                tabTags__button: true,
                "tabTags__button--secondary": _this.color === "secondary",
                "tabTags__button--active": option.active,
                "tabTags__button--disabled": option.disabled
            }, onClick: _this.handleOptionClick(index) }, option.text)); })))));
    };
    Object.defineProperty(CcTabsTags, "watchers", {
        get: function () {
            return {
                "options": ["setOptions"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CcTabsTags;
}());
CcTabsTags.style = ccTabsTagsCss;
export { CcTabsTags as cc_tabs_tags };
