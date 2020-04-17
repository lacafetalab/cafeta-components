import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Event,
  EventEmitter
} from "@stencil/core";
import "choices.js/public/assets/scripts/choices.min.js";
import "choicesjs-stencil";

@Component({
  tag: "cc-dropdown",
  styleUrls: ["cc-dropdown.scss"],
  shadow: false
})
export class CcDropdown {
  @Prop() label: string = "";
  @Prop() choices: Array<any> = [];
  @Prop() error?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() fieldReadonly?: boolean = false;
  @Prop() placeholder?: string = "";
  @Prop() name?: string = "";
  @Prop() currentValue?: string = "";
  @Prop() iconName?: string = "chevron-down";
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() type?: "single" | "multiple" | "text" = "single";
  @Prop() noResultsText?: string = 'No se encontraron resultados';
  @Prop() noChoicesText?: string = 'No se encontraron opciones';

  @State() openDropdown: boolean = false;

  @Element() el: HTMLElement;

  @Event() changeChoice: EventEmitter;
  @Event() clickDropdown: EventEmitter;

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
    if (this.type === 'single') {
      this.choices = this.choices.map((c) => ({...c, selected: value ===c.value}));
      this.openDropdown = false;
    }
    this.changeChoice.emit(value);
  }

  clickDropdownHandler(event: any) {
    this.clickDropdown.emit(event);
  }

  constructor() {
    this.toggleDropdown = this.toggleDropdown.bind(this);
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

  toggleDropdown(e) {
    e.stopPropagation();
    const element = this.el.querySelector("choicesjs-stencil");
    if (this.el.querySelector(".choices__list--dropdown.is-active")) {
      element.hideDropdown(true);
    } else {
      element.showDropdown(true);
    }
  }

  render() {
    return (
      <Host data-testid="cc-dropdown">
        <div
          class={{
            dropdown: true,
            "dropdown--readonly": this.fieldReadonly,
            "dropdown--disabled": this.disabled,
            "dropdown--secondary": this.color === "secondary",
            "dropdown--error": this.error
          }}
        >
          {this.label && <span class="dropdown__label">{this.label}</span>}
          <div class="dropdown__input">
            <choicesjs-stencil
              searchEnabled={false}
              name={this.name}
              choices={this.choices}
              onClick={(e: any) => this.clickDropdownHandler(e)}
              removeItems={true}
              removeItemButton={this.type === 'multiple'}
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
        </div>
      </Host>
    );
  }
}
