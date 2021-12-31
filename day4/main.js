const { readLines } = require("../util");

const validators = {
  byr: /^(19[2-9][0-9]|200[0-2])$/,
  iyr: /^20(1[0-9]|20)$/,
  eyr: /^20(2[0-9]|30)$/,
  hgt: /^(1([5-8][0-9]|9[0-3])cm|(59|6[0-9]|7[0-6])in)$/,
  hcl: /^#[0-9a-f]{6}$/,
  ecl: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
  pid: /^[0-9]{9}$/,
};

readLines(process.argv[2]).then((input) => {
  let passports = [...readPassports(input)];
  passports = passports.filter(hasRequiredFields);
  console.log("Part 1:", passports.length);
  passports = passports.filter(isValid);
  console.log("Part 2:", passports.length);
});

function* readPassports(lines) {
  let current = {};
  for (let line of lines) {
    if (!line) {
      yield current;
      current = {};
    } else {
      for (let match of line.matchAll(/([\S]+):([\S]+)/g)) {
        current[match[1]] = match[2];
      }
    }
  }

  yield current;
}

function hasRequiredFields(passport) {
  for (let prop in validators) {
    if (!passport[prop]) {
      return false;
    }
  }

  return true;
}

function isValid(passport) {
  for (let prop in validators) {
    if (!passport[prop] || !passport[prop].match(validators[prop])) {
      return false;
    }
  }

  return true;
}
