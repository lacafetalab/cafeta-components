export declare type TabOption = {
    active?: boolean;
    disabled?: boolean;
    text: string;
    value: any;
};
export declare type TabOptionWithTag = TabOption & {
    tag?: {
        color?: string;
        text: string;
    };
};
