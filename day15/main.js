const { readLines } = require("../util");
const NumberGame = require("./number-game");

readLines(process.argv[2]).then((input) => {
  let numbers = input[0].split(",").map(Number);
  let game = new NumberGame(numbers);
  while (numbers.length < 2020) {
    numbers.push(game.nextNumber());
  }

  console.log("Part 1:", numbers[numbers.length - 1]);
  while (numbers.length < 3e7) {
    numbers.push(game.nextNumber());
  }

  console.log("Part 2:", numbers[numbers.length - 1]);
});
