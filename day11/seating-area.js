module.exports = class SeatingArea {
  get width() {
    return this.rows[0].length;
  }

  get height() {
    return this.rows.length;
  }

  get total() {
    return this.rows.flat().filter((ch) => ch === "#").length;
  }

  constructor(rows) {
    this.rows = rows.map((row) => [...row]);
  }

  getCell(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return undefined;
    }

    return this.rows[y][x];
  }

  nextState(rule) {
    let newRows = this.rows.map((row) => [...row]);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        newRows[y][x] = rule(this, x, y);
      }
    }

    return new SeatingArea(newRows);
  }

  toString() {
    return this.rows.map((row) => row.join("")).join("\n");
  }
};
