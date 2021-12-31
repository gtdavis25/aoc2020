const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let numbers = input.map((line) => parseInt(line));
  numbers.sort();
  console.log(
    "Part 1:",
    findPair(numbers, 2020).reduce((x, y) => x * y)
  );
  console.log(
    "Part 2:",
    findTriplet(numbers, 2020).reduce((x, y) => x * y)
  );
});

function findTriplet(numbers, sum) {
  for (let i = 0; i + 2 < numbers.length; i++) {
    let pair = findPair(numbers, sum - numbers[i], i + 1);
    if (pair) {
      return [numbers[i], ...pair];
    }
  }
}

function findPair(numbers, sum, start = 0) {
  let i = start;
  let j = numbers.length - 1;
  while (i < j) {
    let result = numbers[i] + numbers[j];
    if (result === sum) {
      return [numbers[i], numbers[j]];
    } else if (result < sum) {
      i++;
    } else {
      j--;
    }
  }
}
