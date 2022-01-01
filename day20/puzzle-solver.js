const { getBounds } = require("./helpers");
const Puzzle = require("./puzzle");

module.exports = class PuzzleSolver {
  solve(pieces) {
    let queue = [pieces[0]];
    let positions = { [pieces[0].id]: { x: 0, y: 0 } };
    while (queue.length > 0) {
      let p1 = queue.shift();
      let { x, y } = positions[p1.id];
      for (let i = 0; i < pieces.length; i++) {
        if (positions[pieces[i].id]) {
          continue;
        }

        let p2 = pieces[i];
        for (let _ of pieces[i].getOrientations()) {
          if (p1.top === p2.bottom) {
            positions[p2.id] = { x, y: y - 1 };
            queue.push(p2);
            break;
          }

          if (p1.left === p2.right) {
            positions[p2.id] = { x: x - 1, y };
            queue.push(p2);
            break;
          }

          if (p1.right === p2.left) {
            positions[p2.id] = { x: x + 1, y };
            queue.push(p2);
            break;
          }

          if (p1.bottom === p2.top) {
            positions[p2.id] = { x, y: y + 1 };
            queue.push(p2);
            break;
          }
        }
      }
    }

    let bounds = getBounds(Object.values(positions));
    let rows = [];
    for (let y = 0; y < bounds.height; y++) {
      rows.push([]);
    }

    for (let piece of pieces) {
      let { x, y } = positions[piece.id];
      rows[y - bounds.y][x - bounds.x] = piece;
    }

    return new Puzzle(rows);
  }
};
