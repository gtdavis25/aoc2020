module.exports = class Point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(p) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  times(scalar) {
    return new Point(scalar * this.x, scalar * this.y);
  }

  turnLeft() {
    return new Point(-this.y, this.x);
  }

  turnRight() {
    return new Point(this.y, -this.x);
  }

  toString() {
    return `${x},${y}`;
  }
};
