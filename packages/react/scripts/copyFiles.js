const fs = require("fs");

fs.copyFileSync("./../core/tailwind.config.js", "./tailwind.config.js");
console.log("tailwind.config.js was copied");

fs.copyFileSync(
  "./../core/dist/cafeta-components/cafeta-components.css",
  "./global.css"
);
console.log("global.css was copied");
