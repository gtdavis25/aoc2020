const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let passwords = input.map(parsePassword);
  console.log("Part 1:", passwords.filter(isValid1).length);
  console.log("Part 2:", passwords.filter(isValid2).length);
});

function parsePassword(line) {
  let [, min, max, char, password] = line.match(
    /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/
  );

  return {
    min: parseInt(min),
    max: parseInt(max),
    char,
    password,
  };
}

function isValid1(record) {
  let count = [...record.password].filter((ch) => ch === record.char).length;
  return record.min <= count && count <= record.max;
}

function isValid2(record) {
  return (
    (record.password[record.min - 1] === record.char) !==
    (record.password[record.max - 1] === record.char)
  );
}
