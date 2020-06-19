import { h, Component, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-checkfield",
  styleUrl: "cc-checkfield.scss",
  shadow: true
})
export class CcCheckfield {
  private inputEl;
  @Prop() type?: "checkbox" | "radio" = "checkbox";
  @Prop() name?: string;
  @Prop() value?: string;
  @Prop() label?: string;
  @Prop() checked?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() size?: "small" | "medium" = "small";
  @Prop() shape?: "circle" | "square" = "square";
  @Prop() error?: boolean = false;
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() inputRef?: (el: HTMLInputElement) => void;

  setInputRef = (el: HTMLInputElement) => {
    this.inputEl = el;

    if (this.inputRef) {
      this.inputRef(this.inputEl);
    }
  };

  render() {
    return (
      <Host data-testid="cc-checkfield" class="CheckField">
        <label class="checkfield__wrapper">
          <div
            class={{
              "checkfield__wrapper-input": true,
              "checkfield__wrapper-input--medium": this.size === "medium"
            }}
          >
            <input
              type={this.type}
              name={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              ref={this.setInputRef}
              class={{
                checkfield__input: true,
                "checkfield__input--secondary": this.color === "secondary",
                "checkfield__input--circle": this.shape === "circle",
                "checkfield__input--square": this.shape === "square",
                "checkfield__input--medium": this.size === "medium",
                "checkfield__input--error": this.error
              }}
            />
            {this.shape === "square" && (
              <cc-icon
                name="check"
                class="checkfield__check"
                size={this.size === "medium" ? 12 : 10}
              />
            )}
          </div>
          {this.label && <span class="checkfield__label">{this.label}</span>}
        </label>
      </Host>
    );
  }
}
