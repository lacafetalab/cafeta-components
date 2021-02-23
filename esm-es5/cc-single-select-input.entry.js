var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host } from './index-f424fde7.js';
var ccSingleSelectInputCss = "*{-webkit-box-sizing:border-box;box-sizing:border-box}.single-file-input__wrapper-icon{position:absolute;right:8px;bottom:8px;max-height:2.4rem}.single-file-input__field{padding-top:0.8rem;padding-bottom:0.8rem;padding-left:1.6rem;padding-right:1.6rem;padding-right:40px;min-height:40px}.single-file-input__field-option{margin:0;padding:0;display:none;visibility:hidden;color:var(--neutral-03);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.single-file-input__field-option--is-selected{display:block;visibility:visible}.single-file-input__field input{padding:0}.single-file-input__placeholder{color:var(--neutral-02);display:block;visibility:visible;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.single-file-input__placeholder--is-hidden{display:none;visibility:hidden}.single-file-input__options{position:absolute;width:100%;background-color:var(--neutral-04);border-radius:0.4rem;overflow:auto;padding:0;margin:0;left:0;top:calc(100% + 8px);-webkit-box-shadow:0 4px 16px -8px rgba(0, 0, 0, 0.5);box-shadow:0 4px 16px -8px rgba(0, 0, 0, 0.5);max-height:208px;display:none;z-index:1}.single-file-input__options--is-active{display:block}.single-file-input__options--top{bottom:calc(100% + 8px);top:auto}.single-file-input__option{min-height:40px;font-size:14px;line-height:20px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:10px 1.6rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}.single-file-input__option span{margin-left:12px}.single-file-input__option:hover{background-color:var(--background-01)}.single-file-input__option--is-selected{background-color:var(--background-02);color:var(--neutral-03);font-weight:700;-webkit-transition-property:all;transition-property:all}.single-file-input__option--is-selected:hover{background-color:var(--background-02)}.single-file-input__option--is-disabled{color:var(--disabled-text)}.single-file-input__option--is-disabled:hover{cursor:not-allowed;background:transparent}.single-file-input__option--is-hidden{display:none}.single-file-input__label{padding-top:0.4rem;padding-bottom:0.4rem;font-size:1.1rem;font-weight:900;color:var(--neutral-03);display:block}";
var CcSingleSelectInput = /** @class */ (function () {
    function CcSingleSelectInput(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.changeChoice = createEvent(this, "changeChoice", 7);
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
        this.focusInput = function () {
            _this.inputEl.focus();
        };
        this.handleOptionClick = function (value) {
            _this.handleHideOptions();
            if (!_this.validateIfTheNewOptionSelectedIsDifferentFromThePrevious(value)) {
                _this.clearChoices();
                var newChoices = __spreadArrays(_this._choices);
                newChoices.filter(function (choice) { return choice.value === value; })[0].selected = true;
                _this._choices = __spreadArrays(newChoices);
                var choiceElementSelected = _this._choices.filter(function (choice) { return choice.value === value; })[0];
                _this.autocomplete ? (_this.valueInput = choiceElementSelected.label) : "";
                _this.changeChoice.emit(choiceElementSelected.value);
            }
        };
        this.placeholderSelected = function () {
            _this.clearChoices();
            _this.handleHideOptions();
            _this.changeChoice.emit(null);
        };
        this.filteredChoices = function () {
            var filterdList = _this.valueInput.length
                ? _this._choices.filter(function (choice) {
                    if (!choice.selected) {
                        var loweredChoiceWithoutTilde = choice.label
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                        var loweredInputWithoutTilde = _this.valueInput
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                        return loweredChoiceWithoutTilde.includes(loweredInputWithoutTilde);
                    }
                })
                : _this._choices;
            return filterdList;
        };
        this.handleShowOptions = function () {
            _this.isOpenDropdown = true;
        };
        this.handleHideOptions = function () {
            _this.isOpenDropdown = false;
        };
        this.closeDroprownIfClickOutDropdown = function (event) {
            var elementActiveDropdown = _this.singleFileInput;
            var targetElement = event.target;
            if (!elementActiveDropdown.contains(targetElement)) {
                return _this.handleHideOptions();
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
                        if (_this.autocomplete)
                            _this.focusInput();
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
            _this.disabled ? false : _this.handleToogleOptions();
        };
    }
    CcSingleSelectInput.prototype.setChoices = function (newValue, oldValue) {
        var newValueStringify = JSON.stringify(newValue);
        var oldValueStringify = JSON.stringify(oldValue);
        if (newValueStringify !== oldValueStringify) {
            this._choices = JSON.parse(newValueStringify);
        }
    };
    CcSingleSelectInput.prototype.clearChoices = function () {
        var newChoices = __spreadArrays(this._choices);
        newChoices.map(function (choice) { return (choice.selected = false); });
        this._choices = newChoices;
    };
    CcSingleSelectInput.prototype.knowIfThereIsAnItemSelected = function () {
        return this._choices.filter(function (choice) { return choice.selected === true; }).length > 0;
    };
    CcSingleSelectInput.prototype.validateIfTheNewOptionSelectedIsDifferentFromThePrevious = function (value) {
        if (this.knowIfThereIsAnItemSelected()) {
            var choiceSelected = this._choices.filter(function (choice) { return choice.selected; })[0]
                .value;
            return choiceSelected === value;
        }
        return false;
    };
    CcSingleSelectInput.prototype.handleToogleOptions = function () {
        this.isOpenDropdown = !this.isOpenDropdown;
        this.calculatePositionOfOptions();
    };
    CcSingleSelectInput.prototype.setInputValue = function (value) {
        this.valueInput = value;
        if (this.valueInput.length)
            this.handleShowOptions();
    };
    CcSingleSelectInput.prototype.componentWillLoad = function () {
        this._choices = JSON.parse(JSON.stringify(this.choices));
        document.addEventListener("click", this.closeDroprownIfClickOutDropdown);
    };
    CcSingleSelectInput.prototype.componentDidLoad = function () {
        this.observerListItems();
    };
    CcSingleSelectInput.prototype.componentDidUnload = function () {
        if (this.observerItems)
            this.observerItems.disconnect();
        document.removeEventListener("click", this.closeDroprownIfClickOutDropdown);
    };
    CcSingleSelectInput.prototype.render = function () {
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
            IconRotate: this.IconRotate,
            iconName: this.iconName,
            helperText: this.helperText
        };
        return (h(Host, { "data-testid": "cc-single-file-input", class: "single-file-input" }, this.label && (h("span", { class: "single-file-input__label" }, this.label)), h("cc-wrapper-field", Object.assign({ ref: function (el) { return (_this.singleFileInput = el); }, class: {
                "single-file-input__wrapper": true,
                "single-file-input--is-collapse": this.isOpenDropdown
            } }, attrs), h("div", { class: "single-file-input__field", onClick: this.validateDisabled }, !this.autocomplete && (h("p", { class: {
                "single-file-input__placeholder": true,
                "single-file-input__placeholder--is-hidden": this.knowIfThereIsAnItemSelected()
            } }, this.placeholder)), this.autocomplete && (h("cc-input", { bgField: "bg-transparent", value: this.valueInput, placeholder: this.placeholder, border: false, ref: function (el) { return (_this.inputEl = el); }, onInput: function (e) { var _a; return _this.setInputValue((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); } })), !this.autocomplete &&
            this._choices
                .filter(function (choice) { return choice.selected; })
                .map(function (c) {
                return (h("p", { class: "single-file-input__field-option--is-selected" }, c.label));
            })), h("ul", { ref: function (el) { return (_this.dropdownItems = el); }, class: {
                "single-file-input__options": true,
                "single-file-input__options--is-active": this.isOpenDropdown,
                "single-file-input__options--top": this.positionOptionstop
            } }, !this.autocomplete && this.placeholder && (h("li", { class: {
                "single-file-input__placeholder": true,
                "single-file-input__option": true,
                "single-file-input__option--is-selected": !this.knowIfThereIsAnItemSelected()
            }, onClick: this.placeholderSelected }, this.placeholder)), this.autocomplete && this.filteredChoices().length > 0
            ? this.filteredChoices().map(function (c) {
                return (h("li", { onClick: function () { return c.disabled ? false : _this.handleOptionClick(c.value); }, class: {
                        "single-file-input__option": true,
                        "single-file-input__option--is-selected": c.selected,
                        "single-file-input__option--is-disabled": c.disabled
                    } }, c.label));
            })
            : this.autocomplete &&
                this.filteredChoices().length === 0 && (h("li", { class: "single-file-input__option" }, "No se encontraron los resultados")), !this.autocomplete &&
            this._choices.map(function (c) {
                return (h("li", { onClick: function () { return c.disabled ? false : _this.handleOptionClick(c.value); }, class: {
                        "single-file-input__option": true,
                        "single-file-input__option--is-selected": c.selected,
                        "single-file-input__option--is-disabled": c.disabled,
                        "single-file-input__option--is-hidden": _this.hideItemsIfSelected && c.invisible
                    } }, c.label, " ", c.labelInfo && h("span", null, c.labelInfo)));
            })))));
    };
    Object.defineProperty(CcSingleSelectInput, "watchers", {
        get: function () {
            return {
                "choices": ["setChoices"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CcSingleSelectInput;
}());
CcSingleSelectInput.style = ccSingleSelectInputCss;
export { CcSingleSelectInput as cc_single_select_input };
