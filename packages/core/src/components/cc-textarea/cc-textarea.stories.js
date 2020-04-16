import { withKnobs, boolean, text } from "@storybook/addon-knobs/html";

export default { title: "Textarea", decorators: [withKnobs] };

export const Textarea = () => {
  const disabled = boolean("Disabled", false);
  const placeholder = text("Placeholder", "");

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-xxlg">
    <cc-textarea id="asd" label="DEFAULT" ${
      disabled ? "disabled" : ""
    } placeholder=${placeholder}></cc-textarea>
  </div>

  <div class="p-xxlg">
    <cc-textarea label="SUCCESS" status="success" ${
      disabled ? "disabled" : ""
    } placeholder=${placeholder}></cc-textarea>
  </div>

  <div class="p-xxlg">
    <cc-textarea label="ERROR" status="error" ${
      disabled ? "disabled" : ""
    } placeholder=${placeholder}></cc-textarea>
  </div>`;

  wrap.querySelector("#asd").addEventListener("input", e => {
    console.log("input", e);
  });

  wrap.querySelector("#asd").addEventListener("change", e => {
    console.log("change", e);
  });

  return wrap;
};
