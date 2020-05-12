import {
  Component,
  Prop,
  State,
  h,
  Host,
  EventEmitter,
  Event,
  Watch
} from "@stencil/core";
import { TabOption } from "../../utils/types/TabOption";

@Component({
  tag: "cc-tabs-tags",
  styleUrl: "cc-tabs-tags.scss",
  shadow: true
})
export class CcTabsTags {
  @Prop() color?: "primary" | "secondary" = "primary";
  @Prop() options?: TabOption[] = [];

  @State() _options: TabOption[];

  @Event() changeOption: EventEmitter<TabOption>;

  @Watch("options")
  setOptions(newValue: TabOption[], oldValue: TabOption[]) {
    const newValueStringify = JSON.stringify(newValue);
    const oldValueStringify = JSON.stringify(oldValue);

    if (newValueStringify !== oldValueStringify) {
      this._options = newValue;
    }
  }

  updateOptions(index: number) {
    const newOptions = [...this._options].map(option => ({
      ...option,
      active: false
    }));

    newOptions[index].active = true;
    this._options = newOptions;
  }

  handleOptionClick = (index: number) => () => {
    const option = this._options[index];

    if (option.disabled) {
      return;
    }

    this.updateOptions(index);
    this.changeOption.emit(option.value);
  };

  componentWillLoad() {
    this._options = this.options;
  }

  render() {
    return (
      <Host>
        <div
          class={{
            tabTags: true
          }}
        >
          <div class="tabTags__wrap">
            {this._options.map((option, index) => (
              <button
                key={`tabTagItem_${index}`}
                class={{
                  tabTags__button: true,
                  "tabTags__button--secondary": this.color === "secondary",
                  "tabTags__button--active": option.active,
                  "tabTags__button--disabled": option.disabled
                }}
                onClick={this.handleOptionClick(index)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
