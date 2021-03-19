import notes from "./readme.md";
import { withKnobs, boolean } from "@storybook/addon-knobs/html";

export default { title: "Tracker", decorators: [withKnobs] };

const trackerBuilder = (itemsWrapper, values) => {
  const tracker = document.createElement("cc-tracker");
  tracker.trackersList = itemsWrapper.trackersList;
  Object.keys(values).forEach((key, index) => {
    const value = values[key];
    tracker[key] = value;
  });
  return tracker;
};


export const Tracker = () => {
  const itemsWrapper = {
    trackersList: [
      {
        order: 1,
        label: "probando el label 1",
        isActive: true,
        isCompleted: false,
        isIncompleted: false,
        isDisabled: false,
        iconName: ""
      },
      {
        order: 2,
        label: "probando el label 2",
        isActive: false,
        isCompleted: false,
        isIncompleted: true,
        isDisabled: false,
        iconName: ""
      },
      {
        order: 3,
        label: "probando el label 3",
        isActive: false,
        isCompleted: false,
        isIncompleted: true,
        isDisabled: false,
        iconName: ""
      },
      {
        order: 4,
        label: "soy el disabled",
        isActive: false,
        isCompleted: false,
        isIncompleted: false,
        isDisabled: true,
        iconName: ""
      },
    ]
  };

  const label1 = "readonly";
  const defaultValue1 = false;
  const groupId1 = "GROUP-ID1";
  const value1 = boolean(label1, defaultValue1, groupId1);


  const tracker1 = trackerBuilder(itemsWrapper, {
    readonly: value1
  })

  tracker1.addEventListener("changeTracker", e => {
    console.log("onChange ->", e.detail);
  });

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-lg">
    <h1 class="heading-01">Tracker primary</h1>
    <section class="py-xlg  ">
      <h2 class="text-subheading-02 mb-lg font-regular font-black">Tracker with readonly</h1>
      <div class="flex items-end mb-lg">
        <div class="mt-lg flex flex-col align-middle w-full px-xxlg mx-xxlg"  id="track1"></div>
      </div>
    </section>
  </div>`;

  wrap.querySelectorAll("cc-tracker").forEach(el => {
    el.addEventListener("input", e => {
      console.log(e);
    });
  });

  wrap.querySelector("#track1").appendChild(tracker1);
  return wrap
};

Tracker.story = {
  parameters: {
    notes
  }
};
