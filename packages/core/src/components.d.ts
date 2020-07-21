/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  TabOption,
} from './utils/types/TabOption';

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
    'loading'?: boolean;
    'size'?: "lg" | "md" | "sm";
    'target'?: string;
    'type': "button" | "submit";
  }
  interface CcCheckfield {
    'checked'?: boolean;
    'color': "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'inputRef'?: (el: HTMLInputElement) => void;
    'label'?: string;
    'name'?: string;
    'shape'?: "circle" | "square";
    'size'?: "small" | "medium";
    'type'?: "checkbox" | "radio";
    'value'?: string;
  }
  interface CcDropdown {
    'bgField'?: string;
    'border'?: boolean;
    'choices': Array<any>;
    'color': "primary" | "secondary";
    'currentValue'?: string;
    'disabled'?: boolean;
    'error'?: boolean;
    'fieldReadonly'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'iconOnly'?: boolean;
    'label': string;
    'loader'?: boolean;
    'name'?: string;
    'noChoicesText'?: string;
    'noResultsText'?: string;
    'placeholder'?: string;
    'type'?: "single" | "multiple" | "text";
  }
  interface CcFilterSelectInput {
    'IconRotate'?: boolean;
    'bgField'?: string;
    'border'?: boolean;
    'choices': Array<any>;
    'color': "primary" | "secondary";
    'currentValue'?: string;
    'disabled'?: boolean;
    'error'?: boolean;
    'fieldReadonly'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'label': string;
    'loader'?: boolean;
    'name'?: string;
    'placeholder'?: string;
    'type'?: "checkbox";
  }
  interface CcIcon {
    'name': string;
    'size': number;
  }
  interface CcInput {
    'autocomplete'?: string;
    'bgField'?: string;
    'border'?: boolean;
    'color': "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'inputRef'?: (el: HTMLInputElement) => void;
    'label'?: string;
    'maxLength'?: number;
    'name'?: string;
    'placeholder'?: string;
    'success'?: boolean;
    'type'?: "text" | "password" | "number";
    'value'?: string;
  }
  interface CcLoader {
    'size'?: number;
  }
  interface CcModal {
    'color': "primary" | "secondary";
    'disableESC': boolean;
    'hideCloseButton': boolean;
    'size': "sm" | "md";
    'visible': boolean;
  }
  interface CcModalController {
    'modalRef': HTMLElement;
  }
  interface CcSingleSelectInput {
    'IconRotate'?: boolean;
    'autocomplete'?: boolean;
    'bgField'?: string;
    'border'?: boolean;
    'choices': Array<any>;
    'color': "primary" | "secondary";
    'currentValue'?: string;
    'disabled'?: boolean;
    'error'?: boolean;
    'fieldReadonly'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'label': string;
    'loader'?: boolean;
    'name'?: string;
    'placeholder'?: string;
  }
  interface CcSwitcher {
    'checked'?: boolean;
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'inputRef'?: (el: HTMLInputElement) => void;
    'name'?: string;
    'size'?: "sm" | "md";
    'value'?: string;
  }
  interface CcTabsTags {
    'color'?: "primary" | "secondary";
    'options'?: TabOption[];
  }
  interface CcTabsUnderline {
    'border'?: boolean;
    'center'?: boolean;
    'color'?: "primary" | "secondary";
    'options'?: TabOption[];
    'size'?: "sm" | "md";
  }
  interface CcTextarea {
    'autoGrow'?: boolean;
    'color': "primary" | "secondary";
    'counter'?: boolean;
    'disabled'?: boolean;
    'enableImage'?: boolean;
    'error'?: boolean;
    'focusTextEditor': () => Promise<void>;
    'helperText'?: string;
    'imageService'?: (file: any) => Promise<string>;
    'label'?: string;
    'maxLength'?: number;
    'name'?: string;
    'outlined': boolean;
    'placeholder'?: string;
    'rich'?: boolean;
    'setDataRichEditor': (data: string) => Promise<void>;
    'success'?: boolean;
    'value'?: string;
    'withoutRadius'?: boolean;
  }
  interface CcWrapperField {
    'IconRotate'?: boolean;
    'bgField'?: string;
    'border'?: boolean;
    'color': "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'fieldReadonly'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'iconOnly'?: boolean;
    'isActive'?: boolean;
    'isFocus'?: boolean;
    'loader'?: boolean;
  }
}

