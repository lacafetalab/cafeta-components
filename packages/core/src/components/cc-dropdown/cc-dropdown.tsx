import { Component, h, Host, Prop, Element } from "@stencil/core";
import "choices.js/public/assets/scripts/choices.min.js";
import "choicesjs-stencil";

@Component({
  tag: "cc-dropdown",
  styleUrls: ["cc-dropdown.scss"],
  shadow: false,
})
export class CcDropdown {
  @Prop() label: string = "";
  @Prop() choices: Array<any> = [];
  @Prop() error?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() fill?: "outline" | "clear" = "outline";
  @Prop() iconName?: string = "chevron-down";
  @Prop() expand?: boolean = false;
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() size?: "lg" | "md" | "sm" = "lg";

  @Element() el: HTMLElement;

  componentDidLoad() {
    /*
    var element = document.querySelector('choicesjs-stencil');
    element.choices = this.choices;
    console.log(this.choices)
    console.log(this.label)
    */
  }

  render() {
    return (
      <Host
        data-testid="cc-dropdown"
      >
        <div class={{
          "dropdown": true,
          "dropdown--disabled": this.disabled,
          "dropdown--secondary": this.color === "secondary",
          "dropdown--error": this.error,
        }}>
          {this.label && <span>{this.label}</span>}
          <div class="dropdown--input">
            <choicesjs-stencil 
              searchEnabled={false}
              placeholder='Selecciona una opción' 
              choices={this.choices} 
              type={'single'}>
            </choicesjs-stencil>
            <cc-icon
              class={{
                dropdown__icon: true,
              }}
              name={this.iconName}
            ></cc-icon>
          </div>
        </div>
      </Host>
    );
  }
}
