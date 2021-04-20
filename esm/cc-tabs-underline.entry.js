import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b08024e3.js';

const ccTabsUnderlineCss = ":host{display:block}.tabLine{display:-ms-flexbox;display:flex;position:relative}.tabLine__button{-webkit-appearance:button;padding:0;margin:0;font-family:inherit;cursor:pointer;background-color:transparent;background-image:none;color:inherit;border:none;font-size:100%;outline:0;margin-top:1.2rem;margin-bottom:1.2rem;margin-left:2.4rem;margin-right:2.4rem;font-size:1.4rem;font-weight:900;line-height:2.4rem}.tabLine__button--sm{font-size:1.1rem;line-height:1.6rem}.tabLine__button--disabled{color:var(--disabled-text);cursor:not-allowed}.tabLine__button--active{color:var(--primary)}.tabLine__button--active.tabLine__button--secondary{color:var(--secondary)}.tabLine__buttonWrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.tabLine__tag{font-weight:900;font-size:1.2rem;padding-left:0.4rem;padding-right:0.4rem;border-color:var(--neutral-01);color:var(--neutral-01);border-radius:0.4rem;margin-right:2.4rem;margin-left:-1.2rem;border-width:0.2rem;border-style:solid;line-height:2rem}.tabLine__tag--tabCenter{margin-right:auto}.tabLine__underline{position:absolute;background-color:var(--primary);bottom:0;border-radius:2.4rem;-webkit-transition:all 0.3s ease;transition:all 0.3s ease;height:0.3rem}.tabLine__underline--secondary{background-color:var(--secondary)}.tabLine--center{-ms-flex-pack:distribute;justify-content:space-around}.tabLine--border{border-width:0;border-bottom-width:1px;border-style:solid;border-color:var(--neutral-01)}";

const CcTabsUnderline = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.changeOption = createEvent(this, "changeOption", 7);
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
};
CcTabsUnderline.style = ccTabsUnderlineCss;

export { CcTabsUnderline as cc_tabs_underline };
