import { Host, h, Component, Prop, Element } from "@stencil/core";

@Component({
  tag: "cc-modal-controller",
  shadow: true
})
export class CcModalController {
  @Element() el: HTMLElement;
  @Prop() modalRef: HTMLElement;

  componentDidLoad() {
    const modalParent = this.modalRef.parentElement;
    const body = document.querySelector("body > div");

    modalParent.appendChild(this.el);
    body.appendChild(this.modalRef);
  }

  componentDidUnload() {
    this.modalRef.remove();
  }

  render() {
    return <Host style={{ display: "none" }} />;
  }
}
