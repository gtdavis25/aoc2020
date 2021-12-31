const Point3D = require("./point-3d");
const Point4D = require("./point-4d");

module.exports = class Point {
  constructor() {}

  static fromString(s) {
    let match = s.match(/^(?:(-?\d+),)?(-?\d+),(-?\d+),(-?\d+)$/);
    if (!match) {
      throw new Error("Invalid input: " + s);
    }

    let [, w, x, y, z] = match;
    if (w !== undefined) {
      return new Point4D(parseInt(w), parseInt(x), parseInt(y), parseInt(z));
    } else {
      return new Point3D(parseInt(x), parseInt(y), parseInt(z));
    }
  }
};
