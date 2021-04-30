import notes from "./readme.md";
import { withKnobs, boolean } from "@storybook/addon-knobs/html";
import { h } from "@stencil/core";

export default { title: "Navbar Web", decorators: [withKnobs] };

const navbarWebBuilder = (dataMenuList) => {
  const navBarweb = document.createElement("cc-navbar-web");
  navBarweb.dataList = dataMenuList.dataList;
  return navBarweb;
};

export const NavbarWeb = () => {
  const dataTestMenu ={
   dataList :[
    { url: "123", label: "Option 1", icon: "home", active: true},
    { url: "124", label: "Opción 2", icon: "calendar", active: false},
    { url: "125", label: "Opción 3", icon: "user", active: false},
    { url: "126", label: "Opción 4", icon: "globe", active: false},
    { url: "127", label: "Opción 5", icon: "book", active: false},
    { url: "128", label: "Opción 6", icon: "dollar-sign", active: false},
    { url: "129", label: "Option 7", icon: "send", active: false},
]} ;


  const menuElement = navbarWebBuilder(dataTestMenu);

  menuElement.addEventListener("changeChoice", e => {
    console.log("onChange ->", e);
  });
  menuElement.addEventListener("clickProfileMenu", e => {
    console.log("onClick ->", e);
  });


  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-lg">
    <h1 class="heading-01">Navbar Web primary</h1>
    <section class="py-xlg  ">
      <h2 class="text-subheading-02 mb-lg font-regular font-black">Navbar Primary</h1>
      <div class="flex items-end mb-lg">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="navbarweb1"></div>
      </div>
    </section>
  </div>`;

  wrap.querySelector("#navbarweb1").appendChild(menuElement);

  return wrap;
};

NavbarWeb.story = {
  parameters: {
    notes
  }
};
