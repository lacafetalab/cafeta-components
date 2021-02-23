'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-87a60bbb.js');

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

const ccTextareaCss = ".textarea{display:block}.textarea h2,.textarea h3,.textarea h4{font-weight:900}.textarea h2{font-size:2rem}.textarea h3{font-size:1.8rem}.textarea h4{font-size:1.6rem}.textarea li{margin-left:1.6rem}.textarea ol{list-style:decimal}.textarea ul{list-style:disc}.textarea b,.textarea strong{font-weight:900}.textarea a{text-decoration:underline}.textarea.textarea--primary a{color:var(--primary)}.textarea.textarea--secondary a{color:var(--secondary)}.textarea__icon{position:absolute;bottom:0;right:0;margin-right:0.8rem;margin-bottom:0.8rem;display:-ms-flexbox;display:flex}.textarea__icon--primary{color:var(--primary)}.textarea__icon--secondary{color:var(--secondary)}.textarea__field{width:100%;border-radius:0.4rem;border-width:1px;border-color:var(--neutral-02);padding-left:1.6rem;padding-right:1.6rem;padding-top:0.8rem;padding-bottom:0.8rem;font-size:1.4rem;display:block;line-height:1.625;resize:none;min-height:13.6rem}.textarea__field--icon{padding-right:3.6rem}.textarea__field--outlined{border-top-width:0;border-left-width:0;border-right-width:0;border-bottom-width:1px}.textarea__field--auto-grow{min-height:4.2rem}.textarea__field--without-radius{border-radius:0}.textarea__field--bg-white{background-color:var(--neutral-04)}.textarea__field--bg-transparent{background-color:transparent}.textarea__field:disabled{border-color:var(--disabled-background)}.textarea--success .textarea__field{border-color:var(--success)}.textarea--error .textarea__field{border-color:var(--error)}.textarea__field:focus{outline:0}.textarea--primary .textarea__field:focus{border-color:var(--primary)}.textarea--secondary .textarea__field:focus{border-color:var(--secondary)}.textarea--success .textarea__field:focus{border-color:var(--success)}.textarea--error .textarea__field:focus{border-color:var(--error)}.textarea__field::-moz-placeholder{color:var(--neutral-02)}.textarea__field:-ms-input-placeholder{color:var(--neutral-02)}.textarea__field::-webkit-input-placeholder{color:var(--neutral-02)}.textarea__field::-ms-input-placeholder{color:var(--neutral-02)}.textarea__field::placeholder{color:var(--neutral-02)}.textarea__label{display:block;padding-top:0.4rem;padding-bottom:0.4rem;font-size:1.1rem;font-weight:900;color:var(--neutral-03)}.textarea--disabled .textarea__label{color:var(--disabled-text)}.textarea__helperText{display:block;font-size:1.1rem;margin-top:0.4rem;color:var(--error)}.textarea__richTextSkeleton{width:100%;border-radius:0.4rem;border-width:1px;border-color:var(--neutral-02);padding-left:1.6rem;padding-right:1.6rem;padding-top:0.8rem;padding-bottom:0.8rem;background-color:var(--neutral-04);font-size:1.4rem;display:block;line-height:1.625;min-height:13.6rem}.textarea__richTextSkeleton+.textarea__helperText{display:none}.textarea__counter{font-size:1.2rem;color:var(--neutral-02)}.textarea__wrapper-helper{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.textarea--bg-transparent .ck.ck-editor__main>.ck-editor__editable{background-color:transparent}.textarea--bg-white .ck.ck-editor__main>.ck-editor__editable{background-color:var(--neutral-04)}.textarea .ck.ck-toolbar{border-color:var(--neutral-02)}.textarea.textarea--disabled .ck.ck-toolbar{border-color:var(--disabled-background)}.textarea .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,.textarea .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners{border-top-left-radius:0.4rem;border-top-right-radius:0.4rem}.textarea .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable,.textarea .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{border-bottom-right-radius:0.4rem;border-bottom-left-radius:0.4rem}.textarea .ck.ck-editor__main>.ck-editor__editable.ck-focused{-webkit-box-shadow:none;box-shadow:none}.textarea .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){border-color:var(--neutral-02)}.textarea .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused).ck-read-only{border-color:var(--disabled-background)}.textarea .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items{-ms-flex-pack:end;justify-content:flex-end}.textarea.textarea--primary .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--primary)}.textarea.textarea--secondary .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--secondary)}.textarea--error .textarea{border-color:var(--error)}.textarea.textarea--success .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused),.textarea.textarea--success .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--success)}.textarea.textarea--error .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused),.textarea.textarea--error .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--error)}.textarea .ck.ck-editor__editable_inline>:first-child{margin-top:0.8rem}.textarea .ck.ck-editor__editable_inline>:last-child{margin-bottom:0.8rem}.textarea .ck.ck-editor__editable_inline{padding-left:1.6rem;padding-right:1.6rem;min-height:13.6rem}";

