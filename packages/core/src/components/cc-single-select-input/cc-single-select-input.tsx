import { h, Component, Host, Prop, State , Event , EventEmitter, Watch } from "@stencil/core";

@Component({
  tag: "cc-single-select-input",
  styleUrl: "cc-single-select-input.scss",
  shadow: false
})
export class CcSingleSelectInput {
  private singleFileInput: HTMLElement;
  private dropdownItems: HTMLElement;
  private observerItems: MutationObserver;

  @State() _choices: Array<any> = [];
  @State() isOpenDropdown: boolean = false;
  @State() thereIsLowerSpace:boolean = false;
  @State() positionOptionstop:boolean = false;
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

  @Event() changeChoice: EventEmitter;

  @Watch("choices")
  setChoices(newValue: any, oldValue: any) {
    const newValueStringify = JSON.stringify(newValue);
    const oldValueStringify = JSON.stringify(oldValue);

    if (newValueStringify !== oldValueStringify) {
      this._choices = newValue;
    }
  }

  clearChoices(){
    const newChoices = [...this._choices];
    newChoices.map( choice => choice.selected = false);
    this._choices = newChoices;
  }

  knowIfThereIsAnItemSelected(){
    return this._choices.filter(choice => choice.selected === true).length > 0;
  }

  handleOptionClick = (index:number) =>{
    this.clearChoices();
    this.handleHideOptions();
    const newChoices = [...this._choices];
    newChoices[index].selected = true;
    this._choices = [...newChoices];
    const valueEmit = this._choices[index].value;
    this.changeChoice.emit(valueEmit)
  }

  placeholderSelected = () =>{
    this.clearChoices();
    this.handleHideOptions();
  }

  handleToogleOptions(){
    this.isOpenDropdown = !this.isOpenDropdown;
    this.calculatePositionOfOptions()
  }

  handleShowOptions= () =>{
    this.isOpenDropdown = true;
  }

  handleHideOptions = () =>{
    this.isOpenDropdown = false;
  }

  closeDroprownIfClickOutDropdown = (event) =>{
    const elementActiveDropdown = this.singleFileInput;
    let targetElement = event.target;

    if (
      !elementActiveDropdown.contains(targetElement)
    ) {
      return this.handleHideOptions();
    }
  }

  getHeigthWrapperOptions = () => {
    return this.dropdownItems.getBoundingClientRect().height;
  }

  observerListItems = () =>{

    const config = { attributes: true, childList: false, characterData: false };

    this.observerItems = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if( mutation.type === "attributes" ){
          this.calculatePositionOfOptions();
        }
      });
    });

    this.observerItems.observe(this.dropdownItems, config);
  }

  calculatePositionOfOptions = () =>{
    if(this.isOpenDropdown){
      const dropdown =  this.singleFileInput;
      const elementItems = this.dropdownItems;
      const heightBody =  document.body.getBoundingClientRect().height;
      const listHeight = elementItems.getBoundingClientRect().height;
      const dropdownField = dropdown.getBoundingClientRect().height;
      const positionDropdown = dropdown.getBoundingClientRect().top;
      const MARGIN_DROPDOWN_TO_ITEMS = 8;
      const elementPos = positionDropdown + dropdownField + MARGIN_DROPDOWN_TO_ITEMS + listHeight;
      return this.positionOptionstop = heightBody < elementPos
    }
    this.positionOptionstop = false;
  }

  validateDisabled = () =>{
    this.disabled ? false : this.handleToogleOptions()
  }

  componentWillLoad() {
    this._choices = [...this.choices];
    document.addEventListener("click", this.closeDroprownIfClickOutDropdown);
  }

  componentDidLoad() {
    this.observerListItems()
  }

  componentDidUnload() {
    if(this.observerItems) this.observerItems.disconnect();
    document.removeEventListener("click",this.closeDroprownIfClickOutDropdown);
  }

  render() {
    const attrs = {
      disabled: this.disabled,
      loader: this.loader,
      fieldReadonly: this.fieldReadonly,
      color:this.color,
      error:this.error,
      border:this.border,
      bgField:this.bgField,
      isActive:this.isOpenDropdown
    };
    return (
      <Host data-testid="cc-single-file-input" class="single-file-input">
        {this.label && <span class="single-file-input__label">{this.label}</span> }
        <cc-wrapper-field
          ref={el => (this.singleFileInput = el)}
          class={{
            "single-file-input__wrapper":true,
            "single-file-input--is-collapse":this.isOpenDropdown
          }}
          {...attrs}
          >
          <div class="single-file-input__field" onClick={this.validateDisabled}>
            <p class={{
              "single-file-input__placeholder":true,
              "single-file-input__placeholder--is-hidden": this.knowIfThereIsAnItemSelected()

            }}>{this.placeholder}</p>
            {
              this._choices.map((c) =>{
                return <p class={
                  {
                    'single-file-input__field-option':true,
                    'single-file-input__field-option--is-selected':c.selected
                  }
                }>{c.label}</p>
              })
            }
            <div class="single-file-input__wrapper-icon">
              {this.loader ? (
                  <cc-loader></cc-loader>
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
          <ul ref={el => (this.dropdownItems = el)}
              class={{
                "single-file-input__options":true ,
                'single-file-input__options--is-active':this.isOpenDropdown,
                "single-file-input__options--top": this.positionOptionstop,
              }}>
            <li class={{"single-file-input__option":true, "single-file-input__option--is-selected": !this.knowIfThereIsAnItemSelected() }} onClick={this.placeholderSelected}>{this.placeholder}</li>
            {
              this._choices.map((c , index) =>{
                return <li
                  onClick={  () =>  c.disabled ? false : this.handleOptionClick(index)}
                  class={{
                    'single-file-input__option':true,
                    'single-file-input__option--is-selected': c.selected,
                    'single-file-input__option--is-disabled': c.disabled,
                  }}>{c.label}</li>
              })
            }
          </ul>
        </cc-wrapper-field>
      </Host>
    );
  }
}
