const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let { ok, result } = run(input);
  console.log("Part 1:", result);
  for (let program of getModifiedPrograms(input)) {
    ({ ok, result } = run(program));
    if (ok) {
      break;
    }
  }

  console.log("Part 2:", result);
});

function run(program) {
  let acc = 0;
  let seen = {};
  let i = 0;
  while (i < program.length) {
    if (seen[i]) {
      return { ok: false, result: acc };
    }

    seen[i] = true;
    let [, op, arg] = program[i].match(/^(jmp|nop|acc) ([-+]\d+)$/);
    switch (op) {
      case "nop":
        i += 1;
        break;

      case "acc":
        acc += Number(arg);
        i += 1;
        break;

      case "jmp":
        i += parseInt(arg);
        break;
    }
  }

  return { ok: true, result: acc };
}

function* getModifiedPrograms(program) {
  for (let i = 0; i < program.length; i++) {
    if (program[i].match(/^jmp/)) {
      let copy = [...program];
      copy[i] = program[i].replace(/^jmp/, "nop");
      yield copy;
    } else if (program[i].match(/^nop/)) {
      let copy = [...program];
      copy[i] = program[i].replace(/^nop/, "jmp");
      yield copy;
    }
  }
}
