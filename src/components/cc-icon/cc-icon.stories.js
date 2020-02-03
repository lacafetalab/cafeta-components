import { withKnobs, select } from "@storybook/addon-knobs/html";
import notes from "./readme.md";
import uso from "./usage.md";

export default { title: "Icon", decorators: [withKnobs] };

export const Icon = () => {
  const label = "Names";
  const options = {
    file: "file",
    edit: "edit"
  };
  const defaultValue = "file";
  const groupId = "GROUP-ID1";

  const value = select(label, options, defaultValue, groupId);

  return `<cc-icon name="${value}"></cc-icon>`;
};

Icon.story = {
  parameters: {
    notes: {
      parametros: notes,
      uso
    }
  }
};
