import { EventEmitter } from "../../stencil-public-runtime";
import "choices.js/public/assets/scripts/choices.min.js";
import "choicesjs-stencil";
export declare class CcNavbarWeb {
    iconOnly: boolean;
    disabled: boolean;
    openProfileMenu: boolean;
    private datalist;
    el: HTMLElement;
    changeChoice: EventEmitter;
    clickProfileMenu: EventEmitter;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private loadMenu;
    toggleProfileMenu: (e: any) => void;
    render(): any;
}
export interface MenuList {
    url: string;
    label: string;
    icon: string;
    active: boolean;
}
