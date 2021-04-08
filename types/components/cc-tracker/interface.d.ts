export interface ITrackerList {
    order: number;
    isActive: boolean;
    isCompleted: boolean;
    isIncompleted: boolean;
    isDisabled: boolean;
    label?: string;
    iconName?: string;
}
