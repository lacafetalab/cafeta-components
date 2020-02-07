import { withKnobs, select } from "@storybook/addon-knobs/html";
import notes from "./readme.md";
import uso from "./usage.md";

export default { title: "Icon", decorators: [withKnobs] };

export const Icon = () => {
  const label = "Names";
  const options = {
    user: "user"
  };
  const defaultValue = "user";
  const groupId = "GROUP-ID1";

  const value = select(label, options, defaultValue, groupId);

  const label2 = "Colors";
  const options2 = {
    "color-text-01": "color-text-01",
    "color-text-02": "color-text-02",
    "color-text-03": "color-text-03"
  };
  const defaultValue2 = "color-text-01";
  const groupId2 = "GROUP-ID1";

  const value2 = select(label2, options2, defaultValue2, groupId2);

  return `<cc-icon name="${value}" color="${value2}"></cc-icon>`;
};

Icon.story = {
  parameters: {
    notes: {
      parametros: notes,
      uso
    }
  }
};
