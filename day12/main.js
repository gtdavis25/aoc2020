const { readLines } = require("../util");
const Point = require("./point");

readLines(process.argv[2]).then((input) => {
  let position = new Point(0, 0);
  let velocity = new Point(1, 0);
  for (let line of input) {
    let [, direction, distance] = line.match(/^([NSEWFLR])(\d+)$/);
    switch (direction) {
      case "N":
        position = new Point(position.x, position.y + parseInt(distance));
        break;

      case "W":
        position = new Point(position.x - parseInt(distance), position.y);
        break;

      case "E":
        position = new Point(position.x + parseInt(distance), position.y);
        break;

      case "S":
        position = new Point(position.x, position.y - parseInt(distance));
        break;

      case "L":
        for (let degrees = parseInt(distance); degrees > 0; degrees -= 90) {
          velocity = velocity.turnLeft();
        }

        break;

      case "R":
        for (let degrees = parseInt(distance); degrees > 0; degrees -= 90) {
          velocity = velocity.turnRight();
        }

        break;

      case "F":
        position = position.add(velocity.times(parseInt(distance)));
        break;
    }
  }

  console.log("Part 1:", Math.abs(position.x) + Math.abs(position.y));
  position = new Point(0, 0);
  velocity = new Point(10, 1);
  for (let line of input) {
    let [, direction, distance] = line.match(/^([NSEWFLR])(\d+)$/);
    switch (direction) {
      case "N":
        velocity = new Point(velocity.x, velocity.y + parseInt(distance));
        break;

      case "W":
        velocity = new Point(velocity.x - parseInt(distance), velocity.y);
        break;

      case "E":
        velocity = new Point(velocity.x + parseInt(distance), velocity.y);
        break;

      case "S":
        velocity = new Point(velocity.x, velocity.y - parseInt(distance));
        break;

      case "L":
        for (let degrees = parseInt(distance); degrees > 0; degrees -= 90) {
          velocity = velocity.turnLeft();
        }

        break;

      case "R":
        for (let degrees = parseInt(distance); degrees > 0; degrees -= 90) {
          velocity = velocity.turnRight();
        }

        break;

      case "F":
        position = position.add(velocity.times(parseInt(distance)));
        break;
    }
  }

  console.log("Part 2:", Math.abs(position.x) + Math.abs(position.y));
});
