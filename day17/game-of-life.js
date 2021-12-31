const Point = require("./point");

module.exports = class GameOfLife {
  constructor(cells) {
    this.cells = [...cells];
  }

  nextState() {
    let adjacent = {};
    let living = {};
    let cells = [];
    for (let cell of this.cells) {
      living[cell] = true;
      if (!adjacent[cell]) {
        adjacent[cell] = 0;
      }

      for (let adj of cell.adjacentPoints()) {
        if (!adjacent[adj]) {
          adjacent[adj] = 0;
        }

        adjacent[adj]++;
      }
    }

    for (let p in adjacent) {
      if (adjacent[p] === 3 || (living[p] && adjacent[p] === 2)) {
        cells.push(Point.fromString(p));
      }
    }

    return new GameOfLife(cells);
  }
};
