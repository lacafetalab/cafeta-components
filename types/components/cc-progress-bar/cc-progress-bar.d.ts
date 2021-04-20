export declare class CcProgressBar {
    tooltipContainer: HTMLDivElement;
    color: "primary" | "secondary";
    error?: boolean;
    success?: boolean;
    alert?: boolean;
    progress: number;
    type: "single" | "label" | "percentage" | "text";
    label: string;
    tooltipText: string;
    tooltipPosition: number;
    el: HTMLElement;
    handleTooltipPosition(): void;
    componentDidLoad(): void;
    componentShouldUpdate(newVal: any, oldVal: any, propName: string): void;
    render(): any;
}
