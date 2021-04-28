import { Component, h, Host, Prop, State, Listen } from "@stencil/core";

@Component({
  tag: "cc-progress-bar",
  styleUrl: "cc-progress-bar.scss",
  scoped: true
})

export class CcProgressBar {
  @State() tooltip: HTMLDivElement;

  @Prop() color: "primary" | "secondary" = "secondary";
  @Prop() error?: boolean = false;
  @Prop() success?: boolean = false;
  @Prop() alert?: boolean = false;
  @Prop({ mutable: true }) progress: number = 0;
  @Prop() type: "single" | "label" | "percentage" | "text" = "single";
  @Prop() label: string = '';
  @Prop() tooltipText: string = '';
  @State() tooltipPosition: number = 0;

  handleTooltipPosition() {
    if (!!this.tooltip && !!this.tooltip.parentElement) {
      let proportion = (this.tooltip.offsetWidth*100.00)/this.tooltip.parentElement.offsetWidth;
      if (this.type==="percentage") {
        if (this.progress<(proportion/2)) {
          this.tooltipPosition = 0;
        }else if (this.progress>100.00-(proportion/2)){
          this.tooltipPosition = (100-proportion);
        }else{
          this.tooltipPosition = this.progress - (proportion/2);
        }
      }
      if (this.type==="text") {
        if (this.progress<(proportion)) {
          this.tooltipPosition = 0;
        }else{
          this.tooltipPosition = this.progress - proportion;
        }
      }
    }
  }

  componentDidLoad() {
    if (this.progress>100) {
      this.progress = 100;
    }else if (this.progress<0){
      this.progress = 0;
    }
    this.handleTooltipPosition(); 
  }

  componentShouldUpdate(newVal: any, oldVal: any, propName: string){
    if (propName==='progress' && newVal !== oldVal) {
      if (newVal>100) {
        this.progress = 100;
      }else if (newVal<0){
        this.progress = 0;
      }
    }
    this.handleTooltipPosition();
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.handleTooltipPosition();
  }

  render() {

    return (
      <Host
        class={{
          "progress-bar--secondary": this.color==="secondary",
          "progress-bar--error": this.error,
          "progress-bar--success": this.success,
          "progress-bar--alert": this.alert,
        }}
        data-testid="cc-progress-bar"
      >
        {this.type==='label' && (
          <p class={{
            "progressbar__label": true,
            "completed": this.progress===100,
          }}>
            {this.label}
          </p>
        )}
        {(this.type==='percentage' || this.type==='text') && (
          <div
           class={{
            "progressbar__tooltip__container": true
          }}>
            <div
              ref={el => {
                this.tooltip = el as HTMLDivElement
              }}
              // style={{marginLeft:`${this.tooltipPosition}%`}} 
              style={{left: `${this.tooltipPosition}%`}}
              class={{
                "progressbar__tooltip": true
              }}
            >
              {this.type==='percentage' && <p>{this.progress} %</p>}
              {this.type==='text' && <p>{this.tooltipText}</p>}
            </div>
          </div>
          
        )}
        <div
          data-testid="progress-bar__container"
          class={{
            progressbar: true,
          }}
        >
            <div class="progressbar__content" style={{width:`${this.progress}%`}}>
            </div>
        </div>
      </Host>
    );
  }
}
