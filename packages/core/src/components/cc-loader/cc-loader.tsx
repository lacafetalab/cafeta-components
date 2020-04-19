import { h, Component, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-loader",
  styleUrl: "cc-loader.scss",
  shadow: true
})
export class CcLoader {
  @Prop() size?: number = 24;

  render() {
    return (
      <Host data-testid="cc-loader" class="loader">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width={this.size}
          height={this.size}
          class="loader__svg"
        >
          <circle class="loader__circle" cx="50" cy="50" r="45" />
        </svg>
      </Host>
    );
  }
}
