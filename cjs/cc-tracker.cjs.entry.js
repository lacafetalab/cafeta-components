'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5c45a7c9.js');

const ccTrackerCss = ".tracker__list.sc-cc-tracker{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;position:relative;margin-bottom:0.8rem;z-index:4}.tracker__progress.sc-cc-tracker{position:absolute;left:0;background-color:var(--primary);background-color:var(--primary);height:3px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:3}.tracker__progress-base.sc-cc-tracker{width:100%;position:absolute;left:0;background-color:var(--disabled-background);height:3px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:2}.tracker__item.sc-cc-tracker{display:-ms-flexbox;display:flex;position:relative;z-index:5}.tracker__circle.sc-cc-tracker{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;font-weight:700;position:relative;font-size:1.4rem;border-radius:9999px;min-width:4.8rem;min-height:4.8rem;max-height:4.8rem;max-width:4.8rem}.tracker__circle--readonly.sc-cc-tracker{cursor:default !important}.tracker__circle--is-active.sc-cc-tracker{color:var(--primary);background-color:var(--neutral-04);border-color:var(--primary);cursor:pointer;border:3px solid}.tracker__circle--is-disabled.sc-cc-tracker{cursor:not-allowed}.tracker__circle--is-completed.sc-cc-tracker{color:var(--neutral-04);background-color:var(--primary);cursor:pointer}.tracker__circle--is-disabled.sc-cc-tracker,.tracker__circle--is-incompleted.sc-cc-tracker{color:var(--disabled-text);background-color:var(--disabled-background)}.tracker__circle--is-incompleted.sc-cc-tracker{cursor:pointer}.tracker__circle.sc-cc-tracker cc-icon--is-active.sc-cc-tracker{color:var(--primary)}.tracker__circle.sc-cc-tracker cc-icon--is-completed.sc-cc-tracker{color:var(--neutral-04)}.tracker__circle.sc-cc-tracker cc-icon--is-disabled.sc-cc-tracker,.tracker__circle.sc-cc-tracker cc-icon--is-incompleted.sc-cc-tracker{color:var(--disabled-text)}.tracker__label.sc-cc-tracker{position:absolute;font-size:1.4rem;font-weight:700;color:var(--primary);width:-webkit-max-content;width:-moz-max-content;width:max-content;left:50%;bottom:-28px;-webkit-transform:translateX(-50%);transform:translateX(-50%);line-height:2rem}.tracker__label--is-disabled.sc-cc-tracker,.tracker__label--is-incompleted.sc-cc-tracker{color:var(--disabled-text)}";

const CcTracker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.changeTracker = index.createEvent(this, "changeTracker", 7);
        this.readonly = false;
        this.withoutLabel = false;
        this.showProgress = true;
        this.progress = 0;
        this.handleClickTrack = (trackItem, index) => {
            if (trackItem.isDisabled || this.readonly)
                return;
            const trackersListCopy = [...this.trackersList];
            trackersListCopy.map((item, i) => ((item.isActive = index === i && !item.isDisabled),
                (item.isCompleted = i < index && !item.isDisabled),
                (item.isIncompleted = i > index && !item.isDisabled)));
            this.trackersList = [...trackersListCopy];
            this.progress = this.getProgress(index);
            const value = trackItem.order;
            this.changeTracker.emit(value);
        };
        this.getProgress = (orderActive) => {
            if (orderActive === 0)
                return 0;
            const totalItems = this.trackersList.length;
            const totalIntervals = totalItems - 1;
            const percentForItem = 100 / totalIntervals;
            return percentForItem * (orderActive);
        };
    }
    render() {
        var _a;
        return (index.h(index.Host, { class: "tracker", "data-testid": "cc-tracker" }, index.h("ul", { class: { tracker__list: true } }, this.showProgress && index.h("div", { class: "tracker__progress-base" }), this.showProgress && (index.h("div", { class: "tracker__progress", style: { width: `${this.progress}%` } }, " ")), (_a = this.trackersList) === null || _a === void 0 ? void 0 :
            _a.map((trackerItem, index$1) => {
                return (index.h("li", { class: { tracker__item: true }, onClick: () => this.handleClickTrack(trackerItem, index$1) }, index.h("div", { class: {
                        tracker__circle: true,
                        "tracker__circle--readonly": this.readonly,
                        "tracker__circle--is-active": trackerItem.isActive,
                        "tracker__circle--is-completed": trackerItem.isCompleted,
                        "tracker__circle--is-incompleted": trackerItem.isIncompleted,
                        "tracker__circle--is-disabled": trackerItem.isDisabled
                    } }, trackerItem.iconName && (index.h("cc-icon", { name: trackerItem.iconName })), !trackerItem.iconName && index.h("span", null, trackerItem.order)), !this.withoutLabel && (index.h("p", { class: {
                        tracker__label: true,
                        "tracker__label--is-disabled": trackerItem.isDisabled,
                        "tracker__label--is-incompleted": trackerItem.isIncompleted
                    } }, trackerItem.label))));
            }))));
    }
};
CcTracker.style = ccTrackerCss;

exports.cc_tracker = CcTracker;
