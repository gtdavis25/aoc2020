const { readLines } = require("../util");
const GameOfLife = require("./game-of-life");
const Point3D = require("./point-3d");
const Point4D = require("./point-4d");

readLines(process.argv[2]).then((input) => {
  let cells = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "#") {
        cells.push(new Point3D(x, y, 0));
      }
    }
  }

  let game = new GameOfLife(cells);
  for (let i = 0; i < 6; i++) {
    game = game.nextState();
  }

  console.log("Part 1:", game.cells.length);
  for (let i = 0; i < cells.length; i++) {
    cells[i] = new Point4D(0, cells[i].x, cells[i].y, 0);
  }

  game = new GameOfLife(cells);
  for (let i = 0; i < 6; i++) {
    game = game.nextState();
  }

  console.log("Part 2:", game.cells.length);
});
