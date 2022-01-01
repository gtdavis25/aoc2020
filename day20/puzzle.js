const Bitmap2D = require("./bitmap-2d");

module.exports = class Puzzle {
  get corners() {
    return [
      this.rows[0][0],
      this.rows[0][this.width - 1],
      this.rows[this.height - 1][0],
      this.rows[this.height - 1][this.width - 1],
    ];
  }

  constructor(rows) {
    this.rows = rows;
    this.width = this.rows[0].length;
    this.height = this.rows.length;
  }

  getImage() {
    let image = new Bitmap2D(this.width * 8, this.height * 8);
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            if (this.rows[row][col].bitmap.contains(x + 1, y + 1)) {
              image.add(col * 8 + x, row * 8 + y);
            }
          }
        }
      }
    }

    return image;
  }
};
