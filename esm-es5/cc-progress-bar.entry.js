import { r as registerInstance, h, H as Host, g as getElement } from './index-b08024e3.js';
var ccProgressBarCss = ".sc-cc-progress-bar-h{display:block;--cc-progress-bar-default-background:var(--primary)}.progress-bar--success.sc-cc-progress-bar-h{--cc-progress-bar-default-background:var(--success)}.progress-bar--error.sc-cc-progress-bar-h{--cc-progress-bar-default-background:var(--error)}.progress-bar--alert.sc-cc-progress-bar-h{--cc-progress-bar-default-background:var(--alert)}.progressbar.sc-cc-progress-bar{background-color:var(--background-01);border-radius:4px;height:6px;width:100%;position:relative}.progressbar__content.sc-cc-progress-bar{background:var(--cc-progress-bar-default-background);border-radius:4px;height:6px;width:0;max-width:100%}.progressbar__label.sc-cc-progress-bar{display:block;font-size:1.1rem;color:var(--disabled-text);font-weight:900;padding-top:6px;padding-bottom:6px}.progressbar__label.completed.sc-cc-progress-bar{color:var(--neutral-03)}.progressbar__tooltip.sc-cc-progress-bar{-webkit-transition:0.3s ease all;transition:0.3s ease all;background:var(--cc-progress-bar-default-background);position:absolute;padding-left:0.8rem;padding-right:0.8rem;padding-top:0.4rem;padding-bottom:0.4rem;color:var(--neutral-04);display:inline-block;border-radius:0.4rem;font-size:1.1rem}.progressbar__tooltip__container.sc-cc-progress-bar{position:relative;height:24px;margin-top:6px;margin-bottom:6px}";
var CcProgressBar = /** @class */ (function () {
    function CcProgressBar(hostRef) {
        registerInstance(this, hostRef);
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
    CcProgressBar.prototype.handleTooltipPosition = function () {
        if (!!this.tooltipContainer && !!this.tooltipContainer.parentElement) {
            var proportion = (this.tooltipContainer.offsetWidth * 100) / this.tooltipContainer.parentElement.offsetWidth;
            if (this.type === "percentage") {
                if (this.progress < (proportion / 2)) {
                    this.tooltipPosition = 0;
                }
                else if (this.progress > 100 - (proportion / 2)) {
                    this.tooltipPosition = 100 - proportion;
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
    };
    CcProgressBar.prototype.componentDidLoad = function () {
        if (this.progress > 100) {
            this.progress = 100;
        }
        else if (this.progress < 0) {
            this.progress = 0;
        }
        this.handleTooltipPosition();
    };
    CcProgressBar.prototype.componentShouldUpdate = function (newVal, oldVal, propName) {
        if (propName === 'progress' && newVal !== oldVal) {
            if (newVal > 100) {
                this.progress = 100;
            }
            else if (newVal < 0) {
                this.progress = 0;
            }
            this.handleTooltipPosition();
        }
    };
    CcProgressBar.prototype.render = function () {
        var _this = this;
        return (h(Host, { class: {
                "progress-bar--secondary": this.color === "secondary",
                "progress-bar--error": this.error,
                "progress-bar--success": this.success,
                "progress-bar--alert": this.alert,
            }, "data-testid": "cc-progress-bar" }, this.type === 'label' && (h("p", { class: {
                "progressbar__label": true,
                "completed": this.progress === 100,
            } }, this.label)), (this.type === 'percentage' || this.type === 'text') && (h("div", { class: {
                "progressbar__tooltip__container": true
            } }, h("div", { ref: function (el) {
                _this.tooltipContainer = el;
            },
            // style={{marginLeft:`${this.tooltipPosition}%`}} 
            style: { left: this.tooltipPosition + "%" }, class: {
                "progressbar__tooltip": true
            } }, this.type === 'percentage' && h("p", null, this.progress, " %"), this.type === 'text' && h("p", null, this.tooltipText)))), h("div", { "data-testid": "progress-bar__container", class: {
                progressbar: true,
            } }, h("div", { class: "progressbar__content", style: { width: this.progress + "%" } }))));
    };
    Object.defineProperty(CcProgressBar.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return CcProgressBar;
}());
CcProgressBar.style = ccProgressBarCss;
export { CcProgressBar as cc_progress_bar };
