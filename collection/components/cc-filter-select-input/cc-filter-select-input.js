import { h, Host } from "@stencil/core";
export class CcFilterSelectInput {
    constructor() {
        this._choices = [];
        this.isOpenDropdown = false;
        this.thereIsLowerSpace = false;
        this.positionOptionstop = false;
        this.valueInput = "";
        this.selectedChoices = [];
        this.hoveredChoice = "";
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
        this.IconRotate = true;
        this.updateChoicesList = (value) => {
            this.selectedChoices = this.selectedChoices.includes(value)
                ? this.selectedChoices.filter((choice) => choice !== value)
                : [...this.selectedChoices, value];
            this.changeChoice.emit(this.selectedChoices);
        };
        this.setInputText = (e) => {
            const value = e.target.value;
            this.valueInput = value;
            this.valueInput.length ? this.handleShowOptions() : false;
        };
        this.focusInput = () => {
            if (this.isOpenDropdown)
                this.inputEl.focus();
        };
        this.removeFocus = () => {
            if (!this.isOpenDropdown)
                this.inputEl.blur();
        };
        this.clearInputValue = () => {
            this.valueInput = "";
        };
        this.knowIfThereIsASelected = () => {
            return this.selectedChoices.length > 0;
        };
        this.handleOptionClick = (value) => {
            this.updateChoicesList(value);
            this.clearInputValue();
            this.focusInput();
        };
        this.filteredChoices = () => {
            const filterdList = this.valueInput.length
                ? this._choices.filter((choice) => {
                    const loweredChoiceWithoutTilde = choice.label
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    const loweredInputWithoutTilde = this.valueInput
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    return loweredChoiceWithoutTilde.includes(loweredInputWithoutTilde);
                })
                : this._choices;
            return filterdList;
        };
        this.placeholderSelected = () => {
            this.clearChoices();
            this.handleHideOptions();
            this.changeChoice.emit(null);
        };
        this.handleShowOptions = () => {
            this.isOpenDropdown = true;
            this.hoveredChoice = this._choices[0].value;
        };
        this.handleHideOptions = () => {
            this.isOpenDropdown = false;
        };
        this.handleRemoveItemSelected = (value) => {
            this.updateChoicesList(value);
            this.focusInput();
        };
        this.closeDroprownIfClickOutDropdown = (e) => {
            const elementActiveDropdown = this.singleFileInput;
            let targetElement = e.target;
            if (!elementActiveDropdown.contains(targetElement)) {
                return (this.removeFocus(), this.handleHideOptions(), this.clearInputValue());
            }
        };
        this.getHeigthWrapperOptions = () => {
            return this.dropdownItems.getBoundingClientRect().height;
        };
        this.observerListItems = () => {
            const config = { attributes: true, childList: false, characterData: false };
            this.observerItems = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "attributes") {
                        this.calculatePositionOfOptions();
                        this.focusInput();
                        this.removeFocus();
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
            if (!this.disabled) {
                this.handleShowOptions();
                // this.focusInput();
            }
        };
    }
    setChoices(newValue, oldValue) {
        const newValueStringify = JSON.stringify(newValue);
        const oldValueStringify = JSON.stringify(oldValue);
        if (newValueStringify !== oldValueStringify) {
            this._choices = newValue;
            this.selectedChoices = this._choices
                .filter((c) => c.selected)
                .map((c) => c.value);
        }
    }
    handleKeyDown(ev) {
        var _a;
        if (this.isOpenDropdown) {
            const indexHoveredChoice = this._choices.findIndex((choice) => choice.value === this.hoveredChoice);
            const scrollToElem = (elem, top) => {
                elem.scrollIntoViewIfNeeded(top);
            };
            const getIndexFromValue = (value) => this._choices.findIndex((choice) => choice.value === value);
            const nextEnabledIndex = this._choices.find((choice, index) => index > indexHoveredChoice && !choice.disabled);
            const prevEnabledIndex = this._choices
                .filter((choice, index) => index < indexHoveredChoice && !choice.disabled)
                .pop();
            switch (ev.key) {
                case "ArrowDown":
                    if (nextEnabledIndex) {
                        this.hoveredChoice = nextEnabledIndex.value;
                        scrollToElem(this.dropdownItems.querySelectorAll(".filter-file-input__option")[getIndexFromValue(nextEnabledIndex.value)], false);
                    }
                    break;
                case "ArrowUp":
                    if (prevEnabledIndex) {
                        this.hoveredChoice = prevEnabledIndex.value;
                        scrollToElem(this.dropdownItems.querySelectorAll(".filter-file-input__option")[getIndexFromValue(prevEnabledIndex.value)], true);
                    }
                    break;
                case "Enter":
                    this.handleOptionClick(this.hoveredChoice);
                    break;
                case "Backspace":
                    if (!this.valueInput.length && this.selectedChoices.length) {
                        const newChoices = [...this.selectedChoices];
                        const removedValue = newChoices.pop();
                        const removedChoice = this._choices.find((choice) => choice.value === removedValue);
                        if (!((_a = removedChoice) === null || _a === void 0 ? void 0 : _a.disableRemove))
                            this.selectedChoices = newChoices;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    clearChoices() {
        const newChoices = [...this._choices];
        newChoices.map((choice) => (choice.selected = false));
        this._choices = newChoices;
    }
    validateShowPlaceholder() {
        return this.isOpenDropdown || this.knowIfThereIsASelected();
    }
    handleToogleOptions() {
        this.isOpenDropdown = !this.isOpenDropdown;
        this.calculatePositionOfOptions();
    }
    componentWillLoad() {
        this._choices = [...this.choices];
        this.selectedChoices = this._choices
            .filter((c) => c.selected)
            .map((c) => c.value);
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
            iconRotate: this.IconRotate,
            iconName: this.iconName,
            helperText: this.helperText,
        };
        return (h(Host, { "data-testid": "cc-filter-file-input", class: "filter-file-input" },
            this.label && (h("span", { class: "filter-file-input__label" }, this.label)),
            h("cc-wrapper-field", Object.assign({ ref: (el) => (this.singleFileInput = el), class: {
                    "filter-file-input__wrapper": true,
                    "filter-file-input--is-collapse": this.isOpenDropdown,
                } }, attrs),
                h("div", { class: "filter-file-input__field", onClick: this.validateDisabled },
                    h("div", { class: {
                            "filter-file-input__dot-wrapper": true,
                            "filter-file-input__dot-wrapper--is-hidden": !this.knowIfThereIsASelected(),
                        } },
                        h("ul", { class: "filter-file-input__dot-list" }, this.selectedChoices
                            .map((selectedChoice) => this._choices.find((choice) => choice.value === selectedChoice))
                            .map((choice) => (h("li", { class: "filter-file-input__dot-item" },
                            h("div", { class: "filter-file-input__dot-text" },
                                choice.label,
                                h("div", { onClick: () => choice.disableRemove
                                        ? null
                                        : this.handleRemoveItemSelected(choice.value), class: "filter-file-input__dot-delete" },
                                    h("cc-icon", { size: 12, name: "x" })))))))),
                    h("p", { class: {
                            "filter-file-input__placeholder": true,
                            "filter-file-input__placeholder--is-hidden": this.validateShowPlaceholder(),
                        } }, this.placeholder),
                    h("cc-input", { style: {
                            width: `${this.valueInput.length + 1}ch`,
                            maxWidth: "100%",
                        }, bgField: "bg-transparent", onInput: (e) => this.setInputText(e), border: false, value: this.valueInput, inputRef: (el) => (this.inputEl = el), class: {
                            "filter-file-input__input": true,
                            "filter-file-input__input--is-hidden": !this.validateShowPlaceholder(),
                        } })),
                h("ul", { ref: (el) => (this.dropdownItems = el), class: {
                        "filter-file-input__options": true,
                        "filter-file-input__options--is-active": this.isOpenDropdown,
                        "filter-file-input__options--top": this.positionOptionstop,
                    } },
                    this.filteredChoices().length === 0 && (h("li", { class: {
                            "filter-file-input__placeholder": true,
                            "filter-file-input__option": true,
                        } }, "No se encontraron resultados")),
                    this.filteredChoices()
                        .map((choice) => (Object.assign(Object.assign({}, choice), { selected: this.selectedChoices.includes(choice.value) })))
                        .map((c) => {
                        return (h("li", { onClick: () => c.disabled || c.disableRemove
                                ? null
                                : this.handleOptionClick(c.value), class: {
                                "filter-file-input__option": true,
                                "filter-file-input__option--is-selected": c.selected,
                                "filter-file-input__option--is-disabled": c.disabled,
                                "filter-file-input__option--hover": c.value === this.hoveredChoice,
                            } },
                            this.type === "checkbox" && (h("cc-checkfield", { class: "filter-file-input__option-checkbox", type: "checkbox", shape: "square", color: this.color, checked: c.selected })
                            // <input
                            //
                            //   type="checkbox"
                            //   name=""
                            //   id=""
                            //   checked={c.selected}
                            // />
                            ),
                            h("span", null, c.label)));
                    })))));
    }
    static get is() { return "cc-filter-select-input"; }
    static get originalStyleUrls() { return {
        "$": ["cc-filter-select-input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-filter-select-input.css"]
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
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"checkbox\"",
                "resolved": "\"checkbox\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "type",
            "reflect": false
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
        "valueInput": {},
        "selectedChoices": {},
        "hoveredChoice": {}
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
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyDown",
            "target": "document",
            "capture": false,
            "passive": false
        }]; }
}
