export default {
  title: "Guía Base"
};

export const Intro = () => `
  <div class="p-xxlg">
    <h1 class="text-heading-01 font-black mb-xlg">Introducción</h1>

    <p class="mb-lg">
      Este design system tiene como objetivo estandarizar la parte visual y
      optimizar el tiempo de desarrollo centrándose en reutilizar componentes.
    </p>
    <p class="mb-lg">
      La herramienta utilizada será Tailwind porque ayuda con la generación de
      utilitarios de modo intuitivo, personalizable y completo. Además, aporta
      sentido de orden manifestando la legibilidad del código. Por esta y otras
      razones Tailwind se convierte en un framework ideal para proyectos y
      equipos grandes. Para mayor información revisar el siguiente link:
      <a
        href="https://tailwindcss.com/"
        target="_blank"
        class="text-primary"
      >
        https://tailwindcss.com/
      </a>
    </p>

    <h2 class="text-heading-02 font-black mb-lg mt-xxlg">
      Configuraciones generales
    </h2>

    <h3 class="text-subheading-01 font-black">Tailwind</h3>
    <p class="mb-lg">
      Todas las configuraciones de tailwind de este documento se pueden
      encontrar en el archivo
      <strong class="font-bold">tailwind.config.js</strong> en la raiz del
      proyecto
    </p>

    <p class="mb-lg">
      <strong class="font-bold">Nota:</strong> Todas las configuraciones
      de tailwind no descritas en este documento se mantienen por defecto
    </p>

    <h3 class="text-subheading-01 font-black">Unidades REM</h3>
    <p class="mb-lg">
      El valor base de los <strong class="font-bold">rem</strong> ha sido
      cambiado a <strong class="font-bold">base 10</strong>.
      <br />
      Ejemplo:
      <br />
      <strong class="font-bold">1rem</strong> = 10px
      <br />
      <strong class="font-bold">0.5rem</strong> = 5px
      <br />
      <strong class="font-bold">0.1rem</strong> = 1px
      <br />
      <strong class="font-bold">0.025rem</strong> = 0.25px
    </p>

    <h2 class="text-heading-02 font-black mb-lg mt-xxlg">
      VSCode - Extensiones de ayuda
    </h2>

    <p class="mb-lg">
      <strong>Tailwind CSS IntelliSense: </strong> Tailwind CSS IntelliSense
      utiliza la instalación y configuración de Tailwind de sus proyectos para
      proporcionar sugerencias mientras escribe. También incluye características
      que mejoran la experiencia general de Tailwind, incluido el resaltado de
      sintaxis mejorado y las vistas previas de CSS.
      <br />
      <a
        href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss"
        target="_blank"
        class="text-primary"
      >
        https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
      </a>
    </p>

    <p class="mb-lg">
      <strong>Tailwind Docs: </strong>
      Acceda fácilmente a documentación de Tailwind desde VSCode.
      <br />
      Para usar esta extensión, simplemente use Ctrl + Shift + P para abrir la
      un campo de texto donde puede buscar todas las propiedades de css y será
      redirigido a la documentación de tailwind con ejemplos.
      <br />
      <a
        href="https://marketplace.visualstudio.com/items?itemName=austenc.tailwind-docs"
        target="_blank"
        class="text-primary"
      >
        https://marketplace.visualstudio.com/items?itemName=austenc.tailwind-docs
      </a>
    </p>

    <p class="mb-lg">
      <strong>Tailwind sass syntax: </strong>
      Extensión simple que agrega reglas de gramática para archivos scss y sass
      para permitir el resaltado de sintaxis de tailwind.
      <br />
      <a
        href="https://marketplace.visualstudio.com/items?itemName=macieklad.tailwind-sass-syntax"
        target="_blank"
        class="text-primary"
      >
        https://marketplace.visualstudio.com/items?itemName=macieklad.tailwind-sass-syntax
      </a>
    </p>

    <p class="mb-lg">
      <strong>Auto Import: </strong>
      Encuentra, analiza y proporciona automáticamente acciones de código y
      finalización de código para todas las importaciones disponibles. Funciona
      con Typecript y TSX.
      <br />
      <a
        href="https://marketplace.visualstudio.com/items?itemName=steoates.autoimport"
        target="_blank"
        class="text-primary"
      >
        https://marketplace.visualstudio.com/items?itemName=steoates.autoimport
      </a>
    </p>

    <p class="mb-lg">
      <strong>TSLint: </strong>
      Esta extensión lee el archivo tsconfig.json y resalta errores de linter en
      el codigo
      <br />
      <a
        href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin"
        target="_blank"
        class="text-primary"
      >
        https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin
      </a>
    </p>

    <p class="mb-lg">
      <strong>Prettier - Code formatter: </strong>
      Prettier es un formateador de código obstinado. Aplica un estilo
      consistente al analizar su código y volver a imprimirlo con sus propias
      reglas que tienen en cuenta la longitud máxima de la línea, ajustando el
      código cuando sea necesario.
      <br />
      <strong class="font-bold">Nota: </strong> Es necesario activar la
      opción "formatOnSave" en vscode manualmente para que el código se formatee
      automaticamente al guardar los archivos.
      <br />
      <a
        href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode"
        target="_blank"
        class="text-primary"
      >
        https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
      </a>
    </p>
  </div>
`;
