export declare class CcCheckfield {
    private inputEl;
    type?: "checkbox" | "radio";
    name?: string;
    value?: string;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    size?: "small" | "medium";
    shape?: "circle" | "square";
    error?: boolean;
    color: "primary" | "secondary";
    inputRef?: (el: HTMLInputElement) => void;
    setInputRef: (el: HTMLInputElement) => void;
    render(): any;
}
