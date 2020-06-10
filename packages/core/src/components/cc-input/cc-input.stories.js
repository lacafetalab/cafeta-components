import notes from "./readme.md";
import { withKnobs, boolean, text } from "@storybook/addon-knobs/html";

export default { title: "Form", decorators: [withKnobs] };

export const Input = () => {
  const disabled = boolean("Disabled", false);
  const placeholder = text("Placeholder", "Insert some text..");
  const value = text("Value", "");

  const wrap = document.createElement("div");

  wrap.innerHTML = `
  <div class="p-xxlg">
    <cc-input value="${value}" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}" label="DEFAULT" id="default"></cc-input>
  </div>

  <div class="p-xxlg">
    <cc-input value="${value}" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}" success label="SUCCESS"></cc-input>
  </div>

  <div class="p-xxlg">
    <cc-input value="${value}" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}" error helper-text="Incorrect entry" label="ERROR"></cc-input>
  </div>

  <div class="p-xxlg">
    <cc-input value="${value}" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}" icon-name="calendar" label="ICON"></cc-input>
  </div>

  <div class="p-xxlg">
    <cc-input value="${value}" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}" bg-field="bg-transparent" label="CUSTOM BG"></cc-input>
  </div>`;

  wrap.querySelector("#default").addEventListener("input", e => {
    console.log("input text: onInput -->", e.target.value);
  });

  return wrap;
};

Input.story = {
  parameters: {
    notes
  }
};
