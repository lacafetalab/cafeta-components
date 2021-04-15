import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-tooltip",
  styleUrl: "cc-tooltip.scss",
  shadow: true
})
export class CcTooltip {
  @Prop() message: HTMLElement | string;
  @Prop() visible: boolean = false;
  @Prop() background?: string = "#2a3247";
  @Prop() color?: string = "#ffffff";
  @Prop() width?: string = "220px";
  @Prop() positionElement: HTMLElement;
  @Prop() hideCloseButton?: boolean = true;
  @Prop() imagePath?: string = "";
  @Prop() customWidth?: string = "";

  render() {
    return (
      <Host data-testid="cc-tooltip">
        <div
          class="tooltip"
          style={{
            backgroundColor: this.background,
            color: this.color,
            width: this.width
          }}
        >
          <div class="tooltip__message">
            {this.imagePath.length > 0 && (
              <img
                class="tooltip__message-image"
                src={this.imagePath}
                alt="Tooltip image"
              />
            )}
            <span class="tooltip__message-text">{this.message}</span>
          </div>
          {!this.hideCloseButton && (
            <span class="tooltip__close" style={{color: this.color}}>
              <cc-icon name="x-circle" size={16} />
            </span>
          )}
        </div>
      </Host>
    );
  }
}
