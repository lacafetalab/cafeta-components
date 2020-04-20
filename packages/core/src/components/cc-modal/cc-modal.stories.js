import notes from "./readme.md";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Modal", decorators: [withKnobs] };

export const Modal = () => {
  const wrap = document.createElement("div");

  wrap.innerHTML = `
    <div class="p-xxlg">
      <cc-button id="button">open modal</cc-button>

      <cc-modal id="modal"></cc-modal>
    </div>
  `;

  const button = wrap.querySelector("#button");
  const modal = wrap.querySelector("#modal");

  button.addEventListener("click", e => {
    modal.visible = true;

    e.preventDefault();
  });

  return wrap;
};

Modal.story = {
  parameters: {
    notes
  }
};
