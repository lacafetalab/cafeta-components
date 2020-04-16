import notes from "./readme.md";
import { withKnobs, boolean } from "@storybook/addon-knobs/html";

export default { title: "Dropdown", decorators: [withKnobs] };

const dropdownBuilder = (itemsWrapper, values) => {
  const dropdown = document.createElement("cc-dropdown");
  dropdown.choices = itemsWrapper.choices;
  console.log(values);
  Object.keys(values).forEach((key, index) => {
    const value = values[key];
    console.log(value);
    if (value) {
      dropdown[key] = value;
    }
    dropdown.addEventListener("changeChoice", e => {
      console.log("onChange", e.detail);
    });
  });
  return dropdown;
};

export const Dropdown = () => {
  const itemsWrapper = {
    choices: [
      { value: "123", label: "Seleccione una opción", placeholder: true },
      { value: "123", label: "Opción 1" },
      { value: "124", label: "Opción 2" }
    ]
  };

  const label1 = "Default Option";
  const defaultValue1 = "Seleccione una opción";
  const groupId1 = "GROUP-ID1";
  const value1 = boolean(label1, !!defaultValue1, groupId1);

  const label2 = "Disabled";
  const defaultValue2 = false;
  const groupId2 = "GROUP-ID1";
  const value2 = boolean(label2, defaultValue2, groupId2);

  const label3 = "Error";
  const defaultValue3 = false;
  const groupId3 = "GROUP-ID1";
  const value3 = boolean(label3, defaultValue3, groupId3);

  const dropdown1 = dropdownBuilder(itemsWrapper, {
    placeholder: defaultValue1,
    disabled: value2,
    error: value3
  });

  const dropdown2 = dropdownBuilder(itemsWrapper, {
    placeholder: defaultValue1,
    disabled: value2,
    error: value3,
    color: 'secondary',
    label: 'Optional Label'
  });

  dropdown2.addEventListener("changeChoice", e => {
    console.log("onChange", e.detail);
  });
  dropdown2.addEventListener("clickDropdown", e => {
    console.log("onClick", e);
  });

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-lg">
    <h1 class="heading-01">Dropdown primary</h1>
    <section class="py-xlg color-primary font-black">
      <h2 class="text-subheading-02 mb-lg font-regular">Dropdown Inline</h1>
      <div class="flex items-end">
        <div class="mr-lg mt-lg flex flex-col align-middle" style="min-width: 200px" id="drop2"></div>
        <div class="mr-lg mt-lg flex flex-col align-middle" style="min-width: 200px" id="drop1"></div>
      </div>
    </section>
  </div>`;

  wrap.querySelector("#drop1").appendChild(dropdown1);
  wrap.querySelector("#drop2").appendChild(dropdown2);
  return wrap;
};

Dropdown.story = {
  parameters: {
    notes
  }
};
