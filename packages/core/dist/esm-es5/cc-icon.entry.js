import { r as registerInstance, h, H as Host } from './core-5f86e29c.js';
var IcoMoonType = "selection";
var icons = [
    {
        icon: {
            paths: [
                "M853.333 938.667c-25.6 0-42.667-17.067-42.667-42.667v-85.333c0-72.533-55.467-128-128-128h-341.333c-72.533 0-128 55.467-128 128v85.333c0 25.6-17.067 42.667-42.667 42.667s-42.667-17.067-42.667-42.667v-85.333c0-119.467 93.867-213.333 213.333-213.333h341.333c119.467 0 213.333 93.867 213.333 213.333v85.333c0 25.6-17.067 42.667-42.667 42.667z",
                "M512 512c-119.467 0-213.333-93.867-213.333-213.333s93.867-213.333 213.333-213.333 213.333 93.867 213.333 213.333-93.867 213.333-213.333 213.333zM512 170.667c-72.533 0-128 55.467-128 128s55.467 128 128 128 128-55.467 128-128-55.467-128-128-128z"
            ],
            attrs: [
                {},
                {}
            ],
            isMulticolor: false,
            isMulticolor2: false,
            grid: 0,
            tags: [
                "user"
            ]
        },
        attrs: [
            {},
            {}
        ],
        properties: {
            order: 4,
            id: 0,
            name: "user",
            prevSize: 32,
            code: 59648
        },
        setIdx: 0,
        setId: 0,
        iconIdx: 0
    }
];
var height = 1024;
var metadata = {
    name: "icomoon"
};
var preferences = {
    showGlyphs: true,
    showCodes: true,
    showQuickUse: true,
    showQuickUse2: true,
    showSVGs: true,
    fontPref: {
        prefix: "icon-",
        metadata: {
            fontFamily: "icomoon"
        },
        metrics: {
            emSize: 1024,
            baseline: 6.25,
            whitespace: 50
        },
        embed: false,
        autoHost: true
    },
    imagePref: {
        prefix: "icon-",
        png: true,
        useClassSelector: true,
        color: 0,
        bgColor: 16777215,
        name: "icomoon",
        classSelector: ".icon",
        autoHost: true
    },
    historySize: 50,
    gridSize: 16,
    showGrid: false,
    quickUsageToken: {
        UntitledProject: "NzNhZTAzMjdjMmUxY2YzZmJjNTZhOTdmZWY2ZWM2NTMjMSMxNTgxMDk4MzU4IyMj"
    }
};
var iconPaths = {
    IcoMoonType: IcoMoonType,
    icons: icons,
    height: height,
    metadata: metadata,
    preferences: preferences
};
var CcIcon = /** @class */ (function () {
    function CcIcon(hostRef) {
        registerInstance(this, hostRef);
        this.size = 24;
        this.color = "color-text-01";
        this.getPath = function (iconName) {
            var icon = iconPaths.icons.find(function (icon) { return icon.properties.name === iconName; });
            if (icon) {
                return icon.icon.paths.join(" ");
            }
            else {
                return "";
            }
        };
    }
    CcIcon.prototype.render = function () {
        if (this.name === "") {
            return null;
        }
        return (h(Host, { class: {
                "cc-icon--color-text-02": this.color === "color-text-02",
                "cc-icon--color-text-03": this.color === "color-text-03"
            } }, h("svg", { class: "cc-icon", width: this.size, height: this.size, viewBox: "0 0 1024 1024" }, h("path", { d: this.getPath(this.name) }))));
    };
    Object.defineProperty(CcIcon, "style", {
        get: function () { return ".cc-icon{fill:currentColor}"; },
        enumerable: true,
        configurable: true
    });
    return CcIcon;
}());
export { CcIcon as cc_icon };
