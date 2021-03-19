import {
  h,
  Component,
  Host,
  Prop,
  Event,
  EventEmitter,
  State
} from "@stencil/core";

import { ITrackerList } from "./interface";

@Component({
  tag: "cc-tracker",
  styleUrl: "cc-tracker.scss",
  scoped: true
})
export class CcTracker {
  @Prop() trackersList: Array<ITrackerList>;
  @Prop() readonly: boolean = false;
  @Event() changeTracker: EventEmitter;
  @State() progress: number = 0;

  handleClickTrack = (trackItem: ITrackerList) => {
    if (trackItem.isDisabled || this.readonly) return;

    const trackersListCopy = [...this.trackersList];
    trackersListCopy.map(
      item => (
        (item.isActive = trackItem.order === item.order && !item.isDisabled),
        (item.isCompleted = item.order < trackItem.order && !item.isDisabled),
        (item.isIncompleted = item.order > trackItem.order && !item.isDisabled)
      )
    );

    this.trackersList = [...trackersListCopy];
    this.progress = this.getProgress(trackItem.order);
    const value = trackItem.order;
    this.changeTracker.emit(value);
  };

  getProgress = (orderActive: number) => {
    if (orderActive === 1) return 0;
    const totalItems = this.trackersList.length;
    const totalIntervals = totalItems - 1;
    const percentForItem = 100 / totalIntervals;
    return percentForItem * (orderActive - 1);
  };

  render() {
    return (
      <Host class={"tracker"} data-testid="cc-tracker">
        <ul class={{ tracker__list: true }}>
          <div class="tracker__progress-base"></div>
          <div class="tracker__progress" style={{ width: `${this.progress}%` }}>
            {" "}
          </div>
          {this.trackersList?.map(trackerItem => {
            return (
              <li
                class={{ tracker__item: true }}
                onClick={() => this.handleClickTrack(trackerItem)}
              >
                <div
                  class={{
                    tracker__circle: true,
                    "tracker__circle--readonly": this.readonly,
                    "tracker__circle--is-active": trackerItem.isActive,
                    "tracker__circle--is-completed": trackerItem.isCompleted,
                    "tracker__circle--is-incompleted":
                      trackerItem.isIncompleted,
                    "tracker__circle--is-disabled": trackerItem.isDisabled
                  }}
                >
                  {trackerItem.iconName && (
                    <cc-icon name={trackerItem.iconName}></cc-icon>
                  )}
                  {!trackerItem.iconName && <span>{trackerItem.order}</span>}
                </div>
                <p
                  class={{
                    tracker__label: true,
                    "tracker__label--is-disabled": trackerItem.isDisabled,
                    "tracker__label--is-incompleted": trackerItem.isIncompleted
                  }}
                >
                  {trackerItem.label}
                </p>
              </li>
            );
          })}
        </ul>
      </Host>
    );
  }
}
