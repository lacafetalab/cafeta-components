import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-button",
  styleUrl: "cc-button.scss",
  scoped: true
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
  @Prop() type: "button" | "submit" = "button";
  @Prop() download?: boolean = false;
  @Prop() loading?: boolean = false;
  

  render() {
    const BtnElem = this.href ? "a" : "button";
    const attrs = {
      disabled: this.href ? false : this.disabled,
      href: this.href,
      download: this.download,
      target: this.target,
      type: this.type
    };

    return (
      <Host
        class={{
          button__host: true,
          "button--block": this.expand,
          "button--secondary": this.color === "secondary"
        }}
        data-testid="cc-button"
      >
        <BtnElem
          data-testid="cc-button__element"
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
          {this.iconName && !this.loading && (
            <cc-icon
              class={{
                button__icon: true
              }}
              name={this.iconName}
              size={this.size === "sm" ? 16 : 24}
            />
          )}

          {this.loading && (
            <cc-loader
              class={{
                button__icon: true
              }}
              size={this.size === "sm" ? 16 : 24}
            />
          )}

          <span
            data-testid="cc-button__text"
            class={{ button__text: !this.iconOnly, hidden: this.iconOnly }}
          >
            <slot />
          </span>
        </BtnElem>
      </Host>
    );
  }
}
