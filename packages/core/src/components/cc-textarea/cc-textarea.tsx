import {
  h,
  Component,
  Prop,
  Host,
  Watch,
  Event,
  EventEmitter,
  Method,
  State
} from "@stencil/core";
import { UploadAdapter } from "./UploadAdapter";

@Component({
  tag: "cc-textarea",
  styleUrl: "cc-textarea.scss"
})
export class CcTextarea {
  private richTextEl?: HTMLElement;
  private textAreaEl?: HTMLTextAreaElement;
  private editorInstance: any;

  @State() lengthCharacter: Number = 0;
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
  @Prop() enableImage?: boolean;
  @Prop() imageService?: (file: any) => Promise<string>;
  @Prop() maxLength?: number;
  @Prop() outlined: boolean = false;
  @Prop() autoGrow?: boolean = false;
  @Prop() withoutRadius?: boolean = false;
  @Prop() counter?: boolean = false;
  @Prop() bgField?: "transparent" | "white" = "white";
  @Prop() toolbar?: string[];

  @Method()
  async focusTextEditor() {
    this.focusEditor();
    return;
  }

  @Method()
  async setDataRichEditor(data: string) {
    this.editorInstance.data.set(data);
    return;
  }

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
  getAmountOfCharacters() {
    if (this.textAreaEl) {
      return this.textAreaEl.value.length;
    }
  }

  @Watch("value")
  setValue(newValue: string) {
    if (this.rich) {
      if (this.editorInstance) {
        this.editorInstance.data.set(newValue);
      }
    } else {
      this.textAreaEl.value = newValue;
    }
  }

  @Event() changeText: EventEmitter<string>;

  changeTextHandler(newText: string) {
    if (this.autoGrow) {
      this.textAreaEl.style.height = "5px";
      this.textAreaEl.style.height = this.textAreaEl.scrollHeight + "px";
    }

    if (this.counter) {
      this.lengthCharacter = newText.length;
    }

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
    let toolbar = this.toolbar || [
      "Undo",
      "Redo",
      "Heading",
      "Bold",
      "Italic",
      "numberedList",
      "bulletedList",
      "Link",
      "blockQuote"
    ];

    if (!this.rich) return null;

    const { default: ClassicEditor } = await import(
      "@ckeditor/ckeditor5-build-classic"
    );

    if (this.enableImage && this.imageService) {
      toolbar.push("imageUpload");
    }

    this.editorInstance = await ClassicEditor.create(this.richTextEl, {
      toolbar,
      placeholder: this.placeholder
    });

    this.setRichTextEditorDefaults();
    this.setAdapterUpload(this.editorInstance);

    return this.editorInstance;
  }

  setAdapterUpload(editor) {
    if (!this.enableImage && !this.imageService) {
      return;
    }

    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
      return new UploadAdapter({ loader, serviceUpload: this.imageService });
    };
  }

  disableRichTextEditor() {
    if (this.rich && this.editorInstance) this.editorInstance.destroy();
  }

  putCursorAtTheEnd() {
    this.editorInstance.model.change(writer => {
      writer.setSelection(
        writer.createPositionAt(
          this.editorInstance.model.document.getRoot(),
          "end"
        )
      );
    });
  }

  focusEditor = () => {
    if (this.rich) {
      this.editorInstance.editing.view.focus();
      this.putCursorAtTheEnd();
    } else {
      this.textAreaEl.focus();
    }
  };

  componentDidLoad() {
    this.enableRichTextEditor();
  }
  componentWillLoad() {
    if (this.value) {
      this.lengthCharacter = this.value.length;
    }
  }

  componentDidUnload() {
    this.disableRichTextEditor();
  }

  render() {
    return (
      <Host
        class={{
          textarea: true,
          relative: true,
          "textarea--primary": this.color === "primary",
          "textarea--secondary": this.color === "secondary",
          "textarea--success": this.success && !this.error && !this.disabled,
          "textarea--error": this.error && !this.success && !this.disabled,
          "textarea--disabled": this.disabled,
          "textarea--bg-transparent": this.bgField === "transparent",
          "textarea--bg-white": this.bgField === "white"
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
            rows={1}
            ref={el => (this.textAreaEl = el)}
            disabled={this.disabled}
            placeholder={this.placeholder}
            class={{
              textarea__field: true,
              "textarea__field--outlined": this.outlined,
              "textarea__field--auto-grow": this.autoGrow,
              "textarea__field--without-radius": this.withoutRadius,
              "textarea__field--bg-white": this.bgField === "white",
              "textarea__field--bg-transparent": this.bgField === "transparent"
            }}
            maxLength={this.maxLength}
            name={this.name}
            value={this.value}
            onInput={e =>
              this.changeTextHandler((e.target as HTMLTextAreaElement).value)
            }
          />
        )}
        <div class="textarea__wrapper-helper">
          <div>
            {this.helperText && this.error && !this.success && !this.disabled && (
              <span class="textarea__helperText" onClick={this.focusEditor}>
                {this.helperText}
              </span>
            )}
          </div>
          <div>
            {this.counter && (
              <span class="textarea__counter">
                <span>{this.lengthCharacter}</span>
                <span>/</span>
                <span>
                  {this.maxLength ? this.maxLength : "maxlength is missing"}
                </span>
              </span>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
