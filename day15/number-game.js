module.exports = class NumberGame {
  constructor(numbers) {
    this.numbers = new Map();
    for (let i = 0; i < numbers.length - 1; i++) {
      this.numbers.set(numbers[i], i);
    }

    this.previous = numbers[numbers.length - 1];
    this.count = numbers.length - 1;
  }

  nextNumber() {
    let next;
    if (this.numbers.has(this.previous)) {
      next = this.count - this.numbers.get(this.previous);
    } else {
      next = 0;
    }

    this.numbers.set(this.previous, this.count);
    this.previous = next;
    this.count++;
    return next;
  }
};
