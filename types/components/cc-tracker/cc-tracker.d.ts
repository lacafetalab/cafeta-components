import { EventEmitter } from "../../stencil-public-runtime";
import { ITrackerList } from "./interface";
export declare class CcTracker {
    trackersList: Array<ITrackerList>;
    readonly: boolean;
    withoutLabel: boolean;
    showProgress: boolean;
    changeTracker: EventEmitter;
    progress: number;
    handleClickTrack: (trackItem: ITrackerList, index: number) => void;
    getProgress: (orderActive: number) => number;
    render(): any;
}
