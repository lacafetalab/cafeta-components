import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import { sass } from "@stencil/sass";
import { postcss } from "@stencil/postcss";
import autoprefixer from "autoprefixer";

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.tsx", "./src/index.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

export const config: Config = {
  namespace: "cafeta-components",
  globalStyle: "src/global/app.scss",
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "cafeta-components",
      proxiesFile: "react/src/components.ts"
    }),
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass(),
    postcss({
      plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        autoprefixer(),
        ...(process.env.NODE_ENV === "production"
          ? [purgecss, require("cssnano")]
          : [])
      ]
    })
  ]
};
