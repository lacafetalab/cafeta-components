import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-badge",
  styleUrl: "cc-badge.scss",
  shadow: true
})
export class CcBadge {
  @Prop() color:
    | "interactive-01"
    | "interactive-02"
    | "support-success"
    | "support-error"
    | "support-alert" = "interactive-01";

  render() {
    return (
      <Host class={`badge--${this.color}`}>
        <div class="badge">
          <slot />
        </div>
      </Host>
    );
  }
}
