import { withKnobs, select } from "@storybook/addon-knobs/html";
import notes from "./readme.md";
import uso from "./usage.md";
import iconPaths from "./selection";

export default { title: "Icon", decorators: [withKnobs] };

export const Icon = () => {
  const label = "Names";
  const options = iconPaths.icons.reduce(
    (options, icon) => ({
      ...options,
      [icon.properties.name]: icon.properties.name
    }),
    {}
  );

  const defaultValue = "user";
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
