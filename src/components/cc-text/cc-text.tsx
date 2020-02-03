import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "cc-text",
  styleUrl: "cc-text.scss",
  shadow: true
})
export class CcText {
  @Prop() type: string;
  @Prop() strong: boolean = false;
  @Prop() tag: string = "";

  render() {
    const types = {
      "heading-01": {
        tag: this.tag ? this.tag : "h1",
        cssClass: `heading-01`
      },
      "heading-02": {
        tag: this.tag ? this.tag : "h2",
        cssClass: `heading-02`
      },
      "subheading-01": {
        tag: this.tag ? this.tag : "h3",
        cssClass: `subheading-01`
      },
      "subheading-02": {
        tag: this.tag ? this.tag : "h4",
        cssClass: `subheading-02`
      },
      body: {
        tag: this.tag ? this.tag : "span",
        cssClass: `body`
      },
      "body-02": {
        tag: this.tag ? this.tag : "span",
        cssClass: `body-02`
      },
      "small-01": {
        tag: this.tag ? this.tag : "span",
        cssClass: `small-01`
      },
      "small-02": {
        tag: this.tag ? this.tag : "span",
        cssClass: `small-02`
      },
      "small-03": {
        tag: this.tag ? this.tag : "span",
        cssClass: `small-03`
      },
      "display-01": {
        tag: this.tag ? this.tag : "h1",
        cssClass: `display-01`
      },
      "display-02": {
        tag: this.tag ? this.tag : "h2",
        cssClass: `display-02`
      }
    };

    const CustomTag = types[this.type].tag;

    return (
      <CustomTag
        class={`text--reset ${types[this.type].cssClass} ${
          this.strong ? "text--strong" : "text--normal"
        }`}
      >
        <slot />
      </CustomTag>
    );
  }
}
