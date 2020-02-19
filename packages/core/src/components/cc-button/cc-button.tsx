import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-button",
  styleUrl: "cc-button.scss",
  shadow: true
})
export class CcButton {
  @Prop() iconName: string = "";
  @Prop() iconReverse: boolean = false;
  @Prop() iconOnly: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() fill: "outline" | "clear" | "solid" = "solid";
  @Prop() expand: boolean = false;
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() href?: string;
  @Prop() target?: string;
  @Prop() size?: "lg" | "md" | "sm" = "lg";
  @Prop() glow: boolean = false;

  render() {
    const BtnElem = this.href ? "a" : "button";
    const attrs = {
      disabled: this.href ? false : this.disabled,
      href: this.href,
      target: this.target
    };

    return (
      <Host
        class={{
          "button--block": this.expand,
          "button--secondary": this.color === "secondary"
        }}
        data-testid="CcButton"
      >
        <BtnElem
          class={{
            button: true,
            "button--reverse": this.iconReverse,
            "button--disabled": this.href ? false : this.disabled,
            "button--outline": this.fill === "outline",
            "button--clear": this.fill === "clear",
            "button--md": this.size === "md",
            "button--sm": this.size === "sm",
            "button--iconOnly": this.iconOnly,
            "button--glow": this.glow
          }}
          {...attrs}
        >
          {this.iconName && (
            <cc-icon
              class={{
                button__icon: true
              }}
              name={this.iconName}
              size={this.size === "sm" ? 20 : 24}
            ></cc-icon>
          )}

          {!this.iconOnly && (
            <span class="button__text">
              <slot />
            </span>
          )}
        </BtnElem>
      </Host>
    );
  }
}
