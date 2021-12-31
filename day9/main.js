const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let numbers = input.map((line) => parseInt(line));
  let weakness = getWeakness(numbers);
  console.log("Part 1:", weakness);
  let i = numbers.indexOf(weakness);
  let sequence = findSum(numbers.slice(0, i), weakness);
  let min = sequence.reduce((x, y) => (y < x ? y : x));
  let max = sequence.reduce((x, y) => (y > x ? y : x));
  console.log("Part 2:", min + max);
});

function getWeakness(numbers) {
  for (let i = 25; i < numbers.length; i++) {
    if (!containsPairwiseSum(numbers, numbers[i], i - 25, 25)) {
      return numbers[i];
    }
  }

  throw new Error("No weakness");
}

function containsPairwiseSum(numbers, sum, start, length) {
  for (let i = 0; i + 1 < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (numbers[start + i] + numbers[start + j] === sum) {
        return true;
      }
    }
  }

  return false;
}

function findSum(numbers, want) {
  let sums = [];
  for (let i = 0; i < numbers.length; i++) {
    sums.push(0);
    for (let j = 0; j < sums.length; j++) {
      sums[j] += numbers[i];
      if (sums[j] === want) {
        return numbers.slice(j, i + 1);
      }
    }
  }

  throw new Error("No such sum");
}
