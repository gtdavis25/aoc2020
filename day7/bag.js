module.exports = class Bag {
  get totalBags() {
    return this.children
      .map((child) => child.count * (1 + child.bag.totalBags))
      .reduce((x, y) => x + y, 0);
  }

  constructor(colour) {
    this.colour = colour;
    this.children = [];
  }

  contains(bag) {
    if (this.children.map((child) => child.bag).includes(bag)) {
      return true;
    }

    return this.children.some((child) => child.bag.contains(bag));
  }
};
