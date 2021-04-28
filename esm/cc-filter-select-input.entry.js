import { r as registerInstance, c as createEvent, h, H as Host } from './index-105344ad.js';

const ccFilterSelectInputCss = "*{-webkit-box-sizing:border-box;box-sizing:border-box}.filter-file-input__field{padding-top:0.8rem;padding-bottom:0.8rem;padding-left:1.6rem;padding-right:1.6rem;padding-right:40px;min-height:40px}.filter-file-input__field-option{margin:0;padding:0;display:none;visibility:hidden;color:var(--neutral-03);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.filter-file-input__field-option--is-selected{display:block;visibility:visible}.filter-file-input__placeholder{color:var(--neutral-02);display:block;visibility:visible;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.filter-file-input__placeholder--is-hidden{display:none;visibility:hidden}.filter-file-input__options{position:absolute;width:100%;background-color:var(--neutral-04);border-radius:0.4rem;overflow:auto;padding:0;margin:0;left:0;top:calc(100% + 8px);-webkit-box-shadow:0 4px 16px -8px rgba(0, 0, 0, 0.5);box-shadow:0 4px 16px -8px rgba(0, 0, 0, 0.5);max-height:208px;display:none;z-index:1}.filter-file-input__options--is-active{display:block}.filter-file-input__options--top{bottom:calc(100% + 8px);top:auto}.filter-file-input__option{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-height:40px;font-size:14px;line-height:20px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:10px 1.6rem}.filter-file-input__option:hover,.filter-file-input__option--hover{background-color:var(--background-01)}.filter-file-input__option--is-selected{background-color:var(--background-02);color:var(--neutral-03);font-weight:700;-webkit-transition-property:all;transition-property:all}.filter-file-input__option--is-selected:hover{background-color:var(--background-02)}.filter-file-input__option--is-disabled{color:var(--disabled-text)}.filter-file-input__option--is-disabled:hover{cursor:not-allowed;background:transparent}.filter-file-input__option-checkbox{margin-right:1.6rem}.filter-file-input__label{padding-top:0.4rem;padding-bottom:0.4rem;font-size:1.1rem;font-weight:900;color:var(--neutral-03);display:block}.filter-file-input__input--is-hidden{visibility:hidden;position:absolute;z-index:-2}.filter-file-input__dot-wrapper{display:inline-block}.filter-file-input__dot-wrapper--is-hidden{display:none}.filter-file-input__dot-list{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:-4px}.filter-file-input__dot-item{background-color:var(--background-01);display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;border-radius:10px;padding:0.2rem 0.8rem 0.2rem 1.2rem;margin:4px}.filter-file-input__dot-text{font-size:1.1rem;vertical-align:middle}.filter-file-input__dot-delete{display:-ms-inline-flexbox;display:inline-flex;margin-left:0.8rem;vertical-align:text-bottom}.filter-file-input__dot-delete cc-icon{display:-ms-inline-flexbox;display:inline-flex;color:inherit}.filter-file-input__icon--inverted{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.filter-file-input cc-input{display:inline-block}.filter-file-input cc-input .input__field{padding:0}";

const CcFilterSelectInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.changeChoice = createEvent(this, "changeChoice", 7);
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
                        if (!(removedChoice === null || removedChoice === void 0 ? void 0 : removedChoice.disableRemove))
                            this.selectedChoices = newChoices;
                    }
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
};
CcFilterSelectInput.style = ccFilterSelectInputCss;

export { CcFilterSelectInput as cc_filter_select_input };
