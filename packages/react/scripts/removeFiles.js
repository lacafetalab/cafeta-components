const fs = require("fs");

fs.unlinkSync(__dirname + "./../tailwind.config.js");
console.log("tailwind.config.js was deleted!");

fs.unlinkSync(__dirname + "./../global.css");
console.log("global.css was deleted!");
