import { Component, Prop, h, Host } from "@stencil/core";
import iconPaths from "./selection";

@Component({
  tag: "cc-icon",
  styleUrl: "cc-icon.scss",
  shadow: true
})
export class CcIcon {
  @Prop() name: string;
  @Prop() size: number = 24;

  private getPath = (iconName: string) => {
    const icon = iconPaths.icons.find(
      icon => icon.properties.name === iconName
    );

    if (icon) {
      return icon.icon.paths.join(" ");
    } else {
      return "";
    }
  };

  render() {
    if (this.name === "") {
      return null;
    }

    return (
      <Host data-testid="CcIcon">
        <svg
          class="cc-icon"
          width={this.size}
          height={this.size}
          viewBox={"0 0 1024 1024"}
        >
          <path d={this.getPath(this.name)} />
        </svg>
      </Host>
    );
  }
}
