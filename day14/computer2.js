const Computer = require("./computer");

module.exports = class Computer2 extends Computer {
  constructor() {
    super();
  }

  setValue(address, value) {
    let modifiedAddresses = [...this.applyMask(address)].sort(
      (x, y) => Number(x) - Number(y)
    );
    for (let modifiedAddress of modifiedAddresses) {
      this.memory[modifiedAddress] = value;
    }
  }

  *applyMask(address) {
    let floatingBits = [];
    for (let i = 0n; i < this.mask.length; i++) {
      if (this.mask[i] === "1") {
        address |= 1n << (35n - i);
      } else if (this.mask[i] === "X") {
        floatingBits.push(i);
      }
    }

    for (let i = 0; i < 2 ** floatingBits.length; i++) {
      let modifiedAddress = address;
      let t = i;
      for (let j = 0; j < floatingBits.length; j++) {
        if (t & 1) {
          modifiedAddress |= 1n << (35n - floatingBits[j]);
        } else {
          modifiedAddress &= ~(1n << (35n - floatingBits[j]));
        }

        t >>= 1;
      }

      yield modifiedAddress;
    }
  }
};
