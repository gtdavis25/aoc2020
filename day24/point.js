module.exports = class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static points = new Map();

  static at(x, y) {
    let key = `${x},${y}`;
    if (!this.points.has(key)) {
      this.points.set(key, new Point(x, y));
    }

    return this.points.get(key);
  }

  *getAdjacentPoints() {
    yield Point.at(this.x + 1, this.y);
    yield Point.at(this.x + 1, this.y + 1);
    yield Point.at(this.x, this.y + 1);
    yield Point.at(this.x - 1, this.y);
    yield Point.at(this.x - 1, this.y - 1);
    yield Point.at(this.x, this.y - 1);
  }

  toString() {
    return `${x},${y}`;
  }
};
