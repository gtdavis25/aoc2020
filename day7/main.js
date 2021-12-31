const { readLines } = require("../util");
const Bag = require("./bag");

readLines(process.argv[2]).then((input) => {
  let bags = readBags(input);
  let result = Object.values(bags).filter((bag) =>
    bag.contains(bags["shiny gold"])
  ).length;

  console.log("Part 1:", result);
  console.log("Part 2:", bags["shiny gold"].totalBags);
});

function readBags(input) {
  let bags = {};
  for (let line of input) {
    let [, parent, contents] = line.match(/([a-z]+ [a-z]+) bags contain (.*)/);
    if (!bags[parent]) {
      bags[parent] = new Bag(parent);
    }

    for (let [, count, child] of contents.matchAll(
      /(\d+) ([a-z]+ [a-z]+) bags?/g
    )) {
      if (!bags[child]) {
        bags[child] = new Bag(child);
      }

      bags[parent].children.push({ count: parseInt(count), bag: bags[child] });
    }
  }

  return bags;
}
