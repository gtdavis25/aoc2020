const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let seatIds = input.map(parseSeatId);
  let max = seatIds.reduce((x, y) => (x > y ? x : y));
  console.log("Part 1:", max);
  seatIds = seatIds.sort((x, y) => x - y);
  for (let i = 0; i + 1 < seatIds.length; i++) {
    if (seatIds[i + 1] !== seatIds[i] + 1) {
      console.log("Part 2:", seatIds[i] + 1);
    }
  }
});

function parseSeatId(input) {
  let seatId = 0;
  for (let c of input) {
    seatId <<= 1;
    if (c === "B" || c === "R") {
      seatId += 1;
    }
  }

  return seatId;
}
