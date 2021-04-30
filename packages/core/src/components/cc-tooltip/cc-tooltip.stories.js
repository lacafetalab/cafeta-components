import notes from "./readme.md";
import { withKnobs, text, boolean } from "@storybook/addon-knobs/html";

export default { title: "Tooltip", decorators: [withKnobs] };

const tooltipBuilder = (values) => {
    const tooltip = document.createElement("cc-tooltip");
    Object.keys(values).forEach(key => {
        const value = values[key];
        tooltip[key] = value;
    });
    return tooltip;
};

export const Tooltip = () => {
    const label1 = "message";
    const defaultValue1 = "Texto del tooltip";
    const groupId1 = "GROUP-ID1";
    const value1 = text(label1, defaultValue1, groupId1);

    const label2 = "hideCloseButton";
    const defaultValue2 = false;
    const groupId2 = "GROUP-ID1";
    const value2 = boolean(label2, defaultValue2, groupId2);

    const label3 = "imagePath";
    const defaultValue3 = "";
    const groupId3 = "GROUP-ID1";
    const value3 = text(label3, defaultValue3, groupId3);

    const tooltip1 = tooltipBuilder({
        message: value1,
        hideCloseButton: value2,
        imagePath: value3,
        visible: true,
    });

    const tooltip2 = tooltipBuilder({
        message: value1,
        hideCloseButton: value2,
        imagePath: value3,
        visible: true,
        size: 'sm'
    });

    const wrap = document.createElement("div");
    wrap.innerHTML = `
  <div class="p-lg">
    <h1 class="heading-01">Tootlip</h1>
    <section class="py-xlg  ">
      <h2 class="text-subheading-02 mb-lg font-regular font-black">Tooltip Base</h1>
      <div class="flex items-end mb-lg">
        <div class="mt-lg flex flex-col align-middle w-full px-xxlg mx-xxlg" id="tooltip1"></div>
        <div class="mt-lg flex flex-col align-middle w-full px-xxlg mx-xxlg" id="tooltip2"></div>
      </div>
    </section>
  </div>`;

    wrap.querySelector("#tooltip1").appendChild(tooltip1);
    wrap.querySelector("#tooltip2").appendChild(tooltip2);
    return wrap

};

Tooltip.story = {
    parameters: {
      notes
    }
  };
