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
  tag: "cc-modal",
  styleUrl: "cc-modal.scss",
  scoped: true
})
export class CcModal {
  private overlayEl: HTMLElement;
  private wrapEl: HTMLElement;
  private contentEl: HTMLElement;

  @Prop() size: "sm" | "md" = "md";
  @Prop() visible: boolean = false;
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() hideCloseButton: boolean = false;
  @Prop() disableESC: boolean = false;

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
    if (ev.key === "Escape" && this.visible && !this.disableESC) {
      this.cancelHandler();
    }
  }

  cancelHandler = () => {
    this.cancel.emit();
  };

  closeHandler() {
    this.enableBodyScroll();
    this.close.emit();
  }

  handleWrapClick = (e: Event) => {
    if (e.target === this.wrapEl) this.cancelHandler();
  };

  animatedShow() {
    this.disableBodyScroll();
    this.overlayEl.classList.remove("modal__overlay--hidden");
    this.overlayEl.classList.add("modal__overlay--fadeIn");

    this.wrapEl.classList.remove("hidden");
    this.contentEl.classList.add("modal__content--zoomIn");
  }

  animatedHide() {
    this.overlayEl.classList.remove("modal__overlay--visible");
    this.overlayEl.classList.add("modal__overlay--fadeOut");

    this.contentEl.classList.add("modal__content--zoomOut");
  }

  enableBodyScroll() {
    document.body.style.overflow = "";
  }

  disableBodyScroll() {
    if (!this.otherModalIsVisible()) document.body.style.overflow = "hidden";
  }

  otherModalIsVisible() {
    return !![...(document.querySelectorAll("cc-modal") as any)].find(
      e => e.visible
    ).length;
  }

  overlayAnimationEnd = (e: AnimationEvent) => {
    if (e.animationName === "fadeInModal") {
      this.overlayEl.classList.remove("modal__overlay--fadeIn");
      this.overlayEl.classList.add("modal__overlay--visible");
    }

    if (e.animationName === "fadeOutModal") {
      this.overlayEl.classList.add("modal__overlay--hidden");
      this.overlayEl.classList.remove("modal__overlay--fadeOut");
      this.closeHandler();
    }
  };

  contentAnimationEnd = (e: AnimationEvent) => {
    if (e.animationName === "zoomInModal") {
      this.contentEl.classList.remove("modal__content--zoomIn");
    }

    if (e.animationName === "zoomOutModal") {
      this.contentEl.classList.remove("modal__content--zoomOut");
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
      <Host class="modal">
        <cc-modal-controller modalRef={this.el}></cc-modal-controller>

        <div
          ref={el => (this.overlayEl = el)}
          class="modal__overlay modal__overlay--hidden"
          onAnimationEnd={this.overlayAnimationEnd}
        />

        <div
          ref={el => (this.wrapEl = el)}
          class="modal__wrap hidden"
          onClick={this.handleWrapClick}
        >
          <div
            ref={el => (this.contentEl = el)}
            onAnimationEnd={this.contentAnimationEnd}
            class={{
              modal__content: true,
              "modal__content--sm": this.size === "sm",
              "modal__content--md": this.size === "md"
            }}
          >
            <slot />

            {!this.hideCloseButton && (
              <button
                class={{
                  modal__close: true,
                  "modal__close--primary": this.color === "primary",
                  "modal__close--secondary": this.color === "secondary"
                }}
                onClick={this.cancelHandler}
              >
                <cc-icon size={16} name="x" />
              </button>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
