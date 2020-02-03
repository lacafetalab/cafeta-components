import notes from "./readme.md";
import { withKnobs, select, boolean } from "@storybook/addon-knobs/html";

export default { title: "Text", decorators: [withKnobs] };

export const Text = () => {
  const label1 = "Types";
  const options1 = {
    "heading-01": "heading-01",
    "heading-02": "heading-02",
    "subheading-01": "subheading-01",
    "subheading-02": "subheading-02",
    body: "body",
    "body-02": "body-02",
    "small-01": "small-01",
    "small-02": "small-02",
    "small-03": "small-03",
    "display-01": "display-01",
    "display-02": "display-02"
  };
  const defaultValue1 = "heading-01";
  const groupId1 = "GROUP-ID1";
  const value1 = select(label1, options1, defaultValue1, groupId1);

  const label2 = "Strong";
  const defaultValue2 = false;
  const groupId2 = "GROUP-ID1";
  const value2 = boolean(label2, defaultValue2, groupId2);

  const label3 = "Tag(Optional)";
  const options3 = {
    "": null,
    p: "p",
    div: "div",
    span: "span",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h5: "h6"
  };
  const defaultValue3 = "";
  const groupId3 = "GROUP-ID1";
  const value3 = select(label3, options3, defaultValue3, groupId3);

  return `<cc-text type="${value1}" ${value2 ? "strong" : ""} ${
    value3 ? `tag="${value3}"` : ""
  }>Lorem ipsum dolor sit amet</cc-text>`;
};

Text.story = {
  parameters: {
    notes
  }
};
