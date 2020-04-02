import { Component, h, Host, Prop, Element } from "@stencil/core";
import 'choices.js/public/assets/scripts/choices.min.js';
import "choicesjs-stencil";

@Component({
  tag: "cc-dropdown",
  styleUrls: ["cc-dropdown.scss"],
  shadow: false
})
export class CcDropdown {
  @Prop() label: string = "";
  @Prop() fill: "outline" | "clear" = "outline";
  @Prop() iconName: string = "chevron-down";
  @Prop() expand: boolean = false;
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() size?: "lg" | "md" | "sm" = "lg";
  @Prop() error?: string = "";

  @Element() el: HTMLElement;

  componentDidLoad() {
    /*
    const element: HTMLSelectElement = this.el.querySelector('.js-choice') as HTMLSelectElement;
    console.log(element, this.el)
    console.log(typeof element)
    console.log(element instanceof HTMLSelectElement)
    console.log(a)
    */
  }

  render() {
    return (
      <Host
        class={{
          "dropdown--block": this.expand,
          "dropdown--secondary": this.color === "secondary",
          "dropdown--error": this.error !== ""
        }}
        data-testid="cc-dropdown">
        {this.label && (
          <span>
            {this.label}
          </span>
        )} 
        <choicesjs-stencil ></choicesjs-stencil>
        <div class="dropdown">
          <div class="dropdown__field">
            <cc-icon
              class={{
                dropdown__icon: true
              }}
              name={this.iconName}></cc-icon>
          </div>
        </div>
      </Host>
    )
  }
}
