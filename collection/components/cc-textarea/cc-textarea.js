import { h, Component, Prop, Host, Watch, Event, Method, State } from "@stencil/core";
import { UploadAdapter } from "./UploadAdapter";
// import ClassicEditor from "@cafeta/ckeditor5-custom-build";
export class CcTextarea {
    constructor() {
        this.lengthCharacter = 0;
        this.isModified = false;
        this.color = "primary";
        this.error = false;
        this.success = false;
        this.disabled = false;
        this.rich = false;
        this.maxLength = 0;
        this.outlined = false;
        this.autoGrow = false;
        this.withoutRadius = false;
        this.counter = false;
        this.bgField = "white";
        this.enableMediaEmbed = false;
        this.isRequired = false;
        this.focusEditor = () => {
            if (this.rich) {
                this.editorInstance.editing.view.focus();
                this.putCursorAtTheEnd();
            }
            else {
                this.textAreaEl.focus();
            }
        };
    }
    async focusTextEditor() {
        this.focusEditor();
        return;
    }
    async setDataRichEditor(data) {
        this.editorInstance.data.set(data);
        return;
    }
    validateName(newDisabled) {
        if (this.editorInstance)
            this.editorInstance.isReadOnly = newDisabled;
    }
    toggleRichText(richNew, richOld) {
        if (richNew !== richOld) {
            if (richNew && !richNew) {
                this.enableRichTextEditor();
            }
            else {
                this.disableRichTextEditor();
            }
        }
    }
    getAmountOfCharacters() {
        if (this.textAreaEl) {
            return this.textAreaEl.value.length;
        }
    }
    setValue(newValue) {
        if (this.rich) {
            if (this.editorInstance) {
                this.editorInstance.data.set(newValue);
            }
        }
        else {
            this.textAreaEl.value = newValue;
        }
    }
    changeTextHandler(newText) {
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
    clearHtmlOnText(value) {
        const html = value || "";
        const div = document.createElement("div");
        div.innerHTML = html;
        const text = div.textContent || div.innerText || "";
        return text.length;
    }
    setRichTextEditorDefaults() {
        this.editorInstance.isReadOnly = this.disabled;
        if (this.value)
            this.editorInstance.data.set(this.value);
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
        if (!this.rich)
            return null;
        const { default: ClassicEditor } = await import("@cafeta/ckeditor5-custom-build");
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
        this.editorInstance = await ClassicEditor.create(this.richTextEl, optionsEditor);
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
        if (this.rich && this.editorInstance)
            this.editorInstance.destroy();
    }
    putCursorAtTheEnd() {
        this.editorInstance.model.change(writer => {
            writer.setSelection(writer.createPositionAt(this.editorInstance.model.document.getRoot(), "end"));
        });
    }
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
        return (h(Host, { class: {
                textarea: true,
                relative: true,
                "textarea--primary": this.color === "primary",
                "textarea--secondary": this.color === "secondary",
                "textarea--success": this.success && !this.error && !this.disabled,
                "textarea--error": (this.error && !this.success && !this.disabled) ||
                    (this.counter && this.lengthCharacter > this.maxLength) ||
                    (this.isRequired && !this.lengthCharacter && this.isModified),
                "textarea--disabled": this.disabled,
                "textarea--bg-transparent": this.bgField === "transparent",
                "textarea--bg-white": this.bgField === "white"
            }, "data-testid": "cc-textarea" },
            this.label && (h("label", { class: "textarea__label", onClick: this.focusEditor }, this.label)),
            this.rich ? (h("div", { class: "textarea__richTextSkeleton", ref: el => (this.richTextEl = el) }, this.value ? this.value : "")) : (h("textarea", { rows: 1, ref: el => (this.textAreaEl = el), disabled: this.disabled, placeholder: this.placeholder, class: {
                    textarea__field: true,
                    "textarea__field--outlined": this.outlined,
                    "textarea__field--icon": !!this.iconName && !this.rich,
                    "textarea__field--auto-grow": this.autoGrow,
                    "textarea__field--without-radius": this.withoutRadius,
                    "textarea__field--bg-white": this.bgField === "white",
                    "textarea__field--bg-transparent": this.bgField === "transparent"
                }, maxLength: !this.maxLength ? undefined : this.maxLength, name: this.name, value: this.value, onInput: e => this.changeTextHandler(e.target.value) })),
            !!this.iconName && !this.rich && (h("cc-icon", { class: {
                    textarea__icon: true,
                    "textarea__icon--primary": this.color === "primary",
                    "textarea__icon--secondary": this.color === "secondary"
                }, name: this.iconName })),
            h("div", { class: "textarea__wrapper-helper" },
                h("div", null,
                    this.helperText && this.error && !this.success && !this.disabled && (h("span", { class: "textarea__helperText", onClick: this.focusEditor }, this.helperText)),
                    this.lengthCharacter > this.maxLength && this.counter && (h("span", { class: "textarea__helperText", onClick: this.focusEditor }, "Has excedido el n\u00FAmero de caracteres.")),
                    this.isRequired && !this.lengthCharacter && this.isModified && (h("div", { class: "textarea__helperText-required" },
                        h("cc-icon", { size: 16, name: "alert-triangle" }),
                        h("span", { class: "textarea__helperText", onClick: this.focusEditor }, "Es necesario completar esta informaci\u00F3n.")))),
                h("div", null, this.counter && (h("span", { class: "textarea__counter" },
                    h("span", null, this.lengthCharacter),
                    h("span", null, "/"),
                    h("span", null, !!this.maxLength ? this.maxLength : "maxLength is missing")))))));
    }
    static get is() { return "cc-textarea"; }
    static get originalStyleUrls() { return {
        "$": ["cc-textarea.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-textarea.css"]
    }; }
    static get properties() { return {
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"primary\" | \"secondary\"",
                "resolved": "\"primary\" | \"secondary\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "\"primary\""
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "label",
            "reflect": false
        },
        "error": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "success": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "success",
            "reflect": false,
            "defaultValue": "false"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "name",
            "reflect": false
        },
        "rich": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "rich",
            "reflect": false,
            "defaultValue": "false"
        },
        "value": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "value",
            "reflect": false
        },
        "iconName": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "icon-name",
            "reflect": false
        },
        "helperText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "helper-text",
            "reflect": false
        },
        "maxLength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "max-length",
            "reflect": false,
            "defaultValue": "0"
        },
        "outlined": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "outlined",
            "reflect": false,
            "defaultValue": "false"
        },
        "autoGrow": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "auto-grow",
            "reflect": false,
            "defaultValue": "false"
        },
        "withoutRadius": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "without-radius",
            "reflect": false,
            "defaultValue": "false"
        },
        "counter": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "counter",
            "reflect": false,
            "defaultValue": "false"
        },
        "bgField": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"transparent\" | \"white\"",
                "resolved": "\"transparent\" | \"white\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "bg-field",
            "reflect": false,
            "defaultValue": "\"white\""
        },
        "toolbar": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "enableImage": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "enable-image",
            "reflect": false
        },
        "imageService": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(file: any) => Promise<string>",
                "resolved": "(file: any) => Promise<string>",
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "enableMediaEmbed": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "enable-media-embed",
            "reflect": false,
            "defaultValue": "false"
        },
        "isRequired": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-required",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "lengthCharacter": {},
        "isModified": {}
    }; }
    static get events() { return [{
            "method": "changeText",
            "name": "changeText",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }, {
            "method": "totalCharacters",
            "name": "totalCharacters",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "focusTextEditor": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "setDataRichEditor": {
            "complexType": {
                "signature": "(data: string) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "disabled",
            "methodName": "validateName"
        }, {
            "propName": "rich",
            "methodName": "toggleRichText"
        }, {
            "propName": "value",
            "methodName": "setValue"
        }]; }
}
