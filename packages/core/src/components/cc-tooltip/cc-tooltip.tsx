import { Component, h, Host, Prop } from "@stencil/core";

@Component({
    tag: "cc-tooltip",
    styleUrl: "cc-tooltip.scss",
    scoped: true
  })

export class CcTooltip {
    @Prop() message: HTMLElement | string;
    @Prop() visible: boolean = false;
    @Prop() positionElement: HTMLElement;
    @Prop() hideCloseButton?: boolean = true;
    @Prop() imagePath?: string = "";
    @Prop() customWidth?: string = "";

    render(){
        return (
            <Host
                class={{
                    tooltip__host: true
                }}
                data-testid="cc-tooltip">
                
                <div>
                    {!this.hideCloseButton && <cc-button iconName="x" />}
                    {this.imagePath.length > 0 && <img src={this.imagePath} alt="Tooltip image"/>} 
                    {this.message}
                </div>
            </Host>
        );
    }

}