import { withKnobs, select } from "@storybook/addon-knobs/html";
import notes from "./readme.md";
import uso from "./usage.md";
import iconPaths from "./selection";

export default { title: "Icon", decorators: [withKnobs] };

export const Icon = () => {
  const label = "Names";
  const options = iconPaths.icons.reduce(
    (options, icon) => ({
      ...options,
      [icon.properties.name]: icon.properties.name
    }),
    {}
  );

  const defaultValue = "user";
  const groupId = "GROUP-ID1";

  const value = select(label, options, defaultValue, groupId);

  return `<cc-icon name="${value}"></cc-icon>`;
};

Icon.story = {
  parameters: {
    notes: {
      parametros: notes,
      uso
    }
  }
};

const iconCard = icon => `
  <div class="flex flex-col py-4 px-2 items-center rounded text-sm">
    <cc-icon name="${icon.properties.name}"></cc-icon>
    <span class="block mt-1">${icon.properties.name}</span>
  </div>`;

export const IconosDisponibles = () => `
  <div class="p-lg">
    <h1 class="text-heading-01 font-black mb-xlg">Iconos Disponibles</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-lg">
      ${iconPaths.icons.map(icon => iconCard(icon)).join(" ")}
    </div>
  </div>
`;

export const ActualizarIconos = () => `
  <div class="p-xlg">
    <h1 class="text-heading-01 font-black mb-lg">Actualizar Iconos</h1>
    <p class="mb-lg">
      <strong class="font-medium">Paso 1:</strong> Cargar los iconos a
      icomoon con el archivo
      <span class="inline-block bg-disabled text-neutral-03 p-xs">
        selection.json
      </span>
      de la carpeta
      <span class="inline-block bg-disabled text-neutral-03 p-xs">
        src/components/Icon/
      </span>
    </p>
    <p class="mb-lg">
      <strong class="font-medium">Paso 2:</strong> Agregar y/o eliminar los
      iconos deseados
    </p>
    <p class="mb-lg">
      <strong class="font-medium">Paso 3:</strong> Clic en
      <strong class="font-medium">Generate Font</strong> en la parte
      inferior
    </p>
    <p class="mb-lg">
      <strong class="font-medium">Paso 3:</strong> Clic en
      <strong class="font-medium">Enable Quick Usage</strong> en la parte
      superior
    </p>

    <p class="mb-lg">
      <strong class="font-medium">Paso 4:</strong> Clic en
      <span class="inline-block bg-disabled text-neutral-03 p-xs">
        selection.json
      </span>
      en la seccion <strong class="font-medium">Quick Usage</strong>
    </p>
    <p class="mb-lg">
      <strong class="font-medium">Paso 5:</strong> Copiar la url de
      <span class="inline-block bg-disabled text-neutral-03 p-xs">
        selection.json
      </span>
      - ejemplo:
      <span class="inline-block bg-disabled text-neutral-03 p-xs">
        https://i.icomoon.io/public/temp/51116d7a97/ctgpicons/selection.json
      </span>
    </p>

    <p class="mb-lg">
      <strong class="font-medium">Paso 6: </strong>
      Ejecutar el comando
      <span class="inline-block bg-disabled text-neutral-03 p-xs">
        yarn icons:update "URL_DE_SELECTION.JSON"
      </span>
      en la raiz del proyecto
    </p>

    <p class="mb-lg">Ejemplo:</p>
    <div class="bg-neutral-03 text-neutral-04 p-md rounded">
      <code>yarn icons:update "https://i.icomoon.io/public/temp/51116d7a97/ctgpicons/selection.json"</code>
    </div>
  </div>
`;
