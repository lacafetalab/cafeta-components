import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-switcher",
  styleUrl: "cc-switcher.scss",
  shadow: true
})
export class CcSwitcher {
  private inputEl?: HTMLInputElement;

  @Prop() color?: "primary" | "secondary" = "primary";
  @Prop() error?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() value?: string;
  @Prop() name?: string;
  @Prop() inputRef?: (el: HTMLInputElement) => void;
  @Prop() checked?: boolean = false;
  @Prop() size?: "sm" | "md" = "md";

  setInputRef = (el: HTMLInputElement) => {
    this.inputEl = el;

    if (this.inputRef) {
      this.inputRef(this.inputEl);
    }
  };

  render() {
    return (
      <Host
        class={{
          "switch--secondary": this.color === "secondary",
          "switch--error": this.error,
          "switch--disabled": this.disabled
        }}
      >
        <label class={{ switch: true, "switch--sm": this.size === "sm" }}>
          <input
            type="checkbox"
            class="switch__input"
            value={this.value}
            name={this.name}
            disabled={this.disabled}
            ref={this.setInputRef}
            checked={this.checked}
          />

          <span
            class={{
              switch__slider: true,
              "switch__slider--sm": this.size === "sm"
            }}
          />
        </label>
      </Host>
    );
  }
}
