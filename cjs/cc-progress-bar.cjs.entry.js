'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5c45a7c9.js');

const ccProgressBarCss = ".sc-cc-progress-bar-h{display:block;--cc-progress-bar-default-background:var(--primary)}.progress-bar--success.sc-cc-progress-bar-h{--cc-progress-bar-default-background:var(--success)}.progress-bar--error.sc-cc-progress-bar-h{--cc-progress-bar-default-background:var(--error)}.progress-bar--alert.sc-cc-progress-bar-h{--cc-progress-bar-default-background:var(--alert)}.progressbar.sc-cc-progress-bar{background-color:var(--background-01);border-radius:4px;height:6px;width:100%;position:relative}.progressbar__content.sc-cc-progress-bar{background:var(--cc-progress-bar-default-background);border-radius:4px;height:6px;width:0;max-width:100%}.progressbar__label.sc-cc-progress-bar{display:block;font-size:1.1rem;color:var(--disabled-text);font-weight:900;padding-top:6px;padding-bottom:6px}.progressbar__label.completed.sc-cc-progress-bar{color:var(--neutral-03)}.progressbar__tooltip.sc-cc-progress-bar{-webkit-transition:0.3s ease all;transition:0.3s ease all;background:var(--cc-progress-bar-default-background);white-space:nowrap;position:absolute;padding-left:0.8rem;padding-right:0.8rem;padding-top:0.4rem;padding-bottom:0.4rem;color:var(--neutral-04);display:inline-block;border-radius:0.4rem;font-size:1.1rem}.progressbar__tooltip__container.sc-cc-progress-bar{position:relative;height:24px;margin-top:6px;margin-bottom:6px}";

const CcProgressBar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return (index.h(index.Host, { class: {
                "progress-bar--secondary": this.color === "secondary",
                "progress-bar--error": this.error,
                "progress-bar--success": this.success,
                "progress-bar--alert": this.alert,
            }, "data-testid": "cc-progress-bar" }, this.type === 'label' && (index.h("p", { class: {
                "progressbar__label": true,
                "completed": this.progress === 100,
            } }, this.label)), (this.type === 'percentage' || this.type === 'text') && (index.h("div", { class: {
                "progressbar__tooltip__container": true
            } }, index.h("div", { ref: el => {
                this.tooltip = el;
            },
            // style={{marginLeft:`${this.tooltipPosition}%`}} 
            style: { left: `${this.tooltipPosition}%` }, class: {
                "progressbar__tooltip": true
            } }, this.type === 'percentage' && index.h("p", null, this.progress, " %"), this.type === 'text' && index.h("p", null, this.tooltipText)))), index.h("div", { "data-testid": "progress-bar__container", class: {
                progressbar: true,
            } }, index.h("div", { class: "progressbar__content", style: { width: `${this.progress}%` } }))));
    }
};
CcProgressBar.style = ccProgressBarCss;

exports.cc_progress_bar = CcProgressBar;
