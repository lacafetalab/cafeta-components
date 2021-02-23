'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-87a60bbb.js');

const ccSingleSelectInputCss = "*{-webkit-box-sizing:border-box;box-sizing:border-box}.single-file-input__wrapper-icon{position:absolute;right:8px;bottom:8px;max-height:2.4rem}.single-file-input__field{padding-top:0.8rem;padding-bottom:0.8rem;padding-left:1.6rem;padding-right:1.6rem;padding-right:40px;min-height:40px}.single-file-input__field-option{margin:0;padding:0;display:none;visibility:hidden;color:var(--neutral-03);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.single-file-input__field-option--is-selected{display:block;visibility:visible}.single-file-input__field input{padding:0}.single-file-input__placeholder{color:var(--neutral-02);display:block;visibility:visible;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.single-file-input__placeholder--is-hidden{display:none;visibility:hidden}.single-file-input__options{position:absolute;width:100%;background-color:var(--neutral-04);border-radius:0.4rem;overflow:auto;padding:0;margin:0;left:0;top:calc(100% + 8px);-webkit-box-shadow:0 4px 16px -8px rgba(0, 0, 0, 0.5);box-shadow:0 4px 16px -8px rgba(0, 0, 0, 0.5);max-height:208px;display:none;z-index:1}.single-file-input__options--is-active{display:block}.single-file-input__options--top{bottom:calc(100% + 8px);top:auto}.single-file-input__option{min-height:40px;font-size:14px;line-height:20px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:10px 1.6rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}.single-file-input__option span{margin-left:12px}.single-file-input__option:hover{background-color:var(--background-01)}.single-file-input__option--is-selected{background-color:var(--background-02);color:var(--neutral-03);font-weight:700;-webkit-transition-property:all;transition-property:all}.single-file-input__option--is-selected:hover{background-color:var(--background-02)}.single-file-input__option--is-disabled{color:var(--disabled-text)}.single-file-input__option--is-disabled:hover{cursor:not-allowed;background:transparent}.single-file-input__option--is-hidden{display:none}.single-file-input__label{padding-top:0.4rem;padding-bottom:0.4rem;font-size:1.1rem;font-weight:900;color:var(--neutral-03);display:block}";

const CcSingleSelectInput = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.changeChoice = index.createEvent(this, "changeChoice", 7);
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
        return (index.h(index.Host, { "data-testid": "cc-single-file-input", class: "single-file-input" }, this.label && (index.h("span", { class: "single-file-input__label" }, this.label)), index.h("cc-wrapper-field", Object.assign({ ref: el => (this.singleFileInput = el), class: {
                "single-file-input__wrapper": true,
                "single-file-input--is-collapse": this.isOpenDropdown
            } }, attrs), index.h("div", { class: "single-file-input__field", onClick: this.validateDisabled }, !this.autocomplete && (index.h("p", { class: {
                "single-file-input__placeholder": true,
                "single-file-input__placeholder--is-hidden": this.knowIfThereIsAnItemSelected()
            } }, this.placeholder)), this.autocomplete && (index.h("cc-input", { bgField: "bg-transparent", value: this.valueInput, placeholder: this.placeholder, border: false, ref: el => (this.inputEl = el), onInput: (e) => { var _a; return this.setInputValue((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); } })), !this.autocomplete &&
            this._choices
                .filter(choice => choice.selected)
                .map(c => {
                return (index.h("p", { class: "single-file-input__field-option--is-selected" }, c.label));
            })), index.h("ul", { ref: el => (this.dropdownItems = el), class: {
                "single-file-input__options": true,
                "single-file-input__options--is-active": this.isOpenDropdown,
                "single-file-input__options--top": this.positionOptionstop
            } }, !this.autocomplete && this.placeholder && (index.h("li", { class: {
                "single-file-input__placeholder": true,
                "single-file-input__option": true,
                "single-file-input__option--is-selected": !this.knowIfThereIsAnItemSelected()
            }, onClick: this.placeholderSelected }, this.placeholder)), this.autocomplete && this.filteredChoices().length > 0
            ? this.filteredChoices().map(c => {
                return (index.h("li", { onClick: () => c.disabled ? false : this.handleOptionClick(c.value), class: {
                        "single-file-input__option": true,
                        "single-file-input__option--is-selected": c.selected,
                        "single-file-input__option--is-disabled": c.disabled
                    } }, c.label));
            })
            : this.autocomplete &&
                this.filteredChoices().length === 0 && (index.h("li", { class: "single-file-input__option" }, "No se encontraron los resultados")), !this.autocomplete &&
            this._choices.map(c => {
                return (index.h("li", { onClick: () => c.disabled ? false : this.handleOptionClick(c.value), class: {
                        "single-file-input__option": true,
                        "single-file-input__option--is-selected": c.selected,
                        "single-file-input__option--is-disabled": c.disabled,
                        "single-file-input__option--is-hidden": this.hideItemsIfSelected && c.invisible
                    } }, c.label, " ", c.labelInfo && index.h("span", null, c.labelInfo)));
            })))));
    }
    static get watchers() { return {
        "choices": ["setChoices"]
    }; }
};
CcSingleSelectInput.style = ccSingleSelectInputCss;

exports.cc_single_select_input = CcSingleSelectInput;
