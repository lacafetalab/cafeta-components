import { Component, h, Host, Prop, Element, State, Event, Watch } from "@stencil/core";
import "choices.js/public/assets/scripts/choices.min.js";
import "choicesjs-stencil";
export class CcDropdown {
    constructor() {
        this._choices = [];
        this.label = "";
        this.error = false;
        this.disabled = false;
        this.fieldReadonly = false;
        this.placeholder = "";
        this.name = "";
        this.currentValue = "";
        this.iconName = "chevron-down";
        this.color = "primary";
        this.type = "single";
        this.noResultsText = "No se encontraron resultados";
        this.noChoicesText = "No se encontraron opciones";
        this.border = true;
        this.bgField = "";
        this.loader = false;
        this.iconOnly = false;
        this.openDropdown = false;
        this.mutationObserver = new MutationObserver(mutations => {
            mutations.forEach((mutation) => {
                const classes = mutation.target.getAttribute("class").split(" ");
                if (mutation.type === "attributes" &&
                    classes.indexOf("choices__list--dropdown") !== -1) {
                    this.openDropdown = classes.indexOf("is-active") !== -1;
                }
            });
        });
        this.toggleDropdown = e => {
            e.stopPropagation();
            const element = this.el.querySelector("choicesjs-stencil");
            if (this.el.querySelector(".choices__list--dropdown.is-active")) {
                element.hideDropdown(true);
            }
            else {
                element.showDropdown(true);
            }
        };
    }
    setChoices(newValue, oldValue) {
        const newValueStringify = JSON.stringify(newValue);
        const oldValueStringify = JSON.stringify(oldValue);
        if (newValueStringify !== oldValueStringify) {
            this._choices = newValue;
        }
    }
    setDisabled(newValue, oldValue) {
        const element = this.el.querySelector("choicesjs-stencil");
        if (!oldValue && newValue) {
            element.disable();
        }
        if (oldValue && !newValue) {
            element.enable();
        }
    }
    changeChoiceHandler(event) {
        let value = event;
        if (this.type === "single") {
            this.openDropdown = false;
            value = event;
        }
        else if (this.type === "multiple") {
            const selectorMultiple = ".choices__list.choices__list--multiple .choices__item.choices__item--selectable";
            const selectedChoices = this.el.querySelectorAll(selectorMultiple);
            value = Array.from(selectedChoices).map((option) => option.dataset.value);
        }
        this.changeChoice.emit(value);
    }
    clickDropdownHandler(event) {
        this.clickDropdown.emit(event);
    }
    componentWillLoad() {
        this._choices = this.choices;
    }
    componentDidLoad() {
        const element = this.el.querySelector("choicesjs-stencil");
        if (this.disabled) {
            element.disable();
        }
        this.mutationObserver.observe(element, {
            attributes: true,
            characterData: false,
            childList: false,
            subtree: true,
            attributeOldValue: false,
            characterDataOldValue: false
        });
    }
    render() {
        return (h(Host, { "data-testid": "cc-dropdown" },
            h("div", { class: {
                    dropdown: true,
                    "dropdown--readonly": this.fieldReadonly || this.loader || this.iconOnly,
                    "dropdown--disabled": this.disabled,
                    "dropdown--secondary": this.color === "secondary",
                    "dropdown--error": this.error && !this.disabled,
                    "dropdown--no-border": !this.border,
                    "dropdown--no-background": !this.bgField,
                    "dropdown--icon-only": this.iconOnly
                } },
                this.label && h("span", { class: "dropdown__label" }, this.label),
                h("div", { class: {
                        dropdown__input: true,
                        [`${this.bgField}`]: !!this.bgField
                    } },
                    h("choicesjs-stencil", { searchEnabled: false, name: this.name, choices: this._choices, onClick: (e) => this.clickDropdownHandler(e), removeItems: true, removeItemButton: this.type === "multiple", noResultsText: this.noResultsText, noChoicesText: this.noChoicesText, onChange: (e) => { var _a; return this.changeChoiceHandler((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); }, type: this.type }, this.loader ? (h("div", { class: "dropdown__loader" },
                        h("cc-loader", null))) : (h("cc-icon", { onClick: this.toggleDropdown, class: {
                            dropdown__icon: true,
                            "dropdown__icon--inverted": this.openDropdown
                        }, name: this.error ? "x" : this.iconName })))),
                this.helperText && this.error && !this.disabled && (h("span", { class: "dropdown__helperText" }, this.helperText)))));
    }
    static get is() { return "cc-dropdown"; }
    static get originalStyleUrls() { return {
        "$": ["cc-dropdown.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-dropdown.css"]
    }; }
    static get properties() { return {
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "choices": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<any>",
                "resolved": "any[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "error": {
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
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "disabled": {
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
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "fieldReadonly": {
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
            "attribute": "field-readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "currentValue": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "current-value",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "iconName": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "icon-name",
            "reflect": false,
            "defaultValue": "\"chevron-down\""
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "\"primary\""
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"single\" | \"multiple\" | \"text\"",
                "resolved": "\"multiple\" | \"single\" | \"text\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"single\""
        },
        "noResultsText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "no-results-text",
            "reflect": false,
            "defaultValue": "\"No se encontraron resultados\""
        },
        "noChoicesText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "no-choices-text",
            "reflect": false,
            "defaultValue": "\"No se encontraron opciones\""
        },
        "helperText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "helper-text",
            "reflect": false
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
            "defaultValue": "true"
        },
        "bgField": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "bg-field",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "loader": {
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
            "attribute": "loader",
            "reflect": false,
            "defaultValue": "false"
        },
        "iconOnly": {
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
            "attribute": "icon-only",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "_choices": {},
        "openDropdown": {}
    }; }
    static get events() { return [{
            "method": "changeChoice",
            "name": "changeChoice",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clickDropdown",
            "name": "clickDropdown",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "choices",
            "methodName": "setChoices"
        }, {
            "propName": "disabled",
            "methodName": "setDisabled"
        }]; }
}
