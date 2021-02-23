import { Component, Prop, State, h, Host, Event, Watch } from "@stencil/core";
export class CcTabsTags {
    constructor() {
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
        return (h(Host, null,
            h("div", { class: {
                    tabTags: true
                } },
                h("div", { class: "tabTags__wrap" }, this._options.map((option, index) => (h("button", { key: `tabTagItem_${index}`, class: {
                        tabTags__button: true,
                        "tabTags__button--secondary": this.color === "secondary",
                        "tabTags__button--active": option.active,
                        "tabTags__button--disabled": option.disabled
                    }, onClick: this.handleOptionClick(index) }, option.text)))))));
    }
    static get is() { return "cc-tabs-tags"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["cc-tabs-tags.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-tabs-tags.css"]
    }; }
    static get properties() { return {
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
                "original": "TabOption[]",
                "resolved": "TabOption[]",
                "references": {
                    "TabOption": {
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
        "_options": {}
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
                "original": "TabOption",
                "resolved": "{ active?: boolean; disabled?: boolean; text: string; value: any; }",
                "references": {
                    "TabOption": {
                        "location": "import",
                        "path": "../../utils/types/TabOption"
                    }
                }
            }
        }]; }
    static get watchers() { return [{
            "propName": "options",
            "methodName": "setOptions"
        }]; }
}
