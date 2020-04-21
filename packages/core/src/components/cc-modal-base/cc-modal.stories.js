import notes from "./readme.md";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Modal", decorators: [withKnobs] };

export const Base = () => {
  const wrap = document.createElement("div");

  wrap.innerHTML = `
    <div class="p-xxlg">
      <cc-button id="open-base">open modal</cc-button>

      <cc-modal-base id="modal-base">
        <div class="p-xxlg">
          <cc-button id="close-base" color="secondary">close modal</cc-button>
          <br /> <br />
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
          <p>asdas </p>
        </div>
      </cc-modal-base>
    </div>
  `;

  const openBase = wrap.querySelector("#open-base");
  const closeBase = wrap.querySelector("#close-base");
  const modal = wrap.querySelector("#modal-base");

  closeBase.addEventListener("click", e => {
    modal.visible = false;

    e.preventDefault();
  });

  openBase.addEventListener("click", e => {
    modal.visible = true;

    e.preventDefault();
  });

  modal.addEventListener("close", () => {
    alert("Close modal callback");
  });

  modal.addEventListener("cancel", () => {
    modal.visible = false;

    alert(
      "Cancel event fired. Triggers when press 'ESC' key or click in overlay"
    );
  });

  return wrap;
};

Base.story = {
  parameters: {
    notes
  }
};
