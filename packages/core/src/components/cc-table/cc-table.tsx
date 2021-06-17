import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "cc-table",
  styleUrl: "cc-table.scss",
  shadow: true
})
export class CcTable {
  @Prop() borderColor?: "primary" | "secondary" = "primary";
  //@Prop() title:
  render() {
    const boxContenttop: string = "box-table-top";
    const boxContentbottom: string = "box-table-bottom";

    return (
      <Host>
        <div
          class={{
            tableTags__wrap: true
          }}
        >
          <div
            class={{
              "tableTags--border--primary": this.borderColor === "primary",
              "tableTags--border--secundary": this.borderColor === "secondary",
              "tableTags--boxcontent-top": boxContenttop === "box-table-top"
            }}
          ></div>
          <div
            class={{
              "tableTags--boxcontent-bottom":
                boxContentbottom === "box-table-bottom"
            }}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
