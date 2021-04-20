import { withKnobs, number, text } from "@storybook/addon-knobs/html";
import { radios } from "@storybook/addon-knobs"
import notes from "./readme.md";

export default { title: "Form", decorators: [withKnobs] };

export const ProgressBar = () => {
  const progress = number("Progress",50);
  const wrap = document.createElement("div");
  const options = {
    Single: "single",
    Label: "label",
    "Tooltip Percentage": "percentage",
    "Tooltip Text": "text",
  };
  const type = radios("Type", options, 'single');
  const label = text('Label', '');
  const textT = text('Text', '');

  wrap.innerHTML = `
    <div class="p-xxlg bg-neutral-04">
      <h2 class="font-bold text-heading-02 text-neutral-03">Default</h2>
      <cc-progress-bar progress="${progress}"></cc-progress-bar>
    </div>

    <div class="p-xxlg bg-neutral-04">
      <h2 class="font-bold text-heading-02 text-neutral-03">Error</h2>
      <cc-progress-bar error progress="${progress}"></cc-progress-bar>
    </div>

    <div class="p-xxlg bg-neutral-04">
      <h2 class="font-bold text-heading-02 text-neutral-03">Success</h2>
      <cc-progress-bar success progress="${progress}"></cc-progress-bar>
    </div>

    <div class="p-xxlg bg-neutral-04">
      <h2 class="font-bold text-heading-02 text-neutral-03">Alert</h2>
      <cc-progress-bar alert progress="${progress}"></cc-progress-bar>
    </div>

    <div class="p-xxlg bg-neutral-04">
      <cc-progress-bar type="${type}" label="${label}" tooltip-text="${textT}" alert progress="${progress}"></cc-progress-bar>
    </div>

  `;

  return wrap;
};

ProgressBar.story = {
  parameters: {
    notes
  }
};
