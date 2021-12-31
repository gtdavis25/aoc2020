const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let chargers = input.map((line) => parseInt(line)).sort((x, y) => x - y);
  chargers = [0, ...chargers, chargers[chargers.length - 1] + 3];
  let differences = [...getDifferences(chargers)];
  let ones = differences.filter((n) => n === 1).length;
  let twos = differences.filter((n) => n === 3).length;
  console.log("Part 1:", ones * twos);
  let arrangements = [1];
  for (let i = 1; i < chargers.length; i++) {
    arrangements.push(0);
    for (let j = i - 1; chargers[i] - chargers[j] <= 3; j--) {
      arrangements[i] += arrangements[j];
    }
  }

  console.log("Part 2:", arrangements[arrangements.length - 1]);
});

function* getDifferences(numbers) {
  for (let i = 1; i < numbers.length; i++) {
    yield numbers[i] - numbers[i - 1];
  }
}
