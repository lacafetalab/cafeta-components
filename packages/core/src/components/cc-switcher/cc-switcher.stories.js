import notes from "./readme.md";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Form", decorators: [withKnobs] };

export const Switcher = () => {
  const wrap = document.createElement("div");

  wrap.innerHTML = `
    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Default</h2>
      <cc-switcher></cc-switcher>
    </div>

    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Small</h2>
      <cc-switcher size="sm"></cc-switcher>
    </div>

    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Secondary</h2>
      <cc-switcher color="secondary"></cc-switcher>
    </div>

    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Error</h2>
      <cc-switcher error></cc-switcher>
    </div>

    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Disabled</h2>
      <cc-switcher disabled></cc-switcher>
    </div>
  `;

  wrap.querySelectorAll("cc-switcher").forEach(el => {
    el.addEventListener("input", e => {
      console.log(e);
    });
  });
  return wrap;
};

Switcher.story = {
  parameters: {
    notes
  }
};
