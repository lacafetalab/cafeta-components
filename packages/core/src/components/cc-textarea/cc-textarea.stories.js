import notes from "./readme.md";
import { withKnobs, boolean, text } from "@storybook/addon-knobs/html";

export default { title: "Textarea", decorators: [withKnobs] };

export const Textarea = () => {
  const disabled = boolean("Disabled", false);
  const placeholder = text("Placeholder", "Insert some text..");
  const value = text("Value", "");

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-xxlg">
    <cc-textarea value="${value}" id="text" label="DEFAULT" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}"></cc-textarea>
  </div>

  <div class="p-xxlg">
    <cc-textarea value="${value}" label="SUCCESS" success ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}"></cc-textarea>
  </div>

  <div class="p-xxlg">
    <cc-textarea value="${value}" label="ERROR" error helper-text="Incorrect entry" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}"></cc-textarea>
  </div>`;

  wrap.querySelector("#text").addEventListener("changeText", e => {
    console.log("textarea: onChangeText -->", e.detail);
  });

  return wrap;
};

export const TextareaWithRichEditor = () => {
  const disabled = boolean("Disabled", false);
  const placeholder = text("Placeholder", "Insert some text..");
  const value = text("Value", "");

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-xxlg">
    <cc-textarea value="${value}" id="rich" rich label="DEFAULT" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}"></cc-textarea>
  </div>

  <div class="p-xxlg">
    <cc-textarea value="${value}" rich label="SUCCESS" success ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}"></cc-textarea>
  </div>

  <div class="p-xxlg">
    <cc-textarea value="${value}" rich label="ERROR" error helper-text="Incorrect entry" ${
    disabled ? "disabled" : ""
  } placeholder="${placeholder}"></cc-textarea>
  </div>`;

  wrap.querySelector("#rich").addEventListener("changeText", e => {
    console.log("rich text: onChangeText -->", e.detail);
  });

  return wrap;
};

TextareaWithRichEditor.story = {
  parameters: {
    notes
  }
};

Textarea.story = {
  parameters: {
    notes
  }
};
