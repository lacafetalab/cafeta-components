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
    }
  ]

  wrap.innerHTML = `
        <div class="p-xxlg">
            <cc-breadcrumb></cc-breadcrumb>
        </div>

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


  // return `
  //     <div class="p-lg">
  //         <h1 class="heading-01">Breadcrumb</h1>
  //         <section class="py-xlg color-primary font-black">
  //             <h2 class="text-subheading-02 mb-lg font-regular">Anatomy</h1>
  //             <div class="flex items-center flex-wrap">
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 1</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 2</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 3</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <span class="text-small-02 font-black">Opción 4</span>
  //             </div>
  //         </section>

  //         <section class="py-xlg color-primary font-black">
  //             <h2 class="text-subheading-02 mb-lg font-regular">Skeleton</h1>
  //             <div class="flex items-center flex-wrap">
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 1</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 2</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 3</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <span class="text-small-02 font-black">Opción 4</span>
  //             </div>
  //         </section>

  //         <section class="py-xlg color-primary font-black">
  //             <h2 class="text-subheading-02 mb-lg font-regular">States</h1>
  //             <div class="flex items-center flex-wrap">
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 1</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 2</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 3</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <span class="text-small-02 font-black">Opción 4</span>
  //             </div>
  //         </section>

  //         <section class="py-xlg color-primary font-black">
  //             <h2 class="text-subheading-02 mb-lg font-regular">Other behaviors</h1>
  //             <div class="flex items-center flex-wrap">
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 1</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 2</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <a href="#" class="text-small-02 font-regular text-neutral-02">Opción 3</a>
  //                 <cc-icon size="12" slot="adornment" name='chevron-right' class="px-sm"></cc-icon>
  //                 <span class="text-small-02 font-black">Opción 4</span>
  //             </div>
  //         </section>

  //     </div>
  // `
}

BreadCrumb.story = {
  parameters: {
    notes
  }
}
