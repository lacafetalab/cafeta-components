import notes from "./readme.md";
import { withKnobs, boolean, text, number } from "@storybook/addon-knobs/html";
import { radios } from "@storybook/addon-knobs"

export default { title: "Form/Textarea", decorators: [withKnobs] };

export const Textarea = () => {

  const disabled = boolean("Disabled", false);
  const placeholder = text("Placeholder", "Insert some text..");
  const value = text("Value", "");

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-xxlg">
    <cc-textarea value="${value}"  id="text" icon-name="check" label="DEFAULT" ${disabled ? "disabled" : ""
    } placeholder="${placeholder}"></cc-textarea>
  </div>

  <div class="p-xxlg">
    <cc-textarea value="${value}" label="SUCCESS" success ${disabled ? "disabled" : ""
    } placeholder="${placeholder}"></cc-textarea>
  </div>

  <div class="p-xxlg">
    <cc-textarea value="${value}" label="ERROR" error helper-text="Incorrect entry" ${disabled ? "disabled" : ""
    } placeholder="${placeholder}"></cc-textarea>
  </div>`;

  wrap.querySelector("#text").addEventListener("changeText", e => {
    console.log("textarea: onChangeText -->", e.detail);
  });

  return wrap;
};

export const TextareaWithRichEditor = () => {

  const textareaBuilder = (values) => {
    const textarea = document.createElement("cc-textarea");
    Object.keys(values).forEach((key, index) => {
      const value = values[key];
      textarea[key] = value;
    });
    return textarea;
  };

  const label = 'label';
  const defaultValue = "SOY UN RICH";
  const value = text(label, defaultValue);

  const label3 = 'enableMediaEmbed'
  const defaultValue3 = false;
  const value3 = boolean(label3, defaultValue3);

  const label9 = "color";
  const options9 = {
    Primary: "primary",
    Secondary: "secondary"
  }
  const defaultValue9 = "primary";
  const value9 = radios(label9, options9, defaultValue9);

  const textarea1 = textareaBuilder({
    label: value,
    rich: true,
    color: value9,
    enableMediaEmbed: value3,
    error: boolean("error", false),
    success: boolean("success", false),
    disabled: boolean("disabled", false),
    placeholder: text("Placeholder", "Insert some text.."),
    name: text("name", ""),
    rich: boolean("rich", true),
    value: text("value", ""),
    iconName: text("iconName", ""),
    helperText: text("iconName", ""),
    maxLength: number("maxLength", 1),
    outlined: boolean("outlined", false),
    autoGrow: boolean("autoGrow", false),
    withoutRadius: boolean("withoutRadius", false),
    counter: boolean("counter", false),
    bgField: radios("bgField", {
      transparent: "transparent",
      white: "white"
    }, "white"),
    enableImage: boolean("enableImage", true),
    enableMediaEmbed: boolean("enableMediaEmbed", false),
    isRequired: boolean("isRequired", false),
  });

  const wrap = document.createElement("div");
  wrap.innerHTML = `
  <div class="p-xxlg">
  <div class="flex flex-col">
  <div class="mt-lg flex flex-col align-middle" id="textarea1" icon-name="check" ></div>
  <div class="py-xxlg">
  <cc-textarea id="rich" enable-media-embed rich label="DEFAULT"></cc-textarea>
</div>
  </div>
  </div>`;


  wrap.querySelector("#rich").enableImage = true;
  wrap.querySelector("#rich").imageService = async file => {
    throw new Error(`Error al subir la imagen ${file.name}`);
    return "asd";
  };

  wrap.querySelector("#textarea1").addEventListener("changeText", e => {
    console.log("textarea1 text: onChangeText -->", e.detail);
  });

  wrap.querySelector("#textarea1").addEventListener("totalCharacters", e => {

    console.log("textarea1 asdasd text: totalCharacters -->", e.detail);
  });


  wrap.querySelector("#textarea1").appendChild(textarea1);

  return wrap;
};

TextareaWithRichEditor.story = {
  parameters: {
    notes
  }
};

Textarea.story = {
  parameters: {
    notes
  }
};
