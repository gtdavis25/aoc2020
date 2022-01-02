const { readLines } = require("../util");
const CupGame = require("./cup-game");

readLines(process.argv[2]).then((input) => {
  let cups = [...input[0]].map((n) => parseInt(n));
  let game = new CupGame(cups);
  for (let i = 0; i < 100; i++) {
    game.nextMove();
  }

  console.log("Part 1:", game.toString());
  for (let i = 10; i <= 1e6; i++) {
    cups.push(i);
  }

  game = new CupGame(cups);
  for (let i = 0; i < 1e7; i++) {
    game.nextMove();
  }

  let cup1 = game.cups.get(1);
  let result = cup1.next.label * cup1.next.next.label;
  console.log("Part 2:", result);
});
