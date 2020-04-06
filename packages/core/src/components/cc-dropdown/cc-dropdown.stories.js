import notes from "./readme.md";
import { withKnobs, boolean } from "@storybook/addon-knobs/html";
import { object } from "@storybook/addon-knobs";

export default { title: "Dropdown", decorators: [withKnobs] };

export const Dropdown = () => {
  const itemsWrapper = {
    choices: [
      { value: "aaa", label: "bbbb" },
      { value: "cccccc", label: "ddddddd" }
    ]
  };

  const label3 = "Expand";
  const defaultValue3 = false;
  const groupId3 = "GROUP-ID1";
  const value3 = boolean(label3, defaultValue3, groupId3);

  const props = [value3 ? "expand" : ""].join(" ");

  return `
    <div class="p-lg">
      <h1 class="heading-01">Dropdown primary</h1>
      <section class="py-xlg color-primary font-black">
        <h2 class="text-subheading-02 mb-lg font-regular">Dropdown Inline</h1>
        <div ${value3 ? "" : 'class="flex align-middle"'}>
          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">default</strong></h1>
            <cc-dropdown ${props} />
          </div>
        </div>
      </section>
      <section class="py-xlg color-primary font-black">
        <h2 class="text-subheading-02 mb-lg font-regular">Dropdown with Label</h1>
        <div ${value3 ? "" : 'class="flex align-middle"'}>
          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">default</strong></h1>
            <cc-dropdown ${props} label="Label" />
          </div>
        </div>
      </section>
      <script type="text/javascript">
        (() => {
          alert('hola mundo')
          document.querySelectorAll('cc-dropdown').forEach((item) => {
            console.log('asdsadjsksajdhask=====>', item, ${
              itemsWrapper.choices
            });
            item.choices = ${itemsWrapper.choices};
          })
        })()
      </script>
    </div>
  `;
};

export const Dropdown2 = () => {
  const itemsWrapper = {
    choices: [
      { value: "aaa", label: "bbbb" },
      { value: "cccccc", label: "ddddddd" }
    ]
  };

  const dropdown = document.createElement("cc-dropdown");
  dropdown.choices = itemsWrapper.choices;

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
