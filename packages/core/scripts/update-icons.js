const https = require("https");
const {
  createWriteStream,
  unlinkSync,
  existsSync,
  readFileSync,
  appendFile
} = require("fs");

const download = (url, dest, cb) => {
  const file = createWriteStream(dest);
  https
    .get(url, response => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(cb);
      });
    })
    .on("error", err => {
      fs.unlink(dest);
      throw err.message;
    });
};

const folderDest = "./src/components/cc-icon/";
const rawFile = folderDest + "selection.json";
const objFile = folderDest + "selection.ts";
const fileUrl = process.argv[2];

if (!fileUrl) throw "Need icomoon url";

download(fileUrl, rawFile, () => {
  const dataRawFile = readFileSync(rawFile, "utf8");
  const newData = `export default ${dataRawFile}`;

  if (existsSync(objFile)) {
    unlinkSync(objFile);
  }

  appendFile(objFile, newData, err => {
    if (err) throw err;
    console.log("Icons are updated!");
  });
});
