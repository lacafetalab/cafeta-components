'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-87a60bbb.js');
require('./choices.min-4507dd7c.js');

const ccDropdownCss = ".choices{position:relative;margin-bottom:24px;font-size:16px}.choices:focus{outline:0}.choices:last-child{margin-bottom:0}.choices.is-disabled .choices__inner,.choices.is-disabled .choices__input{background-color:#eaeaea;cursor:not-allowed;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none}.choices.is-disabled .choices__item{cursor:not-allowed}.choices [hidden]{display:none!important}.choices[data-type*=select-one]{cursor:pointer}.choices[data-type*=select-one] .choices__inner{padding-bottom:7.5px}.choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:10px;border-bottom:1px solid #ddd;background-color:#fff;margin:0}.choices[data-type*=select-one] .choices__button{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:.5}.choices[data-type*=select-one] .choices__button:focus,.choices[data-type*=select-one] .choices__button:hover{opacity:1}.choices[data-type*=select-one] .choices__button:focus{-webkit-box-shadow:0 0 0 2px #00bcd4;box-shadow:0 0 0 2px #00bcd4}.choices[data-type*=select-one] .choices__item[data-value=''] .choices__button{display:none}.choices[data-type*=select-one]:after{content:'';height:0;width:0;border-style:solid;border-color:#333 transparent transparent;border-width:5px;position:absolute;right:11.5px;top:50%;margin-top:-2.5px;pointer-events:none}.choices[data-type*=select-one].is-open:after{border-color:transparent transparent #333;margin-top:-7.5px}.choices[data-type*=select-one][dir=rtl]:after{left:11.5px;right:auto}.choices[data-type*=select-one][dir=rtl] .choices__button{right:auto;left:0;margin-left:25px;margin-right:0}.choices[data-type*=select-multiple] .choices__inner,.choices[data-type*=text] .choices__inner{cursor:text}.choices[data-type*=select-multiple] .choices__button,.choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin:0 -4px 0 8px;padding-left:16px;border-left:1px solid #008fa1;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);background-size:8px;width:8px;line-height:1;opacity:.75;border-radius:0}.choices[data-type*=select-multiple] .choices__button:focus,.choices[data-type*=select-multiple] .choices__button:hover,.choices[data-type*=text] .choices__button:focus,.choices[data-type*=text] .choices__button:hover{opacity:1}.choices__inner{display:inline-block;vertical-align:top;width:100%;background-color:#f9f9f9;padding:7.5px 7.5px 3.75px;border:1px solid #ddd;border-radius:2.5px;font-size:14px;min-height:44px;overflow:hidden}.is-focused .choices__inner,.is-open .choices__inner{border-color:#b7b7b7}.is-open .choices__inner{border-radius:2.5px 2.5px 0 0}.is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px}.choices__list{margin:0;padding-left:0;list-style:none}.choices__list--single{display:inline-block;padding:4px 16px 4px 4px;width:100%}[dir=rtl] .choices__list--single{padding-right:4px;padding-left:16px}.choices__list--single .choices__item{width:100%}.choices__list--multiple{display:inline}.choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#00bcd4;border:1px solid #00a5bb;color:#fff;word-break:break-all;-webkit-box-sizing:border-box;box-sizing:border-box}.choices__list--multiple .choices__item[data-deletable]{padding-right:5px}[dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px}.choices__list--multiple .choices__item.is-highlighted{background-color:#00a5bb;border:1px solid #008fa1}.is-disabled .choices__list--multiple .choices__item{background-color:#aaa;border:1px solid #919191}.choices__list--dropdown{visibility:hidden;z-index:1;position:absolute;width:100%;background-color:#fff;border:1px solid #ddd;top:100%;margin-top:-1px;border-bottom-left-radius:2.5px;border-bottom-right-radius:2.5px;overflow:hidden;word-break:break-all;will-change:visibility}.choices__list--dropdown.is-active{visibility:visible}.is-open .choices__list--dropdown{border-color:#b7b7b7}.is-flipped .choices__list--dropdown{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:.25rem .25rem 0 0}.choices__list--dropdown .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position}.choices__list--dropdown .choices__item{position:relative;padding:10px;font-size:14px}[dir=rtl] .choices__list--dropdown .choices__item{text-align:right}@media (min-width:640px){.choices__list--dropdown .choices__item--selectable{padding-right:100px}.choices__list--dropdown .choices__item--selectable:after{content:attr(data-select-text);font-size:12px;opacity:0;position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}[dir=rtl] .choices__list--dropdown .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px}[dir=rtl] .choices__list--dropdown .choices__item--selectable:after{right:auto;left:10px}}.choices__list--dropdown .choices__item--selectable.is-highlighted{background-color:#f2f2f2}.choices__list--dropdown .choices__item--selectable.is-highlighted:after{opacity:.5}.choices__item{cursor:default}.choices__item--selectable{cursor:pointer}.choices__item--disabled{cursor:not-allowed;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;opacity:.5}.choices__heading{font-weight:600;font-size:12px;padding:10px;border-bottom:1px solid #f7f7f7;color:gray}.choices__button{text-indent:-9999px;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer}.choices__button:focus,.choices__input:focus{outline:0}.choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:14px;margin-bottom:5px;border:0;border-radius:0;max-width:100%;padding:4px 0 4px 2px}[dir=rtl] .choices__input{padding-right:2px;padding-left:0}.choices__placeholder{opacity:.5}.dropdown{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;min-width:150px;-webkit-transition:all 0.4s ease-in-out;transition:all 0.4s ease-in-out;position:relative}.dropdown choicesjs-stencil{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:end;align-items:flex-end}.dropdown__helperText{display:block;font-size:1.1rem;margin-top:0.4rem;color:var(--error)}.dropdown .choices{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:initial;width:100%}.dropdown .choices__item.choices__placeholder{padding-left:0.8rem;padding-right:0.8rem;font-size:1.4rem;font-weight:300;margin:0;color:var(--neutral-03)}.dropdown .choices__item--selectable.choices__item{padding-left:0.8rem;padding-right:0.8rem;font-size:1.4rem;font-weight:300;margin:0;color:var(--neutral-03)}.dropdown .choices__item--disabled.choices__item{color:var(--disabled-text)}.dropdown .choices__inner{margin:0;padding:0;min-height:auto}.dropdown .choices__inner .choices__item.choices__item--selectable{margin:0;padding:0}.dropdown .choices__inner .choices__list--multiple .choices__item.choices__placeholder,.dropdown .choices__inner .choices__list--multiple .choices__item.choices__item--selectable,.dropdown .choices__inner .choices__list--multiple .choices__item.is-highlighted{font-size:1.2rem;border-width:0;color:var(--neutral-03);background:var(--background-01);padding:0.2rem 0.8rem 0.2rem 1.2rem;margin:0 0.4rem 0 0;border-radius:10px}.dropdown .choices__inner .choices__list--multiple .choices__item.choices__placeholder .choices__button,.dropdown .choices__inner .choices__list--multiple .choices__item.choices__item--selectable .choices__button,.dropdown .choices__inner .choices__list--multiple .choices__item.is-highlighted .choices__button{border-width:0;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9Im5vbmUiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSIxMiIgd2lkdGg9IjEyIiB5PSItMSIgeD0iLTEiLz4KIDwvZz4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8cGF0aCBzdHJva2U9Im51bGwiIGlkPSJDbG9zZSIgZmlsbD0iIzRhNGE0YSIgZD0ibTUuNzA4MTYsNS4wMDcyNjlsMy45OTMwNTcsLTMuOTcxMjQ4YzAuMTkxNDM4LC0wLjE4OTQ5OSAwLjE5MTQzOCwtMC40OTYyODUgMCwtMC42ODUzYy0wLjE5MDk1MywtMC4xODk0OTkgLTAuNTAxMTMxLC0wLjE4OTQ5OSAtMC42OTIwODUsMGwtMy45ODk2NjUsMy45Njc4NTVsLTQuMDI2NDk4LC00LjAyNjk4M2MtMC4xOTA5NTMsLTAuMTkxNDM4IC0wLjUwMTEzMSwtMC4xOTE0MzggLTAuNjkyMDg1LDBjLTAuMTkwOTUzLDAuMTkxOTIzIC0wLjE5MDk1MywwLjUwMjU4NSAwLDAuNjk0MDIzbDQuMDIzNTkxLDQuMDI0MDc1bC00LjAzODEzLDQuMDE1ODM2Yy0wLjE5MDk1MywwLjE4OTQ5OSAtMC4xOTA5NTMsMC40OTYyODUgMCwwLjY4NTNjMC4xOTA5NTMsMC4xODk0OTkgMC41MDExMzEsMC4xODk0OTkgMC42OTIwODUsMGw0LjAzNDczOCwtNC4wMTI0NDRsNC4wMTA1MDUsNC4wMTA5OWMwLjE5MDk1MywwLjE5MTQzOCAwLjUwMTEzMSwwLjE5MTQzOCAwLjY5MjA4NSwwYzAuMTkwOTUzLC0wLjE5MTkyMyAwLjE5MDk1MywtMC41MDI1ODUgMCwtMC42OTQwMjNsLTQuMDA3NTk3LC00LjAwODA4MnoiLz4KIDwvZz4KPC9zdmc+\")}.dropdown .choices.is-flipped .choices__list.choices__list--dropdown{-webkit-transform:translateY(-0.8rem);transform:translateY(-0.8rem)}.dropdown .choices__input{margin:0;padding:0;min-height:auto}.dropdown .choices__list{margin-top:0.8rem;border-radius:0.4rem;border-width:0;-webkit-box-shadow:0 4px 16px -8px #b0c0ca;box-shadow:0 4px 16px -8px #b0c0ca}.dropdown .choices__list--single{margin:0;padding:0}.dropdown .choices__list--dropdown{left:0}.dropdown .choices__list--dropdown .choices__item.choices__placeholder,.dropdown .choices__list--dropdown .choices__item.is-selected{opacity:1;color:var(--neutral-03)}.dropdown .choices__list--dropdown .choices__item--selectable{color:var(--neutral-03);opacity:1}.dropdown .choices__list--dropdown .choices__item--selectable:focus,.dropdown .choices__list--dropdown .choices__item--selectable.is-selected{font-weight:700;color:var(--neutral-02);background:var(--background-01)}.dropdown .choices__list--dropdown .choices__item--selectable:hover,.dropdown .choices__list--dropdown .choices__item--selectable.is-selected:hover{font-weight:700;color:var(--neutral-03);background:var(--background-02)}.dropdown .choices__list--dropdown .choices__item--selectable::after{display:none}.dropdown .choices[data-type*=select-one] .choices__inner{padding:0}.dropdown .choices[data-type*=select-one]::after{display:none}.dropdown__input{padding-left:1.6rem;padding-right:1.6rem;padding-top:0.8rem;padding-bottom:0.8rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-radius:0.4rem;border:1px solid var(--neutral-02)}.dropdown__input:focus-within,.dropdown__input:hover{border:1px solid var(--primary)}.dropdown__input .choices__inner{background:transparent;border:0}.dropdown__input .choices__input{background:transparent;border:0}.dropdown__text{border-width:0;outline:2px solid transparent;outline-offset:2px;background:transparent}.dropdown__text:hover{outline:none}.dropdown__icon,.dropdown__loader{border-width:0;-ms-flex-order:1;order:1;color:var(--primary)}.dropdown__icon--inverted,.dropdown__loader--inverted{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.dropdown__label{padding-top:0.4rem;padding-bottom:0.4rem;font-size:1.1rem;font-weight:900;color:var(--neutral-03)}.dropdown.dropdown--icon-only{min-width:42px;width:42px}.dropdown.dropdown--icon-only .choices{display:none}.dropdown.dropdown--icon-only .dropdown__input{padding:0.8rem}.dropdown.dropdown--secondary .dropdown__input:focus-within,.dropdown.dropdown--secondary .dropdown__input:hover{border:1px solid var(--secondary)}.dropdown.dropdown--secondary .dropdown__icon,.dropdown.dropdown--secondary .dropdown__loader{color:var(--secondary)}.dropdown.dropdown--readonly:after{position:absolute;width:100%;height:100%;top:0;left:0;content:\"\";background:transparent}.dropdown.dropdown--error .dropdown__input{border-color:var(--error)}.dropdown.dropdown--error .dropdown__input:focus-within,.dropdown.dropdown--error .dropdown__input:hover{border-color:var(--error)}.dropdown.dropdown--error .dropdown__icon{color:var(--error)}.dropdown.dropdown--no-background{background:transparent}.dropdown.dropdown--no-border .dropdown__input{border-width:0}.dropdown.dropdown--no-border .dropdown__input:focus-within,.dropdown.dropdown--no-border .dropdown__input:hover{border-width:0}.dropdown.dropdown--disabled .dropdown__input{border-color:var(--disabled-background)}.dropdown.dropdown--disabled .dropdown__input:focus-within,.dropdown.dropdown--disabled .dropdown__input:hover{border-color:var(--disabled-background)}.dropdown.dropdown--disabled .dropdown__icon{color:var(--disabled-text)}.dropdown.dropdown--disabled .choices.is-disabled{background:transparent}.dropdown.dropdown--disabled .choices.is-disabled .choices__inner{background-color:transparent}.dropdown.dropdown--disabled .choices.is-disabled .choices__input{background-color:transparent}.dropdown.dropdown--disabled .choices.is-disabled .choices__item--selectable{color:var(--disabled-text)}@media (min-width: 640px){.dropdown .choices__list--dropdown .choices__item--selectable{padding-left:0.8rem;padding-right:0.8rem}}";

