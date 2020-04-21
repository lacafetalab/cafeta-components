import {
  Host,
  h,
  Component,
  Prop,
  Element,
  Watch,
  Event,
  EventEmitter,
  Listen
} from "@stencil/core";

@Component({
  tag: "cc-modal-base",
  styleUrl: "cc-modal-base.scss",
  scoped: true
})
export class CcModalBase {
  private overlayEl: HTMLElement;
  private wrapEl: HTMLElement;
  private contentEl: HTMLElement;

  @Prop() size: "sm" | "md" = "md";
  @Prop() visible: boolean = false;
  @Element() el: HTMLElement;

  @Event() close: EventEmitter;
  @Event() cancel: EventEmitter;

  @Watch("visible")
  toggleBodyScroll(newVisible: boolean) {
    if (newVisible) {
      this.animatedShow();
    } else {
      this.animatedHide();
    }
  }

  @Listen("keydown", { target: "document" })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Escape") this.cancelHandler();
  }

  cancelHandler() {
    this.cancel.emit();
  }

  closeHandler() {
    this.enableBodyScroll();
    this.close.emit();
  }

  handleWrapClick = (e: Event) => {
    if (e.target === this.wrapEl) this.cancelHandler();
  };

  animatedShow() {
    this.disableBodyScroll();
    this.overlayEl.classList.remove("modalBase__overlay--hidden");
    this.overlayEl.classList.add("modalBase__overlay--fadeIn");

    this.wrapEl.classList.remove("hidden");
    this.contentEl.classList.add("modalBase__content--zoomIn");
  }

  animatedHide() {
    this.overlayEl.classList.remove("modalBase__overlay--visible");
    this.overlayEl.classList.add("modalBase__overlay--fadeOut");

    this.contentEl.classList.add("modalBase__content--zoomOut");
  }

  enableBodyScroll() {
    document.body.style.overflow = "";
  }

  disableBodyScroll() {
    if (!this.otherModalIsVisible()) document.body.style.overflow = "hidden";
  }

  otherModalIsVisible() {
    return !![...(document.querySelectorAll("cc-modal-base") as any)].find(
      e => e.visible
    ).length;
  }

  overlayAnimationEnd = (e: AnimationEvent) => {
    if (e.animationName === "fadeInModal") {
      this.overlayEl.classList.remove("modalBase__overlay--fadeIn");
      this.overlayEl.classList.add("modalBase__overlay--visible");
    }

    if (e.animationName === "fadeOutModal") {
      this.overlayEl.classList.add("modalBase__overlay--hidden");
      this.overlayEl.classList.remove("modalBase__overlay--fadeOut");
      this.closeHandler();
    }
  };

  contentAnimationEnd = (e: AnimationEvent) => {
    if (e.animationName === "zoomInModal") {
      this.contentEl.classList.remove("modalBase__content--zoomIn");
    }

    if (e.animationName === "zoomOutModal") {
      this.contentEl.classList.remove("modalBase__content--zoomOut");
      this.wrapEl.classList.add("hidden");
    }
  };

  componentDidLoad() {
    if (this.visible) {
      this.animatedShow();
    }
  }

  componentDidUnload() {
    this.enableBodyScroll();
  }

  render() {
    return (
      <Host class="modalBase">
        <cc-modal-controller modalRef={this.el}></cc-modal-controller>

        <div
          ref={el => (this.overlayEl = el)}
          class="modalBase__overlay modalBase__overlay--hidden"
          onAnimationEnd={this.overlayAnimationEnd}
        />

        <div
          ref={el => (this.wrapEl = el)}
          class="modalBase__wrap hidden"
          onClick={this.handleWrapClick}
        >
          <div
            ref={el => (this.contentEl = el)}
            onAnimationEnd={this.contentAnimationEnd}
            class={{
              modalBase__content: true,
              "modalBase__content--sm": this.size === "sm",
              "modalBase__content--md": this.size === "md"
            }}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
