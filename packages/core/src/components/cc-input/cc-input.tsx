import { h, Component, Host, Prop } from "@stencil/core";

@Component({
  tag: "cc-input",
  styleUrl: "cc-input.scss"
})
export class CcInput {
  private inputEl?: HTMLInputElement;

  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() label?: string;
  @Prop() type?: "text" | "password" | "number" = "text";
  @Prop() value?: string;
  @Prop() disabled?: boolean = false;
  @Prop() placeholder?: string;
  @Prop() inputRef?: (el: HTMLInputElement) => void;
  @Prop() error?: boolean = false;
  @Prop() success?: boolean = false;
  @Prop() helperText?: string;
  @Prop() name?: string;
  @Prop() iconName?: string;
  @Prop() bgField?: string = "";
  @Prop() autocomplete?: string = "";
  @Prop() maxLength?: number;
  @Prop() border?:boolean= true

  focusInput = () => {
    this.inputEl.focus();
  };

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
          input: true,
          "input--primary": this.color === "primary",
          "input--secondary": this.color === "secondary",
          "input--success": this.success && !this.error && !this.disabled,
          "input--error": this.error && !this.success && !this.disabled,
          "input--disabled": this.disabled,
          "input--without-border": !this.border
        }}
        data-testid="cc-input"
      >
        {this.label && (
          <label class="input__label" onClick={this.focusInput}>
            {this.label}
          </label>
        )}

        <div class="input__wrapper">
          <input
            class={`input__field ${
              this.iconName ? "input__field--icon" : ""
            } ${this.bgField || "input__field--default-bg"}`}
            type={this.type}
            placeholder={this.placeholder}
            disabled={this.disabled}
            name={this.name}
            value={this.value}
            ref={this.setInputRef}
            autocomplete={this.autocomplete}
            maxLength={this.maxLength}
          />

          {this.iconName && (
            <cc-icon
              class={{
                input__icon: true,
                "input__icon--primary": this.color === "primary",
                "input__icon--secondary": this.color === "secondary"
              }}
              name={this.iconName}
            />
          )}
        </div>

        {this.helperText && this.error && !this.success && !this.disabled && (
          <span class="input__helperText" onClick={this.focusInput}>
            {this.helperText}
          </span>
        )}
      </Host>
    );
  }
}
