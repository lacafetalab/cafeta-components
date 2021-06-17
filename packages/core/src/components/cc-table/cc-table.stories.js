import notes from "./readme.md";
import { withKnobs, text } from "@storybook/addon-knobs/html";

export default { title: "Table", decorators: [withKnobs] };

export const Table = () => {
  const wrap = document.createElement("div");

  wrap.innerHTML = `
    <div class="p-xxlg">
      <cc-table borderColor="secundary">
        <h2>Semana 2 / Tema 2 / Unidad 1:</h2>
        <p>Tema: Presentación del curso: Introducción a la Química y su importancia en la ingeniería<p>
      </cc-table>
    </div>
  `;

  return wrap;
};

Table.story = {
  parameters: {
    notes
  }
};
