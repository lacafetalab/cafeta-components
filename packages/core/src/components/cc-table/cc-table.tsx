import { Component, Host, h, Prop, State } from "@stencil/core";

@Component({
  tag: "cc-table",
  styleUrl: "cc-table.scss",
  shadow: true,
})
export class CcTable {
  @Prop() name: string = "";
  @Prop() lastname: string = "";
  @Prop() codeTeacher: string = "";
  @Prop() section: string = "";
  @Prop() status: string = "";
  @Prop() total: number = 0;
  @Prop() borderColor?: "primary" | "secondary" = "secondary";
  @Prop() thumbnail?: string =
    "https://d1yy3d44605rg6.cloudfront.net/static/media/student.176fd80a.svg";

  @State() showContent: boolean = false;

  handleShowContent = (): void => {
    this.showContent = !this.showContent;
  };

  render() {
    return (
      <Host>
        <div
          class={{
            tableTags__wrap: true,
          }}
        >
          <div
            class={`tableTags--boxcontent-top relative tableTags--border__${this.borderColor}`}
          >
            <div class="avatar">
              <img
                width="50"
                height="50"
                src={this.thumbnail}
                alt={this.name}
              />
            </div>
            <div class="nameblock">
              <span class="block">{this.name}</span>
              <span class="block">{this.lastname}</span>
            </div>

            <div class="codeteacher">
              <span>{this.codeTeacher}</span>
            </div>
            <div class="section">
              <span>{this.section}</span>
            </div>
            <div class="status">
              <span>{this.status}</span>
            </div>
            <div class="total">
              <span>{this.total}</span>
            </div>
            <div class="buttons">
              <cc-button fill="outline">
                <cc-icon class="icon-message" size={18} name="message-circle" />
                Enviar mensaje
              </cc-button>
            </div>
            <div class="errores">
              <div class="arrow absolute" onClick={this.handleShowContent}>
                <span>Ver detalle</span>
                <cc-icon
                  size={18}
                  name={`chevron-${this.showContent ? "up" : "down"}`}
                />
              </div>
            </div>
          </div>
          <div
            class={`tableTags--boxcontent-bottom ${
              this.showContent ? "block" : "none"
            }`}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
