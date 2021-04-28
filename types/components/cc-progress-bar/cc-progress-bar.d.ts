export declare class CcProgressBar {
    tooltip: HTMLDivElement;
    color: "primary" | "secondary";
    error?: boolean;
    success?: boolean;
    alert?: boolean;
    progress: number;
    type: "single" | "label" | "percentage" | "text";
    label: string;
    tooltipText: string;
    tooltipPosition: number;
    handleTooltipPosition(): void;
    componentDidLoad(): void;
    componentShouldUpdate(newVal: any, oldVal: any, propName: string): void;
    handleResize(): void;
    render(): any;
}
