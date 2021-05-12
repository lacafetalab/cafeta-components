import notes from "./readme.md";
import iconPaths from "./../cc-icon/selection";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Breadcrumb", decoratos: [withKnobs] };

export const BreadCrumb = () => {
  const label = "Bread"

  const styledIcon = "0 4px;";
  const wrap = document.createElement("div");

  const options = [
    {
      href: "/home",
      active: true,
      disabled: true,
      text: "home",
    },
    {
      href: "/contact",
      active: true,
      disabled: true,
      text: "contact",
    },
    {
      href: "/about",
      active: true,
      disabled: false,
      text: 'About'
    },
    {
      href: "/personas",
      active: true,
      disabled: false,
      text: 'personas'
    }
  ]

  wrap.innerHTML = `
      <div class="p-xxlg">
          <cc-breadcrumb></cc-breadcrumb>
      </div>
  `;

  wrap.querySelectorAll("cc-breadcrumb").forEach(el => {
    el.options = options;
    el.addEventListener("changeOption", e => {
      console.log(e.detail);
    });
  });

  return wrap;
}

BreadCrumb.story = {
  parameters: {
    notes
  }
}
