const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let groups = [...readGroups(input)];
  let total = groups
    .map((group) => union(group).length)
    .reduce((x, y) => x + y);
  console.log("Part 1:", total);
  total = groups
    .map((group) => intersection(group).length)
    .reduce((x, y) => x + y);
  console.log("Part 2:", total);
});

function* readGroups(lines) {
  let group = [];
  for (let line of lines) {
    if (line) {
      group.push(line);
    } else {
      yield group;
      group = [];
    }
  }

  yield group;
}

function union(group) {
  let seen = new Set([...group.join("")]);
  return [...seen];
}

function intersection(group) {
  return [
    ...group
      .map((member) => new Set(member))
      .reduce((x, y) => new Set([...x].filter((z) => y.has(z)))),
  ];
}
