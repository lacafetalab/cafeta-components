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
  @Prop() color: "color-text-01" | "color-text-02" | "color-text-03" =
    "color-text-01";

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
      <Host
        class={{
          "cc-icon--color-text-02": this.color === "color-text-02",
          "cc-icon--color-text-03": this.color === "color-text-03"
        }}
        data-testid="CcIcon"
      >
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
