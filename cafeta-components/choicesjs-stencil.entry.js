import { r as registerInstance, h, d as getElement } from './core-2b8afa15.js';

/**
 * Filter out entries from an object.
 *
 * @param obj - object to filter.
 * @param fn - filter function.
 * @returns a new object without the entries satisfying the filter function.
 */
function filterObject(obj, fn) {
    return Object.keys(obj).reduce((accum, property) => {
        const value = obj[property];
        if (fn(value, property, obj)) {
            accum[property] = value;
        }
        return accum;
    }, {});
}
/**
 * Check if given parameter is not undefined.
 *
 * @param value - value to check.
 * @returns whether the value is defined.
 */
function isDefined(value) {
    return typeof value !== 'undefined';
}
/**
 * Returns the list of values.
 *
 * @param value - Value or list of values.
 * @returns List of values.
 */
function getValues(value) {
    return typeof value !== 'undefined'
        ? [].concat(typeof value === 'string' ? value.split(',') : value)
        : [];
}

const ChoicesJSStencil = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    async highlightItem(item, runEvent) {
        this.choice.highlightItem(item, runEvent);
        return this;
    }
    async unhighlightItem(item) {
        this.choice.unhighlightItem(item);
        return this;
    }
    async highlightAll() {
        this.choice.highlightAll();
        return this;
    }
    async unhighlightAll() {
        this.choice.unhighlightAll();
        return this;
    }
    async removeActiveItemsByValue(value) {
        this.choice.removeActiveItemsByValue(value);
        return this;
    }
    async removeActiveItems(excludedId) {
        this.choice.removeActiveItems(excludedId);
        return this;
    }
    async removeHighlightedItems(runEvent) {
        this.choice.removeHighlightedItems(runEvent);
        return this;
    }
    async showDropdown(focusInput) {
        this.choice.showDropdown(focusInput);
        return this;
    }
    async hideDropdown(blurInput) {
        this.choice.hideDropdown(blurInput);
        return this;
    }
    async getValue(valueOnly) {
        return this.choice.getValue(valueOnly);
    }
    async setValue(args) {
        this.choice.setValue(args);
        return this;
    }
    async setChoiceByValue(value) {
        this.choice.setChoiceByValue(value);
        return this;
    }
    async setChoices(choices, value, label, replaceChoices) {
        this.choice.setChoices(choices, value, label, replaceChoices);
        return this;
    }
    async clearChoices() {
        this.choice.clearChoices();
        return this;
    }
    async clearStore() {
        this.choice.clearStore();
        return this;
    }
    async clearInput() {
        this.choice.clearInput();
        return this;
    }
    async enable() {
        this.choice.enable();
        return this;
    }
    async disable() {
        this.choice.disable();
        return this;
    }
    async ajax(fn) {
        this.choice.ajax(fn);
        return this;
    }
    componentDidLoad() {
        this.init();
    }
    componentDidUpdate() {
        this.init();
    }
    componentDidUnload() {
        this.destroy();
    }
    render() {
        const attributes = {
            'data-selector': 'root',
            'name': this.name || null
        };
        // destroy choices element to restore previous dom structure
        // so vdom can replace the element correctly
        this.destroy();
        switch (this.type) {
            case 'single':
                this.element =
                    h("select", Object.assign({}, attributes), this.value ? this.createSelectOptions(this.value) : null);
                break;
            case 'multiple':
                this.element =
                    h("select", Object.assign({ multiple: true }, attributes), this.value ? this.createSelectOptions(this.value) : null);
                break;
            case 'text':
            default:
                this.element =
                    h("input", Object.assign({ type: "text", value: this.value }, attributes));
                break;
        }
        return this.element;
    }
    init() {
        const props = {
            silent: this.silent,
            items: this.items,
            choices: this.choices,
            renderChoiceLimit: this.renderChoiceLimit,
            maxItemCount: this.maxItemCount,
            addItems: this.addItems,
            removeItems: this.removeItems,
            removeItemButton: this.removeItemButton,
            editItems: this.editItems,
            duplicateItemsAllowed: this.duplicateItemsAllowed,
            delimiter: this.delimiter,
            paste: this.paste,
            searchEnabled: this.searchEnabled,
            searchChoices: this.searchChoices,
            searchFields: this.searchFields,
            searchFloor: this.searchFloor,
            searchResultLimit: this.searchResultLimit,
            position: this.position,
            resetScrollPosition: this.resetScrollPosition,
            addItemFilterFn: this.addItemFilterFn,
            shouldSort: this.shouldSort,
            shouldSortItems: this.shouldSortItems,
            sortFn: this.sortFn,
            placeholder: true,
            placeholderValue: this.placeholderValue || (typeof this.placeholder === 'string' && this.placeholder) || ' ',
            searchPlaceholderValue: this.searchPlaceholderValue,
            prependValue: this.prependValue,
            appendValue: this.appendValue,
            renderSelectedChoices: this.renderSelectedChoices,
            loadingText: this.loadingText,
            noResultsText: this.noResultsText,
            noChoicesText: this.noChoicesText,
            itemSelectText: this.itemSelectText,
            addItemText: this.addItemText,
            maxItemText: this.maxItemText,
            uniqueItemText: this.uniqueItemText,
            classNames: this.classNames,
            fuseOptions: this.fuseOptions,
            callbackOnInit: this.callbackOnInit,
            callbackOnCreateTemplates: this.callbackOnCreateTemplates
        };
        const settings = filterObject(props, isDefined);
        this.choice = new Choices(this.root.querySelector('[data-selector="root"]'), settings);
    }
    destroy() {
        if (this.element) {
            this.element = null;
        }
        if (this.choice) {
            this.choice.destroy();
            this.choice = null;
        }
    }
    createSelectOptions(values) {
        return getValues(values).map((value) => h("option", { value: value }, value));
    }
    get root() { return getElement(this); }
    static get style() { return "/*===============================\n=            Choices            =\n===============================*/\n\n.choices {\n  position: relative;\n  margin-bottom: 24px;\n  font-size: 16px;\n}\n\n.choices:focus {\n  outline: none;\n}\n\n.choices:last-child {\n  margin-bottom: 0;\n}\n\n.choices.is-disabled .choices__inner,\n.choices.is-disabled .choices__input {\n  background-color: #EAEAEA;\n  cursor: not-allowed;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.choices.is-disabled .choices__item {\n  cursor: not-allowed;\n}\n\n.choices[data-type*=\"select-one\"] {\n  cursor: pointer;\n}\n\n.choices[data-type*=\"select-one\"] .choices__inner {\n  padding-bottom: 7.5px;\n}\n\n.choices[data-type*=\"select-one\"] .choices__input {\n  display: block;\n  width: 100%;\n  padding: 10px;\n  border-bottom: 1px solid #DDDDDD;\n  background-color: #FFFFFF;\n  margin: 0;\n}\n\n.choices[data-type*=\"select-one\"] .choices__button {\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);\n  padding: 0;\n  background-size: 8px;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  margin-top: -10px;\n  margin-right: 25px;\n  height: 20px;\n  width: 20px;\n  border-radius: 10em;\n  opacity: .5;\n}\n\n.choices[data-type*=\"select-one\"] .choices__button:hover, .choices[data-type*=\"select-one\"] .choices__button:focus {\n  opacity: 1;\n}\n\n.choices[data-type*=\"select-one\"] .choices__button:focus {\n  -webkit-box-shadow: 0px 0px 0px 2px #00BCD4;\n  box-shadow: 0px 0px 0px 2px #00BCD4;\n}\n\n.choices[data-type*=\"select-one\"]:after {\n  content: \"\";\n  height: 0;\n  width: 0;\n  border-style: solid;\n  border-color: #333333 transparent transparent transparent;\n  border-width: 5px;\n  position: absolute;\n  right: 11.5px;\n  top: 50%;\n  margin-top: -2.5px;\n  pointer-events: none;\n}\n\n.choices[data-type*=\"select-one\"].is-open:after {\n  border-color: transparent transparent #333333 transparent;\n  margin-top: -7.5px;\n}\n\n.choices[data-type*=\"select-one\"][dir=\"rtl\"]:after {\n  left: 11.5px;\n  right: auto;\n}\n\n.choices[data-type*=\"select-one\"][dir=\"rtl\"] .choices__button {\n  right: auto;\n  left: 0;\n  margin-left: 25px;\n  margin-right: 0;\n}\n\n.choices[data-type*=\"select-multiple\"] .choices__inner,\n.choices[data-type*=\"text\"] .choices__inner {\n  cursor: text;\n}\n\n.choices[data-type*=\"select-multiple\"] .choices__button,\n.choices[data-type*=\"text\"] .choices__button {\n  position: relative;\n  display: inline-block;\n  margin-top: 0;\n  margin-right: -4px;\n  margin-bottom: 0;\n  margin-left: 8px;\n  padding-left: 16px;\n  border-left: 1px solid #008fa1;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);\n  background-size: 8px;\n  width: 8px;\n  line-height: 1;\n  opacity: .75;\n  border-radius: 0;\n}\n\n.choices[data-type*=\"select-multiple\"] .choices__button:hover, .choices[data-type*=\"select-multiple\"] .choices__button:focus,\n.choices[data-type*=\"text\"] .choices__button:hover,\n.choices[data-type*=\"text\"] .choices__button:focus {\n  opacity: 1;\n}\n\n.choices__inner {\n  display: inline-block;\n  vertical-align: top;\n  width: 100%;\n  background-color: #f9f9f9;\n  padding: 7.5px 7.5px 3.75px;\n  border: 1px solid #DDDDDD;\n  border-radius: 2.5px;\n  font-size: 14px;\n  min-height: 44px;\n  overflow: hidden;\n}\n\n.is-focused .choices__inner,\n.is-open .choices__inner {\n  border-color: #b7b7b7;\n}\n\n.is-open .choices__inner {\n  border-radius: 2.5px 2.5px 0 0;\n}\n\n.is-flipped.is-open .choices__inner {\n  border-radius: 0 0 2.5px 2.5px;\n}\n\n.choices__list {\n  margin: 0;\n  padding-left: 0;\n  list-style: none;\n}\n\n.choices__list--single {\n  display: inline-block;\n  padding: 4px 16px 4px 4px;\n  width: 100%;\n}\n\n[dir=\"rtl\"] .choices__list--single {\n  padding-right: 4px;\n  padding-left: 16px;\n}\n\n.choices__list--single .choices__item {\n  width: 100%;\n}\n\n.choices__list--multiple {\n  display: inline;\n}\n\n.choices__list--multiple .choices__item {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 20px;\n  padding: 4px 10px;\n  font-size: 12px;\n  font-weight: 500;\n  margin-right: 3.75px;\n  margin-bottom: 3.75px;\n  background-color: #00BCD4;\n  border: 1px solid #00a5bb;\n  color: #FFFFFF;\n  word-break: break-all;\n}\n\n.choices__list--multiple .choices__item[data-deletable] {\n  padding-right: 5px;\n}\n\n[dir=\"rtl\"] .choices__list--multiple .choices__item {\n  margin-right: 0;\n  margin-left: 3.75px;\n}\n\n.choices__list--multiple .choices__item.is-highlighted {\n  background-color: #00a5bb;\n  border: 1px solid #008fa1;\n}\n\n.is-disabled .choices__list--multiple .choices__item {\n  background-color: #aaaaaa;\n  border: 1px solid #919191;\n}\n\n.choices__list--dropdown {\n  display: none;\n  z-index: 1;\n  position: absolute;\n  width: 100%;\n  background-color: #FFFFFF;\n  border: 1px solid #DDDDDD;\n  top: 100%;\n  margin-top: -1px;\n  border-bottom-left-radius: 2.5px;\n  border-bottom-right-radius: 2.5px;\n  overflow: hidden;\n  word-break: break-all;\n}\n\n.choices__list--dropdown.is-active {\n  display: block;\n}\n\n.is-open .choices__list--dropdown {\n  border-color: #b7b7b7;\n}\n\n.is-flipped .choices__list--dropdown {\n  top: auto;\n  bottom: 100%;\n  margin-top: 0;\n  margin-bottom: -1px;\n  border-radius: .25rem .25rem 0 0;\n}\n\n.choices__list--dropdown .choices__list {\n  position: relative;\n  max-height: 300px;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  will-change: scroll-position;\n}\n\n.choices__list--dropdown .choices__item {\n  position: relative;\n  padding: 10px;\n  font-size: 14px;\n}\n\n[dir=\"rtl\"] .choices__list--dropdown .choices__item {\n  text-align: right;\n}\n\n\@media (min-width: 640px) {\n  .choices__list--dropdown .choices__item--selectable {\n    padding-right: 100px;\n  }\n\n  .choices__list--dropdown .choices__item--selectable:after {\n    content: attr(data-select-text);\n    font-size: 12px;\n    opacity: 0;\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n  }\n\n  [dir=\"rtl\"] .choices__list--dropdown .choices__item--selectable {\n    text-align: right;\n    padding-left: 100px;\n    padding-right: 10px;\n  }\n\n  [dir=\"rtl\"] .choices__list--dropdown .choices__item--selectable:after {\n    right: auto;\n    left: 10px;\n  }\n}\n\n.choices__list--dropdown .choices__item--selectable.is-highlighted {\n  background-color: #f2f2f2;\n}\n\n.choices__list--dropdown .choices__item--selectable.is-highlighted:after {\n  opacity: .5;\n}\n\n.choices__item {\n  cursor: default;\n}\n\n.choices__item--selectable {\n  cursor: pointer;\n}\n\n.choices__item--disabled {\n  cursor: not-allowed;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  opacity: .5;\n}\n\n.choices__heading {\n  font-weight: 600;\n  font-size: 12px;\n  padding: 10px;\n  border-bottom: 1px solid #f7f7f7;\n  color: gray;\n}\n\n.choices__button {\n  text-indent: -9999px;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n       appearance: none;\n  border: 0;\n  background-color: transparent;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n}\n\n.choices__button:focus {\n  outline: none;\n}\n\n.choices__input {\n  display: inline-block;\n  vertical-align: baseline;\n  background-color: #f9f9f9;\n  font-size: 14px;\n  margin-bottom: 5px;\n  border: 0;\n  border-radius: 0;\n  max-width: 100%;\n  padding: 4px 0 4px 2px;\n}\n\n.choices__input:focus {\n  outline: 0;\n}\n\n[dir=\"rtl\"] .choices__input {\n  padding-right: 2px;\n  padding-left: 0;\n}\n\n.choices__placeholder {\n  opacity: .5;\n}\n\n.choices__input.is-hidden,\n.choices[data-type*=\"select-one\"] .choices__input.is-hidden,\n.choices[data-type*=\"select-multiple\"] .choices__input.is-hidden {\n  display: none;\n}\n\n/*=====  End of Choices  ======*/"; }
};

export { ChoicesJSStencil as choicesjs_stencil };
