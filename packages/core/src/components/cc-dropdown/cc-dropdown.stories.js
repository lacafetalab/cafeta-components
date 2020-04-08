import notes from "./readme.md";
import { withKnobs, boolean } from "@storybook/addon-knobs/html";

export default { title: "Dropdown", decorators: [withKnobs] };

export const Dropdown = () => {
  const itemsWrapper = {
    choices: [
      { value: "123", label: "Opción 1" },
      { value: "124", label: "Opción   2" }
    ]
  };

  const label1 = "Default Option";
  const defaultValue1 = 'Seleccione una opción';
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
  
  const dropdown = document.createElement("cc-dropdown");
  
  dropdown.choices = itemsWrapper.choices;
  if (value1) {
    dropdown.placeholder = defaultValue1;
  }
  if (value2) {
    dropdown.disabled = value2;
  }
  if (value3) {
    dropdown.error = value3;
  }
  dropdown.onChangeChoice = (e) => {
    console.log('onChange', e)
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
