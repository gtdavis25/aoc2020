const { readLines } = require("../util");
const Rule = require("./rule");

readLines(process.argv[2]).then((input) => {
  let rules = [];
  for (let line = input.shift(); line; line = input.shift()) {
    rules.push(Rule.parse(line));
  }

  rules.sort((rule1, rule2) => rule1.id - rule2.id);
  let result = input.filter((message) => {
    let { match, length } = rules[0].match(rules, message);
    return match && length === message.length;
  }).length;

  console.log("Part 1:", result);
  rules[8].rule = "42 | 42 8";
  rules[11].rule = "42 31 | 42 11 31";
  result = input.filter((message) => {
    let { match, length } = rules[0].match(rules, message);
    if (!match) {
      while (true) {
        let result = rules[42].match(rules, message);
        if (!result.match) {
          break;
        }

        message = message.substring(result.length);
        ({ match, length } = rules[0].match(rules, message));
        if (match && length === message.length) {
          return true;
        }
      }
    }

    return match && length === message.length;
  }).length;

  console.log("Part 2:", result);
});
