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

  @State() lengthCharacter: number = 0;
  @State() isModified: boolean = false;
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() label?: string;
  @Prop() error?: boolean = false;
  @Prop() success?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() placeholder?: string;
  @Prop() name?: string;
  @Prop() rich?: boolean = false;
  @Prop() value?: string;
  @Prop() iconName?: string;
  @Prop() helperText?: string;
  @Prop() maxLength?: number = 0;
  @Prop() outlined: boolean = false;
  @Prop() autoGrow?: boolean = false;
  @Prop() withoutRadius?: boolean = false;
  @Prop() counter?: boolean = false;
  @Prop() bgField?: "transparent" | "white" = "white";
  @Prop() toolbar?: string[];
  @Prop() enableImage?: boolean;
  @Prop() imageService?: (file: any) => Promise<string>;
  @Prop() enableMediaEmbed?: boolean = false;
  @Prop() isRequired?: boolean = false;

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
  @Event() totalCharacters: EventEmitter<number>;

  changeTextHandler(newText: string) {
    if (this.autoGrow) {
      this.textAreaEl.style.height = "5px";
      this.textAreaEl.style.height = this.textAreaEl.scrollHeight + "px";
    }

    if (!this.rich) {
      this.lengthCharacter = newText.length;
    }

    if (this.rich) {
      this.lengthCharacter = this.clearHtmlOnText(newText);
    }

    this.isModified = true;
    this.changeText.emit(newText);
    this.totalCharacters.emit(this.lengthCharacter);
  }

  clearHtmlOnText(value: string) {
    const html: any = value || "";
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length;
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
      "@cafeta/ckeditor5-custom-build"
    );

    const optionsEditor = {
      toolbar,
      placeholder: this.placeholder
    };

    if (!this.enableMediaEmbed) {
      optionsEditor["mediaEmbed"] = {
        providers: []
      };
    }

    if (this.enableMediaEmbed) {
      optionsEditor["mediaEmbed"] = {
        previewsInData: true
      };
    }

    if (this.enableImage && this.imageService) {
      toolbar.push("imageUpload");
    }

    this.editorInstance = await ClassicEditor.create(
      this.richTextEl,
      optionsEditor
    );

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
    if (this.value && !this.rich) {
      this.lengthCharacter = this.value.length;
    }

    if (this.value && this.rich) {
      this.lengthCharacter = this.clearHtmlOnText(this.value);
    }

    this.changeText.emit(this.value);
    this.totalCharacters.emit(this.lengthCharacter);
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
          "textarea--error":
            (this.error && !this.success && !this.disabled) ||
            (this.counter && this.lengthCharacter > this.maxLength) ||
            (this.isRequired && !this.lengthCharacter && this.isModified),
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
              "textarea__field--icon": !!this.iconName && !this.rich,
              "textarea__field--auto-grow": this.autoGrow,
              "textarea__field--without-radius": this.withoutRadius,
              "textarea__field--bg-white": this.bgField === "white",
              "textarea__field--bg-transparent": this.bgField === "transparent"
            }}
            maxLength={!this.maxLength ? undefined : this.maxLength}
            name={this.name}
            value={this.value}
            onInput={e =>
              this.changeTextHandler((e.target as HTMLTextAreaElement).value)
            }
          />
        )}
        {!!this.iconName && !this.rich && (
          <cc-icon
            class={{
              textarea__icon: true,
              "textarea__icon--primary": this.color === "primary",
              "textarea__icon--secondary": this.color === "secondary"
            }}
            name={this.iconName}
          />
        )}
        <div class="textarea__wrapper-helper">
          <div>
            {this.helperText && this.error && !this.success && !this.disabled && (
              <span class="textarea__helperText" onClick={this.focusEditor}>
                {this.helperText}
              </span>
            )}
            {this.lengthCharacter > this.maxLength && this.counter && (
              <span class="textarea__helperText" onClick={this.focusEditor}>
                Has excedido el número de caracteres.
              </span>
            )}
            {this.isRequired && !this.lengthCharacter && this.isModified && (
              <div class="textarea__helperText-required">
                <cc-icon size={16} name="alert-triangle"></cc-icon>
                <span class="textarea__helperText" onClick={this.focusEditor}>
                  Es necesario completar esta información.
                </span>
              </div>
            )}
          </div>
          <div>
            {this.counter && (
              <span class="textarea__counter">
                <span>
                  {!!this.maxLength && this.lengthCharacter > this.maxLength
                    ? "-"
                    : ""}
                  {this.lengthCharacter}
                </span>
                <span>/</span>
                <span>
                  {!!this.maxLength ? this.maxLength : "maxLength is missing"}
                </span>
              </span>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
