const { readLines } = require("../util");

readLines(process.argv[2]).then((input) => {
  let foods = input.map(parseFood);
  let allergens = {};
  for (let a of foods.flatMap((food) => food.allergens)) {
    if (!allergens[a]) {
      allergens[a] = [];
    }
  }

  for (let a in allergens) {
    allergens[a] = [
      ...foods
        .filter((food) => food.allergens.includes(a))
        .map((food) => new Set(food.ingredients))
        .reduce(intersection),
    ];
  }

  let allergenIngredients = new Set(Object.values(allergens).flat());
  console.log(
    "Part 1:",
    foods
      .flatMap((food) => food.ingredients)
      .filter((ingredient) => !allergenIngredients.has(ingredient)).length
  );

  let x = {};
  while (Object.keys(allergens).length > 0) {
    for (let a in allergens) {
      if (allergens[a].length === 1) {
        x[a] = allergens[a][0];
        delete allergens[a];
        for (let b in allergens) {
          allergens[b] = allergens[b].filter((i) => i !== x[a]);
        }
      }
    }
  }

  console.log(
    "Part 2:",
    Object.keys(x)
      .sort()
      .map((a) => x[a])
      .join(",")
  );
});

function parseFood(line) {
  let match = line.match(
    /^([a-z]+(?: [a-z]+)*) \(contains ([a-z]+(?:, [a-z]+)*)\)$/
  );

  return {
    ingredients: match[1].split(" "),
    allergens: match[2].split(", "),
  };
}

function intersection(set1, set2) {
  let intersection = new Set();
  for (let item of set1) {
    if (set2.has(item)) {
      intersection.add(item);
    }
  }

  return intersection;
}
