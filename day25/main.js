const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let pubKeys = input.map((line) => parseInt(line));
  let priv = getPrivateKey(pubKeys[0]);
  let subject = pubKeys[1];
  let key = 1;
  while (priv-- > 0) {
    key = (key * subject) % 20201227;
  }

  console.log("Part 1:", key);
});

function getPrivateKey(publicKey) {
  let acc = 1;
  let n = 0;
  while (acc !== publicKey) {
    acc = (acc * 7) % 20201227;
    n++;
  }

  return n;
}
