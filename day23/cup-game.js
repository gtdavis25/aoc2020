const Node = require("./node");

module.exports = class CupGame {
  constructor(cups) {
    this.min = cups.reduce((acc, next) => (next < acc ? next : acc));
    this.max = cups.reduce((acc, next) => (next > acc ? next : acc));
    this.cups = new Map();
    cups = cups.map((cup) => new Node(cup));
    for (let i = 0; i < cups.length; i++) {
      this.cups.set(cups[i].label, cups[i]);
      cups[i].next = cups[(i + 1) % cups.length];
      cups[(i + 1) % cups.length].previous = cups[i];
    }

    this.currentCup = cups[0];
  }

  nextMove() {
    let cups = [];
    for (let i = 0; i < 3; i++) {
      cups.push(this.currentCup.removeAfter());
    }

    let destination = this.currentCup.label - 1;
    if (destination < this.min) {
      destination = this.max;
    }

    while (cups.some((cup) => cup.label === destination)) {
      if (--destination < this.min) {
        destination = this.max;
      }
    }

    while (cups.length > 0) {
      this.cups.get(destination).appendAfter(cups.pop());
    }

    this.currentCup = this.currentCup.next;
  }

  toString() {
    let s = [];
    for (let cup = this.cups.get(1).next; cup.label !== 1; cup = cup.next) {
      s.push(cup.label);
    }

    return s.join("");
  }
};
