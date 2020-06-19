import notes from "./readme.md";
import { withKnobs, text, boolean } from "@storybook/addon-knobs/html";
import { radios } from "@storybook/addon-knobs"

export default { title: "Form", decorators: [withKnobs] };

export const Checkfield = () => {

  const checkfieldBuilder = (values) => {
    const checkfiled = document.createElement("cc-checkfield");
    Object.keys(values).forEach((key, index) => {
      const value = values[key];
      checkfiled[key] = value;
    });
    return checkfiled;
  };

  const label = 'label';
  const defaultValue = "soy un label";
  const groupId = "GROUP-ID1";
  const value = text(label, defaultValue, groupId);

  const label1 = 'Disabled'
  const defaultValue1 = false;
  const groupId1 = "GROUP-ID1";
  const value1 = boolean(label1, defaultValue1, groupId1);

  const label2 = 'Error'
  const defaultValue2 = false;
  const groupId2 = "GROUP-ID1";
  const value2 = boolean(label2, defaultValue2, groupId2);

  const label3 = 'Checked'
  const defaultValue3 = false;
  const groupId3 = "GROUP-ID1";
  const value3 = boolean(label3, defaultValue3, groupId3);

  const label4 = "type";
  const options4 = {
    Checkbox: "checkbox",
    Radio: "radio"
  };
  const defaultValue4 = "checkbox";
  const groupId4 = "GROUP-ID1";
  const value4 = radios(label4, options4, defaultValue4, groupId4);

  const label5 = "shape";
  const options5 = {
    Circle: "circle",
    Square: "square"
  }
  const defaultValue5 = "circle";
  const groupId5 = "GROUP-ID1";
  const value5 = radios(label5, options5, defaultValue5, groupId5);

  const label6 = "size";
  const options6 = {
    Small: "small",
    Medium: "medium"
  }
  const defaultValue6 = "small";
  const groupId6 = "GROUP-ID1";
  const value6 = radios(label6, options6, defaultValue6, groupId6);

  const label7 = "value"
  const defaultValue7 = "";
  const groupdId7 = "GROUP-ID1";
  const value7 = text(label7, defaultValue7, groupdId7);

  const label8 = "name"
  const defaultValue8 = "";
  const groupdId8 = "GROUP-ID1";
  const value8 = text(label8, defaultValue8, groupdId8);

  const label9 = "color";
  const options9 = {
    Primary: "primary",
    Secondary: "secondary"
  }
  const defaultValue9 = "primary";
  const groupId9 = "GROUP-ID1";
  const value9 = radios(label9, options9, defaultValue9, groupId9);


  const radio1 = checkfieldBuilder({
    label: value,
    disabled: value1,
    error: value2,
    checked: value3,
    type: value4,
    shape: value5,
    size: value6,
    value: value7,
    name: value8,
    color: value9
  })

  const radio2 = checkfieldBuilder({
    label: value,
    disabled: value1,
    error: value2,
    checked: value3,
    type: value4,
    shape: value5,
    size: value6,
    value: value7,
    name: value8,
    color: value9
  })

  const radio3 = checkfieldBuilder({
    label: value,
    disabled: value1,
    error: value2,
    checked: value3,
    type: value4,
    shape: value5,
    size: value6,
    value: value7,
    name: value8,
    color: value9
  })
  const radio4 = checkfieldBuilder({
    label: value,
    disabled: value1,
    error: value2,
    checked: value3,
    type: value4,
    shape: value5,
    size: value6,
    value: value7,
    name: value8,
    color: value9
  })


  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Default</h2>
      <div class="flex flex-col">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="radio1">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="radio2">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="radio3">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="radio4">
      </div>
      </div>
    </div>
  `;

  wrap.querySelectorAll("cc-checkfield").forEach(el => {
    el.addEventListener("input", e => {
      console.log(e);
    });
  });

  wrap.querySelector("#radio1").appendChild(radio1);
  wrap.querySelector("#radio2").appendChild(radio2);
  wrap.querySelector("#radio3").appendChild(radio3);
  wrap.querySelector("#radio4").appendChild(radio4);
  return wrap;
};

Checkfield.story = {
  parameters: {
    notes
  }
};
