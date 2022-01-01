const Bitmap2D = require("./bitmap-2d");

module.exports = class PuzzlePiece {
  get top() {
    let acc = 0;
    for (let x = 0; x < this.bitmap.width; x++) {
      acc <<= 1;
      acc |= this.bitmap.contains(x, 0) ? 1 : 0;
    }

    return acc;
  }

  get left() {
    let acc = 0;
    for (let y = 0; y < this.bitmap.width; y++) {
      acc <<= 1;
      acc |= this.bitmap.contains(0, y) ? 1 : 0;
    }

    return acc;
  }

  get right() {
    let acc = 0;
    for (let y = 0; y < this.bitmap.width; y++) {
      acc <<= 1;
      acc |= this.bitmap.contains(this.bitmap.width - 1, y) ? 1 : 0;
    }

    return acc;
  }

  get bottom() {
    let acc = 0;
    for (let x = 0; x < this.bitmap.width; x++) {
      acc <<= 1;
      acc |= this.bitmap.contains(x, this.bitmap.height - 1) ? 1 : 0;
    }

    return acc;
  }

  constructor(id, bitmap) {
    this.id = id;
    this.bitmap = bitmap;
  }

  static parse(lines) {
    let match = lines.shift().match(/^Tile (\d+):$/);
    if (!match) {
      throw new Error();
    }

    let id = parseInt(match[1]);
    let bitmap = new Bitmap2D(lines[0].length, lines.length);
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] === "#") {
          bitmap.add(x, y);
        } else if (lines[y][x] !== ".") {
          throw new Error("Invalid character in piece: " + lines[y][x]);
        }
      }
    }

    return new PuzzlePiece(id, bitmap);
  }

  *getOrientations() {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        yield this;
        this.bitmap = this.bitmap.rotate();
      }

      this.bitmap = this.bitmap.flip();
    }
  }
};
