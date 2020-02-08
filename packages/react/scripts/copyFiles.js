const fs = require("fs");

fs.copyFileSync(
  __dirname + "./../../core/tailwind.config.js",
  __dirname + "./../tailwind.config.js"
);
console.log("tailwind.config.js was copied");

fs.copyFileSync(
  __dirname + "./../../core/dist/cafeta-components/cafeta-components.css",
  __dirname + "./../global.css"
);
console.log("global.css was copied");
