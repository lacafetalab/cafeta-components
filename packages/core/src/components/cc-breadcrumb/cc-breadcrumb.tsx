import { Component, Host, h, Prop, State } from "@stencil/core";
import { BreadType } from "../../utils/types/BreadOption";

@Component({
  tag: "cc-breadcrumb",
  styleUrl: "cc-breadcrumb.scss",
  scoped: true
})
export class CcBreadcrumb {
  @Prop() options?: BreadType[] = [];
  @State() _options: BreadType[];

  componentWillLoad() {
    this._options = this.options;
  }

  render() {
    let optionLen = this._options.length;
    return (
      <Host>
        <div
          class={{
            breadTags: true
          }}>
          <div class="breadTags__wrap flex">
            {this._options.map((option, index) => {
              if(optionLen === index + 1) {
                return (
                  <div key={`breadTagItem_${index}`} class="flex items-center">
                    <p>{option.text}</p>
                  </div>
                )
              } else {
                return (
                  <div key={`breadTagItem_${index}`} class="flex items-center">
                  <a href={option.href}
                    class={{
                      breadTags__a: true,
                      "breadTags__a--active": option.active,
                      "breadTags__a--disabled": option.disabled,
                    }}>
                    {option.text}
                  </a>
                  <cc-icon
                    name="chevron-right"
                    size={12}
                    class="mx-sm"
                  />
                </div>
                )
              }
            })}
          </div>
        </div>
      </Host>
    );
  }
}
