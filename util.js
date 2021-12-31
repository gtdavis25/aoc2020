const readline = require("readline");
const fs = require("fs");

module.exports.readLines = function (path) {
  return new Promise((resolve) => {
    const lines = [];
    readline
      .createInterface({ input: fs.createReadStream(path) })
      .on("line", (line) => lines.push(line))
      .on("close", () => resolve(lines));
  });
};
