import { EventEmitter } from "../../stencil-public-runtime";
import { TabOption } from "../../utils/types/TabOption";
export declare class CcTabsTags {
    color?: "primary" | "secondary";
    options?: TabOption[];
    _options: TabOption[];
    changeOption: EventEmitter<TabOption>;
    setOptions(newValue: TabOption[], oldValue: TabOption[]): void;
    updateOptions(index: number): void;
    handleOptionClick: (index: number) => () => void;
    componentWillLoad(): void;
    render(): any;
}
