'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5c45a7c9.js');

const ccTabsTagsCss = ":host{display:block}.tabTags{overflow:hidden}.tabTags__wrap{margin:-1rem -0.6rem}.tabTags__button{-webkit-appearance:button;padding:0;margin:0;font-family:inherit;cursor:pointer;background-color:transparent;background-image:none;color:inherit;border:none;font-size:100%;outline:0;font-weight:900;font-size:1.2rem;padding-left:1.2rem;padding-right:1.2rem;border-radius:9999px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:var(--neutral-04);height:3.2rem;margin:1rem 0.6rem}.tabTags__button--active{background-color:var(--primary);color:var(--neutral-04)}.tabTags__button--active.tabTags__button--secondary{background-color:var(--secondary)}.tabTags__button--disabled{color:var(--disabled-text);background-color:var(--disabled-background)}";

const CcTabsTags = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.changeOption = index.createEvent(this, "changeOption", 7);
        this.color = "primary";
        this.options = [];
        this.handleOptionClick = (index) => () => {
            const option = this._options[index];
            if (option.disabled) {
                return;
            }
            this.updateOptions(index);
            this.changeOption.emit(option.value);
        };
    }
    setOptions(newValue, oldValue) {
        const newValueStringify = JSON.stringify(newValue);
        const oldValueStringify = JSON.stringify(oldValue);
        if (newValueStringify !== oldValueStringify) {
            this._options = newValue;
        }
    }
    updateOptions(index) {
        const newOptions = [...this._options].map(option => (Object.assign(Object.assign({}, option), { active: false })));
        newOptions[index].active = true;
        this._options = newOptions;
    }
    componentWillLoad() {
        this._options = this.options;
    }
    render() {
        return (index.h(index.Host, null, index.h("div", { class: {
                tabTags: true
            } }, index.h("div", { class: "tabTags__wrap" }, this._options.map((option, index$1) => (index.h("button", { key: `tabTagItem_${index$1}`, class: {
                tabTags__button: true,
                "tabTags__button--secondary": this.color === "secondary",
                "tabTags__button--active": option.active,
                "tabTags__button--disabled": option.disabled
            }, onClick: this.handleOptionClick(index$1) }, option.text)))))));
    }
    static get watchers() { return {
        "options": ["setOptions"]
    }; }
};
CcTabsTags.style = ccTabsTagsCss;

exports.cc_tabs_tags = CcTabsTags;
