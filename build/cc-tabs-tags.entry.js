import { r as registerInstance, c as createEvent, h, H as Host } from './core-2b8afa15.js';

const CcTabsTags = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.changeOption = createEvent(this, "changeOption", 7);
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
        return (h(Host, null, h("div", { class: {
                tabTags: true
            } }, h("div", { class: "tabTags__wrap" }, this._options.map((option, index) => (h("button", { key: `tabTagItem_${index}`, class: {
                tabTags__button: true,
                "tabTags__button--secondary": this.color === "secondary",
                "tabTags__button--active": option.active,
                "tabTags__button--disabled": option.disabled
            }, onClick: this.handleOptionClick(index) }, option.text)))))));
    }
    static get watchers() { return {
        "options": ["setOptions"]
    }; }
    static get style() { return ":host {\n  display: block;\n}\n\n.tabTags {\n  overflow: hidden;\n}\n\n.tabTags__wrap {\n  margin: -1rem -0.6rem;\n}\n\n.tabTags__button {\n  -webkit-appearance: button;\n  padding: 0;\n  margin: 0;\n  font-family: inherit;\n  cursor: pointer;\n  background-color: transparent;\n  background-image: none;\n  color: inherit;\n  border: none;\n  font-size: 100%;\n  outline: 0;\n  font-weight: 900;\n  font-size: 1.2rem;\n  padding-left: 1.2rem;\n  padding-right: 1.2rem;\n  border-radius: 9999px;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n  background-color: var(--neutral-04);\n  height: 3.2rem;\n  margin: 1rem 0.6rem;\n}\n\n.tabTags__button--active {\n  background-color: var(--primary);\n  color: var(--neutral-04);\n}\n\n.tabTags__button--active.tabTags__button--secondary {\n  background-color: var(--secondary);\n}\n\n.tabTags__button--disabled {\n  color: var(--disabled-text);\n  background-color: var(--disabled-background);\n}"; }
};

export { CcTabsTags as cc_tabs_tags };
