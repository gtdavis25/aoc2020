module.exports = class Point3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  *adjacentPoints() {
    for (let dz = -1; dz < 2; dz++) {
      for (let dy = -1; dy < 2; dy++) {
        for (let dx = -1; dx < 2; dx++) {
          if (dx || dy || dz) {
            yield new Point3D(this.x + dx, this.y + dy, this.z + dz);
          }
        }
      }
    }
  }

  toString() {
    return `${this.x},${this.y},${this.z}`;
  }
};
