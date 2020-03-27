import notes from "./readme.md";
import iconPaths from "./../cc-icon/selection";
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs/html";

export default { title: "Button", decorators: [withKnobs] };

export const Button = () => {
  const label = "Icon reverse";
  const defaultValue = false;
  const groupId = "GROUP-ID1";
  const value = boolean(label, defaultValue, groupId);

  const label2 = "Disabled";
  const defaultValue2 = false;
  const groupId2 = "GROUP-ID1";
  const value2 = boolean(label2, defaultValue2, groupId2);

  const label3 = "Expand";
  const defaultValue3 = false;
  const groupId3 = "GROUP-ID1";
  const value3 = boolean(label3, defaultValue3, groupId3);

  const label5 = "Fill";
  const options5 = {
    Default: "",
    outline: "outline",
    clear: "clear"
  };
  const defaultValue5 = "";
  const groupId5 = "GROUP-ID1";
  const value5 = select(label5, options5, defaultValue5, groupId5);

  const label6 = "Icon";
  const options6 = iconPaths.icons.reduce(
    (options, icon) => ({
      ...options,
      [icon.properties.name]: icon.properties.name
    }),
    { None: null }
  );
  const defaultValue6 = null;
  const groupId6 = "GROUP-ID1";
  const value6 = select(label6, options6, defaultValue6, groupId6);

  const label7 = "Text";
  const defaultValue7 = "Button Text";
  const groupId7 = "GROUP-ID1";
  const value7 = text(label7, defaultValue7, groupId7);

  const label8 = "Icon Only";
  const defaultValue8 = false;
  const groupId8 = "GROUP-ID1";
  const value8 = boolean(label8, defaultValue8, groupId8);

  const label10 = "Glow";
  const defaultValue10 = false;
  const groupId10 = "GROUP-ID1";
  const value10 = boolean(label10, defaultValue10, groupId10);

  const props = [
    value ? "icon-reverse" : "",
    value2 ? "disabled" : "",
    value3 ? "expand" : "",
    `fill="${value5}"`,
    value6 ? `icon-name="${value6}"` : "",
    value8 ? "icon-only" : "",
    value10 ? "glow" : ""
  ].join(" ");

  return `
    <div class="p-lg">
      <h1 class="heading-01">Button primary</h1>
      <section class="py-xlg color-primary font-black">
        <h2 class="text-subheading-02 mb-lg font-regular">Button with tag "a" - target blank link</h1>
        <div ${value3 ? "" : 'class="flex align-middle"'}>
          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">default</strong></h1>
            <cc-button ${props} href="http://google.com" target="_blank" >${value7}</cc-button>
          </div>

          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">md</strong></h1>
            <cc-button ${props} href="http://google.com" target="_blank" size="md">${value7}</cc-button>
          </div>

          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">sm</strong></h1>
            <cc-button ${props} href="http://google.com" target="_blank" size="sm">${value7}</cc-button>
          </div>
        </div>
      </section>

      <section class="py-xlg">
        <h2 class="text-subheading-02 mb-lg font-regular">Button with tag "button" - click event</h1>
        <div class="flex align-middle">
          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">default</strong></h1>
            <cc-button ${props} onclick="alert('Fire click')">${value7}</cc-button>
          </div>

          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">md</strong></h1>
            <cc-button ${props} onclick="alert('Fire click')" size="md">${value7}</cc-button>
          </div>

          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">sm</strong></h1>
            <cc-button ${props} onclick="alert('Fire click')" size="sm">${value7}</cc-button>
          </div>
        </div>
      </section>
    </div>

    <div class="p-lg">
      <h1 class="heading-01">Button secondary</h1>
      <section class="py-xlg color-primary font-black">
        <h2 class="text-subheading-02 mb-lg font-regular">Button with tag "a" - target blank link</h1>
        <div class="flex align-middle">
          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">default</strong></h1>
            <cc-button ${props} href="http://google.com" target="_blank" color="secondary">${value7}</cc-button>
          </div>

          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">md</strong></h1>
            <cc-button ${props} href="http://google.com" target="_blank" size="md" color="secondary">${value7}</cc-button>
          </div>

          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">sm</strong></h1>
            <cc-button ${props} href="http://google.com" target="_blank" size="sm" color="secondary">${value7}</cc-button>
          </div>
        </div>
      </section>

      <section class="py-xlg">
        <h2 class="text-subheading-02 mb-lg font-regular">Button with tag "button" - click event</h1>
        <div class="flex align-middle">
          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">default</strong></h1>
            <cc-button ${props} onclick="alert('Fire click')" color="secondary">${value7}</cc-button>
          </div>

          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">md</strong></h1>
            <cc-button ${props} onclick="alert('Fire click')" size="md" color="secondary">${value7}</cc-button>
          </div>

          <div class="mr-lg mt-lg flex flex-col align-middle">
            <h2 class="text-center font-regular">size: <strong class="font-bold">sm</strong></h1>
            <cc-button ${props} onclick="alert('Fire click')" size="sm" color="secondary">${value7}</cc-button>
          </div>
        </div>
      </section>
    </div>`;
};

Button.story = {
  parameters: {
    notes
  }
};
