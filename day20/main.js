const { readLines } = require("../util");
const { getBounds } = require("./helpers");
const PuzzlePiece = require("./puzzle-piece");
const PuzzleSolver = require("./puzzle-solver");

readLines(process.argv[2]).then((input) => {
  let pieces = [];
  while (input.length > 0) {
    let buffer = [];
    for (let line = input.shift(); line; line = input.shift()) {
      buffer.push(line);
    }

    pieces.push(PuzzlePiece.parse(buffer));
  }

  let puzzle = new PuzzleSolver().solve(pieces);
  console.log(
    "Part 1:",
    puzzle.corners.map((p) => p.id).reduce((acc, next) => acc * next)
  );

  let image = puzzle.getImage();
  let pattern = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
  ];

  let points = [];
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      if (pattern[y][x] === "#") {
        points.push({ x, y });
      }
    }
  }

  image = removeAllMatches(image, points);
  console.log("Part 2:", image.total);
});

function removeAllMatches(image, points) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      let matches = [...findMatches(image, points)];
      if (matches.length > 0) {
        for (let { x, y } of matches) {
          for (let p of points) {
            image.remove(x + p.x, y + p.y);
          }
        }

        return image;
      }

      image = image.rotate();
    }

    image = image.flip();
  }
}

function* findMatches(image, points) {
  let { width, height } = getBounds(points);
  for (let y = 0; y + height < image.height; y++) {
    for (let x = 0; x + width < image.width; x++) {
      if (points.every((p) => image.contains(x + p.x, y + p.y))) {
        yield { x, y };
      }
    }
  }
}
