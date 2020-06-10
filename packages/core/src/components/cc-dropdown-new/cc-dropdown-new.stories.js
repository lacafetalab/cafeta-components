import notes from "./readme.md";
import { withKnobs, boolean } from "@storybook/addon-knobs/html";

export default { title: "Form", decorators: [withKnobs] };

const dropdownBuilder = (itemsWrapper, values) => {
  const dropdown = document.createElement("cc-dropdown-new");
  dropdown.choices = itemsWrapper.choices;
  Object.keys(values).forEach((key, index) => {
    const value = values[key];
    dropdown[key] = value;
  });
  return dropdown;
};


export const DropdownNew = () => {
  const itemsWrapper = {
    choices: [
      { value: "123", label: "Seleccione una opción", placeholder: true, selected:true },
      { value: "123", label: "Opción muy grande que aparece en el dropdown que debe ser controlado. Lorem ipsoum selet amonet os sebut" },
      { value: "124", label: "Opción 2" },
      { value: "125", label: "Opción 3" },
      { value: "126", label: "Opción 4" },
      { value: "127", label: "Opción 5", disabled: true },
      { value: "128", label: "Opción 6" }
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

  const label4 = "Label";
  const defaultValue4 = false;
  const groupId4 = "GROUP-ID1";
  const value4 = boolean(label4, defaultValue4, groupId4) ? 'LABEL' : '';

  const label5 = "Loader";
  const defaultValue5 = false;
  const groupId5 = "GROUP-ID1";
  const value5 = boolean(label5, defaultValue5, groupId5);

  const label6 = "Icon Only";
  const defaultValue6 = false;
  const groupId6 = "GROUP-ID1";
  const value6 = boolean(label6, defaultValue6, groupId6);

  const dropdown11 = dropdownBuilder(itemsWrapper, {
    placeholder: defaultValue1,
    disabled: value2,
    error: value3,
    label: value4,
    loader: value5,
    iconOnly: value6,
    helperText: "Incorrect entry"
  });

  dropdown11.addEventListener("changeChoice", e => {
    console.log("onChange ->", e);
  });
  dropdown11.addEventListener("clickDropdown", e => {
    console.log("onClick ->", e);
  });

  const dropdown12 = dropdownBuilder(itemsWrapper, {
    placeholder: defaultValue1,
    disabled: value2,
    error: value3,
    label: value4,
    loader: value5,
    type: "multiple",
    iconOnly: value6,
    helperText: "Incorrect entry"
  });

  dropdown12.addEventListener("changeChoice", e => {
    console.log("onChange ->", e);
  });

  dropdown12.addEventListener("clickDropdown", e => {
    console.log("onClick ->", e);
  });

  const dropdown21 = dropdownBuilder(itemsWrapper, {
    placeholder: defaultValue1,
    disabled: value2,
    error: value3,
    label: value4,
    loader: value5,
    color: "secondary",
    iconOnly: value6,
    helperText: "Incorrect entry"
  });

  const dropdown22 = dropdownBuilder(itemsWrapper, {
    placeholder: defaultValue1,
    disabled: value2,
    error: value3,
    label: value4,
    loader: value5,
    color: "secondary",
    type: "multiple",
    iconOnly: value6,
    helperText: "Incorrect entry"
  });

  const dropdown31 = dropdownBuilder(itemsWrapper, {
    placeholder: defaultValue1,
    disabled: value2,
    error: value3,
    label: value4,
    loader: value5,
    border: false,
    iconOnly: value6,
    helperText: "Incorrect entry"
  });

  const dropdown32 = dropdownBuilder(itemsWrapper, {
    placeholder: defaultValue1,
    disabled: value2,
    error: value3,
    border: false,
    label: value4,
    loader: value5,
    iconOnly: value6,
    type: "multiple",
    helperText: "Incorrect entry"
  });

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-lg">
    <h1 class="heading-01">Dropdown primary</h1>
    <section class="py-xlg  ">
      <h2 class="text-subheading-02 mb-lg font-regular font-black">Dropdown Primary</h1>
      <div class="flex items-end mb-lg">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="drop11"></div>
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="drop12"></div>
      </div>
      <h2 class="text-subheading-02 mb-lg font-regular font-black mt-xlg inline-block">Dropdown Secondary</h1>
      <div class="flex items-end mb-lg">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="drop21"></div>
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="drop22"></div>
      </div>
      <h2 class="text-subheading-02 mb-lg font-regular font-black mt-xlg inline-block">Dropdown No Border</h1>
      <div class="flex items-end mb-lg">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="drop31"></div>
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="drop32"></div>
      </div>
    </section>
  </div>`;

  wrap.querySelector("#drop11").appendChild(dropdown11);
  wrap.querySelector("#drop12").appendChild(dropdown12);
  wrap.querySelector("#drop21").appendChild(dropdown21);
  wrap.querySelector("#drop22").appendChild(dropdown22);
  wrap.querySelector("#drop31").appendChild(dropdown31);
  wrap.querySelector("#drop32").appendChild(dropdown32);
  return wrap;
};

DropdownNew.story = {
  parameters: {
    notes
  }
};
