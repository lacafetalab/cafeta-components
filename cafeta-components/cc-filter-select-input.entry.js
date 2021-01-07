import { r as registerInstance, c as createEvent, h, H as Host } from './core-2b8afa15.js';

const CcFilterSelectInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.changeChoice = createEvent(this, "changeChoice", 7);
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
        return (h(Host, { "data-testid": "cc-filter-file-input", class: "filter-file-input" }, this.label && (h("span", { class: "filter-file-input__label" }, this.label)), h("cc-wrapper-field", Object.assign({ ref: (el) => (this.singleFileInput = el), class: {
                "filter-file-input__wrapper": true,
                "filter-file-input--is-collapse": this.isOpenDropdown,
            } }, attrs), h("div", { class: "filter-file-input__field", onClick: this.validateDisabled }, h("div", { class: {
                "filter-file-input__dot-wrapper": true,
                "filter-file-input__dot-wrapper--is-hidden": !this.knowIfThereIsASelected(),
            } }, h("ul", { class: "filter-file-input__dot-list" }, this.selectedChoices
            .map((selectedChoice) => this._choices.find((choice) => choice.value === selectedChoice))
            .map((choice) => (h("li", { class: "filter-file-input__dot-item" }, h("div", { class: "filter-file-input__dot-text" }, choice.label, h("div", { onClick: () => choice.disableRemove
                ? null
                : this.handleRemoveItemSelected(choice.value), class: "filter-file-input__dot-delete" }, h("cc-icon", { size: 12, name: "x" })))))))), h("p", { class: {
                "filter-file-input__placeholder": true,
                "filter-file-input__placeholder--is-hidden": this.validateShowPlaceholder(),
            } }, this.placeholder), h("cc-input", { style: {
                width: `${this.valueInput.length + 1}ch`,
                maxWidth: "100%",
            }, bgField: "bg-transparent", onInput: (e) => this.setInputText(e), border: false, value: this.valueInput, inputRef: (el) => (this.inputEl = el), class: {
                "filter-file-input__input": true,
                "filter-file-input__input--is-hidden": !this.validateShowPlaceholder(),
            } })), h("ul", { ref: (el) => (this.dropdownItems = el), class: {
                "filter-file-input__options": true,
                "filter-file-input__options--is-active": this.isOpenDropdown,
                "filter-file-input__options--top": this.positionOptionstop,
            } }, this.filteredChoices().length === 0 && (h("li", { class: {
                "filter-file-input__placeholder": true,
                "filter-file-input__option": true,
            } }, "No se encontraron resultados")), this.filteredChoices()
            .map((choice) => (Object.assign(Object.assign({}, choice), { selected: this.selectedChoices.includes(choice.value) })))
            .map((c) => {
            return (h("li", { onClick: () => c.disabled || c.disableRemove
                    ? null
                    : this.handleOptionClick(c.value), class: {
                    "filter-file-input__option": true,
                    "filter-file-input__option--is-selected": c.selected,
                    "filter-file-input__option--is-disabled": c.disabled,
                    "filter-file-input__option--hover": c.value === this.hoveredChoice,
                } }, this.type === "checkbox" && (h("cc-checkfield", { class: "filter-file-input__option-checkbox", type: "checkbox", shape: "square", color: this.color, checked: c.selected })
            // <input
            //
            //   type="checkbox"
            //   name=""
            //   id=""
            //   checked={c.selected}
            // />
            ), h("span", null, c.label)));
        })))));
    }
    static get watchers() { return {
        "choices": ["setChoices"]
    }; }
    static get style() { return "* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.filter-file-input__field {\n  padding-top: 0.8rem;\n  padding-bottom: 0.8rem;\n  padding-left: 1.6rem;\n  padding-right: 1.6rem;\n  padding-right: 40px;\n  min-height: 40px;\n}\n\n.filter-file-input__field-option {\n  margin: 0;\n  padding: 0;\n  display: none;\n  visibility: hidden;\n  color: var(--neutral-03);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.filter-file-input__field-option--is-selected {\n  display: block;\n  visibility: visible;\n}\n\n.filter-file-input__placeholder {\n  color: var(--neutral-02);\n  display: block;\n  visibility: visible;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.filter-file-input__placeholder--is-hidden {\n  display: none;\n  visibility: hidden;\n}\n\n.filter-file-input__options {\n  position: absolute;\n  width: 100%;\n  background-color: var(--neutral-04);\n  border-radius: 0.4rem;\n  overflow: auto;\n  padding: 0;\n  margin: 0;\n  left: 0;\n  top: calc(100% + 8px);\n  -webkit-box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.5);\n  max-height: 208px;\n  display: none;\n  z-index: 1;\n}\n\n.filter-file-input__options--is-active {\n  display: block;\n}\n\n.filter-file-input__options--top {\n  bottom: calc(100% + 8px);\n  top: auto;\n}\n\n.filter-file-input__option {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n  min-height: 40px;\n  font-size: 14px;\n  line-height: 20px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  padding: 10px 1.6rem;\n}\n\n.filter-file-input__option:hover, .filter-file-input__option--hover {\n  background-color: var(--background-01);\n}\n\n.filter-file-input__option--is-selected {\n  background-color: var(--background-02);\n  color: var(--neutral-03);\n  font-weight: 700;\n  -webkit-transition-property: all;\n  transition-property: all;\n}\n\n.filter-file-input__option--is-selected:hover {\n  background-color: var(--background-02);\n}\n\n.filter-file-input__option--is-disabled {\n  color: var(--disabled-text);\n}\n\n.filter-file-input__option--is-disabled:hover {\n  cursor: not-allowed;\n  background: transparent;\n}\n\n.filter-file-input__option-checkbox {\n  margin-right: 1.6rem;\n}\n\n.filter-file-input__label {\n  padding-top: 0.4rem;\n  padding-bottom: 0.4rem;\n  font-size: 1.1rem;\n  font-weight: 900;\n  color: var(--neutral-03);\n  display: block;\n}\n\n.filter-file-input__input--is-hidden {\n  visibility: hidden;\n  position: absolute;\n  z-index: -2;\n}\n\n.filter-file-input__dot-wrapper {\n  display: inline-block;\n}\n\n.filter-file-input__dot-wrapper--is-hidden {\n  display: none;\n}\n\n.filter-file-input__dot-list {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin: -4px;\n}\n\n.filter-file-input__dot-item {\n  background-color: var(--background-01);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: end;\n          -ms-flex-align: end;\n          align-items: flex-end;\n  border-radius: 10px;\n  padding: 0.2rem 0.8rem 0.2rem 1.2rem;\n  margin: 4px;\n}\n\n.filter-file-input__dot-text {\n  font-size: 1.1rem;\n  vertical-align: middle;\n}\n\n.filter-file-input__dot-delete {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin-left: 0.8rem;\n  vertical-align: text-bottom;\n}\n\n.filter-file-input__dot-delete cc-icon {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  color: inherit;\n}\n\n.filter-file-input__icon--inverted {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.filter-file-input cc-input {\n  display: inline-block;\n}\n\n.filter-file-input cc-input .input__field {\n  padding: 0;\n}"; }
};

export { CcFilterSelectInput as cc_filter_select_input };
