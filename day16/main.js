const { readLines } = require("../util");
const TicketRule = require("./ticket-rule");
const TicketValidator = require("./ticket-validator");

readLines(process.argv[2]).then((input) => {
  let { rules, myTicket, tickets } = readInput(input);
  let validator = new TicketValidator(rules);
  tickets = tickets.filter((ticket) => validator.isValid(ticket));
  console.log("Part 1:", validator.score);
  let fieldMap = buildTicketMap(tickets, rules);
  let result = Object.keys(fieldMap)
    .filter((field) => field.match(/^departure/))
    .map((field) => myTicket[fieldMap[field]])
    .reduce((acc, next) => acc * next);
  console.log("Part 2", result);
});

function readInput(lines) {
  const rules = [];
  for (let line = lines.shift(); line; line = lines.shift()) {
    let [, field, l1, h1, l2, h2] = line.match(
      /^([^:]*): (\d+)-(\d+) or (\d+)-(\d+)$/
    );

    rules.push(
      new TicketRule(
        field,
        parseInt(l1),
        parseInt(h1),
        parseInt(l2),
        parseInt(h2)
      )
    );
  }

  lines.shift();
  const myTicket = lines.shift().split(",").map(Number);
  lines.shift();
  lines.shift();
  const tickets = lines.map((line) => line.split(",").map(Number));
  return { rules, myTicket, tickets };
}

function buildTicketMap(tickets, rules) {
  let matrix = {};
  for (let rule of rules) {
    matrix[rule.field] = [];
    for (let i = 0; i < rules.length; i++) {
      if (tickets.every((ticket) => rule.isValid(ticket[i]))) {
        matrix[rule.field].push(i);
      }
    }
  }

  let ticketMap = {};
  for (let i = 0; i < rules.length; i++) {
    let field = Object.keys(matrix).find((f) => matrix[f].length === 1);
    let index = matrix[field][0];
    ticketMap[field] = index;
    delete matrix[field];
    for (let prop in matrix) {
      if (matrix[prop].includes(index)) {
        matrix[prop] = matrix[prop].filter((x) => x !== index);
      }
    }
  }

  return ticketMap;
}
