/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface CcButton {
    'color': "primary" | "secondary";
    'disabled': boolean;
    'expand': boolean;
    'fill': "outline" | "clear" | "solid";
    'glow': boolean;
    'href'?: string;
    'iconName': string;
    'iconOnly': boolean;
    'iconReverse': boolean;
    'size'?: "lg" | "md" | "sm";
    'target'?: string;
    'type': "button" | "submit";
  }
  interface CcDropdown {
    'border': boolean;
    'choices': Array<any>;
    'color': "primary" | "secondary";
    'currentValue'?: string;
    'disabled'?: boolean;
    'error'?: boolean;
    'fieldReadonly'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'label': string;
    'name'?: string;
    'noChoicesText'?: string;
    'noResultsText'?: string;
    'placeholder'?: string;
    'type'?: "single" | "multiple" | "text";
  }
  interface CcIcon {
    'name': string;
    'size': number;
  }
  interface CcInput {
    'color': "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'helperText'?: string;
    'inputRef'?: (el: HTMLInputElement) => void;
    'label'?: string;
    'name'?: string;
    'placeholder'?: string;
    'success'?: boolean;
    'type'?: "text" | "password" | "number";
    'value'?: string;
  }
  interface CcLoader {
    'size': number;
  }
  interface CcText {
    'strong': boolean;
    'tag': string;
    'type': string;
  }
  interface CcTextarea {
    'color': "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'helperText'?: string;
    'label'?: string;
    'name'?: string;
    'placeholder'?: string;
    'rich'?: boolean;
    'success'?: boolean;
    'value'?: string;
  }
}

declare global {


  interface HTMLCcButtonElement extends Components.CcButton, HTMLStencilElement {}
  var HTMLCcButtonElement: {
    prototype: HTMLCcButtonElement;
    new (): HTMLCcButtonElement;
  };

  interface HTMLCcDropdownElement extends Components.CcDropdown, HTMLStencilElement {}
  var HTMLCcDropdownElement: {
    prototype: HTMLCcDropdownElement;
    new (): HTMLCcDropdownElement;
  };

  interface HTMLCcIconElement extends Components.CcIcon, HTMLStencilElement {}
  var HTMLCcIconElement: {
    prototype: HTMLCcIconElement;
    new (): HTMLCcIconElement;
  };

  interface HTMLCcInputElement extends Components.CcInput, HTMLStencilElement {}
  var HTMLCcInputElement: {
    prototype: HTMLCcInputElement;
    new (): HTMLCcInputElement;
  };

  interface HTMLCcLoaderElement extends Components.CcLoader, HTMLStencilElement {}
  var HTMLCcLoaderElement: {
    prototype: HTMLCcLoaderElement;
    new (): HTMLCcLoaderElement;
  };

  interface HTMLCcTextElement extends Components.CcText, HTMLStencilElement {}
  var HTMLCcTextElement: {
    prototype: HTMLCcTextElement;
    new (): HTMLCcTextElement;
  };

  interface HTMLCcTextareaElement extends Components.CcTextarea, HTMLStencilElement {}
  var HTMLCcTextareaElement: {
    prototype: HTMLCcTextareaElement;
    new (): HTMLCcTextareaElement;
  };
  interface HTMLElementTagNameMap {
    'cc-button': HTMLCcButtonElement;
    'cc-dropdown': HTMLCcDropdownElement;
    'cc-icon': HTMLCcIconElement;
    'cc-input': HTMLCcInputElement;
    'cc-loader': HTMLCcLoaderElement;
    'cc-text': HTMLCcTextElement;
    'cc-textarea': HTMLCcTextareaElement;
  }
}

declare namespace LocalJSX {
  interface CcButton {
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'expand'?: boolean;
    'fill'?: "outline" | "clear" | "solid";
    'glow'?: boolean;
    'href'?: string;
    'iconName'?: string;
    'iconOnly'?: boolean;
    'iconReverse'?: boolean;
    'size'?: "lg" | "md" | "sm";
    'target'?: string;
    'type'?: "button" | "submit";
  }
  interface CcDropdown {
    'border'?: boolean;
    'choices'?: Array<any>;
    'color'?: "primary" | "secondary";
    'currentValue'?: string;
    'disabled'?: boolean;
    'error'?: boolean;
    'fieldReadonly'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'label'?: string;
    'name'?: string;
    'noChoicesText'?: string;
    'noResultsText'?: string;
    'onChangeChoice'?: (event: CustomEvent<any>) => void;
    'onClickDropdown'?: (event: CustomEvent<any>) => void;
    'placeholder'?: string;
    'type'?: "single" | "multiple" | "text";
  }
  interface CcIcon {
    'name'?: string;
    'size'?: number;
  }
  interface CcInput {
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'helperText'?: string;
    'inputRef'?: (el: HTMLInputElement) => void;
    'label'?: string;
    'name'?: string;
    'placeholder'?: string;
    'success'?: boolean;
    'type'?: "text" | "password" | "number";
    'value'?: string;
  }
  interface CcLoader {
    'size'?: number;
  }
  interface CcText {
    'strong'?: boolean;
    'tag'?: string;
    'type'?: string;
  }
  interface CcTextarea {
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'helperText'?: string;
    'label'?: string;
    'name'?: string;
    'onChangeText'?: (event: CustomEvent<string>) => void;
    'placeholder'?: string;
    'rich'?: boolean;
    'success'?: boolean;
    'value'?: string;
  }

  interface IntrinsicElements {
    'cc-button': CcButton;
    'cc-dropdown': CcDropdown;
    'cc-icon': CcIcon;
    'cc-input': CcInput;
    'cc-loader': CcLoader;
    'cc-text': CcText;
    'cc-textarea': CcTextarea;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'cc-button': LocalJSX.CcButton & JSXBase.HTMLAttributes<HTMLCcButtonElement>;
      'cc-dropdown': LocalJSX.CcDropdown & JSXBase.HTMLAttributes<HTMLCcDropdownElement>;
      'cc-icon': LocalJSX.CcIcon & JSXBase.HTMLAttributes<HTMLCcIconElement>;
      'cc-input': LocalJSX.CcInput & JSXBase.HTMLAttributes<HTMLCcInputElement>;
      'cc-loader': LocalJSX.CcLoader & JSXBase.HTMLAttributes<HTMLCcLoaderElement>;
      'cc-text': LocalJSX.CcText & JSXBase.HTMLAttributes<HTMLCcTextElement>;
      'cc-textarea': LocalJSX.CcTextarea & JSXBase.HTMLAttributes<HTMLCcTextareaElement>;
    }
  }
}


