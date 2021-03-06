import notes from "./readme.md";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Tabs", decorators: [withKnobs] };

export const Line = () => {
  const wrap = document.createElement("div");
  const options = [
    {
      text: "Pestaña 1",
      value: "1"
    },
    {
      text: "Pestaña 2",
      value: "2",
      active: true
    },
    {
      text: "Pestaña 3",
      value: "3",
      disabled: true
    },
    {
      text: "Pestaña 4",
      value: "4"
    }
  ];

  wrap.innerHTML = `
    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Default</h2>
      <cc-tabs-underline></cc-tabs-underline>
    </div>

    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Color Secondary</h2>
      <cc-tabs-underline color="secondary"></cc-tabs-underline>
    </div>

    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Center</h2>
      <cc-tabs-underline center></cc-tabs-underline>
    </div>

    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Small</h2>
      <cc-tabs-underline size="sm"></cc-tabs-underline>
    </div>

    <div class="p-xxlg">
      <h2 class="font-bold text-heading-02 text-neutral-03">Border</h2>
      <cc-tabs-underline border></cc-tabs-underline>
    </div>

    <div class="p-xxlg tagsWrap">
      <h2 class="font-bold text-heading-02 text-neutral-03">Border and tags</h2>
      <cc-tabs-underline border class="tags"></cc-tabs-underline>
    </div>

    <div class="p-xxlg tagsWrap">
      <h2 class="font-bold text-heading-02 text-neutral-03">Border and tags centered</h2>
      <cc-tabs-underline border center class="tags"></cc-tabs-underline>
    </div>

    <button id="hide" type="button">hide last tabs</div>
  `;

  wrap.querySelector("#hide").addEventListener("click", () => {
    wrap.querySelectorAll(".tagsWrap").forEach(el => {
      if (el.style.display === "none") {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });
  });

  wrap.querySelectorAll("cc-tabs-underline").forEach(el => {
    el.options = options;
    el.addEventListener("changeOption", e => {
      console.log(e.detail);
    });
  });

  wrap.querySelectorAll(".tags").forEach(el => {
    el.options = [
      {
        text: "Pestaña 1",
        value: "1",
        tag: {
          color: "#00aebc",
          text: "12345"
        }
      },
      {
        text: "Pestaña 2",
        value: "2",
        active: true
      },
      {
        text: "Pestaña 3",
        value: "3",
        disabled: true
      },
      {
        text: "Pestaña 4",
        value: "4"
      }
    ];
  });

  return wrap;
};

Line.story = {
  parameters: {
    notes
  }
};
