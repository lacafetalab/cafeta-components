import { h, Host } from "@stencil/core";
export class CcSingleSelectInput {
    constructor() {
        this._choices = [];
        this.isOpenDropdown = false;
        this.thereIsLowerSpace = false;
        this.positionOptionstop = false;
        this.valueInput = "";
        this.hideItemsIfSelected = false;
        this.label = "";
        this.error = false;
        this.disabled = false;
        this.fieldReadonly = false;
        this.placeholder = "";
        this.name = "";
        this.currentValue = "";
        this.iconName = "chevron-down";
        this.color = "primary";
        this.border = true;
        this.bgField = "";
        this.loader = false;
        this.autocomplete = false;
        this.IconRotate = true;
        this.focusInput = () => {
            this.inputEl.focus();
        };
        this.handleOptionClick = (value) => {
            this.handleHideOptions();
            if (!this.validateIfTheNewOptionSelectedIsDifferentFromThePrevious(value)) {
                this.clearChoices();
                const newChoices = [...this._choices];
                newChoices.filter(choice => choice.value === value)[0].selected = true;
                this._choices = [...newChoices];
                const choiceElementSelected = this._choices.filter(choice => choice.value === value)[0];
                this.autocomplete ? (this.valueInput = choiceElementSelected.label) : "";
                this.changeChoice.emit(choiceElementSelected.value);
            }
        };
        this.placeholderSelected = () => {
            this.clearChoices();
            this.handleHideOptions();
            this.changeChoice.emit(null);
        };
        this.filteredChoices = () => {
            const filterdList = this.valueInput.length
                ? this._choices.filter(choice => {
                    if (!choice.selected) {
                        const loweredChoiceWithoutTilde = choice.label
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                        const loweredInputWithoutTilde = this.valueInput
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                        return loweredChoiceWithoutTilde.includes(loweredInputWithoutTilde);
                    }
                })
                : this._choices;
            return filterdList;
        };
        this.handleShowOptions = () => {
            this.isOpenDropdown = true;
        };
        this.handleHideOptions = () => {
            this.isOpenDropdown = false;
        };
        this.closeDroprownIfClickOutDropdown = event => {
            const elementActiveDropdown = this.singleFileInput;
            let targetElement = event.target;
            if (!elementActiveDropdown.contains(targetElement)) {
                return this.handleHideOptions();
            }
        };
        this.getHeigthWrapperOptions = () => {
            return this.dropdownItems.getBoundingClientRect().height;
        };
        this.observerListItems = () => {
            const config = { attributes: true, childList: false, characterData: false };
            this.observerItems = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === "attributes") {
                        this.calculatePositionOfOptions();
                        if (this.autocomplete)
                            this.focusInput();
                    }
                });
            });
            this.observerItems.observe(this.dropdownItems, config);
        };
        this.calculatePositionOfOptions = () => {
            if (this.isOpenDropdown) {
                const dropdown = this.singleFileInput;
                const elementItems = this.dropdownItems;
                const heightBody = document.body.getBoundingClientRect().height;
                const listHeight = elementItems.getBoundingClientRect().height;
                const dropdownField = dropdown.getBoundingClientRect().height;
                const positionDropdown = dropdown.getBoundingClientRect().top;
                const MARGIN_DROPDOWN_TO_ITEMS = 8;
                const elementPos = positionDropdown +
                    dropdownField +
                    MARGIN_DROPDOWN_TO_ITEMS +
                    listHeight;
                return (this.positionOptionstop = heightBody < elementPos);
            }
            this.positionOptionstop = false;
        };
        this.validateDisabled = () => {
            this.disabled ? false : this.handleToogleOptions();
        };
    }
    setChoices(newValue, oldValue) {
        const newValueStringify = JSON.stringify(newValue);
        const oldValueStringify = JSON.stringify(oldValue);
        if (newValueStringify !== oldValueStringify) {
            this._choices = JSON.parse(newValueStringify);
        }
    }
    clearChoices() {
        const newChoices = [...this._choices];
        newChoices.map(choice => (choice.selected = false));
        this._choices = newChoices;
    }
    knowIfThereIsAnItemSelected() {
        return this._choices.filter(choice => choice.selected === true).length > 0;
    }
    validateIfTheNewOptionSelectedIsDifferentFromThePrevious(value) {
        if (this.knowIfThereIsAnItemSelected()) {
            const choiceSelected = this._choices.filter(choice => choice.selected)[0]
                .value;
            return choiceSelected === value;
        }
        return false;
    }
    handleToogleOptions() {
        this.isOpenDropdown = !this.isOpenDropdown;
        this.calculatePositionOfOptions();
    }
    setInputValue(value) {
        this.valueInput = value;
        if (this.valueInput.length)
            this.handleShowOptions();
    }
    componentWillLoad() {
        this._choices = JSON.parse(JSON.stringify(this.choices));
        document.addEventListener("click", this.closeDroprownIfClickOutDropdown);
    }
    componentDidLoad() {
        this.observerListItems();
    }
    componentDidUnload() {
        if (this.observerItems)
            this.observerItems.disconnect();
        document.removeEventListener("click", this.closeDroprownIfClickOutDropdown);
    }
    render() {
        const attrs = {
            disabled: this.disabled,
            loader: this.loader,
            fieldReadonly: this.fieldReadonly,
            color: this.color,
            error: this.error,
            border: this.border,
            bgField: this.bgField,
            isActive: this.isOpenDropdown,
            IconRotate: this.IconRotate,
            iconName: this.iconName,
            helperText: this.helperText
        };
        return (h(Host, { "data-testid": "cc-single-file-input", class: "single-file-input" },
            this.label && (h("span", { class: "single-file-input__label" }, this.label)),
            h("cc-wrapper-field", Object.assign({ ref: el => (this.singleFileInput = el), class: {
                    "single-file-input__wrapper": true,
                    "single-file-input--is-collapse": this.isOpenDropdown
                } }, attrs),
                h("div", { class: "single-file-input__field", onClick: this.validateDisabled },
                    !this.autocomplete && (h("p", { class: {
                            "single-file-input__placeholder": true,
                            "single-file-input__placeholder--is-hidden": this.knowIfThereIsAnItemSelected()
                        } }, this.placeholder)),
                    this.autocomplete && (h("cc-input", { bgField: "bg-transparent", value: this.valueInput, placeholder: this.placeholder, border: false, ref: el => (this.inputEl = el), onInput: (e) => { var _a; return this.setInputValue((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); } })),
                    !this.autocomplete &&
                        this._choices
                            .filter(choice => choice.selected)
                            .map(c => {
                            return (h("p", { class: "single-file-input__field-option--is-selected" }, c.label));
                        })),
                h("ul", { ref: el => (this.dropdownItems = el), class: {
                        "single-file-input__options": true,
                        "single-file-input__options--is-active": this.isOpenDropdown,
                        "single-file-input__options--top": this.positionOptionstop
                    } },
                    !this.autocomplete && this.placeholder && (h("li", { class: {
                            "single-file-input__placeholder": true,
                            "single-file-input__option": true,
                            "single-file-input__option--is-selected": !this.knowIfThereIsAnItemSelected()
                        }, onClick: this.placeholderSelected }, this.placeholder)),
                    this.autocomplete && this.filteredChoices().length > 0
                        ? this.filteredChoices().map(c => {
                            return (h("li", { onClick: () => c.disabled ? false : this.handleOptionClick(c.value), class: {
                                    "single-file-input__option": true,
                                    "single-file-input__option--is-selected": c.selected,
                                    "single-file-input__option--is-disabled": c.disabled
                                } }, c.label));
                        })
                        : this.autocomplete &&
                            this.filteredChoices().length === 0 && (h("li", { class: "single-file-input__option" }, "No se encontraron los resultados")),
                    !this.autocomplete &&
                        this._choices.map(c => {
                            return (h("li", { onClick: () => c.disabled ? false : this.handleOptionClick(c.value), class: {
                                    "single-file-input__option": true,
                                    "single-file-input__option--is-selected": c.selected,
                                    "single-file-input__option--is-disabled": c.disabled,
                                    "single-file-input__option--is-hidden": this.hideItemsIfSelected && c.invisible
                                } },
                                c.label,
                                " ",
                                c.labelInfo && h("span", null, c.labelInfo)));
                        })))));
    }
    static get is() { return "cc-single-select-input"; }
    static get originalStyleUrls() { return {
        "$": ["cc-single-select-input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-single-select-input.css"]
    }; }
    static get properties() { return {
        "hideItemsIfSelected": {
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
            "attribute": "hide-items-if-selected",
            "reflect": false,
            "defaultValue": "false"
        },
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
        "autocomplete": {
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
            "attribute": "autocomplete",
            "reflect": false,
            "defaultValue": "false"
        },
        "IconRotate": {
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
            "attribute": "icon-rotate",
            "reflect": false,
            "defaultValue": "true"
        }
    }; }
    static get states() { return {
        "_choices": {},
        "isOpenDropdown": {},
        "thereIsLowerSpace": {},
        "positionOptionstop": {},
        "valueInput": {}
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
        }]; }
    static get watchers() { return [{
            "propName": "choices",
            "methodName": "setChoices"
        }]; }
}
