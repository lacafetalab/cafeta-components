import notes from "./readme.md";
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

  const label4 = "Color";
  const options4 = {
    primary: "primary",
    secondary: "secondary"
  };
  const defaultValue4 = "primary";
  const groupId4 = "GROUP-ID1";
  const value4 = select(label4, options4, defaultValue4, groupId4);

  const label5 = "Fill";
  const options5 = {
    Default: "",
    outline: "outline",
    clear: "clear"
  };
  const defaultValue5 = "primary";
  const groupId5 = "GROUP-ID1";
  const value5 = select(label5, options5, defaultValue5, groupId5);

  const label6 = "Icon";
  const options6 = {
    Default: null,
    check: "check",
    plus: "plus",
    x: "x"
  };
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

  const label9 = "Size";
  const options9 = {
    Default: null,
    md: "md",
    sm: "sm"
  };
  const defaultValue9 = null;
  const groupId9 = "GROUP-ID1";
  const value9 = select(label9, options9, defaultValue9, groupId9);

  const props = [
    value ? "icon-reverse" : "",
    value2 ? "disabled" : "",
    value3 ? "expand" : "",
    `color="${value4}"`,
    `fill="${value5}"`,
    value6 ? `icon-name="${value6}"` : "",
    value8 ? "icon-only" : "",
    value9 ? `size="${value9}"` : ""
  ].join(" ");

  return `
    <section style="padding: 15px">
      <h1>Button with anchor</h1>
      <br />
      <cc-button ${props} href="http://google.com" target="_blank">${value7}</cc-button>
    </section>

    <section style="padding: 15px">
      <h1>Button with click event</h1>
      <br />
      <cc-button ${props} onclick="alert('Fire click')">${value7}</cc-button>
    </section>`;
};

Button.story = {
  parameters: {
    notes
  }
};
