var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host } from './index-b08024e3.js';
var ccFilterSelectInputCss = "*{-webkit-box-sizing:border-box;box-sizing:border-box}.filter-file-input__field{padding-top:0.8rem;padding-bottom:0.8rem;padding-left:1.6rem;padding-right:1.6rem;padding-right:40px;min-height:40px}.filter-file-input__field-option{margin:0;padding:0;display:none;visibility:hidden;color:var(--neutral-03);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.filter-file-input__field-option--is-selected{display:block;visibility:visible}.filter-file-input__placeholder{color:var(--neutral-02);display:block;visibility:visible;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.filter-file-input__placeholder--is-hidden{display:none;visibility:hidden}.filter-file-input__options{position:absolute;width:100%;background-color:var(--neutral-04);border-radius:0.4rem;overflow:auto;padding:0;margin:0;left:0;top:calc(100% + 8px);-webkit-box-shadow:0 4px 16px -8px rgba(0, 0, 0, 0.5);box-shadow:0 4px 16px -8px rgba(0, 0, 0, 0.5);max-height:208px;display:none;z-index:1}.filter-file-input__options--is-active{display:block}.filter-file-input__options--top{bottom:calc(100% + 8px);top:auto}.filter-file-input__option{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-height:40px;font-size:14px;line-height:20px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:10px 1.6rem}.filter-file-input__option:hover,.filter-file-input__option--hover{background-color:var(--background-01)}.filter-file-input__option--is-selected{background-color:var(--background-02);color:var(--neutral-03);font-weight:700;-webkit-transition-property:all;transition-property:all}.filter-file-input__option--is-selected:hover{background-color:var(--background-02)}.filter-file-input__option--is-disabled{color:var(--disabled-text)}.filter-file-input__option--is-disabled:hover{cursor:not-allowed;background:transparent}.filter-file-input__option-checkbox{margin-right:1.6rem}.filter-file-input__label{padding-top:0.4rem;padding-bottom:0.4rem;font-size:1.1rem;font-weight:900;color:var(--neutral-03);display:block}.filter-file-input__input--is-hidden{visibility:hidden;position:absolute;z-index:-2}.filter-file-input__dot-wrapper{display:inline-block}.filter-file-input__dot-wrapper--is-hidden{display:none}.filter-file-input__dot-list{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:-4px}.filter-file-input__dot-item{background-color:var(--background-01);display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;border-radius:10px;padding:0.2rem 0.8rem 0.2rem 1.2rem;margin:4px}.filter-file-input__dot-text{font-size:1.1rem;vertical-align:middle}.filter-file-input__dot-delete{display:-ms-inline-flexbox;display:inline-flex;margin-left:0.8rem;vertical-align:text-bottom}.filter-file-input__dot-delete cc-icon{display:-ms-inline-flexbox;display:inline-flex;color:inherit}.filter-file-input__icon--inverted{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.filter-file-input cc-input{display:inline-block}.filter-file-input cc-input .input__field{padding:0}";
var CcFilterSelectInput = /** @class */ (function () {
    function CcFilterSelectInput(hostRef) {
        var _this = this;
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
        this.updateChoicesList = function (value) {
            _this.selectedChoices = _this.selectedChoices.includes(value)
                ? _this.selectedChoices.filter(function (choice) { return choice !== value; })
                : __spreadArrays(_this.selectedChoices, [value]);
            _this.changeChoice.emit(_this.selectedChoices);
        };
        this.setInputText = function (e) {
            var value = e.target.value;
            _this.valueInput = value;
            _this.valueInput.length ? _this.handleShowOptions() : false;
        };
        this.focusInput = function () {
            if (_this.isOpenDropdown)
                _this.inputEl.focus();
        };
        this.removeFocus = function () {
            if (!_this.isOpenDropdown)
                _this.inputEl.blur();
        };
        this.clearInputValue = function () {
            _this.valueInput = "";
        };
        this.knowIfThereIsASelected = function () {
            return _this.selectedChoices.length > 0;
        };
        this.handleOptionClick = function (value) {
            _this.updateChoicesList(value);
            _this.clearInputValue();
            _this.focusInput();
        };
        this.filteredChoices = function () {
            var filterdList = _this.valueInput.length
                ? _this._choices.filter(function (choice) {
                    var loweredChoiceWithoutTilde = choice.label
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    var loweredInputWithoutTilde = _this.valueInput
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    return loweredChoiceWithoutTilde.includes(loweredInputWithoutTilde);
                })
                : _this._choices;
            return filterdList;
        };
        this.placeholderSelected = function () {
            _this.clearChoices();
            _this.handleHideOptions();
            _this.changeChoice.emit(null);
        };
        this.handleShowOptions = function () {
            _this.isOpenDropdown = true;
            _this.hoveredChoice = _this._choices[0].value;
        };
        this.handleHideOptions = function () {
            _this.isOpenDropdown = false;
        };
        this.handleRemoveItemSelected = function (value) {
            _this.updateChoicesList(value);
            _this.focusInput();
        };
        this.closeDroprownIfClickOutDropdown = function (e) {
            var elementActiveDropdown = _this.singleFileInput;
            var targetElement = e.target;
            if (!elementActiveDropdown.contains(targetElement)) {
                return (_this.removeFocus(), _this.handleHideOptions(), _this.clearInputValue());
            }
        };
        this.getHeigthWrapperOptions = function () {
            return _this.dropdownItems.getBoundingClientRect().height;
        };
        this.observerListItems = function () {
            var config = { attributes: true, childList: false, characterData: false };
            _this.observerItems = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === "attributes") {
                        _this.calculatePositionOfOptions();
                        _this.focusInput();
                        _this.removeFocus();
                    }
                });
            });
            _this.observerItems.observe(_this.dropdownItems, config);
        };
        this.calculatePositionOfOptions = function () {
            if (_this.isOpenDropdown) {
                var dropdown = _this.singleFileInput;
                var elementItems = _this.dropdownItems;
                var heightBody = document.body.getBoundingClientRect().height;
                var listHeight = elementItems.getBoundingClientRect().height;
                var dropdownField = dropdown.getBoundingClientRect().height;
                var positionDropdown = dropdown.getBoundingClientRect().top;
                var MARGIN_DROPDOWN_TO_ITEMS = 8;
                var elementPos = positionDropdown +
                    dropdownField +
                    MARGIN_DROPDOWN_TO_ITEMS +
                    listHeight;
                return (_this.positionOptionstop = heightBody < elementPos);
            }
            _this.positionOptionstop = false;
        };
        this.validateDisabled = function () {
            if (!_this.disabled) {
                _this.handleShowOptions();
                // this.focusInput();
            }
        };
    }
    CcFilterSelectInput.prototype.setChoices = function (newValue, oldValue) {
        var newValueStringify = JSON.stringify(newValue);
        var oldValueStringify = JSON.stringify(oldValue);
        if (newValueStringify !== oldValueStringify) {
            this._choices = newValue;
            this.selectedChoices = this._choices
                .filter(function (c) { return c.selected; })
                .map(function (c) { return c.value; });
        }
    };
    CcFilterSelectInput.prototype.handleKeyDown = function (ev) {
        var _this = this;
        if (this.isOpenDropdown) {
            var indexHoveredChoice_1 = this._choices.findIndex(function (choice) { return choice.value === _this.hoveredChoice; });
            var scrollToElem = function (elem, top) {
                elem.scrollIntoViewIfNeeded(top);
            };
            var getIndexFromValue = function (value) { return _this._choices.findIndex(function (choice) { return choice.value === value; }); };
            var nextEnabledIndex = this._choices.find(function (choice, index) { return index > indexHoveredChoice_1 && !choice.disabled; });
            var prevEnabledIndex = this._choices
                .filter(function (choice, index) { return index < indexHoveredChoice_1 && !choice.disabled; })
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
                        var newChoices = __spreadArrays(this.selectedChoices);
                        var removedValue_1 = newChoices.pop();
                        var removedChoice = this._choices.find(function (choice) { return choice.value === removedValue_1; });
                        if (!(removedChoice === null || removedChoice === void 0 ? void 0 : removedChoice.disableRemove))
                            this.selectedChoices = newChoices;
                    }
                    break;
            }
        }
    };
    CcFilterSelectInput.prototype.clearChoices = function () {
        var newChoices = __spreadArrays(this._choices);
        newChoices.map(function (choice) { return (choice.selected = false); });
        this._choices = newChoices;
    };
    CcFilterSelectInput.prototype.validateShowPlaceholder = function () {
        return this.isOpenDropdown || this.knowIfThereIsASelected();
    };
    CcFilterSelectInput.prototype.handleToogleOptions = function () {
        this.isOpenDropdown = !this.isOpenDropdown;
        this.calculatePositionOfOptions();
    };
    CcFilterSelectInput.prototype.componentWillLoad = function () {
        this._choices = __spreadArrays(this.choices);
        this.selectedChoices = this._choices
            .filter(function (c) { return c.selected; })
            .map(function (c) { return c.value; });
        document.addEventListener("click", this.closeDroprownIfClickOutDropdown);
    };
    CcFilterSelectInput.prototype.componentDidLoad = function () {
        this.observerListItems();
    };
    CcFilterSelectInput.prototype.componentDidUnload = function () {
        if (this.observerItems)
            this.observerItems.disconnect();
        document.removeEventListener("click", this.closeDroprownIfClickOutDropdown);
    };
    CcFilterSelectInput.prototype.render = function () {
        var _this = this;
        var attrs = {
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
        return (h(Host, { "data-testid": "cc-filter-file-input", class: "filter-file-input" }, this.label && (h("span", { class: "filter-file-input__label" }, this.label)), h("cc-wrapper-field", Object.assign({ ref: function (el) { return (_this.singleFileInput = el); }, class: {
                "filter-file-input__wrapper": true,
                "filter-file-input--is-collapse": this.isOpenDropdown,
            } }, attrs), h("div", { class: "filter-file-input__field", onClick: this.validateDisabled }, h("div", { class: {
                "filter-file-input__dot-wrapper": true,
                "filter-file-input__dot-wrapper--is-hidden": !this.knowIfThereIsASelected(),
            } }, h("ul", { class: "filter-file-input__dot-list" }, this.selectedChoices
            .map(function (selectedChoice) { return _this._choices.find(function (choice) { return choice.value === selectedChoice; }); })
            .map(function (choice) { return (h("li", { class: "filter-file-input__dot-item" }, h("div", { class: "filter-file-input__dot-text" }, choice.label, h("div", { onClick: function () { return choice.disableRemove
                ? null
                : _this.handleRemoveItemSelected(choice.value); }, class: "filter-file-input__dot-delete" }, h("cc-icon", { size: 12, name: "x" }))))); }))), h("p", { class: {
                "filter-file-input__placeholder": true,
                "filter-file-input__placeholder--is-hidden": this.validateShowPlaceholder(),
            } }, this.placeholder), h("cc-input", { style: {
                width: this.valueInput.length + 1 + "ch",
                maxWidth: "100%",
            }, bgField: "bg-transparent", onInput: function (e) { return _this.setInputText(e); }, border: false, value: this.valueInput, inputRef: function (el) { return (_this.inputEl = el); }, class: {
                "filter-file-input__input": true,
                "filter-file-input__input--is-hidden": !this.validateShowPlaceholder(),
            } })), h("ul", { ref: function (el) { return (_this.dropdownItems = el); }, class: {
                "filter-file-input__options": true,
                "filter-file-input__options--is-active": this.isOpenDropdown,
                "filter-file-input__options--top": this.positionOptionstop,
            } }, this.filteredChoices().length === 0 && (h("li", { class: {
                "filter-file-input__placeholder": true,
                "filter-file-input__option": true,
            } }, "No se encontraron resultados")), this.filteredChoices()
            .map(function (choice) { return (Object.assign(Object.assign({}, choice), { selected: _this.selectedChoices.includes(choice.value) })); })
            .map(function (c) {
            return (h("li", { onClick: function () { return c.disabled || c.disableRemove
                    ? null
                    : _this.handleOptionClick(c.value); }, class: {
                    "filter-file-input__option": true,
                    "filter-file-input__option--is-selected": c.selected,
                    "filter-file-input__option--is-disabled": c.disabled,
                    "filter-file-input__option--hover": c.value === _this.hoveredChoice,
                } }, _this.type === "checkbox" && (h("cc-checkfield", { class: "filter-file-input__option-checkbox", type: "checkbox", shape: "square", color: _this.color, checked: c.selected })
            // <input
            //
            //   type="checkbox"
            //   name=""
            //   id=""
            //   checked={c.selected}
            // />
            ), h("span", null, c.label)));
        })))));
    };
    Object.defineProperty(CcFilterSelectInput, "watchers", {
        get: function () {
            return {
                "choices": ["setChoices"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CcFilterSelectInput;
}());
CcFilterSelectInput.style = ccFilterSelectInputCss;
export { CcFilterSelectInput as cc_filter_select_input };