const CcDropdown = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.changeChoice = index.createEvent(this, "changeChoice", 7);
        this.clickDropdown = index.createEvent(this, "clickDropdown", 7);
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
        return (index.h(index.Host, { "data-testid": "cc-dropdown" }, index.h("div", { class: {
                dropdown: true,
                "dropdown--readonly": this.fieldReadonly || this.loader || this.iconOnly,
                "dropdown--disabled": this.disabled,
                "dropdown--secondary": this.color === "secondary",
                "dropdown--error": this.error && !this.disabled,
                "dropdown--no-border": !this.border,
                "dropdown--no-background": !this.bgField,
                "dropdown--icon-only": this.iconOnly
            } }, this.label && index.h("span", { class: "dropdown__label" }, this.label), index.h("div", { class: {
                dropdown__input: true,
                [`${this.bgField}`]: !!this.bgField
            } }, index.h("choicesjs-stencil", { searchEnabled: false, name: this.name, choices: this._choices, onClick: (e) => this.clickDropdownHandler(e), removeItems: true, removeItemButton: this.type === "multiple", noResultsText: this.noResultsText, noChoicesText: this.noChoicesText, onChange: (e) => { var _a; return this.changeChoiceHandler((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); }, type: this.type }, this.loader ? (index.h("div", { class: "dropdown__loader" }, index.h("cc-loader", null))) : (index.h("cc-icon", { onClick: this.toggleDropdown, class: {
                dropdown__icon: true,
                "dropdown__icon--inverted": this.openDropdown
            }, name: this.error ? "x" : this.iconName })))), this.helperText && this.error && !this.disabled && (index.h("span", { class: "dropdown__helperText" }, this.helperText)))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "choices": ["setChoices"],
        "disabled": ["setDisabled"]
    }; }
};
CcDropdown.style = ccDropdownCss;

exports.cc_dropdown = CcDropdown;
