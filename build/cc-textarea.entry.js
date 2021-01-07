import { r as registerInstance, c as createEvent, h, H as Host } from './core-2b8afa15.js';

class UploadAdapter {
    constructor({ loader, serviceUpload }) {
        this.loader = loader;
        this.serviceUpload = serviceUpload;
    }
    async upload() {
        const file = await this.loader.file;
        try {
            const imageUrl = await this.serviceUpload(file);
            return {
                default: imageUrl
            };
        }
        catch (e) {
            throw e;
        }
    }
}

const CcTextarea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.lengthCharacter = 0;
        this.color = "primary";
        this.error = false;
        this.success = false;
        this.disabled = false;
        this.rich = false;
        this.outlined = false;
        this.autoGrow = false;
        this.withoutRadius = false;
        this.counter = false;
        this.bgField = "white";
        this.focusEditor = () => {
            if (this.rich) {
                this.editorInstance.editing.view.focus();
                this.putCursorAtTheEnd();
            }
            else {
                this.textAreaEl.focus();
            }
        };
        this.changeText = createEvent(this, "changeText", 7);
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
        if (this.counter) {
            this.lengthCharacter = newText.length;
        }
        this.changeText.emit(newText);
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
        const { default: ClassicEditor } = await __sc_import_cafeta_components('./ckeditor-16db7b17.js');
        if (this.enableImage && this.imageService) {
            toolbar.push("imageUpload");
        }
        this.editorInstance = await ClassicEditor.create(this.richTextEl, {
            toolbar,
            placeholder: this.placeholder,
            mediaEmbed: {
                providers: []
            }
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
                "textarea--error": this.error && !this.success && !this.disabled,
                "textarea--disabled": this.disabled,
                "textarea--bg-transparent": this.bgField === "transparent",
                "textarea--bg-white": this.bgField === "white"
            }, "data-testid": "cc-textarea" }, this.label && (h("label", { class: "textarea__label", onClick: this.focusEditor }, this.label)), this.rich ? (h("div", { class: "textarea__richTextSkeleton", ref: el => (this.richTextEl = el) }, this.value ? this.value : "")) : (h("textarea", { rows: 1, ref: el => (this.textAreaEl = el), disabled: this.disabled, placeholder: this.placeholder, class: {
                textarea__field: true,
                "textarea__field--outlined": this.outlined,
                "textarea__field--auto-grow": this.autoGrow,
                "textarea__field--without-radius": this.withoutRadius,
                "textarea__field--bg-white": this.bgField === "white",
                "textarea__field--bg-transparent": this.bgField === "transparent"
            }, maxLength: this.maxLength, name: this.name, value: this.value, onInput: e => this.changeTextHandler(e.target.value) })), h("div", { class: "textarea__wrapper-helper" }, h("div", null, this.helperText && this.error && !this.success && !this.disabled && (h("span", { class: "textarea__helperText", onClick: this.focusEditor }, this.helperText))), h("div", null, this.counter && (h("span", { class: "textarea__counter" }, h("span", null, this.lengthCharacter), h("span", null, "/"), h("span", null, this.maxLength ? this.maxLength : "maxlength is missing")))))));
    }
    static get watchers() { return {
        "disabled": ["validateName"],
        "rich": ["toggleRichText"],
        "value": ["setValue"]
    }; }
    static get style() { return ".textarea {\n  display: block;\n}\n\n.textarea h2,\n.textarea h3,\n.textarea h4 {\n  font-weight: 900;\n}\n\n.textarea h2 {\n  font-size: 2rem;\n}\n\n.textarea h3 {\n  font-size: 1.8rem;\n}\n\n.textarea h4 {\n  font-size: 1.6rem;\n}\n\n.textarea li {\n  margin-left: 1.6rem;\n}\n\n.textarea ol {\n  list-style: decimal;\n}\n\n.textarea ul {\n  list-style: disc;\n}\n\n.textarea b,\n.textarea strong {\n  font-weight: 900;\n}\n\n.textarea a {\n  text-decoration: underline;\n}\n\n.textarea.textarea--primary a {\n  color: var(--primary);\n}\n\n.textarea.textarea--secondary a {\n  color: var(--secondary);\n}\n\n.textarea__field {\n  width: 100%;\n  border-radius: 0.4rem;\n  border-width: 1px;\n  border-color: var(--neutral-02);\n  padding-left: 1.6rem;\n  padding-right: 1.6rem;\n  padding-top: 0.8rem;\n  padding-bottom: 0.8rem;\n  font-size: 1.4rem;\n  display: block;\n  line-height: 1.625;\n  resize: none;\n  min-height: 13.6rem;\n}\n\n.textarea__field--outlined {\n  border-top-width: 0;\n  border-left-width: 0;\n  border-right-width: 0;\n  border-bottom-width: 1px;\n}\n\n.textarea__field--auto-grow {\n  min-height: 4.2rem;\n}\n\n.textarea__field--without-radius {\n  border-radius: 0;\n}\n\n.textarea__field--bg-white {\n  background-color: var(--neutral-04);\n}\n\n.textarea__field--bg-transparent {\n  background-color: transparent;\n}\n\n.textarea__field:disabled {\n  border-color: var(--disabled-background);\n}\n\n.textarea--success .textarea__field {\n  border-color: var(--success);\n}\n\n.textarea--error .textarea__field {\n  border-color: var(--error);\n}\n\n.textarea__field:focus {\n  outline: 0;\n}\n\n.textarea--primary .textarea__field:focus {\n  border-color: var(--primary);\n}\n\n.textarea--secondary .textarea__field:focus {\n  border-color: var(--secondary);\n}\n\n.textarea--success .textarea__field:focus {\n  border-color: var(--success);\n}\n\n.textarea--error .textarea__field:focus {\n  border-color: var(--error);\n}\n\n.textarea__field::-webkit-input-placeholder {\n  color: var(--neutral-02);\n}\n\n.textarea__field::-moz-placeholder {\n  color: var(--neutral-02);\n}\n\n.textarea__field:-ms-input-placeholder {\n  color: var(--neutral-02);\n}\n\n.textarea__field::-ms-input-placeholder {\n  color: var(--neutral-02);\n}\n\n.textarea__field::placeholder {\n  color: var(--neutral-02);\n}\n\n.textarea__label {\n  display: block;\n  padding-top: 0.4rem;\n  padding-bottom: 0.4rem;\n  font-size: 1.1rem;\n  font-weight: 900;\n  color: var(--neutral-03);\n}\n\n.textarea--disabled .textarea__label {\n  color: var(--disabled-text);\n}\n\n.textarea__helperText {\n  display: block;\n  font-size: 1.1rem;\n  margin-top: 0.4rem;\n  color: var(--error);\n}\n\n.textarea__richTextSkeleton {\n  width: 100%;\n  border-radius: 0.4rem;\n  border-width: 1px;\n  border-color: var(--neutral-02);\n  padding-left: 1.6rem;\n  padding-right: 1.6rem;\n  padding-top: 0.8rem;\n  padding-bottom: 0.8rem;\n  background-color: var(--neutral-04);\n  font-size: 1.4rem;\n  display: block;\n  line-height: 1.625;\n  min-height: 13.6rem;\n}\n\n.textarea__richTextSkeleton + .textarea__helperText {\n  display: none;\n}\n\n.textarea__counter {\n  font-size: 1.2rem;\n  color: var(--neutral-02);\n}\n\n.textarea__wrapper-helper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.textarea--bg-transparent .ck.ck-editor__main > .ck-editor__editable {\n  background-color: transparent;\n}\n\n.textarea--bg-white .ck.ck-editor__main > .ck-editor__editable {\n  background-color: var(--neutral-04);\n}\n\n.textarea .ck.ck-toolbar {\n  border-color: var(--neutral-02);\n}\n\n.textarea.textarea--disabled .ck.ck-toolbar {\n  border-color: var(--disabled-background);\n}\n\n.textarea .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,\n.textarea .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {\n  border-top-left-radius: 0.4rem;\n  border-top-right-radius: 0.4rem;\n}\n\n.textarea .ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,\n.textarea .ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {\n  border-bottom-right-radius: 0.4rem;\n  border-bottom-left-radius: 0.4rem;\n}\n\n.textarea .ck.ck-editor__main > .ck-editor__editable.ck-focused {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\n.textarea .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {\n  border-color: var(--neutral-02);\n}\n\n.textarea .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused).ck-read-only {\n  border-color: var(--disabled-background);\n}\n\n.textarea .ck.ck-toolbar.ck-toolbar_grouping > .ck-toolbar__items {\n  -webkit-box-pack: end;\n          -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.textarea.textarea--primary .ck.ck-editor__main > .ck-editor__editable.ck-focused {\n  border-color: var(--primary);\n}\n\n.textarea.textarea--secondary .ck.ck-editor__main > .ck-editor__editable.ck-focused {\n  border-color: var(--secondary);\n}\n\n.textarea--error .textarea {\n  border-color: var(--error);\n}\n\n.textarea.textarea--success .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused), .textarea.textarea--success .ck.ck-editor__main > .ck-editor__editable.ck-focused {\n  border-color: var(--success);\n}\n\n.textarea.textarea--error .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused), .textarea.textarea--error .ck.ck-editor__main > .ck-editor__editable.ck-focused {\n  border-color: var(--error);\n}\n\n.textarea .ck.ck-editor__editable_inline > :first-child {\n  margin-top: 0.8rem;\n}\n\n.textarea .ck.ck-editor__editable_inline > :last-child {\n  margin-bottom: 0.8rem;\n}\n\n.textarea .ck.ck-editor__editable_inline {\n  padding-left: 1.6rem;\n  padding-right: 1.6rem;\n  min-height: 13.6rem;\n}"; }
};

export { CcTextarea as cc_textarea };
