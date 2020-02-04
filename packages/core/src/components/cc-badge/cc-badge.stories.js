import { withKnobs, text, select } from "@storybook/addon-knobs/html";
import notes from "./readme.md";

export default { title: "Badge", decorators: [withKnobs] };

export const Badge = () => {
  const label = "Text";
  const defaultValue = "Badge Text";
  const groupId = "GROUP-ID1";
  const value = text(label, defaultValue, groupId);

  const label2 = "Icon";
  const options2 = {
    "interactive-01": "interactive-01",
    "interactive-02": "interactive-02",
    "support-success": "support-success",
    "support-error": "support-error",
    "support-alert": "support-alert"
  };
  const defaultValue2 = "interactive-01";
  const groupId2 = "GROUP-ID1";
  const value2 = select(label2, options2, defaultValue2, groupId2);

  return `<cc-badge color="${value2}">${value}</cc-badge>`;
};

Badge.story = {
  parameters: {
    notes
  }
};
