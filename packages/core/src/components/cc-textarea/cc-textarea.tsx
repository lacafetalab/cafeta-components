import {
  h,
  Component,
  Prop,
  Host,
  Watch,
  Event,
  EventEmitter
} from "@stencil/core";

@Component({
  tag: "cc-textarea",
  styleUrl: "cc-textarea.scss",
  scoped: true
})
export class CcTextarea {
  private richTextEl?: HTMLElement;
  private textAreaEl?: HTMLTextAreaElement;
  private editorInstance: any;

  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() label?: string;
  @Prop() error?: boolean = false;
  @Prop() success?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() placeholder?: string;
  @Prop() name?: string;
  @Prop() rich?: boolean = false;
  @Prop() value?: string;
  @Prop() helperText?: string;

  @Watch("disabled")
  validateName(newDisabled: boolean) {
    if (this.editorInstance) this.editorInstance.isReadOnly = newDisabled;
  }

  @Watch("rich")
  toggleRichText(richNew: boolean, richOld: boolean) {
    if (richNew !== richOld) {
      if (richNew && !richNew) {
        this.enableRichTextEditor();
      } else {
        this.disableRichTextEditor();
      }
    }
  }

  @Watch("value")
  setValue(newValue: string) {
    if (this.rich) {
      if (this.editorInstance) this.editorInstance.data.set(newValue);
    } else {
      this.textAreaEl.value = newValue;
    }
  }

  @Event() changeText: EventEmitter<string>;

  changeTextHandler(newText: string) {
    this.changeText.emit(newText);
  }

  setRichTextEditorDefaults() {
    this.editorInstance.isReadOnly = this.disabled;
    if (this.value) this.editorInstance.data.set(this.value);

    this.editorInstance.model.document.on("change:data", () => {
      this.changeTextHandler(this.editorInstance.getData());
    });
  }

  async enableRichTextEditor() {
    if (!this.rich) return null;

    const { default: ClassicEditor } = await import(
      "@ckeditor/ckeditor5-build-classic"
    );

    this.editorInstance = await ClassicEditor.create(this.richTextEl, {
      toolbar: [
        "Undo",
        "Redo",
        "Heading",
        "Bold",
        "Italic",
        "numberedList",
        "bulletedList",
        "Link",
        "blockQuote"
      ],
      placeholder: this.placeholder
    });

    this.setRichTextEditorDefaults();
    return this.editorInstance;
  }

  disableRichTextEditor() {
    if (this.rich && this.editorInstance) this.editorInstance.destroy();
  }

  focusEditor = () => {
    if (this.rich) {
      this.editorInstance.editing.view.focus();
    } else {
      this.textAreaEl.focus();
    }
  };

  componentDidLoad() {
    this.enableRichTextEditor();
  }

  componentDidUnload() {
    this.disableRichTextEditor();
  }

  render() {
    return (
      <Host
        class={{
          textarea: true,
          "textarea--primary": this.color === "primary",
          "textarea--secondary": this.color === "secondary",
          "textarea--success": this.success && !this.error && !this.disabled,
          "textarea--error": this.error && !this.success && !this.disabled,
          "textarea--disabled": this.disabled
        }}
        data-testid="cc-textarea"
      >
        {this.label && (
          <label class="textarea__label" onClick={this.focusEditor}>
            {this.label}
          </label>
        )}

        {this.rich ? (
          <div
            class="textarea__richTextSkeleton"
            ref={el => (this.richTextEl = el as HTMLElement)}
          >
            {this.value ? this.value : ""}
          </div>
        ) : (
          <textarea
            ref={el => (this.textAreaEl = el)}
            disabled={this.disabled}
            placeholder={this.placeholder}
            class="textarea__field"
            name={this.name}
            value={this.value}
            onInput={e =>
              this.changeTextHandler((e.target as HTMLTextAreaElement).value)
            }
          />
        )}

        {this.helperText && this.error && !this.success && !this.disabled && (
          <span class="textarea__helperText" onClick={this.focusEditor}>
            {this.helperText}
          </span>
        )}
      </Host>
    );
  }
}
