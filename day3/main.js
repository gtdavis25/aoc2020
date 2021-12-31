const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let result = countHits(input, 3, 1);
  console.log("Part 1:", result);
  for (let [dx, dy] of [
    [1, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]) {
    result *= countHits(input, dx, dy);
  }

  console.log("Part 2:", result);
});

function countHits(map, dx, dy) {
  let count = 0;
  for (let x = 0, y = 0; y < map.length; x += dx, y += dy) {
    if (map[y][x % map[y].length] === "#") {
      count++;
    }
  }

  return count;
}
