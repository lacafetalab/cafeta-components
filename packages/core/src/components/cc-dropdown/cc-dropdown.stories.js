import notes from "./readme.md";
import { withKnobs, boolean } from "@storybook/addon-knobs/html";

export default { title: "Dropdown", decorators: [withKnobs] };

export const Dropdown = () => {
  const itemsWrapper = {
    choices: [
      { value: "aaa", label: "bbbb" },
      { value: "cccccc", label: "ddddddd" }
    ]
  };

  const dropdown = document.createElement("cc-dropdown");

  const label3 = "Error";
  const defaultValue3 = false;
  const groupId3 = "GROUP-ID1";
  const value3 = boolean(label3, defaultValue3, groupId3);

  const label2 = "Disabled";
  const defaultValue2 = false;
  const groupId2 = "GROUP-ID1";
  const value2 = boolean(label2, defaultValue2, groupId2);

  dropdown.choices = itemsWrapper.choices;
  if (value3) {
    dropdown.error = value3;
  }
  if (value2) {
    dropdown.disabled = value2;
  }

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-lg">
    <h1 class="heading-01">Dropdown primary</h1>
    <section class="py-xlg color-primary font-black">
      <h2 class="text-subheading-02 mb-lg font-regular">Dropdown Inline</h1>
      <div>
        <div class="mr-lg mt-lg flex flex-col align-middle" id="drop1">
          <h2 class="text-center font-regular">size: <strong class="font-bold">default</strong></h1>
        </div>
      </div>
    </section>
    <section class="py-xlg color-primary font-black">
      <h2 class="text-subheading-02 mb-lg font-regular">Dropdown with Label</h1>
      <div >
        <div class="mr-lg mt-lg flex flex-col align-middle">
          <h2 class="text-center font-regular">size: <strong class="font-bold">default</strong></h1>
        </div>
      </div>
    </section>
  </div>`;

  wrap.querySelector("#drop1").appendChild(dropdown);
  return wrap;
};

Dropdown.story = {
  parameters: {
    notes
  }
};
