const fs = require("fs");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = async ({ config }) => {
  config.entry.push(path.join(__dirname, "../dist/cafeta-components.js"));
  config.entry.push(
    path.join(__dirname, "../dist/cafeta-components/cafeta-components.css")
  );
  fs.readdirSync(path.join(__dirname, "../dist/cafeta-components")).map(
    file => {
      jsFilePath = path.join(
        __dirname,
        `../dist/cafeta-components/${file}/${file}.js`
      );
      try {
        if (fs.existsSync(jsFilePath)) {
          config.entry.push(jsFilePath);
        }
      } catch (err) {
        console.error(err);
      }

      cssFilePath = path.join(
        __dirname,
        `../dist/cafeta-components/${file}/${file}.css`
      );
      try {
        if (fs.existsSync(cssFilePath)) {
          config.entry.push(cssFilePath);
        }
      } catch (err) {
        console.error(err);
      }
    }
  );

  config.plugins.push(
    new CopyPlugin([
      {
        from: "**/*",
        to: "./",
        context: "dist"
      }
    ])
  );

  config.plugins.push(new WriteFilePlugin());

  return config;
};
