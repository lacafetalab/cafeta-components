import { EventEmitter } from "../../stencil-public-runtime";
import { TabOptionWithTag } from "../../utils/types/TabOption";
export declare class CcTabsUnderline {
    private wrapTabs;
    private animating;
    size?: "sm" | "md";
    border?: boolean;
    center?: boolean;
    color?: "primary" | "secondary";
    options?: TabOptionWithTag[];
    _options: TabOptionWithTag[];
    linePosition: {
        left: number;
        width: number;
    };
    changeOption: EventEmitter<TabOptionWithTag>;
    el: HTMLElement;
    setOptions(newValue: TabOptionWithTag[], oldValue: TabOptionWithTag[]): void;
    animateFromToTab(newValue: TabOptionWithTag[]): void;
    animateDefaultLine(): void;
    calculateLinePosition(params: {
        prevLeft: number;
        nextWidth: number;
        nextLeft: number;
        side: "toLeft" | "toRight";
    }): {
        firstStep: {
            left: number;
            width: number;
        };
        secondStep: {
            left: number;
            width: number;
        };
    };
    updateOptions(index: number): void;
    handleOptionClick: (index: number) => () => void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): any;
}
