const { countBits } = require("./helpers");

module.exports = class Bitmap2D {
  get total() {
    return this.buffer.reduce((acc, next) => acc + countBits(next), 0);
  }

  constructor(width, height) {
    this.width = width;
    this.height = height;
    let size = width * height;
    let length = (size >>> 3) + ((size & 7) > 0 ? 1 : 0);
    this.buffer = new Uint8Array(length);
  }

  add(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error("Out of bounds");
    }

    let i = y * this.width + x;
    let [word, offset] = [i >>> 3, i & 7];
    this.buffer[word] |= 1 << (7 - offset);
  }

  contains(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false;
    }

    let i = y * this.width + x;
    let [word, offset] = [i >>> 3, i & 7];
    return ((this.buffer[word] >>> (7 - offset)) & 1) === 1;
  }

  remove(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error("Out of bounds");
    }

    let i = y * this.width + x;
    let [word, offset] = [i >>> 3, i & 7];
    this.buffer[word] &= ~(1 << (7 - offset));
  }

  rotate() {
    let rotated = new Bitmap2D(this.height, this.width);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.contains(x, y)) {
          rotated.add(this.height - y - 1, x);
        }
      }
    }

    return rotated;
  }

  flip() {
    let flipped = new Bitmap2D(this.width, this.height);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.contains(x, y)) {
          flipped.add(this.width - x - 1, y);
        }
      }
    }

    return flipped;
  }

  toString() {
    let rows = [];
    for (let y = 0; y < this.height; y++) {
      rows.push([]);
      for (let x = 0; x < this.width; x++) {
        rows[y].push(this.contains(x, y) ? "#" : ".");
      }
    }

    return rows.map((row) => row.join("")).join("\n");
  }
};
