import {
  Host,
  h,
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
  Element
} from "@stencil/core";

export type TabOption = {
  active?: boolean;
  disabled?: boolean;
  text: string;
  value: any;
};

@Component({
  tag: "cc-tabs-underline",
  styleUrl: "cc-tabs-underline.scss",
  shadow: true
})
export class CcTabsUnderline {
  private wrapTabs: HTMLElement;
  private animating: boolean = false;

  @Prop() size?: "sm" | "md" = "md";
  @Prop() border?: boolean = false;
  @Prop() center?: boolean = false;
  @Prop() color?: "primary" | "secondary" = "primary";
  @Prop() options?: TabOption[] = [];

  @State() _options: TabOption[];

  @State() linePosition: {
    left: number;
    width: number;
  } = {
    left: 0,
    width: 0
  };

  @Event() changeOption: EventEmitter<TabOption>;

  @Element() el: HTMLElement;

  @Watch("options")
  setOptions(newValue: TabOption[], oldValue: TabOption[]) {
    const newValueStringify = JSON.stringify(newValue);
    const oldValueStringify = JSON.stringify(oldValue);

    if (newValueStringify !== oldValueStringify) {
      this._options = newValue;
    }
  }

  @Watch("_options")
  animateFromToTab(newValue: TabOption[]) {
    if (this.linePosition.left === 0 && this.linePosition.width === 0) {
      return;
    }
    const nextIndex = newValue.findIndex(option => !!option.active);
    const nextEl = this.wrapTabs.querySelectorAll(".tabLine__button")[
      nextIndex
    ];

    const nextRect = nextEl.getBoundingClientRect();
    const parentRect = this.el.getBoundingClientRect();
    const nextPosLeft = nextRect.left - parentRect.left;

    const newLinePosition = this.calculateLinePosition({
      prevLeft: this.linePosition.left,
      nextWidth: nextRect.width,
      nextLeft: nextPosLeft,
      side: this.linePosition.left < nextPosLeft ? "toRight" : "toLeft"
    });

    this.animating = true;
    this.linePosition = newLinePosition.firstStep;

    setTimeout(() => {
      this.linePosition = newLinePosition.secondStep;
      this.animating = false;
    }, 300);
  }

  animateDefaultLine() {
    const activeIndex = this._options.findIndex(option => !!option.active);

    if (activeIndex < 0) return;

    const activeEl = this.wrapTabs.querySelectorAll(".tabLine__button")[
      activeIndex
    ];

    const lineRect = activeEl.getBoundingClientRect();
    const parentRect = this.el.getBoundingClientRect();

    this.linePosition = {
      left: lineRect.left - parentRect.left,
      width: lineRect.width
    };
  }

  calculateLinePosition(params: {
    prevLeft: number;
    nextWidth: number;
    nextLeft: number;
    side: "toLeft" | "toRight";
  }) {
    const firstStep = {
      left: params.side === "toRight" ? params.prevLeft : params.nextLeft,
      width:
        params.side === "toRight"
          ? params.nextLeft - params.prevLeft + params.nextWidth
          : params.prevLeft - params.nextLeft + params.nextWidth
    };

    const secondStep = {
      left: params.nextLeft,
      width: params.nextWidth
    };

    return {
      firstStep,
      secondStep
    };
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

    if (option.disabled || this.animating) {
      return;
    }

    this.updateOptions(index);
    this.changeOption.emit(option.value);
  };

  componentWillLoad() {
    this._options = this.options;
  }

  componentDidLoad() {
    this.animateDefaultLine();
  }

  render() {
    return (
      <Host>
        <div
          class={{
            tabLine: true,
            "tabLine--border": this.border,
            "tabLine--center": this.center
          }}
          ref={el => (this.wrapTabs = el)}
        >
          {this._options.map((option, index) => (
            <button
              key={`tabItem_${index}`}
              class={{
                tabLine__button: true,
                "tabLine__button--secondary": this.color === "secondary",
                "tabLine__button--sm": this.size === "sm",
                "tabLine__button--active": option.active,
                "tabLine__button--disabled": option.disabled
              }}
              onClick={this.handleOptionClick(index)}
            >
              {option.text}
            </button>
          ))}
          <div
            class="tabLine__underline"
            style={{
              left: `${this.linePosition.left}px`,
              width: `${this.linePosition.width}px`
            }}
          />
        </div>
      </Host>
    );
  }
}
