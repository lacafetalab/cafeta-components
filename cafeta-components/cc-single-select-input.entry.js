import { r as registerInstance, c as createEvent, h, H as Host } from './core-2b8afa15.js';

const CcSingleSelectInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.changeChoice = createEvent(this, "changeChoice", 7);
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
        return (h(Host, { "data-testid": "cc-single-file-input", class: "single-file-input" }, this.label && (h("span", { class: "single-file-input__label" }, this.label)), h("cc-wrapper-field", Object.assign({ ref: el => (this.singleFileInput = el), class: {
                "single-file-input__wrapper": true,
                "single-file-input--is-collapse": this.isOpenDropdown
            } }, attrs), h("div", { class: "single-file-input__field", onClick: this.validateDisabled }, !this.autocomplete && (h("p", { class: {
                "single-file-input__placeholder": true,
                "single-file-input__placeholder--is-hidden": this.knowIfThereIsAnItemSelected()
            } }, this.placeholder)), this.autocomplete && (h("cc-input", { bgField: "bg-transparent", value: this.valueInput, placeholder: this.placeholder, border: false, ref: el => (this.inputEl = el), onInput: (e) => { var _a; return this.setInputValue((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); } })), !this.autocomplete &&
            this._choices
                .filter(choice => choice.selected)
                .map(c => {
                return (h("p", { class: "single-file-input__field-option--is-selected" }, c.label));
            })), h("ul", { ref: el => (this.dropdownItems = el), class: {
                "single-file-input__options": true,
                "single-file-input__options--is-active": this.isOpenDropdown,
                "single-file-input__options--top": this.positionOptionstop
            } }, !this.autocomplete && this.placeholder && (h("li", { class: {
                "single-file-input__placeholder": true,
                "single-file-input__option": true,
                "single-file-input__option--is-selected": !this.knowIfThereIsAnItemSelected()
            }, onClick: this.placeholderSelected }, this.placeholder)), this.autocomplete && this.filteredChoices().length > 0
            ? this.filteredChoices().map(c => {
                return (h("li", { onClick: () => c.disabled ? false : this.handleOptionClick(c.value), class: {
                        "single-file-input__option": true,
                        "single-file-input__option--is-selected": c.selected,
                        "single-file-input__option--is-disabled": c.disabled
                    } }, c.label));
            })
            : this.autocomplete &&
                this.filteredChoices().length === 0 && (h("li", { class: "single-file-input__option" }, "No se encontraron los resultados")), !this.autocomplete &&
            this._choices.map(c => {
                return (h("li", { onClick: () => c.disabled ? false : this.handleOptionClick(c.value), class: {
                        "single-file-input__option": true,
                        "single-file-input__option--is-selected": c.selected,
                        "single-file-input__option--is-disabled": c.disabled,
                        "single-file-input__option--is-hidden": this.hideItemsIfSelected && c.invisible
                    } }, c.label, " ", c.labelInfo && h("span", null, c.labelInfo)));
            })))));
    }
    static get watchers() { return {
        "choices": ["setChoices"]
    }; }
    static get style() { return "* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.single-file-input__wrapper-icon {\n  position: absolute;\n  right: 8px;\n  bottom: 8px;\n  max-height: 2.4rem;\n}\n\n.single-file-input__field {\n  padding-top: 0.8rem;\n  padding-bottom: 0.8rem;\n  padding-left: 1.6rem;\n  padding-right: 1.6rem;\n  padding-right: 40px;\n  min-height: 40px;\n}\n\n.single-file-input__field-option {\n  margin: 0;\n  padding: 0;\n  display: none;\n  visibility: hidden;\n  color: var(--neutral-03);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.single-file-input__field-option--is-selected {\n  display: block;\n  visibility: visible;\n}\n\n.single-file-input__field input {\n  padding: 0;\n}\n\n.single-file-input__placeholder {\n  color: var(--neutral-02);\n  display: block;\n  visibility: visible;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.single-file-input__placeholder--is-hidden {\n  display: none;\n  visibility: hidden;\n}\n\n.single-file-input__options {\n  position: absolute;\n  width: 100%;\n  background-color: var(--neutral-04);\n  border-radius: 0.4rem;\n  overflow: auto;\n  padding: 0;\n  margin: 0;\n  left: 0;\n  top: calc(100% + 8px);\n  -webkit-box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.5);\n  max-height: 208px;\n  display: none;\n  z-index: 1;\n}\n\n.single-file-input__options--is-active {\n  display: block;\n}\n\n.single-file-input__options--top {\n  bottom: calc(100% + 8px);\n  top: auto;\n}\n\n.single-file-input__option {\n  min-height: 40px;\n  font-size: 14px;\n  line-height: 20px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  padding: 10px 1.6rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.single-file-input__option span {\n  margin-left: 12px;\n}\n\n.single-file-input__option:hover {\n  background-color: var(--background-01);\n}\n\n.single-file-input__option--is-selected {\n  background-color: var(--background-02);\n  color: var(--neutral-03);\n  font-weight: 700;\n  -webkit-transition-property: all;\n  transition-property: all;\n}\n\n.single-file-input__option--is-selected:hover {\n  background-color: var(--background-02);\n}\n\n.single-file-input__option--is-disabled {\n  color: var(--disabled-text);\n}\n\n.single-file-input__option--is-disabled:hover {\n  cursor: not-allowed;\n  background: transparent;\n}\n\n.single-file-input__option--is-hidden {\n  display: none;\n}\n\n.single-file-input__label {\n  padding-top: 0.4rem;\n  padding-bottom: 0.4rem;\n  font-size: 1.1rem;\n  font-weight: 900;\n  color: var(--neutral-03);\n  display: block;\n}"; }
};

export { CcSingleSelectInput as cc_single_select_input };
