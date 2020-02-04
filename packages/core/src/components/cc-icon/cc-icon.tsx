import { Component, Prop, h, getAssetPath, Host } from "@stencil/core";

@Component({
  tag: "cc-icon",
  styleUrl: "cc-icon.scss",
  assetsDirs: ["assets"],
  shadow: true
})
export class CcIcon {
  @Prop() name: string;
  @Prop() size: number = 24;

  render() {
    return (
      <Host>
        <svg class="cc-icon" width={this.size} height={this.size}>
          <use
            xlinkHref={`${getAssetPath(`./assets/feather-sprite.svg`)}#${
              this.name
            }`}
          />
        </svg>
      </Host>
    );
  }
}
