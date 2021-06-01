import { r as registerInstance, c as createEvent, h, H as Host } from './index-105344ad.js';

class UploadAdapter {
    constructor({ loader, serviceUpload }) {
        this.loader = loader;
        this.serviceUpload = serviceUpload;
    }
    async upload() {
        const file = await this.loader.file;
        const fakeProgress = {
            total: 100,
            init: 0
        };
        this.loader.uploadTotal = fakeProgress.total;
        this.loader.uploaded = fakeProgress.init;
        try {
            const imageUrl = await this.serviceUpload(file);
            this.loader.uploaded = fakeProgress.total;
            return {
                default: imageUrl
            };
        }
        catch (e) {
            throw e;
        }
    }
}

const ccTextareaCss = ".textarea{display:block}.textarea h2,.textarea h3,.textarea h4{font-weight:900}.textarea h2{font-size:2rem}.textarea h3{font-size:1.8rem}.textarea h4{font-size:1.6rem}.textarea li{margin-left:1.6rem}.textarea ol{list-style:decimal}.textarea ul{list-style:disc}.textarea b,.textarea strong{font-weight:900}.textarea a{text-decoration:underline}.textarea.textarea--primary a{color:var(--primary)}.textarea.textarea--secondary a{color:var(--secondary)}.textarea__icon{position:absolute;bottom:0;right:0;margin-right:0.8rem;margin-bottom:0.8rem;display:-ms-flexbox;display:flex}.textarea__icon--primary{color:var(--primary)}.textarea__icon--secondary{color:var(--secondary)}.textarea__field{width:100%;border-radius:0.4rem;border-width:1px;border-color:var(--neutral-02);padding-left:1.6rem;padding-right:1.6rem;padding-top:0.8rem;padding-bottom:0.8rem;font-size:1.4rem;display:block;line-height:1.625;resize:none;min-height:13.6rem}.textarea__field--icon{padding-right:3.6rem}.textarea__field--outlined{border-top-width:0;border-left-width:0;border-right-width:0;border-bottom-width:1px}.textarea__field--auto-grow{min-height:4.2rem}.textarea__field--without-radius{border-radius:0}.textarea__field--bg-white{background-color:var(--neutral-04)}.textarea__field--bg-transparent{background-color:transparent}.textarea__field:disabled{border-color:var(--disabled-background)}.textarea--success .textarea__field{border-color:var(--success)}.textarea--error .textarea__field{border-color:var(--error)}.textarea__field:focus{outline:0}.textarea--primary .textarea__field:focus{border-color:var(--primary)}.textarea--secondary .textarea__field:focus{border-color:var(--secondary)}.textarea--success .textarea__field:focus{border-color:var(--success)}.textarea--error .textarea__field:focus{border-color:var(--error)}.textarea__field::-moz-placeholder{color:var(--neutral-02)}.textarea__field:-ms-input-placeholder{color:var(--neutral-02)}.textarea__field::-webkit-input-placeholder{color:var(--neutral-02)}.textarea__field::-ms-input-placeholder{color:var(--neutral-02)}.textarea__field::placeholder{color:var(--neutral-02)}.textarea__label{display:block;padding-top:0.4rem;padding-bottom:0.4rem;font-size:1.1rem;font-weight:900;color:var(--neutral-03)}.textarea--disabled .textarea__label{color:var(--disabled-text)}.textarea__helperText{display:block;font-size:1.1rem}.textarea__helperText-required{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.textarea__helperText-required cc-icon{margin-right:1ch}.textarea__richTextSkeleton{width:100%;border-radius:0.4rem;border-width:1px;border-color:var(--neutral-02);padding-left:1.6rem;padding-right:1.6rem;padding-top:0.8rem;padding-bottom:0.8rem;background-color:var(--neutral-04);font-size:1.4rem;display:block;line-height:1.625;min-height:13.6rem}.textarea__richTextSkeleton+.textarea__helperText{display:none}.textarea__counter{font-size:1.2rem;color:var(--neutral-02)}.textarea__wrapper-helper{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;color:var(--error);margin-top:0.4rem}.textarea--bg-transparent .ck.ck-editor__main>.ck-editor__editable{background-color:transparent}.textarea--bg-white .ck.ck-editor__main>.ck-editor__editable{background-color:var(--neutral-04)}.textarea .ck.ck-toolbar{border-color:var(--neutral-02)}.textarea.textarea--disabled .ck.ck-toolbar{border-color:var(--disabled-background)}.textarea .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,.textarea .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners{border-top-left-radius:0.4rem;border-top-right-radius:0.4rem}.textarea .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable,.textarea .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{border-bottom-right-radius:0.4rem;border-bottom-left-radius:0.4rem}.textarea .ck.ck-editor__main>.ck-editor__editable.ck-focused{-webkit-box-shadow:none;box-shadow:none}.textarea .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){border-color:var(--neutral-02)}.textarea .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused).ck-read-only{border-color:var(--disabled-background)}.textarea .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items{-ms-flex-pack:end;justify-content:flex-end}.textarea.textarea--primary .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--primary)}.textarea.textarea--secondary .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--secondary)}.textarea--error .textarea{border-color:var(--error)}.textarea.textarea--success .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused),.textarea.textarea--success .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--success)}.textarea.textarea--error .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused),.textarea.textarea--error .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--error)}.textarea .ck.ck-editor__editable_inline>:first-child{margin-top:0.8rem}.textarea .ck.ck-editor__editable_inline>:last-child{margin-bottom:0.8rem}.textarea .ck.ck-editor__editable_inline{padding-left:1.6rem;padding-right:1.6rem;min-height:13.6rem}";

