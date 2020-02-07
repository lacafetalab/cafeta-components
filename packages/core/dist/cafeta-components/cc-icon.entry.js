import { r as registerInstance, h, H as Host } from './core-15d86d4a.js';

var IcoMoonType = "selection";
var icons = [
	{
		icon: {
			paths: [
				"M853.333 938.667c-25.6 0-42.667-17.067-42.667-42.667v-85.333c0-72.533-55.467-128-128-128h-341.333c-72.533 0-128 55.467-128 128v85.333c0 25.6-17.067 42.667-42.667 42.667s-42.667-17.067-42.667-42.667v-85.333c0-119.467 93.867-213.333 213.333-213.333h341.333c119.467 0 213.333 93.867 213.333 213.333v85.333c0 25.6-17.067 42.667-42.667 42.667z",
				"M512 512c-119.467 0-213.333-93.867-213.333-213.333s93.867-213.333 213.333-213.333 213.333 93.867 213.333 213.333-93.867 213.333-213.333 213.333zM512 170.667c-72.533 0-128 55.467-128 128s55.467 128 128 128 128-55.467 128-128-55.467-128-128-128z"
			],
			attrs: [
				{
				},
				{
				}
			],
			isMulticolor: false,
			isMulticolor2: false,
			grid: 0,
			tags: [
				"user"
			]
		},
		attrs: [
			{
			},
			{
			}
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
const iconPaths = {
	IcoMoonType: IcoMoonType,
	icons: icons,
	height: height,
	metadata: metadata,
	preferences: preferences
};

const CcIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 24;
        this.color = "color-text-01";
        this.getPath = (iconName) => {
            const icon = iconPaths.icons.find(icon => icon.properties.name === iconName);
            if (icon) {
                return icon.icon.paths.join(" ");
            }
            else {
                return "";
            }
        };
    }
    render() {
        if (this.name === "") {
            return null;
        }
        return (h(Host, { class: {
                "cc-icon--color-text-02": this.color === "color-text-02",
                "cc-icon--color-text-03": this.color === "color-text-03"
            } }, h("svg", { class: "cc-icon", width: this.size, height: this.size, viewBox: "0 0 1024 1024" }, h("path", { d: this.getPath(this.name) }))));
    }
    static get style() { return ":host {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  --cc-icon-color: var(--color-text-01);\n}\n\n:host(.cc-icon--color-text-02) {\n  --cc-icon-color: var(--color-text-02);\n}\n\n:host(.cc-icon--color-text-03) {\n  --cc-icon-color: var(--color-text-03);\n}\n\n.cc-icon {\n  fill: var(--cc-icon-color);\n}"; }
};

export { CcIcon as cc_icon };
