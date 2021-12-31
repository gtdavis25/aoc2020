const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  const arrival = parseInt(input[0]);
  let buses = input[1]
    .split(",")
    .map((s, i) => (s !== "x" ? { id: parseInt(s), offset: i } : undefined))
    .filter((x) => x);
  let earliest = buses
    .map((bus) => ({ id: bus.id, wait: mod(-arrival, bus.id) }))
    .reduce((bus1, bus2) => (bus2.wait < bus1.wait ? bus2 : bus1));
  console.log("Part 1:", earliest.id * earliest.wait);
  let x = buses
    .map((bus) => ({
      remainder: BigInt(mod(-bus.offset, bus.id)),
      modulus: BigInt(bus.id),
    }))
    .reduce(solve);
  console.log("Part 2:", Number(x.remainder));
});

function solve(c1, c2) {
  let [_, x, y] = extendedEuclid(c1.modulus, c2.modulus);
  let modulus = c1.modulus * c2.modulus;
  let z1 = c1.remainder * c2.modulus * mod(y, c1.modulus);
  let z2 = c2.remainder * c1.modulus * mod(x, c2.modulus);
  let remainder = (z1 + z2) % modulus;
  return { remainder, modulus };
}

function extendedEuclid(a, b) {
  if (b == 0) {
    return [a, 1n, 0n];
  }

  let [d, x, y] = extendedEuclid(b, a % b);
  return [d, y, x - (a / b) * y];
}

function mod(n, p) {
  return n < 0 ? (p + (n % p)) % p : n % p;
}
