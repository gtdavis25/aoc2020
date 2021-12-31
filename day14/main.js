const { readLines } = require("../util");
const Computer1 = require("./computer1");
const Computer2 = require("./computer2");

readLines(process.argv[2]).then((input) => {
  let computer = new Computer1();
  computer.execute(input);
  console.log("Part 1:", computer.total);
  computer = new Computer2();
  computer.execute(input);
  console.log("Part 2:", computer.total);
});
