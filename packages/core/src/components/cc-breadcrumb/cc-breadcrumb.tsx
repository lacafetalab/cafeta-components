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
    return (
      <Host>
        <div
          class={{
            breadTags: true
          }}
        >
          <div class="breadTags__wrap">
            {this._options.map((option, index) => (
              <div key={`breadTagItem_${index}`}>
                <a
                  href={option.href}
                  class={{
                    breadTags__a: true,
                    "breadTags__a--active": option.active,
                    "breadTags__a--disabled": option.disabled
                  }}
                >
                  {option.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
