import { h, Component, Host, Prop, Event, State } from "@stencil/core";
export class CcTracker {
    constructor() {
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
        return (h(Host, { class: "tracker", "data-testid": "cc-tracker" },
            h("ul", { class: { tracker__list: true } },
                this.showProgress && h("div", { class: "tracker__progress-base" }),
                this.showProgress && (h("div", { class: "tracker__progress", style: { width: `${this.progress}%` } }, " ")), (_a = this.trackersList) === null || _a === void 0 ? void 0 :
                _a.map((trackerItem, index) => {
                    return (h("li", { class: { tracker__item: true }, onClick: () => this.handleClickTrack(trackerItem, index) },
                        h("div", { class: {
                                tracker__circle: true,
                                "tracker__circle--readonly": this.readonly,
                                "tracker__circle--is-active": trackerItem.isActive,
                                "tracker__circle--is-completed": trackerItem.isCompleted,
                                "tracker__circle--is-incompleted": trackerItem.isIncompleted,
                                "tracker__circle--is-disabled": trackerItem.isDisabled
                            } },
                            trackerItem.iconName && (h("cc-icon", { name: trackerItem.iconName })),
                            !trackerItem.iconName && h("span", null, trackerItem.order)),
                        !this.withoutLabel && (h("p", { class: {
                                tracker__label: true,
                                "tracker__label--is-disabled": trackerItem.isDisabled,
                                "tracker__label--is-incompleted": trackerItem.isIncompleted
                            } }, trackerItem.label))));
                }))));
    }
    static get is() { return "cc-tracker"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() { return {
        "$": ["cc-tracker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["cc-tracker.css"]
    }; }
    static get properties() { return {
        "trackersList": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<ITrackerList>",
                "resolved": "ITrackerList[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "ITrackerList": {
                        "location": "import",
                        "path": "./interface"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "readonly": {
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
            "attribute": "readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "withoutLabel": {
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
            "attribute": "without-label",
            "reflect": false,
            "defaultValue": "false"
        },
        "showProgress": {
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
            "attribute": "show-progress",
            "reflect": false,
            "defaultValue": "true"
        }
    }; }
    static get states() { return {
        "progress": {}
    }; }
    static get events() { return [{
            "method": "changeTracker",
            "name": "changeTracker",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
