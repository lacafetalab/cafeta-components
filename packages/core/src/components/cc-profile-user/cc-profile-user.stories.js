import notes from "./readme.md";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Profile User", decorators: [withKnobs] };

const profileUserBuilder = (data) => {
  const profilemenu = document.createElement("cc-profile-user");
   profilemenu.userData = data.user;
   profilemenu.menuList = data.menu;
  return profilemenu;
};

export const ProfileUser = () => {


  const userData = {
    menu: [
      { labelText: "Mi Perfil", iconName: "user", modeClick: true, handleClick: '', urlClick : 'http://utp.edu.pe' },
      { labelText: "Cerrar sesión", iconName: "log-out", modeClick: true, handleClick: '', urlClick : 'http://google.com.pe' },
    ],
    user: [
      { userName: "UserName", userAvatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAYAAAC4wJK5AAAABmJLR0QA/wD/AP+gvaeTAAAG3UlEQVRo3s2aeUxURxzHH4gthyCiAnJoDGrllEIVlYqAAUSIonKIGFALmKK2ptCkjbGh1UTrGQ211VbQ1hqhtS3CLqd7wR7svn27LLuo/1QTY9po2niB0gC/zqyCC+wxb32gL/lms29n3vw+O/P7zbzfDEVxcMULhc4pcnVRjJJuDNZobvvptD0ehq4B5279IHXDAPgTf8f30e+3YtQqflJ7RyGuR73uK7mjY3c4w9x06e4yGstWLggunKFvJqlUOyfU8HIAx3iF8gj+V+0x3JLw8xIUHYfx88cVIFWqyJyt0z7k0vjRmqPVPlwtV27g3Hg0dp2WqOgmx3E03lS4HexfnPVKlkzmH6TV3qcmCMBUQVrNvQ00PeuVANKk0jCux749vrJOoQixC2CNVDrHt0v39HUCDMmnS/csVSoNYjmEDF4BOu2jNwFgSLM7Ox9laDSexBDhaub6mAdd17NueHInA95ysfGTC5BwtdpAFomUqhNmQ1/F1zYbCav/BfJ3bYaiFcGw1t8ZVnlRkDCNgnhPClb7uUD+8hDIKdkMC3m/2g0Sr6SP2oxEUw26fnOVkxLCwa/qtNkHR9dUQeHKUFgzAxk7nYIUpCQEYAoRh/T+VAqWG+UAubGhEHW5kjUEXr4kK5WBFiEiaVpjqXJcRhxkBThB6Gcl8HZHu/GeV+NV+DAzHtZ5O0A6AiCFWOZBQYxRDpCXkwpuWjUrkHdpNW0xnE7u7rJYMWTvbsjxpSAbKcuHgvWznWG9N4UAKFg7k7ILYrE7Be9NoWDjorkwR9JC7mvdekDRM3IMRBRNK6x2Y3M9ZPs5DkNsxCAcQUQhZYQGgqeijRgkmlbLxyyl8VizVXHJ9g3jBhHpRkHuighwtDIaTOVu0A+MWMonKJRfklR00tKQG+U/bhARSEWlhcS9sUpB73s5LzCMgaSSp1IGBXNdOYHIWegLJ7ISQbZ/J0i/KoHimHeMELE+UyC5+Q8iiEVqRjcMMUOv6yOptOdSBZzNioUDicGwK2Im5Aa+ZRMi0QuF0/nToWxFCJzKToS60jz4u3I/QG3FGN05Ww5Xy/KhpPIkLJULbdrjjZYjRoBdDONH2n1M0wWzjT++dBjunz8Af/1QbtSDi4eM93qqj5otb0s07xy4tIshQmnb0T9WdPlQxa2SDKK1i14Ng3YYZI9wO4FtAvBoE8ECtcyqXcWSjjRqm7BtLwlErko4IQBD2iSoA0raBr6Sa+CvVVq06wNR++fUdon8GAlEmbxhQiFKW38zQmAFoYlwmt78InK7qP0wtVUiPUsCcayt1mqjA7+fgqc1x4kM7Kk+ZrPM0ebqYQisUHEzuBk6x9hVIJadIYY4Kqm1CpAZHABRU52APrTHqnGXdmZDuJsDfJG2zGq5I801IyCwFosbwemGfiwE6XAqlTdabLC3+rgRIMyVgurdm6wah43H5bJCAqyW+8RkOJkqFoE4jB5OXDk27oGajzbBf1dOWi33Lwq/P+7YCLe+20fk2OYUL2kc6dikIdYfOdZEhtgAicAiBNbK9uaXIZbNZEdbmOxGqO5bgD91ALf1Y4Xv1522+Qwlr9IqAJZjuwSWyQXPJzs2y45PZQRh9uo3AH29YPZ6+oSoJ8par9iEwFogRu8gLxMDagNZAlgHd/jf2zakW2Yeoktis+7dujPghpYcJBBpIl7PMERih6qcdEjtULSQjW1scM+j58b3PAToJJvxC6/VEgFgbRHxa1m/FGHh8FYtqCF3VAIfGNKVhp/AgRDAGzl+Hp/vMeLtLppm5OT7CjoyJ2chbf054mGElSHgPWCdKBitALSqVaAowgVAG68KvNuExADuaHWbL+KnWkrZMGxSJ9O7GPi58SIM4Ihkh/G43snmyzAZhUtSAKx0If+xXckzi1kQvQbWodm1BsGwAWhpuACRaFHHxvihpXlhO3+pjTQmShOyzcohkDBxE8yXtBpjvIhfZQyV/S8M7n8ROoX888bf56FybI3Hwk6fJ+RJyBLKDNNtD0ioZOQ/OwnJC431SXYYbE7JwvpnxFlxnELHqXR7e4TiyGhTRYubBkuU4kB227soaTtL19n7JoCEoOdtE/Bi7NotShcr5qPNlsdcDC17FSxqhqJWXvor7dvhjb95Gs09tiDueu0r90icqKG/UNwSzNkGPD7KMOn6xAwtPG+sv8a7j9p14nw/O0WmXj1Xq/1nPHskStw4uFXIOzgRxyIO+us6n3DZI9h5twjqFON+LGL0hQ+W4E1K1xenadiCTENzSJKA11cgbKh67adtsgyGt1IUym1LaYYXzDC3cC/h5YvpUSH8fQGj6k0R8foyRfy7BeKGimKaduWi/f8BxvykMmGplIMAAAAASUVORK5CYII="},
    ]
  };

  const dropdown11 = profileUserBuilder(userData);

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
