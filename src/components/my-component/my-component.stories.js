import notes from "./readme.md";

export default { title: "Button" };

export const withText = () =>
  `<my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>`;

withText.story = {
  parameters: {
    notes
  }
};
