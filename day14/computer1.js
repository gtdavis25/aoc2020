const Computer = require("./computer");

module.exports = class Computer1 extends Computer {
  constructor() {
    super();
  }

  setValue(address, value) {
    this.memory[address] = this.applyMask(value);
  }

  applyMask(value) {
    for (let i = 0n; i < this.mask.length; i++) {
      if (this.mask[i] === "0") {
        value = value & ~(1n << (35n - i));
      } else if (this.mask[i] === "1") {
        value = value | (1n << (35n - i));
      }
    }

    return value;
  }
};
