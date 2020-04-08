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
  @Prop() label: string = "";
  @Prop() choices: Array<any> = [];
  @Prop() error?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() placeholder?: string = "";
  @Prop() name?: string = "";
  @Prop() currentValue?: string = "";
  @Prop() iconName?: string = "chevron-down";
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() size?: "lg" | "md" | "sm" = "lg";
  // @Prop() onChangeChoice?: (e: any) => void;
  @Prop() onClick?: (e: any) => void = (e: any) => {
    void e;
  };
  @Prop() onInput?: (e: any) => void = (e: any) => {
    void e;
  };
  @State() openDropdown: boolean = false;

  @Element() el: HTMLElement;

  @Event() changeChoice: EventEmitter;

  changeChoiceHandler(value: any) {
    this.changeChoice.emit(value);
  }

  constructor() {
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  
  componentDidLoad() {
    var mutationObserver = new MutationObserver(mutations => {
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

    let newChoices = [...this.choices];
    if (this.placeholder !== "") {
      newChoices.push({
        value: "",
        label: this.placeholder,
        placeholder: true
      });
    }
    this.choices = newChoices.map((choice: any) => ({
      ...choice,
      selected: this.currentValue === choice.value
    }));
    const element = this.el.querySelector("choicesjs-stencil");
    if (this.disabled) {
      element.disable();
    }

    mutationObserver.observe(element, {
      attributes: true,
      characterData: false,
      childList: false,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }

  @Watch('currentValue')
  componentWillUpdate(currentValue: string) {
    this.choices = this.choices.map((choice: any) => ({
      ...choice,
      selected: currentValue === choice.value
    }));
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
            "dropdown--disabled": this.disabled,
            "dropdown--secondary": this.color === "secondary",
            "dropdown--error": this.error
          }}
        >
          {this.label && <span>{this.label}</span>}
          <div class="dropdown--input">
            <choicesjs-stencil
              searchEnabled={false}
              placeholder={this.placeholder}
              name={this.name}
              choices={this.choices}
              onInput={this.onInput}
              onClick={this.onClick}
              editItems={true}
              onChange={(e: any) => this.changeChoiceHandler(e.target?.value)}
              type={"single"}
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
