var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host } from './index-105344ad.js';
var UploadAdapter = /** @class */ (function () {
    function UploadAdapter(_a) {
        var loader = _a.loader, serviceUpload = _a.serviceUpload;
        this.loader = loader;
        this.serviceUpload = serviceUpload;
    }
    UploadAdapter.prototype.upload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, fakeProgress, imageUrl, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.file];
                    case 1:
                        file = _a.sent();
                        fakeProgress = {
                            total: 100,
                            init: 0
                        };
                        this.loader.uploadTotal = fakeProgress.total;
                        this.loader.uploaded = fakeProgress.init;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.serviceUpload(file)];
                    case 3:
                        imageUrl = _a.sent();
                        this.loader.uploaded = fakeProgress.total;
                        return [2 /*return*/, {
                                default: imageUrl
                            }];
                    case 4:
                        e_1 = _a.sent();
                        throw e_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UploadAdapter;
}());
var ccTextareaCss = ".textarea{display:block}.textarea h2,.textarea h3,.textarea h4{font-weight:900}.textarea h2{font-size:2rem}.textarea h3{font-size:1.8rem}.textarea h4{font-size:1.6rem}.textarea li{margin-left:1.6rem}.textarea ol{list-style:decimal}.textarea ul{list-style:disc}.textarea b,.textarea strong{font-weight:900}.textarea a{text-decoration:underline}.textarea.textarea--primary a{color:var(--primary)}.textarea.textarea--secondary a{color:var(--secondary)}.textarea__icon{position:absolute;bottom:0;right:0;margin-right:0.8rem;margin-bottom:0.8rem;display:-ms-flexbox;display:flex}.textarea__icon--primary{color:var(--primary)}.textarea__icon--secondary{color:var(--secondary)}.textarea__field{width:100%;border-radius:0.4rem;border-width:1px;border-color:var(--neutral-02);padding-left:1.6rem;padding-right:1.6rem;padding-top:0.8rem;padding-bottom:0.8rem;font-size:1.4rem;display:block;line-height:1.625;resize:none;min-height:13.6rem}.textarea__field--icon{padding-right:3.6rem}.textarea__field--outlined{border-top-width:0;border-left-width:0;border-right-width:0;border-bottom-width:1px}.textarea__field--auto-grow{min-height:4.2rem}.textarea__field--without-radius{border-radius:0}.textarea__field--bg-white{background-color:var(--neutral-04)}.textarea__field--bg-transparent{background-color:transparent}.textarea__field:disabled{border-color:var(--disabled-background)}.textarea--success .textarea__field{border-color:var(--success)}.textarea--error .textarea__field{border-color:var(--error)}.textarea__field:focus{outline:0}.textarea--primary .textarea__field:focus{border-color:var(--primary)}.textarea--secondary .textarea__field:focus{border-color:var(--secondary)}.textarea--success .textarea__field:focus{border-color:var(--success)}.textarea--error .textarea__field:focus{border-color:var(--error)}.textarea__field::-moz-placeholder{color:var(--neutral-02)}.textarea__field:-ms-input-placeholder{color:var(--neutral-02)}.textarea__field::-webkit-input-placeholder{color:var(--neutral-02)}.textarea__field::-ms-input-placeholder{color:var(--neutral-02)}.textarea__field::placeholder{color:var(--neutral-02)}.textarea__label{display:block;padding-top:0.4rem;padding-bottom:0.4rem;font-size:1.1rem;font-weight:900;color:var(--neutral-03)}.textarea--disabled .textarea__label{color:var(--disabled-text)}.textarea__helperText{display:block;font-size:1.1rem}.textarea__helperText-required{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.textarea__helperText-required cc-icon{margin-right:1ch}.textarea__richTextSkeleton{width:100%;border-radius:0.4rem;border-width:1px;border-color:var(--neutral-02);padding-left:1.6rem;padding-right:1.6rem;padding-top:0.8rem;padding-bottom:0.8rem;background-color:var(--neutral-04);font-size:1.4rem;display:block;line-height:1.625;min-height:13.6rem}.textarea__richTextSkeleton+.textarea__helperText{display:none}.textarea__counter{font-size:1.2rem;color:var(--neutral-02)}.textarea__wrapper-helper{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;color:var(--error);margin-top:0.4rem}.textarea--bg-transparent .ck.ck-editor__main>.ck-editor__editable{background-color:transparent}.textarea--bg-white .ck.ck-editor__main>.ck-editor__editable{background-color:var(--neutral-04)}.textarea .ck.ck-toolbar{border-color:var(--neutral-02)}.textarea.textarea--disabled .ck.ck-toolbar{border-color:var(--disabled-background)}.textarea .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,.textarea .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners{border-top-left-radius:0.4rem;border-top-right-radius:0.4rem}.textarea .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable,.textarea .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{border-bottom-right-radius:0.4rem;border-bottom-left-radius:0.4rem}.textarea .ck.ck-editor__main>.ck-editor__editable.ck-focused{-webkit-box-shadow:none;box-shadow:none}.textarea .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){border-color:var(--neutral-02)}.textarea .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused).ck-read-only{border-color:var(--disabled-background)}.textarea .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items{-ms-flex-pack:end;justify-content:flex-end}.textarea.textarea--primary .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--primary)}.textarea.textarea--secondary .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--secondary)}.textarea--error .textarea{border-color:var(--error)}.textarea.textarea--success .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused),.textarea.textarea--success .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--success)}.textarea.textarea--error .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused),.textarea.textarea--error .ck.ck-editor__main>.ck-editor__editable.ck-focused{border-color:var(--error)}.textarea .ck.ck-editor__editable_inline>:first-child{margin-top:0.8rem}.textarea .ck.ck-editor__editable_inline>:last-child{margin-bottom:0.8rem}.textarea .ck.ck-editor__editable_inline{padding-left:1.6rem;padding-right:1.6rem;min-height:13.6rem}";
var CcTextarea = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
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
        this.focusEditor = function () {
            if (_this.rich) {
                _this.editorInstance.editing.view.focus();
                _this.putCursorAtTheEnd();
            }
            else {
                _this.textAreaEl.focus();
            }
        };
    }
    class_1.prototype.focusTextEditor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.focusEditor();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.setDataRichEditor = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.editorInstance.data.set(data);
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.validateName = function (newDisabled) {
        if (this.editorInstance)
            this.editorInstance.isReadOnly = newDisabled;
    };
    class_1.prototype.toggleRichText = function (richNew, richOld) {
        if (richNew !== richOld) {
            if (richNew && !richNew) {
                this.enableRichTextEditor();
            }
            else {
                this.disableRichTextEditor();
            }
        }
    };
    class_1.prototype.getAmountOfCharacters = function () {
        if (this.textAreaEl) {
            return this.textAreaEl.value.length;
        }
    };
    class_1.prototype.setValue = function (newValue) {
        if (this.rich) {
            if (this.editorInstance) {
                this.editorInstance.data.set(newValue);
            }
        }
        else {
            this.textAreaEl.value = newValue;
        }
    };
    class_1.prototype.changeTextHandler = function (newText) {
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
    };
    class_1.prototype.clearHtmlOnText = function (value) {
        var html = value || "";
        var div = document.createElement("div");
        div.innerHTML = html;
        var text = div.textContent || div.innerText || "";
        return text.length;
    };
    class_1.prototype.setRichTextEditorDefaults = function () {
        var _this = this;
        this.editorInstance.isReadOnly = this.disabled;
        if (this.value)
            this.editorInstance.data.set(this.value);
        this.editorInstance.model.document.on("change:data", function () {
            _this.changeTextHandler(_this.editorInstance.getData());
        });
    };
    class_1.prototype.enableRichTextEditor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toolbar, ClassicEditor, optionsEditor, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        toolbar = this.toolbar || [
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
                            return [2 /*return*/, null];
                        return [4 /*yield*/, import('./ckeditor-c4c5f2c9.js').then(function (n) { return n.c; })];
                    case 1:
                        ClassicEditor = (_b.sent()).default;
                        optionsEditor = {
                            toolbar: toolbar,
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
                        _a = this;
                        return [4 /*yield*/, ClassicEditor.create(this.richTextEl, optionsEditor)];
                    case 2:
                        _a.editorInstance = _b.sent();
                        this.setRichTextEditorDefaults();
                        this.setAdapterUpload(this.editorInstance);
                        return [2 /*return*/, this.editorInstance];
                }
            });
        });
    };
    class_1.prototype.setAdapterUpload = function (editor) {
        var _this = this;
        if (!this.enableImage && !this.imageService) {
            return;
        }
        editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
            return new UploadAdapter({ loader: loader, serviceUpload: _this.imageService });
        };
    };
    class_1.prototype.disableRichTextEditor = function () {
        if (this.rich && this.editorInstance)
            this.editorInstance.destroy();
    };
    class_1.prototype.putCursorAtTheEnd = function () {
        var _this = this;
        this.editorInstance.model.change(function (writer) {
            writer.setSelection(writer.createPositionAt(_this.editorInstance.model.document.getRoot(), "end"));
        });
    };
    class_1.prototype.componentDidLoad = function () {
        this.enableRichTextEditor();
    };
    class_1.prototype.componentWillLoad = function () {
        if (this.value && !this.rich) {
            this.lengthCharacter = this.value.length;
        }
        if (this.value && this.rich) {
            this.lengthCharacter = this.clearHtmlOnText(this.value);
        }
        this.changeText.emit(this.value);
        this.totalCharacters.emit(this.lengthCharacter);
    };
    class_1.prototype.componentDidUnload = function () {
        this.disableRichTextEditor();
    };
    class_1.prototype.render = function () {
        var _this = this;
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
            }, "data-testid": "cc-textarea" }, this.label && (h("label", { class: "textarea__label", onClick: this.focusEditor }, this.label)), this.rich ? (h("div", { class: "textarea__richTextSkeleton", ref: function (el) { return (_this.richTextEl = el); } }, this.value ? this.value : "")) : (h("textarea", { rows: 1, ref: function (el) { return (_this.textAreaEl = el); }, disabled: this.disabled, placeholder: this.placeholder, class: {
                textarea__field: true,
                "textarea__field--outlined": this.outlined,
                "textarea__field--icon": !!this.iconName && !this.rich,
                "textarea__field--auto-grow": this.autoGrow,
                "textarea__field--without-radius": this.withoutRadius,
                "textarea__field--bg-white": this.bgField === "white",
                "textarea__field--bg-transparent": this.bgField === "transparent"
            }, maxLength: !this.maxLength ? undefined : this.maxLength, name: this.name, value: this.value, onInput: function (e) { return _this.changeTextHandler(e.target.value); } })), !!this.iconName && !this.rich && (h("cc-icon", { class: {
                textarea__icon: true,
                "textarea__icon--primary": this.color === "primary",
                "textarea__icon--secondary": this.color === "secondary"
            }, name: this.iconName })), h("div", { class: "textarea__wrapper-helper" }, h("div", null, this.helperText && this.error && !this.success && !this.disabled && (h("span", { class: "textarea__helperText", onClick: this.focusEditor }, this.helperText)), this.lengthCharacter > this.maxLength && this.counter && (h("span", { class: "textarea__helperText", onClick: this.focusEditor }, "Has excedido el n\u00FAmero de caracteres.")), this.isRequired && !this.lengthCharacter && this.isModified && (h("div", { class: "textarea__helperText-required" }, h("cc-icon", { size: 16, name: "alert-triangle" }), h("span", { class: "textarea__helperText", onClick: this.focusEditor }, "Es necesario completar esta informaci\u00F3n.")))), h("div", null, this.counter && (h("span", { class: "textarea__counter" }, h("span", null, !!this.maxLength && this.lengthCharacter > this.maxLength
            ? "-"
            : "", this.lengthCharacter), h("span", null, "/"), h("span", null, !!this.maxLength ? this.maxLength : "maxLength is missing")))))));
    };
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "disabled": ["validateName"],
                "rich": ["toggleRichText"],
                "value": ["setValue"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CcTextarea.style = ccTextareaCss;
export { CcTextarea as cc_textarea };