const CcTextarea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.changeText = createEvent(this, "changeText", 7);
        this.totalCharacters = createEvent(this, "totalCharacters", 7);
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
        const { default: ClassicEditor } = await import('./ckeditor-8b89bbd8.js').then(function (n) { return n.c; });
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
            }, "data-testid": "cc-textarea" }, this.label && (h("label", { class: "textarea__label", onClick: this.focusEditor }, this.label)), this.rich ? (h("div", { class: "textarea__richTextSkeleton", ref: el => (this.richTextEl = el) }, this.value ? this.value : "")) : (h("textarea", { rows: 1, ref: el => (this.textAreaEl = el), disabled: this.disabled, placeholder: this.placeholder, class: {
                textarea__field: true,
                "textarea__field--outlined": this.outlined,
                "textarea__field--icon": !!this.iconName && !this.rich,
                "textarea__field--auto-grow": this.autoGrow,
                "textarea__field--without-radius": this.withoutRadius,
                "textarea__field--bg-white": this.bgField === "white",
                "textarea__field--bg-transparent": this.bgField === "transparent"
            }, maxLength: !this.maxLength ? undefined : this.maxLength, name: this.name, value: this.value, onInput: e => this.changeTextHandler(e.target.value) })), !!this.iconName && !this.rich && (h("cc-icon", { class: {
                textarea__icon: true,
                "textarea__icon--primary": this.color === "primary",
                "textarea__icon--secondary": this.color === "secondary"
            }, name: this.iconName })), h("div", { class: "textarea__wrapper-helper" }, h("div", null, this.helperText && this.error && !this.success && !this.disabled && (h("span", { class: "textarea__helperText", onClick: this.focusEditor }, this.helperText)), this.lengthCharacter > this.maxLength && this.counter && (h("span", { class: "textarea__helperText", onClick: this.focusEditor }, "Has excedido el n\u00FAmero de caracteres.")), this.isRequired && !this.lengthCharacter && this.isModified && (h("div", { class: "textarea__helperText-required" }, h("cc-icon", { size: 16, name: "alert-triangle" }), h("span", { class: "textarea__helperText", onClick: this.focusEditor }, "Es necesario completar esta informaci\u00F3n.")))), h("div", null, this.counter && (h("span", { class: "textarea__counter" }, h("span", null, !!this.maxLength && this.lengthCharacter > this.maxLength
            ? "-"
            : "", this.lengthCharacter), h("span", null, "/"), h("span", null, !!this.maxLength ? this.maxLength : "maxLength is missing")))))));
    }
    static get watchers() { return {
        "disabled": ["validateName"],
        "rich": ["toggleRichText"],
        "value": ["setValue"]
    }; }
};
CcTextarea.style = ccTextareaCss;

export { CcTextarea as cc_textarea };
