import { EventEmitter } from "../../stencil.core";
export declare class CcSingleSelectInput {
    private singleFileInput;
    private dropdownItems;
    private inputEl;
    private observerItems;
    _choices: Array<any>;
    isOpenDropdown: boolean;
    thereIsLowerSpace: boolean;
    positionOptionstop: boolean;
    valueInput: string;
    hideItemsIfSelected?: boolean;
    label: string;
    choices: Array<any>;
    error?: boolean;
    disabled?: boolean;
    fieldReadonly?: boolean;
    placeholder?: string;
    name?: string;
    currentValue?: string;
    iconName?: string;
    color: "primary" | "secondary";
    helperText?: string;
    border?: boolean;
    bgField?: string;
    loader?: boolean;
    autocomplete?: boolean;
    IconRotate?: boolean;
    changeChoice: EventEmitter;
    setChoices(newValue: any, oldValue: any): void;
    focusInput: () => void;
    clearChoices(): void;
    knowIfThereIsAnItemSelected(): boolean;
    validateIfTheNewOptionSelectedIsDifferentFromThePrevious(value: string | number): boolean;
    handleOptionClick: (value: string | number) => void;
    placeholderSelected: () => void;
    handleToogleOptions(): void;
    setInputValue(value: string): void;
    filteredChoices: () => any[];
    handleShowOptions: () => void;
    handleHideOptions: () => void;
    closeDroprownIfClickOutDropdown: (event: any) => void;
    getHeigthWrapperOptions: () => number;
    observerListItems: () => void;
    calculatePositionOfOptions: () => boolean;
    validateDisabled: () => void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): any;
}