const CcTextarea = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.changeText = index.createEvent(this, "changeText", 7);
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
        this.enableMediaEmbed = false;
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
        const { default: ClassicEditor } = await Promise.resolve().then(function () { return require('./ckeditor-f1e263b8.js'); }).then(function (n) { return n.ckeditor; });
        const { default: Image } = await Promise.resolve().then(function () { return require('./image-367bd572.js'); });
        const { default: ImageResize } = await Promise.resolve().then(function () { return require('./imageresize-ae3e9c1e.js'); });
        const optionsEditor = {
            toolbar,
            placeholder: this.placeholder
        };
        if (!this.enableMediaEmbed) {
            optionsEditor['mediaEmbed'] = {
                providers: []
            };
        }
        if (this.enableImage && this.imageService) {
            toolbar.push("imageUpload");
            optionsEditor['plugins'] = [
                Image,
                ImageResize
            ];
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
        return (index.h(index.Host, { class: {
                textarea: true,
                relative: true,
                "textarea--primary": this.color === "primary",
                "textarea--secondary": this.color === "secondary",
                "textarea--success": this.success && !this.error && !this.disabled,
                "textarea--error": this.error && !this.success && !this.disabled,
                "textarea--disabled": this.disabled,
                "textarea--bg-transparent": this.bgField === "transparent",
                "textarea--bg-white": this.bgField === "white"
            }, "data-testid": "cc-textarea" }, this.label && (index.h("label", { class: "textarea__label", onClick: this.focusEditor }, this.label)), this.rich ? (index.h("div", { class: "textarea__richTextSkeleton", ref: el => (this.richTextEl = el) }, this.value ? this.value : "")) : (index.h("textarea", { rows: 1, ref: el => (this.textAreaEl = el), disabled: this.disabled, placeholder: this.placeholder, class: {
                textarea__field: true,
                "textarea__field--outlined": this.outlined,
                "textarea__field--icon": !!this.iconName && !this.rich,
                "textarea__field--auto-grow": this.autoGrow,
                "textarea__field--without-radius": this.withoutRadius,
                "textarea__field--bg-white": this.bgField === "white",
                "textarea__field--bg-transparent": this.bgField === "transparent"
            }, maxLength: this.maxLength, name: this.name, value: this.value, onInput: e => this.changeTextHandler(e.target.value) })), (!!this.iconName && !this.rich) && (index.h("cc-icon", { class: {
                textarea__icon: true,
                "textarea__icon--primary": this.color === "primary",
                "textarea__icon--secondary": this.color === "secondary"
            }, name: this.iconName })), index.h("div", { class: "textarea__wrapper-helper" }, index.h("div", null, this.helperText && this.error && !this.success && !this.disabled && (index.h("span", { class: "textarea__helperText", onClick: this.focusEditor }, this.helperText))), index.h("div", null, this.counter && (index.h("span", { class: "textarea__counter" }, index.h("span", null, this.lengthCharacter), index.h("span", null, "/"), index.h("span", null, this.maxLength ? this.maxLength : "maxlength is missing")))))));
    }
    static get watchers() { return {
        "disabled": ["validateName"],
        "rich": ["toggleRichText"],
        "value": ["setValue"]
    }; }
};
CcTextarea.style = ccTextareaCss;

exports.cc_textarea = CcTextarea;
