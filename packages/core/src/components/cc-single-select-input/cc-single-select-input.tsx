import {
  h,
  Component,
  Host,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch
} from "@stencil/core";

@Component({
  tag: "cc-single-select-input",
  styleUrl: "cc-single-select-input.scss",
  shadow: false
})
export class CcSingleSelectInput {
  private singleFileInput: HTMLElement;
  private dropdownItems: HTMLElement;
  private inputEl: HTMLElement;
  private observerItems: MutationObserver;

  @State() _choices: Array<any> = [];
  @State() isOpenDropdown: boolean = false;
  @State() thereIsLowerSpace: boolean = false;
  @State() positionOptionstop: boolean = false;
  @State() valueInput: string = "";
  @Prop() hideItemsIfSelected?: boolean = false;
  @Prop() label: string = "";
  @Prop() choices: Array<any>;
  @Prop() error?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() fieldReadonly?: boolean = false;
  @Prop() placeholder?: string = "";
  @Prop() name?: string = "";
  @Prop() currentValue?: string = "";
  @Prop() iconName?: string = "chevron-down";
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() helperText?: string;
  @Prop() border?: boolean = true;
  @Prop() bgField?: string = "";
  @Prop() loader?: boolean = false;
  @Prop() autocomplete?: boolean = false;
  @Prop() IconRotate?: boolean = true;

  @Event() changeChoice: EventEmitter;

  @Watch("choices")
  setChoices(newValue: any, oldValue: any) {
    const newValueStringify = JSON.stringify(newValue);
    const oldValueStringify = JSON.stringify(oldValue);

    if (newValueStringify !== oldValueStringify) {
      this._choices = JSON.parse(newValueStringify);
    }
  }

  focusInput = () => {
    this.inputEl.focus();
  };

  clearChoices() {
    const newChoices = [...this._choices];
    newChoices.map(choice => (choice.selected = false));
    this._choices = newChoices;
  }

  knowIfThereIsAnItemSelected() {
    return this._choices.filter(choice => choice.selected === true).length > 0;
  }

  validateIfTheNewOptionSelectedIsDifferentFromThePrevious(
    value: string | number
  ) {
    if (this.knowIfThereIsAnItemSelected()) {
      const choiceSelected = this._choices.filter(choice => choice.selected)[0]
        .value;
      return choiceSelected === value;
    }
    return false;
  }

  handleOptionClick = (value: string | number) => {
    this.handleHideOptions();

    if (!this.validateIfTheNewOptionSelectedIsDifferentFromThePrevious(value)) {
      this.clearChoices();
      const newChoices = [...this._choices];
      newChoices.filter(choice => choice.value === value)[0].selected = true;
      this._choices = [...newChoices];
      const choiceElementSelected = this._choices.filter(
        choice => choice.value === value
      )[0];
      this.autocomplete ? (this.valueInput = choiceElementSelected.label) : "";
      this.changeChoice.emit(choiceElementSelected.value);
    }
  };

  placeholderSelected = () => {
    this.clearChoices();
    this.handleHideOptions();
    this.changeChoice.emit(null);
  };

  handleToogleOptions() {
    this.isOpenDropdown = !this.isOpenDropdown;
    this.calculatePositionOfOptions();
  }

  setInputValue(value: string) {
    this.valueInput = value;
    if (this.valueInput.length) this.handleShowOptions();
  }

