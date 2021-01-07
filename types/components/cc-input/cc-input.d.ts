export declare class CcInput {
    private inputEl?;
    color: "primary" | "secondary";
    label?: string;
    type?: "text" | "password" | "number";
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    inputRef?: (el: HTMLInputElement) => void;
    error?: boolean;
    success?: boolean;
    helperText?: string;
    name?: string;
    iconName?: string;
    bgField?: string;
    autocomplete?: string;
    maxLength?: number;
    border?: boolean;
    el: HTMLElement;
    focusInput: () => void;
    setInputRef: (el: HTMLInputElement) => void;
    render(): any;
}
