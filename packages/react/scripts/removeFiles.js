const fs = require("fs");

fs.unlinkSync("./tailwind.config.js");
console.log("tailwind.config.js was deleted!");

fs.unlinkSync("./global.css");
console.log("global.css was deleted!");