  filteredChoices = () => {
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

  handleShowOptions = () => {
    this.isOpenDropdown = true;
  };

  handleHideOptions = () => {
    this.isOpenDropdown = false;
  };

  closeDroprownIfClickOutDropdown = event => {
    const elementActiveDropdown = this.singleFileInput;
    let targetElement = event.target;

    if (!elementActiveDropdown.contains(targetElement)) {
      return this.handleHideOptions();
    }
  };

  getHeigthWrapperOptions = () => {
    return this.dropdownItems.getBoundingClientRect().height;
  };

  observerListItems = () => {
    const config = { attributes: true, childList: false, characterData: false };

    this.observerItems = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === "attributes") {
          this.calculatePositionOfOptions();
          if (this.autocomplete) this.focusInput();
        }
      });
    });

    this.observerItems.observe(this.dropdownItems, config);
  };

  calculatePositionOfOptions = () => {
    if (this.isOpenDropdown) {
      const dropdown = this.singleFileInput;
      const elementItems = this.dropdownItems;
      const heightBody = document.body.getBoundingClientRect().height;
      const listHeight = elementItems.getBoundingClientRect().height;
      const dropdownField = dropdown.getBoundingClientRect().height;
      const positionDropdown = dropdown.getBoundingClientRect().top;
      const MARGIN_DROPDOWN_TO_ITEMS = 8;
      const elementPos =
        positionDropdown +
        dropdownField +
        MARGIN_DROPDOWN_TO_ITEMS +
        listHeight;
      return (this.positionOptionstop = heightBody < elementPos);
    }
    this.positionOptionstop = false;
  };

  validateDisabled = () => {
    this.disabled ? false : this.handleToogleOptions();
  };

  componentWillLoad() {
    this._choices = JSON.parse(JSON.stringify(this.choices));
    document.addEventListener("click", this.closeDroprownIfClickOutDropdown);
  }

  componentDidLoad() {
    this.observerListItems();
  }

  componentDidUnload() {
    if (this.observerItems) this.observerItems.disconnect();
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
    return (
      <Host data-testid="cc-single-file-input" class="single-file-input">
        {this.label && (
          <span class="single-file-input__label">{this.label}</span>
        )}
        <cc-wrapper-field
          ref={el => (this.singleFileInput = el)}
          class={{
            "single-file-input__wrapper": true,
            "single-file-input--is-collapse": this.isOpenDropdown
          }}
          {...attrs}
        >
          <div class="single-file-input__field" onClick={this.validateDisabled}>
            {!this.autocomplete && (
              <p
                class={{
                  "single-file-input__placeholder": true,
                  "single-file-input__placeholder--is-hidden": this.knowIfThereIsAnItemSelected()
                }}
              >
                {this.placeholder}
              </p>
            )}
            {this.autocomplete && (
              <cc-input
                bgField="bg-transparent"
                value={this.valueInput}
                placeholder={this.placeholder}
                border={false}
                ref={el => (this.inputEl = el)}
                onInput={(e: any) => this.setInputValue(e.target?.value)}
              />
            )}
            {!this.autocomplete &&
              this._choices
                .filter(choice => choice.selected)
                .map(c => {
                  return (
                    <p class="single-file-input__field-option--is-selected">
                      {c.label}
                    </p>
                  );
                })}
          </div>
          <ul
            ref={el => (this.dropdownItems = el)}
            class={{
              "single-file-input__options": true,
              "single-file-input__options--is-active": this.isOpenDropdown,
              "single-file-input__options--top": this.positionOptionstop
            }}
          >
            {!this.autocomplete && this.placeholder && (
              <li
                class={{
                  "single-file-input__placeholder": true,
                  "single-file-input__option": true,
                  "single-file-input__option--is-selected": !this.knowIfThereIsAnItemSelected()
                }}
                onClick={this.placeholderSelected}
              >
                {this.placeholder}
              </li>
            )}
            {this.autocomplete && this.filteredChoices().length > 0
              ? this.filteredChoices().map(c => {
                  return (
                    <li
                      onClick={() =>
                        c.disabled ? false : this.handleOptionClick(c.value)
                      }
                      class={{
                        "single-file-input__option": true,
                        "single-file-input__option--is-selected": c.selected,
                        "single-file-input__option--is-disabled": c.disabled
                      }}
                    >
                      {c.label}
                    </li>
                  );
                })
              : this.autocomplete &&
                this.filteredChoices().length === 0 && (
                  <li class="single-file-input__option">
                    No se encontraron los resultados
                  </li>
                )}
            {!this.autocomplete &&
              this._choices.map(c => {
                return (
                  <li
                    onClick={() =>
                      c.disabled ? false : this.handleOptionClick(c.value)
                    }
                    class={{
                      "single-file-input__option": true,
                      "single-file-input__option--is-selected": c.selected,
                      "single-file-input__option--is-disabled": c.disabled,
                      "single-file-input__option--is-hidden":
                        this.hideItemsIfSelected && c.invisible
                    }}
                  >
                    {c.label} {c.labelInfo && <span>{c.labelInfo}</span>}
                  </li>
                );
              })}
          </ul>
        </cc-wrapper-field>
      </Host>
    );
  }
}
