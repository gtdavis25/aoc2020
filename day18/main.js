const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let total = input
    .map((line) => evaluateExpression1(tokenise(line)))
    .reduce((acc, next) => acc + next);
  console.log("Part 1:", total);
  total = input
    .map((line) => evaluateExpression2(tokenise(line)))
    .reduce((acc, next) => acc + next);
  console.log("Part 2:", total);
});

function tokenise(line) {
  let tokens = [];
  for (let match of line.matchAll(/[\d\(\)\+\*]/g)) {
    tokens.push(match[0]);
  }

  return tokens;
}

function evaluateExpression1(tokens) {
  let value = evaluatePrimary1(tokens);
  while (tokens.length > 0 && tokens[0] !== ")") {
    let next = tokens.shift();
    if (next === "+") {
      value += evaluatePrimary1(tokens);
    } else if (next === "*") {
      value *= evaluatePrimary1(tokens);
    } else {
      throw new Error(`Unexpected token: '${next}`);
    }
  }

  return value;
}

function evaluatePrimary1(tokens) {
  let next = tokens.shift();
  if (next.match(/\d/)) {
    return parseInt(next);
  } else if (next === "(") {
    let value = evaluateExpression1(tokens);
    next = tokens.shift();
    if (next !== ")") {
      throw new Error("Expected ')'");
    }

    return value;
  } else {
    throw new Error(`Unexpected token: '${next}'`);
  }
}

function evaluateExpression2(tokens) {
  let value = evaluteSum2(tokens);
  while (tokens.length > 0 && tokens[0] === "*") {
    tokens.shift();
    value *= evaluteSum2(tokens);
  }

  return value;
}

function evaluteSum2(tokens) {
  let value = evaluatePrimary2(tokens);
  while (tokens.length > 0 && tokens[0] === "+") {
    tokens.shift();
    value += evaluatePrimary2(tokens);
  }

  return value;
}

function evaluatePrimary2(tokens) {
  let next = tokens.shift();
  if (next.match(/\d/)) {
    return parseInt(next);
  } else if (next == "(") {
    let value = evaluateExpression2(tokens);
    next = tokens.shift();
    if (next !== ")") {
      throw new Error("Expected ')'");
    }

    return value;
  } else {
    throw new Error(`Unexpected token: '${next}'`);
  }
}
