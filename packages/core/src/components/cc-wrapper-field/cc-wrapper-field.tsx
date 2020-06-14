import { h, Component, Host, Prop } from "@stencil/core";


@Component({
  tag: "cc-wrapper-field",
  styleUrl: "cc-wrapper-field.scss",
  shadow: false
})

export class CcWrapperField {

 @Prop() fieldReadonly?: boolean = false;
 @Prop() iconOnly?: boolean = false;
 @Prop() loader?: boolean = false;
 @Prop() disabled?: boolean = false;
 @Prop() color: "primary" | "secondary" = "primary";
 @Prop() error?: boolean = false;
 @Prop() border?: boolean = true;
 @Prop() bgField?: string = "";
 @Prop() isFocus?:boolean = false
 @Prop() isActive?:boolean = false

 render(){
   return(
     <Host
     class={{
      "wrapper-field":true,
      "wrapper-field--is-focus" : this.isActive,
      "wrapper-field--readonly":this.fieldReadonly || this.loader || this.iconOnly,
      "wrapper-field--disabled": this.disabled,
      "wrapper-field--secondary": this.color === "secondary" && !this.disabled && !this.error,
      "wrapper-field--error": this.error && !this.disabled,
      "wrapper-field--no-border": !this.border,
      "wrapper-field--no-background": !this.bgField,
      "wrapper-field--icon-only": this.iconOnly,
      }}
    >
       <slot/>
     </Host>
   )
 }
}
