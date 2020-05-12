import notes from "./readme.md";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Tabs", decorators: [withKnobs] };

export const Tags = () => {
  const wrap = document.createElement("div");
  const options = [
    {
      text: "Pestaña 1",
      value: "1"
    },
    {
      text: "Pestaña 2",
      value: "2",
      active: true
    },
    {
      text: "Pestaña 3",
      value: "3",
      disabled: true
    },
    {
      text: "Pestaña 4",
      value: "4"
    }
  ];

  wrap.innerHTML = `
    <div class="p-xxlg">
      <cc-tabs-tags></cc-tabs-tags>
    </div>
  `;

  wrap.querySelectorAll("cc-tabs-tags").forEach(el => {
    el.options = options;
    el.addEventListener("changeOption", e => {
      console.log(e.detail);
    });
  });

  return wrap;
};

Tags.story = {
  parameters: {
    notes
  }
};
