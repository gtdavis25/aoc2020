const { readLines } = require("../util");
const Combat = require("./combat");
const RecursiveCombat = require("./recursive-combat");

readLines(process.argv[2]).then((input) => {
  let [deck1, deck2] = parseInput(input);
  let game = new Combat(deck1, deck2);
  let winner = game.play();
  console.log("Part 1:", getScore(game.players[winner]));
  game = new RecursiveCombat(deck1, deck2);
  winner = game.play();
  console.log("Part 2:", getScore(game.players[winner]));
});

function parseInput(lines) {
  lines.shift();
  let deck1 = [];
  for (let line = lines.shift(); line; line = lines.shift()) {
    deck1.push(parseInt(line));
  }

  lines.shift();
  let deck2 = [];
  for (let line = lines.shift(); line; line = lines.shift()) {
    deck2.push(parseInt(line));
  }

  return [deck1, deck2];
}

function getScore(deck) {
  return deck
    .map((card, i) => card * (deck.length - i))
    .reduce((acc, next) => acc + next);
}
