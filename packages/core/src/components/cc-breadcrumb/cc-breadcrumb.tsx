import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "cc-breadcrumb",
  styleUrl: "cc-breadcrumb.scss",
  scoped: true
})

export class Ccbreadcrumb {
  render() {
    return (
      <Host
        data-testid="cc-breadcrumb"
        class="testing"
      >
        <h1>hola</h1>
      </Host>
    )
  }
}
