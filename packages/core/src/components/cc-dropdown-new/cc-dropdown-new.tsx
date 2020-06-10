import { h, Component, Host, Prop, State , Watch , Event , EventEmitter } from "@stencil/core";

@Component({
  tag: "cc-dropdown-new",
  styleUrl: "cc-dropdown-new.scss",
  shadow: false
})
export class CcDropdownNew {
  private dropdownNew: HTMLElement;
  private dropdownItems: HTMLElement;

  @State() _choices: Array<any> = [];
  @State() isOpenDropdown: boolean = false;
  @State() thereIsLowerSpace:boolean = false;
  @Prop() label: string = "";
  @Prop() choices: Array<any>;
  @Prop() error?: boolean = false;
  @Prop() disabled?: boolean = false;
  @Prop() fieldReadonly?: boolean = false;
  @Prop() placeholder?: string = "";
  @Prop() name?: string = "";
  @Prop() currentValue?: string = "";
  @Prop() iconName?: string = "chevron-down";
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() helperText?: string;
  @Prop() border?: boolean = true;
  @Prop() bgField?: string = "";
  @Prop() loader?: boolean = false;
  @Prop() iconOnly?: boolean = false;

  @Event() changeChoice: EventEmitter;

  clearChoices(){
    const newChoices = [...this._choices];
    newChoices.map( choice => choice.selected = false);
    this._choices = newChoices;
  }

  handleOptionClick(index:number){
    this.clearChoices();
    const newChoices = [...this._choices];
    newChoices[index].selected = true;
    return this._choices = [...newChoices];
  }

  toogleDropdown = () =>{
    this.isOpenDropdown = !this.isOpenDropdown;
    if(this.isOpenDropdown){
      setTimeout(() => {
        this.calculatePositionOfOptions();
        console.log(this.thereIsLowerSpace);
      }, 100);
    }
  }

  closeDroprownIfClickOutDropdown = (event) =>{
    const elementActiveDropdown = this.dropdownNew;
    const menuDropdown = this.dropdownItems;
    let targetElement = event.target;

    if (
      !elementActiveDropdown.contains(targetElement) &&
      !menuDropdown.contains(targetElement)
    ) {
      return (this.isOpenDropdown = false);
    }
  }

  getHeigthWrapperOptions = () =>{
    return this.dropdownItems.getBoundingClientRect().height;
  }

  calculatePositionOfOptions = () =>{
      if(this.isOpenDropdown){
        const bottomSpaceOfDropdown = this.dropdownNew.getBoundingClientRect().bottom - this.dropdownItems.getBoundingClientRect().height;
        console.log(this.dropdownNew.getBoundingClientRect().bottom);
        console.log(this.dropdownItems.getBoundingClientRect().height)
        console.log(bottomSpaceOfDropdown);
        console.log(this.getHeigthWrapperOptions());
        bottomSpaceOfDropdown < this.getHeigthWrapperOptions() ?  this.thereIsLowerSpace = true :  this.thereIsLowerSpace =false;
      }
  }

  componentWillLoad() {
    this._choices = this.choices;
    document.addEventListener("click", (e:Event) =>{this.closeDroprownIfClickOutDropdown(e)});
  }

  componentDidLoad() {
  }


  render() {
    return (
      <Host data-testid="cc-dropdown-new" class="dropdown-new">
        {this.label && <span class="dropdown-new__label">{this.label}</span> }
        <div ref={el => (this.dropdownNew = el)}
            class={{
              "dropdown-new__wrapper":true ,
              "dropdown-new--is-collapse":this.isOpenDropdown,
              "dropdown-new--readonly":this.fieldReadonly || this.loader || this.iconOnly,
              "dropdown-new--disabled": this.disabled,
              "dropdown-new--secondary": this.color === "secondary",
              "dropdown-new--error": this.error && !this.disabled,
              "dropdown-new--no-border": !this.border,
              "dropdown-new--no-background": !this.bgField,
              "dropdown-new--icon-only": this.iconOnly,
            }} onClick={this.toogleDropdown}>
          <div class="dropdown-new__field">
            {
              this._choices.map((c) =>{
                return <p class={
                  {
                    'dropdown-new__field-placeholder': c.placeholder,
                    'dropdown-new__field-option':true,
                    'dropdown-new__field-option--is-selected':c.selected
                  }
                }>{c.label}</p>
              })
            }
            <div class="dropdown-new__wrapper-icon">
              {this.loader ? (
                  <div class="dropdown-new__loader">
                    <cc-loader></cc-loader>
                  </div>
                ) : (
                  <cc-icon
                    class={{
                      dropdown__icon: true,
                      "dropdown__icon--inverted": this.isOpenDropdown
                    }}
                    name={this.error ? "x" : this.iconName}
                  ></cc-icon>
                )}
            </div>
          </div>
          <ul ref={el => (this.dropdownItems = el)} class={{"dropdown-new__options":true ,'dropdown-new__options--is-active':this.isOpenDropdown}}>
            {
              this._choices.map((c , index) =>{
                return <li onClick={() =>this.handleOptionClick(index)} class={{'dropdown-new__option':true,'dropdown-new__option--is-selected': c.selected}}>{c.label}</li>
              })
            }
          </ul>
        </div>
      </Host>
    );
  }
}
