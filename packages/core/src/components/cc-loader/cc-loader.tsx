import { h, Component, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-loader",
  styleUrl: "cc-loader.scss",
  shadow: true
})
export class CcLoader {
  @Prop() size: number = 50;

  render() {
    return (
      <Host data-testid="cc-loader">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width={this.size}
          height={this.size}
        >
          <circle cx="50" cy="50" r="45" />
        </svg>
      </Host>
    );
  }
}