declare global {


  interface HTMLCcButtonElement extends Components.CcButton, HTMLStencilElement {}
  var HTMLCcButtonElement: {
    prototype: HTMLCcButtonElement;
    new (): HTMLCcButtonElement;
  };

  interface HTMLCcCheckfieldElement extends Components.CcCheckfield, HTMLStencilElement {}
  var HTMLCcCheckfieldElement: {
    prototype: HTMLCcCheckfieldElement;
    new (): HTMLCcCheckfieldElement;
  };

  interface HTMLCcDropdownElement extends Components.CcDropdown, HTMLStencilElement {}
  var HTMLCcDropdownElement: {
    prototype: HTMLCcDropdownElement;
    new (): HTMLCcDropdownElement;
  };

  interface HTMLCcFilterSelectInputElement extends Components.CcFilterSelectInput, HTMLStencilElement {}
  var HTMLCcFilterSelectInputElement: {
    prototype: HTMLCcFilterSelectInputElement;
    new (): HTMLCcFilterSelectInputElement;
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

  interface HTMLCcModalElement extends Components.CcModal, HTMLStencilElement {}
  var HTMLCcModalElement: {
    prototype: HTMLCcModalElement;
    new (): HTMLCcModalElement;
  };

  interface HTMLCcModalControllerElement extends Components.CcModalController, HTMLStencilElement {}
  var HTMLCcModalControllerElement: {
    prototype: HTMLCcModalControllerElement;
    new (): HTMLCcModalControllerElement;
  };

  interface HTMLCcSingleSelectInputElement extends Components.CcSingleSelectInput, HTMLStencilElement {}
  var HTMLCcSingleSelectInputElement: {
    prototype: HTMLCcSingleSelectInputElement;
    new (): HTMLCcSingleSelectInputElement;
  };

  interface HTMLCcSwitcherElement extends Components.CcSwitcher, HTMLStencilElement {}
  var HTMLCcSwitcherElement: {
    prototype: HTMLCcSwitcherElement;
    new (): HTMLCcSwitcherElement;
  };

  interface HTMLCcTabsTagsElement extends Components.CcTabsTags, HTMLStencilElement {}
  var HTMLCcTabsTagsElement: {
    prototype: HTMLCcTabsTagsElement;
    new (): HTMLCcTabsTagsElement;
  };

  interface HTMLCcTabsUnderlineElement extends Components.CcTabsUnderline, HTMLStencilElement {}
  var HTMLCcTabsUnderlineElement: {
    prototype: HTMLCcTabsUnderlineElement;
    new (): HTMLCcTabsUnderlineElement;
  };

  interface HTMLCcTextareaElement extends Components.CcTextarea, HTMLStencilElement {}
  var HTMLCcTextareaElement: {
    prototype: HTMLCcTextareaElement;
    new (): HTMLCcTextareaElement;
  };

  interface HTMLCcWrapperFieldElement extends Components.CcWrapperField, HTMLStencilElement {}
  var HTMLCcWrapperFieldElement: {
    prototype: HTMLCcWrapperFieldElement;
    new (): HTMLCcWrapperFieldElement;
  };
  interface HTMLElementTagNameMap {
    'cc-button': HTMLCcButtonElement;
    'cc-checkfield': HTMLCcCheckfieldElement;
    'cc-dropdown': HTMLCcDropdownElement;
    'cc-filter-select-input': HTMLCcFilterSelectInputElement;
    'cc-icon': HTMLCcIconElement;
    'cc-input': HTMLCcInputElement;
    'cc-loader': HTMLCcLoaderElement;
    'cc-modal': HTMLCcModalElement;
    'cc-modal-controller': HTMLCcModalControllerElement;
    'cc-single-select-input': HTMLCcSingleSelectInputElement;
    'cc-switcher': HTMLCcSwitcherElement;
    'cc-tabs-tags': HTMLCcTabsTagsElement;
    'cc-tabs-underline': HTMLCcTabsUnderlineElement;
    'cc-textarea': HTMLCcTextareaElement;
    'cc-wrapper-field': HTMLCcWrapperFieldElement;
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
    'loading'?: boolean;
    'size'?: "lg" | "md" | "sm";
    'target'?: string;
    'type'?: "button" | "submit";
  }
  interface CcCheckfield {
    'checked'?: boolean;
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'inputRef'?: (el: HTMLInputElement) => void;
    'label'?: string;
    'name'?: string;
    'shape'?: "circle" | "square";
    'size'?: "small" | "medium";
    'type'?: "checkbox" | "radio";
    'value'?: string;
  }
  interface CcDropdown {
    'bgField'?: string;
    'border'?: boolean;
    'choices'?: Array<any>;
    'color'?: "primary" | "secondary";
    'currentValue'?: string;
    'disabled'?: boolean;
    'error'?: boolean;
    'fieldReadonly'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'iconOnly'?: boolean;
    'label'?: string;
    'loader'?: boolean;
    'name'?: string;
    'noChoicesText'?: string;
    'noResultsText'?: string;
    'onChangeChoice'?: (event: CustomEvent<any>) => void;
    'onClickDropdown'?: (event: CustomEvent<any>) => void;
    'placeholder'?: string;
    'type'?: "single" | "multiple" | "text";
  }
  interface CcFilterSelectInput {
    'IconRotate'?: boolean;
    'bgField'?: string;
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
    'loader'?: boolean;
    'name'?: string;
    'onChangeChoice'?: (event: CustomEvent<any>) => void;
    'placeholder'?: string;
    'type'?: "checkbox";
  }
  interface CcIcon {
    'name'?: string;
    'size'?: number;
  }
  interface CcInput {
    'autocomplete'?: string;
    'bgField'?: string;
    'border'?: boolean;
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'inputRef'?: (el: HTMLInputElement) => void;
    'label'?: string;
    'maxLength'?: number;
    'name'?: string;
    'placeholder'?: string;
    'success'?: boolean;
    'type'?: "text" | "password" | "number";
    'value'?: string;
  }
  interface CcLoader {
    'size'?: number;
  }
  interface CcModal {
    'color'?: "primary" | "secondary";
    'disableESC'?: boolean;
    'hideCloseButton'?: boolean;
    'onCancel'?: (event: CustomEvent<any>) => void;
    'onClose'?: (event: CustomEvent<any>) => void;
    'size'?: "sm" | "md";
    'visible'?: boolean;
  }
  interface CcModalController {
    'modalRef'?: HTMLElement;
  }
  interface CcSingleSelectInput {
    'IconRotate'?: boolean;
    'autocomplete'?: boolean;
    'bgField'?: string;
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
    'loader'?: boolean;
    'name'?: string;
    'onChangeChoice'?: (event: CustomEvent<any>) => void;
    'placeholder'?: string;
  }
  interface CcSwitcher {
    'checked'?: boolean;
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'inputRef'?: (el: HTMLInputElement) => void;
    'name'?: string;
    'size'?: "sm" | "md";
    'value'?: string;
  }
  interface CcTabsTags {
    'color'?: "primary" | "secondary";
    'onChangeOption'?: (event: CustomEvent<TabOption>) => void;
    'options'?: TabOption[];
  }
  interface CcTabsUnderline {
    'border'?: boolean;
    'center'?: boolean;
    'color'?: "primary" | "secondary";
    'onChangeOption'?: (event: CustomEvent<TabOption>) => void;
    'options'?: TabOption[];
    'size'?: "sm" | "md";
  }
  interface CcTextarea {
    'autoGrow'?: boolean;
    'color'?: "primary" | "secondary";
    'counter'?: boolean;
    'disabled'?: boolean;
    'enableImage'?: boolean;
    'error'?: boolean;
    'helperText'?: string;
    'imageService'?: (file: any) => Promise<string>;
    'label'?: string;
    'maxLength'?: number;
    'name'?: string;
    'onChangeText'?: (event: CustomEvent<string>) => void;
    'outlined'?: boolean;
    'placeholder'?: string;
    'rich'?: boolean;
    'success'?: boolean;
    'value'?: string;
    'withoutRadius'?: boolean;
  }
  interface CcWrapperField {
    'IconRotate'?: boolean;
    'bgField'?: string;
    'border'?: boolean;
    'color'?: "primary" | "secondary";
    'disabled'?: boolean;
    'error'?: boolean;
    'fieldReadonly'?: boolean;
    'helperText'?: string;
    'iconName'?: string;
    'iconOnly'?: boolean;
    'isActive'?: boolean;
    'isFocus'?: boolean;
    'loader'?: boolean;
  }

  interface IntrinsicElements {
    'cc-button': CcButton;
    'cc-checkfield': CcCheckfield;
    'cc-dropdown': CcDropdown;
    'cc-filter-select-input': CcFilterSelectInput;
    'cc-icon': CcIcon;
    'cc-input': CcInput;
    'cc-loader': CcLoader;
    'cc-modal': CcModal;
    'cc-modal-controller': CcModalController;
    'cc-single-select-input': CcSingleSelectInput;
    'cc-switcher': CcSwitcher;
    'cc-tabs-tags': CcTabsTags;
    'cc-tabs-underline': CcTabsUnderline;
    'cc-textarea': CcTextarea;
    'cc-wrapper-field': CcWrapperField;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'cc-button': LocalJSX.CcButton & JSXBase.HTMLAttributes<HTMLCcButtonElement>;
      'cc-checkfield': LocalJSX.CcCheckfield & JSXBase.HTMLAttributes<HTMLCcCheckfieldElement>;
      'cc-dropdown': LocalJSX.CcDropdown & JSXBase.HTMLAttributes<HTMLCcDropdownElement>;
      'cc-filter-select-input': LocalJSX.CcFilterSelectInput & JSXBase.HTMLAttributes<HTMLCcFilterSelectInputElement>;
      'cc-icon': LocalJSX.CcIcon & JSXBase.HTMLAttributes<HTMLCcIconElement>;
      'cc-input': LocalJSX.CcInput & JSXBase.HTMLAttributes<HTMLCcInputElement>;
      'cc-loader': LocalJSX.CcLoader & JSXBase.HTMLAttributes<HTMLCcLoaderElement>;
      'cc-modal': LocalJSX.CcModal & JSXBase.HTMLAttributes<HTMLCcModalElement>;
      'cc-modal-controller': LocalJSX.CcModalController & JSXBase.HTMLAttributes<HTMLCcModalControllerElement>;
      'cc-single-select-input': LocalJSX.CcSingleSelectInput & JSXBase.HTMLAttributes<HTMLCcSingleSelectInputElement>;
      'cc-switcher': LocalJSX.CcSwitcher & JSXBase.HTMLAttributes<HTMLCcSwitcherElement>;
      'cc-tabs-tags': LocalJSX.CcTabsTags & JSXBase.HTMLAttributes<HTMLCcTabsTagsElement>;
      'cc-tabs-underline': LocalJSX.CcTabsUnderline & JSXBase.HTMLAttributes<HTMLCcTabsUnderlineElement>;
      'cc-textarea': LocalJSX.CcTextarea & JSXBase.HTMLAttributes<HTMLCcTextareaElement>;
      'cc-wrapper-field': LocalJSX.CcWrapperField & JSXBase.HTMLAttributes<HTMLCcWrapperFieldElement>;
    }
  }
}


