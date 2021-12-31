module.exports = class Point4D {
  constructor(w, x, y, z) {
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  *adjacentPoints() {
    for (let dz = -1; dz < 2; dz++) {
      for (let dy = -1; dy < 2; dy++) {
        for (let dx = -1; dx < 2; dx++) {
          for (let dw = -1; dw < 2; dw++) {
            if (dw || dx || dy || dz) {
              yield new Point4D(
                this.w + dw,
                this.x + dx,
                this.y + dy,
                this.z + dz
              );
            }
          }
        }
      }
    }
  }

  toString() {
    return `${this.w},${this.x},${this.y},${this.z}`;
  }
};
