import notes from "./readme.md";

export default { title: "Button" };

export const Button = () =>
  `<my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>`;

Button.story = {
  parameters: {
    notes
  }
};
