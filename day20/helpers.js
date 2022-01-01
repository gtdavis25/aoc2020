module.exports = { getBounds, countBits };

function getBounds(points) {
  let minX = points
    .map((p) => p.x)
    .reduce((acc, next) => (next < acc ? next : acc));
  let minY = points
    .map((p) => p.y)
    .reduce((acc, next) => (next < acc ? next : acc));
  let maxX = points
    .map((p) => p.x)
    .reduce((acc, next) => (next > acc ? next : acc));
  let maxY = points
    .map((p) => p.y)
    .reduce((acc, next) => (next > acc ? next : acc));

  let width = maxX - minX + 1;
  let height = maxY - minY + 1;
  return { x: minX, y: minY, width, height };
}

function countBits(n) {
  let count = 0;
  for (; n !== 0; n &= n - 1) {
    count++;
  }

  return count;
}
