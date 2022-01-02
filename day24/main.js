const { readLines } = require("../util");
const Point = require("./point");

readLines(process.argv[2]).then((input) => {
  let black = new Set();
  for (let p of input.map((line) => plotPath(line))) {
    if (black.has(p)) {
      black.delete(p);
    } else {
      black.add(p);
    }
  }

  console.log("Part 1:", black.size);
  for (let i = 0; i < 100; i++) {
    black = nextState(black);
  }

  console.log("Part 2:", black.size);
});

function plotPath(line) {
  let position = Point.at(0, 0);
  for (let step of line.matchAll(/[ns]?[ew]/g)) {
    switch (step[0]) {
      case "ne":
        position = Point.at(position.x + 1, position.y);
        break;

      case "e":
        position = Point.at(position.x + 1, position.y + 1);
        break;

      case "se":
        position = Point.at(position.x, position.y + 1);
        break;

      case "sw":
        position = Point.at(position.x - 1, position.y);
        break;

      case "w":
        position = Point.at(position.x - 1, position.y - 1);
        break;

      case "nw":
        position = Point.at(position.x, position.y - 1);
        break;
    }
  }

  return position;
}

function nextState(points) {
  let adjacencyCounts = new Map();
  for (let p of points) {
    for (let adjacent of p.getAdjacentPoints()) {
      if (!adjacencyCounts.has(adjacent)) {
        adjacencyCounts.set(adjacent, 0);
      }

      adjacencyCounts.set(adjacent, adjacencyCounts.get(adjacent) + 1);
    }
  }

  let next = new Set();
  for (let [p, count] of adjacencyCounts) {
    if (count === 2 || (points.has(p) && count === 1)) {
      next.add(p);
    }
  }

  return next;
}
