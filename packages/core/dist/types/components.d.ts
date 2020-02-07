/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from './stencil.core';


export namespace Components {
  interface CcButton {
    'color': "primary" | "secondary";
    'disabled': boolean;
    'expand': boolean;
    'fill': "outline" | "clear" | "solid";
    'href'?: string;
    'iconName': string;
    'iconOnly': boolean;
    'iconReverse': boolean;
    'size'?: "lg" | "md" | "sm";
    'target'?: string;
  }
  interface CcIcon {
    'color': "color-text-01" | "color-text-02" | "color-text-03";
    'name': string;
    'size': number;
  }
  interface CcText {
    'strong': boolean;
    'tag': string;
    'type': string;
  }
}

declare global {


  interface HTMLCcButtonElement extends Components.CcButton, HTMLStencilElement {}
  var HTMLCcButtonElement: {
    prototype: HTMLCcButtonElement;
    new (): HTMLCcButtonElement;
  };

  interface HTMLCcIconElement extends Components.CcIcon, HTMLStencilElement {}
  var HTMLCcIconElement: {
    prototype: HTMLCcIconElement;
    new (): HTMLCcIconElement;
  };

  interface HTMLCcTextElement extends Components.CcText, HTMLStencilElement {}
  var HTMLCcTextElement: {
    prototype: HTMLCcTextElement;
    new (): HTMLCcTextElement;
  };
  interface HTMLElementTagNameMap {
    'cc-button': HTMLCcButtonElement;
    'cc-icon': HTMLCcIconElement;
    'cc-text': HTMLCcTextElement;
  }
}

declare namespace LocalJSX {
  interface CcButton {
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'expand'?: boolean;
    'fill'?: "outline" | "clear" | "solid";
    'href'?: string;
    'iconName'?: string;
    'iconOnly'?: boolean;
    'iconReverse'?: boolean;
    'size'?: "lg" | "md" | "sm";
    'target'?: string;
  }
  interface CcIcon {
    'color'?: "color-text-01" | "color-text-02" | "color-text-03";
    'name'?: string;
    'size'?: number;
  }
  interface CcText {
    'strong'?: boolean;
    'tag'?: string;
    'type'?: string;
  }

  interface IntrinsicElements {
    'cc-button': CcButton;
    'cc-icon': CcIcon;
    'cc-text': CcText;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'cc-button': LocalJSX.CcButton & JSXBase.HTMLAttributes<HTMLCcButtonElement>;
      'cc-icon': LocalJSX.CcIcon & JSXBase.HTMLAttributes<HTMLCcIconElement>;
      'cc-text': LocalJSX.CcText & JSXBase.HTMLAttributes<HTMLCcTextElement>;
    }
  }
}


