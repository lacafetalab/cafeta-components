import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
  Watch
} from "@stencil/core";
import "choices.js/public/assets/scripts/choices.min.js";
import "choicesjs-stencil";

@Component({
  tag: "cc-dropdown",
  styleUrls: ["cc-dropdown.scss"],
  shadow: false
})
export class CcDropdown {
  @State() _choices: Array<any> = [];

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
  @Prop() type?: "single" | "multiple" | "text" = "single";
  @Prop() noResultsText?: string = "No se encontraron resultados";
  @Prop() noChoicesText?: string = "No se encontraron opciones";
  @Prop() helperText?: string;

  @State() openDropdown: boolean = false;

  @Element() el: HTMLElement;

  @Event() changeChoice: EventEmitter;
  @Event() clickDropdown: EventEmitter;

  @Watch("choices")
  setChoices(newValue: any, oldValue: any) {
    const newValueStringify = JSON.stringify(newValue);
    const oldValueStringify = JSON.stringify(oldValue);

    if (newValueStringify !== oldValueStringify) {
      this._choices = newValue;
    }
  }

  private mutationObserver = new MutationObserver(mutations => {
    mutations.forEach((mutation: any) => {
      const classes = mutation.target.getAttribute("class").split(" ");
      if (
        mutation.type === "attributes" &&
        classes.indexOf("choices__list--dropdown") !== -1
      ) {
        this.openDropdown = classes.indexOf("is-active") !== -1;
      }
    });
  });

  changeChoiceHandler(value: any) {
    if (this.type === "single") {
      this.openDropdown = false;
    }
    this.changeChoice.emit(value);
  }

  clickDropdownHandler(event: any) {
    this.clickDropdown.emit(event);
  }

  componentWillLoad() {
    this._choices = this.choices;
  }

  componentDidLoad() {
    /*
    let newChoices = [...this.choices];
    if (this.placeholder !== "") {
      newChoices.push({
        value: "",
        label: this.placeholder,
        placeholder: true
      });
    }
    */
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

  toggleDropdown = e => {
    e.stopPropagation();
    const element = this.el.querySelector("choicesjs-stencil");
    if (this.el.querySelector(".choices__list--dropdown.is-active")) {
      element.hideDropdown(true);
    } else {
      element.showDropdown(true);
    }
  };

  render() {
    return (
      <Host data-testid="cc-dropdown">
        <div
          class={{
            dropdown: true,
            "dropdown--readonly": this.fieldReadonly,
            "dropdown--disabled": this.disabled,
            "dropdown--secondary": this.color === "secondary",
            "dropdown--error": this.error && !this.disabled
          }}
        >
          {this.label && <span class="dropdown__label">{this.label}</span>}

          <div class="dropdown__input">
            <choicesjs-stencil
              searchEnabled={false}
              name={this.name}
              choices={this._choices}
              onClick={(e: any) => this.clickDropdownHandler(e)}
              removeItems={true}
              removeItemButton={this.type === "multiple"}
              noResultsText={this.noResultsText}
              noChoicesText={this.noChoicesText}
              onChange={(e: any) => this.changeChoiceHandler(e.target?.value)}
              type={this.type}
            >
              <cc-icon
                onClick={this.toggleDropdown}
                class={{
                  dropdown__icon: true,
                  "dropdown__icon--inverted": this.openDropdown
                }}
                name={this.iconName}
              ></cc-icon>
            </choicesjs-stencil>
          </div>

          {this.helperText && this.error && !this.disabled && (
            <span class="dropdown__helperText">{this.helperText}</span>
          )}
        </div>
      </Host>
    );
  }
}
