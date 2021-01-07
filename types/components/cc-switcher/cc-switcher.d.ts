export declare class CcSwitcher {
    private inputEl?;
    color?: "primary" | "secondary";
    error?: boolean;
    disabled?: boolean;
    value?: string;
    name?: string;
    inputRef?: (el: HTMLInputElement) => void;
    checked?: boolean;
    size?: "sm" | "md";
    setInputRef: (el: HTMLInputElement) => void;
    render(): any;
}
