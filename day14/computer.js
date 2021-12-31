module.exports = class Computer {
  get total() {
    return Number(
      Object.values(this.memory).reduce((x, y) => x + y),
      0n
    );
  }

  constructor() {
    this.memory = {};
  }

  execute(instructions) {
    for (let instruction of instructions) {
      let match = instruction.match(/^mask = ([01X]{36})$/);
      if (match) {
        this.mask = match[1];
        continue;
      }

      match = instruction.match(/^mem\[(\d+)] = (\d+)$/);
      if (match) {
        let [, address, value] = match;
        this.setValue(BigInt(address), BigInt(value));
        continue;
      }

      throw new Error("Invalid instruction: " + instruction);
    }
  }
};
