const { readLines } = require("../util");
const SeatingArea = require("./seating-area");

readLines(process.argv[2]).then((input) => {
  let area = new SeatingArea(input);
  console.log("Part 1:", simulate(area, updateRule1).total);
  console.log("Part 2:", simulate(area, updateRule2).total);
});

function simulate(area, updateRule) {
  let seen = {};
  while (true) {
    let state = area.toString();
    if (seen[state]) {
      return area;
    }

    seen[state] = true;
    area = area.nextState(updateRule);
  }
}

function updateRule1(seatingArea, x, y) {
  switch (seatingArea.getCell(x, y)) {
    case ".":
      return ".";

    case "L":
      return countAdjacent(seatingArea, x, y) === 0 ? "#" : "L";

    case "#":
      return countAdjacent(seatingArea, x, y) >= 4 ? "L" : "#";

    default:
      throw new Error("Unexpected character in seating area");
  }
}

function updateRule2(seatingArea, x, y) {
  switch (seatingArea.getCell(x, y)) {
    case ".":
      return ".";

    case "L":
      return countVisible(seatingArea, x, y) === 0 ? "#" : "L";

    case "#":
      return countVisible(seatingArea, x, y) >= 5 ? "L" : "#";

    default:
      throw new Error("Unexpected character in seating area");
  }
}

function countAdjacent(seatingArea, x, y) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if ((dx || dy) && seatingArea.getCell(x + dx, y + dy) === "#") {
        count++;
      }
    }
  }

  return count;
}

function countVisible(seatingArea, x, y) {
  let count = 0;
  for (let [dx, dy] of [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ]) {
    for (let i = 1; true; i++) {
      let x1 = x + i * dx;
      let y1 = y + i * dy;
      if (
        x1 < 0 ||
        x1 >= seatingArea.width ||
        y1 < 0 ||
        y1 >= seatingArea.height
      ) {
        break;
      }

      let cell = seatingArea.getCell(x1, y1);
      if (cell === "#") {
        count++;
        break;
      } else if (cell === "L") {
        break;
      }
    }
  }

  return count;
}
