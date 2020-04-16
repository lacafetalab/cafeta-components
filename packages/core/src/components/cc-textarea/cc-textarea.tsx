import { h, Component, Prop, Host, Watch } from "@stencil/core";

@Component({
  tag: "cc-textarea",
  styleUrl: "cc-textarea.scss",
  shadow: false
})
export class CcTextarea {
  private richTextEl?: HTMLElement;
  private editorInstance: any;

  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() label?: string;
  @Prop() status?: "success" | "error";
  @Prop() disabled?: boolean = false;
  @Prop() placeholder?: string;

  @Watch("disabled")
  validateName(newValue: boolean) {
    if (this.editorInstance) this.editorInstance.isReadOnly = newValue;
  }

  async enableRichTextEditor() {
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

    this.editorInstance.isReadOnly = this.disabled;
    // this.editorInstance.on("change:data");
  }

  componentDidLoad() {
    this.enableRichTextEditor();
  }

  componentDidUnload() {
    if (this.editorInstance) this.editorInstance.destroy();
  }

  render() {
    return (
      <Host
        class={{
          textarea: true,
          "textarea--primary": this.color === "primary",
          "textarea--secondary": this.color === "secondary",
          "textarea--success": this.status === "success" && !this.disabled,
          "textarea--error": this.status === "error" && !this.disabled,
          "textarea--disabled": this.disabled
        }}
      >
        <label
          class={{
            textarea__wrapper: true
          }}
        >
          {this.label && <span class="textarea__label">{this.label}</span>}
          <textarea
            disabled={this.disabled}
            placeholder={this.placeholder}
            class="textarea__field"
          />
        </label>

        <div ref={el => (this.richTextEl = el as HTMLElement)}></div>
      </Host>
    );
  }
}
