const input: string = require("fs").readFileSync("./day5/input.txt").toString();

// ##########
// # PART 1 #
// ##########

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const part1 = () => {
  const lines = input
    .split("\n")
    .map((line) => {
      const [left, right] = line.split(" -> ");
      const [x1, y1] = left.split(",");
      const [x2, y2] = right.split(",");

      return {
        x1: Number(x1),
        y1: Number(y1),
        x2: Number(x2),
        y2: Number(y2),
      };
    })
    .filter((line) => line.x1 === line.x2 || line.y1 === line.y2);
  let floor: { [key: string]: number } = {};

  lines.forEach((line) => {
    const smallestX = Math.min(line.x1, line.x2);
    const biggestX = Math.max(line.x1, line.x2);
    const smallestY = Math.min(line.y1, line.y2);
    const biggestY = Math.max(line.y1, line.y2);

    for (let x = smallestX; x <= biggestX; x++) {
      for (let y = smallestY; y <= biggestY; y++) {
        const value = floor[x + "-" + y] ?? 0;

        floor[x + "-" + y] = value + 1;
      }
    }
  });
  console.log(floor);

  return Object.values(floor).filter((tile) => tile >= 2).length;
};

// ##########
// # PART 2 #
// ##########
const calculateDirection = (a: number, b: number): number => {
  if (a === b) {
    return 0;
  }

  return a < b ? 1 : -1;
};

export const part2 = () => {
  const lines = input.split("\n").map((line) => {
    const [left, right] = line.split(" -> ");
    const [x1, y1] = left.split(",");
    const [x2, y2] = right.split(",");

    return {
      x1: Number(x1),
      y1: Number(y1),
      x2: Number(x2),
      y2: Number(y2),
    };
  });

  let floor: { [key: string]: number } = {};

  lines.forEach((line) => {
    const directionX = calculateDirection(line.x1, line.x2);
    const directionY = calculateDirection(line.y1, line.y2);

    let x = line.x1;
    let y = line.y1;

    while (true) {
      const value = floor[x + "-" + y] ?? 0;
      floor[x + "-" + y] = value + 1;

      if (x === line.x2 && y === line.y2) {
        break;
      }

      x += directionX;
      y += directionY;
    }
  });

  // Print floor
  // for (let x = 0; x < 10; x++) {
  //   for (let y = 0; y < 10; y++) {
  //     const val = floor[y + "-" + x] ?? ".";
  //     process.stdout.write(val.toString());
  //   }
  //   process.stdout.write("\n");
  // }

  return Object.values(floor).filter((tile) => tile >= 2).length;
};
