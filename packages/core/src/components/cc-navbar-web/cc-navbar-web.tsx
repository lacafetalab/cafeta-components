import { Component, h, Host, Prop, Element } from "@stencil/core";
import "choices.js/public/assets/scripts/choices.min.js";
import "choicesjs-stencil";

export interface IMenuList {
  url: string;
  label: string;
  icon: string;
  active: boolean;
}

@Component({
  tag: "cc-navbar-web",
  styleUrls: ["cc-navbar-web.scss"],
  shadow: false
})
export class CcNavbarWeb {
  @Prop() iconOnly: boolean = false;
  @Prop() disabled: boolean = false;
  @Element() el: HTMLElement;
  @Prop() dataList: Array<IMenuList>;
  //@Prop() iconOnly: boolean = false;
  //@Prop() disabled: boolean = false;
  //@State() openProfileMenu: boolean = false;
  //@State() private datalist: MenuList[];

  //@Event() changeChoice: EventEmitter;
  //@Event() clickProfileMenu: EventEmitter;

  componentWillLoad() {}

  componentDidLoad() {
    this.loadMenu();
  }

  private loadMenu(): void {
    /*
    this.dataList =  [
      { url: "123", label: "Option 1", icon: "home", active: true},
      { url: "124", label: "Opción 2", icon: "calendar", active: false},
      { url: "125", label: "Opción 3", icon: "user", active: false},
      { url: "126", label: "Opción 4", icon: "globe", active: false},
      { url: "127", label: "Opción 5", icon: "book", active: false},
      { url: "128", label: "Opción 6", icon: "dollar-sign", active: false},
      { url: "123", label: "Option 7", icon: "send", active: false},
    ]*/
  }

  toggleProfileMenu = e => {
    e.stopPropagation();
  };

  render() {
    return (
      <Host>
        {this.dataList && this.dataList.length ? (
          <div class="navbar">
            <div>
              <cc-button class="navbar__toggle" href="#" target="_blank">
                <cc-icon name="menu" class="menu"></cc-icon>
              </cc-button>
              <ul
                class={{ "navbar__list--vertical": true, navbar__list: true }}
              >
                {this.dataList.map(list => (
                  <li
                    class={{
                      navbar__item: true,
                      "navbar__item--selected": list.active
                    }}
                  >
                    <cc-button fill="clear" href={list.url} target="_blank">
                      <cc-icon size={24} name={list.icon}></cc-icon>
                      <span class="navbar__item-text">{list.label}</span>
                    </cc-button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>Cargando...</div>
        )}
      </Host>
    );
  }
}
