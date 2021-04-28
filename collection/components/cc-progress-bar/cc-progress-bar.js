import { Component, h, Host, Prop, State, Listen } from "@stencil/core";
export class CcProgressBar {
    constructor() {
        this.color = "secondary";
        this.error = false;
        this.success = false;
        this.alert = false;
        this.progress = 0;
        this.type = "single";
        this.label = '';
        this.tooltipText = '';
        this.tooltipPosition = 0;
    }
    handleTooltipPosition() {
        if (!!this.tooltip && !!this.tooltip.parentElement) {
            let proportion = (this.tooltip.offsetWidth * 100.00) / this.tooltip.parentElement.offsetWidth;
            if (this.type === "percentage") {
                if (this.progress < (proportion / 2)) {
                    this.tooltipPosition = 0;
                }
                else if (this.progress > 100.00 - (proportion / 2)) {
                    this.tooltipPosition = (100 - proportion);
                }
                else {
                    this.tooltipPosition = this.progress - (proportion / 2);
                }
            }
            if (this.type === "text") {
                if (this.progress < (proportion)) {
                    this.tooltipPosition = 0;
                }
                else {
                    this.tooltipPosition = this.progress - proportion;
                }
            }
        }
    }
    componentDidLoad() {
        if (this.progress > 100) {
            this.progress = 100;
        }
        else if (this.progress < 0) {
            this.progress = 0;
        }
        this.handleTooltipPosition();
    }
    componentShouldUpdate(newVal, oldVal, propName) {
        if (propName === 'progress' && newVal !== oldVal) {
            if (newVal > 100) {
                this.progress = 100;
            }
            else if (newVal < 0) {
                this.progress = 0;
            }
        }
        this.handleTooltipPosition();
    }
    handleResize() {
        this.handleTooltipPosition();
    }
    render() {
        return (h(Host, { class: {
                "progress-bar--secondary": this.color === "secondary",
                "progress-bar--error": this.error,
                "progress-bar--success": this.success,
                "progress-bar--alert": this.alert,
            }, "data-testid": "cc-progress-bar" },
            this.type === 'label' && (h("p", { class: {
                    "progressbar__label": true,
                    "completed": this.progress === 100,
                } }, this.label)),
            (this.type === 'percentage' || this.type === 'text') && (h("div", { class: {
                    "progressbar__tooltip__container": true
                } },
                h("div", { ref: el => {
                        this.tooltip = el;
                    }, 
                    // style={{marginLeft:`${this.tooltipPosition}%`}} 
                    style: { left: `${this.tooltipPosition}%` }, class: {
                        "progressbar__tooltip": true
                    } },
                    this.type === 'percentage' && h("p", null,
                        this.progress,
                        " %"),
                    this.type === 'text' && h("p", null, this.tooltipText)))),
            h("div", { "data-testid": "progress-bar__container", class: {
                    progressbar: true,
                } },
                h("div", { class: "progressbar__content", style: { width: `${this.progress}%` } }))));
    }
    static get is() { return "cc-progress-bar"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() { return {
        "$": ["cc-progress-bar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-progress-bar.css"]
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
            "defaultValue": "\"secondary\""
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
        "alert": {
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
            "attribute": "alert",
            "reflect": false,
            "defaultValue": "false"
        },
        "progress": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "progress",
            "reflect": false,
            "defaultValue": "0"
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"single\" | \"label\" | \"percentage\" | \"text\"",
                "resolved": "\"label\" | \"percentage\" | \"single\" | \"text\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"single\""
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
        },
        "tooltipText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "tooltip-text",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "tooltip": {},
        "tooltipPosition": {}
    }; }
    static get listeners() { return [{
            "name": "resize",
            "method": "handleResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
