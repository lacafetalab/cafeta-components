import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-2b8afa15.js';

const CcTabsUnderline = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.animating = false;
        this.size = "md";
        this.border = false;
        this.center = false;
        this.color = "primary";
        this.options = [];
        this.linePosition = {
            left: 0,
            width: 0
        };
        this.handleOptionClick = (index) => () => {
            const option = this._options[index];
            if (option.disabled || this.animating) {
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
    animateFromToTab(newValue) {
        if (this.linePosition.left === 0 && this.linePosition.width === 0) {
            return;
        }
        const nextIndex = newValue.findIndex(option => !!option.active);
        const nextEl = this.wrapTabs.querySelectorAll(".tabLine__button")[nextIndex];
        const nextRect = nextEl.getBoundingClientRect();
        const parentRect = this.el.getBoundingClientRect();
        const nextPosLeft = nextRect.left - parentRect.left;
        const newLinePosition = this.calculateLinePosition({
            prevLeft: this.linePosition.left,
            nextWidth: nextRect.width,
            nextLeft: nextPosLeft,
            side: this.linePosition.left < nextPosLeft ? "toRight" : "toLeft"
        });
        this.animating = true;
        this.linePosition = newLinePosition.firstStep;
        setTimeout(() => {
            this.linePosition = newLinePosition.secondStep;
            this.animating = false;
        }, 300);
    }
    animateDefaultLine() {
        const activeIndex = this._options.findIndex(option => !!option.active);
        if (activeIndex < 0)
            return;
        const activeEl = this.wrapTabs.querySelectorAll(".tabLine__button")[activeIndex];
        const lineRect = activeEl.getBoundingClientRect();
        const parentRect = this.el.getBoundingClientRect();
        this.linePosition = {
            left: lineRect.left - parentRect.left,
            width: lineRect.width
        };
    }
    calculateLinePosition(params) {
        const firstStep = {
            left: params.side === "toRight" ? params.prevLeft : params.nextLeft,
            width: params.side === "toRight"
                ? params.nextLeft - params.prevLeft + params.nextWidth
                : params.prevLeft - params.nextLeft + params.nextWidth
        };
        const secondStep = {
            left: params.nextLeft,
            width: params.nextWidth
        };
        return {
            firstStep,
            secondStep
        };
    }
    updateOptions(index) {
        const newOptions = [...this._options].map(option => (Object.assign(Object.assign({}, option), { active: false })));
        newOptions[index].active = true;
        this._options = newOptions;
    }
    componentWillLoad() {
        this._options = this.options;
    }
    componentDidLoad() {
        this.animateDefaultLine();
        var options = {
            root: document.documentElement
        };
        const observerItems = new IntersectionObserver(mutations => {
            mutations.forEach(() => {
                this.animateDefaultLine();
            });
        }, options);
        observerItems.observe(this.el);
    }
    render() {
        return (h(Host, null, h("div", { class: {
                tabLine: true,
                "tabLine--border": this.border,
                "tabLine--center": this.center
            }, ref: el => (this.wrapTabs = el) }, this._options.map((option, index) => {
            var _a;
            return (h("div", { class: "tabLine__buttonWrapper", key: `tabItem_${index}` }, h("button", { class: {
                    tabLine__button: true,
                    "tabLine__button--secondary": this.color === "secondary",
                    "tabLine__button--sm": this.size === "sm",
                    "tabLine__button--active": option.active,
                    "tabLine__button--disabled": option.disabled
                }, onClick: this.handleOptionClick(index) }, option.text), option.tag && (h("div", { class: {
                    tabLine__tag: true,
                    "tabLine__tag--tabCenter": this.center
                }, style: option.tag.color
                    ? {
                        borderColor: option.tag.color,
                        color: option.tag.color
                    }
                    : undefined }, (_a = option.tag) === null || _a === void 0 ? void 0 : _a.text))));
        }), h("div", { class: {
                tabLine__underline: true,
                "tabLine__underline--secondary": this.color === "secondary"
            }, style: {
                left: `${this.linePosition.left}px`,
                width: `${this.linePosition.width}px`
            } }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "options": ["setOptions"],
        "_options": ["animateFromToTab"]
    }; }
    static get style() { return ":host {\n  display: block;\n}\n\n.tabLine {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n}\n\n.tabLine__button {\n  -webkit-appearance: button;\n  padding: 0;\n  margin: 0;\n  font-family: inherit;\n  cursor: pointer;\n  background-color: transparent;\n  background-image: none;\n  color: inherit;\n  border: none;\n  font-size: 100%;\n  outline: 0;\n  margin-top: 1.2rem;\n  margin-bottom: 1.2rem;\n  margin-left: 2.4rem;\n  margin-right: 2.4rem;\n  font-size: 1.4rem;\n  font-weight: 900;\n  line-height: 2.4rem;\n}\n\n.tabLine__button--sm {\n  font-size: 1.1rem;\n  line-height: 1.6rem;\n}\n\n.tabLine__button--disabled {\n  color: var(--disabled-text);\n  cursor: not-allowed;\n}\n\n.tabLine__button--active {\n  color: var(--primary);\n}\n\n.tabLine__button--active.tabLine__button--secondary {\n  color: var(--secondary);\n}\n\n.tabLine__buttonWrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n}\n\n.tabLine__tag {\n  font-weight: 900;\n  font-size: 1.2rem;\n  padding-left: 0.4rem;\n  padding-right: 0.4rem;\n  border-color: var(--neutral-01);\n  color: var(--neutral-01);\n  border-radius: 0.4rem;\n  margin-right: 2.4rem;\n  margin-left: -1.2rem;\n  border-width: 0.2rem;\n  border-style: solid;\n  line-height: 2rem;\n}\n\n.tabLine__tag--tabCenter {\n  margin-right: auto;\n}\n\n.tabLine__underline {\n  position: absolute;\n  background-color: var(--primary);\n  bottom: 0;\n  border-radius: 2.4rem;\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  height: 0.3rem;\n}\n\n.tabLine__underline--secondary {\n  background-color: var(--secondary);\n}\n\n.tabLine--center {\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n}\n\n.tabLine--border {\n  border-width: 0;\n  border-bottom-width: 1px;\n  border-style: solid;\n  border-color: var(--neutral-01);\n}"; }
};

export { CcTabsUnderline as cc_tabs_underline };
