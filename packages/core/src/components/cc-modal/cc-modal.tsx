import { Host, h, Component, Prop, Element } from "@stencil/core";

@Component({
  tag: "cc-modal",
  styleUrl: "cc-modal.scss",
  scoped: true
})
export class CcModal {
  @Element() el: HTMLElement;

  @Prop() size: "sm" | "md" = "md";
  @Prop() visible: boolean = false;

  componentDidLoad() {
    const body = document.querySelector("body");

    body.appendChild(this.el);
  }

  render() {
    return (
      <Host class={{ modal: true, hidden: !this.visible }}>
        <div class="modal__overlay" />

        <div class="modal__wrap">
          <div
            class={{
              modal__content: true,
              "modal__content--sm": this.size === "sm",
              "modal__content--md": this.size === "md"
            }}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
