import { Host, h, Component, Prop, Event, State, Watch, Element } from "@stencil/core";
export class CcTabsUnderline {
    constructor() {
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
        return (h(Host, null,
            h("div", { class: {
                    tabLine: true,
                    "tabLine--border": this.border,
                    "tabLine--center": this.center
                }, ref: el => (this.wrapTabs = el) },
                this._options.map((option, index) => {
                    var _a;
                    return (h("div", { class: "tabLine__buttonWrapper", key: `tabItem_${index}` },
                        h("button", { class: {
                                tabLine__button: true,
                                "tabLine__button--secondary": this.color === "secondary",
                                "tabLine__button--sm": this.size === "sm",
                                "tabLine__button--active": option.active,
                                "tabLine__button--disabled": option.disabled
                            }, onClick: this.handleOptionClick(index) }, option.text),
                        option.tag && (h("div", { class: {
                                tabLine__tag: true,
                                "tabLine__tag--tabCenter": this.center
                            }, style: option.tag.color
                                ? {
                                    borderColor: option.tag.color,
                                    color: option.tag.color
                                }
                                : undefined }, (_a = option.tag) === null || _a === void 0 ? void 0 : _a.text))));
                }),
                h("div", { class: {
                        tabLine__underline: true,
                        "tabLine__underline--secondary": this.color === "secondary"
                    }, style: {
                        left: `${this.linePosition.left}px`,
                        width: `${this.linePosition.width}px`
                    } }))));
    }
    static get is() { return "cc-tabs-underline"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["cc-tabs-underline.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-tabs-underline.css"]
    }; }
    static get properties() { return {
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"sm\" | \"md\"",
                "resolved": "\"md\" | \"sm\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "\"md\""
        },
        "border": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "border",
            "reflect": false,
            "defaultValue": "false"
        },
        "center": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "center",
            "reflect": false,
            "defaultValue": "false"
        },
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"primary\" | \"secondary\"",
                "resolved": "\"primary\" | \"secondary\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "\"primary\""
        },
        "options": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "TabOptionWithTag[]",
                "resolved": "TabOptionWithTag[]",
                "references": {
                    "TabOptionWithTag": {
                        "location": "import",
                        "path": "../../utils/types/TabOption"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        }
    }; }
    static get states() { return {
        "_options": {},
        "linePosition": {}
    }; }
    static get events() { return [{
            "method": "changeOption",
            "name": "changeOption",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "TabOptionWithTag",
                "resolved": "TabOption & { tag?: { color?: string; text: string; }; }",
                "references": {
                    "TabOptionWithTag": {
                        "location": "import",
                        "path": "../../utils/types/TabOption"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "options",
            "methodName": "setOptions"
        }, {
            "propName": "_options",
            "methodName": "animateFromToTab"
        }]; }
}
