import notes from "./readme.md";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Profile User", decorators: [withKnobs] };

const profileUserBuilder = (itemsWrapper, values) => {
  const profilemenu = document.createElement("cc-profile-user");

  return profilemenu;
};

export const ProfileUser = () => {
  const itemsWrapper = {
    choices: [
      { value: "123", label: "Seleccione una opción" },
      { value: "123", label: "Opción muy grande que aparece en el dropdown que debe ser controlado. Lorem ipsoum selet amonet os sebut" },
      { value: "124", label: "Opción 2" },
      { value: "125", label: "Opción 3" },
      { value: "126", label: "Opción 4", disabled: true },
      { value: "127", label: "Opción 5", disabled: true },
      { value: "128", label: "Opción 6", }
    ]
  };



  const dropdown11 = profileUserBuilder(itemsWrapper, {});

  dropdown11.addEventListener("changeChoice", e => {
    console.log("onChange ->", e);
  });
  dropdown11.addEventListener("clickProfileMenu", e => {
    console.log("onClick ->", e);
  });

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-lg">
    <h1 class="heading-01">ProfileMenu primary</h1>
    <section class="py-xlg  ">
      <h2 class="text-subheading-02 mb-lg font-regular font-black">ProfileMenu Primary</h1>
      <div class="flex items-end mb-lg">
        <div class="mr-lg mt-lg flex flex-col align-middle max-w-sm" style="min-width: 250px" id="drop11"></div>
      </div>
    </section>
  </div>`;

  wrap.querySelector("#drop11").appendChild(dropdown11);

  return wrap;
};

ProfileUser.story = {
  parameters: {
    notes
  }
};
