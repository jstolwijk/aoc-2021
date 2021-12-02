const input: string = require("fs").readFileSync("./day2/input.txt").toString();

// ##########
// # PART 1 #
// ##########

export const part1 = () => {
  let horizontal = 0;
  let depth = 0;

  input
    .split("\n")
    .map((it) => it.split(" "))
    .forEach((i) => {
      const [direction, n] = i;
      const units = Number(n);

      switch (direction) {
        case "forward":
          horizontal += units;
          return;
        case "up":
          depth -= units;
          return;
        case "down":
          depth += units;
          return;
      }
    });
  return horizontal * depth;
};

// ##########
// # PART 2 #
// ##########
export const part2 = () => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  input
    .split("\n")
    .map((it) => it.split(" "))
    .forEach((i) => {
      const [direction, x] = i;
      const units = Number(x);

      switch (direction) {
        case "forward":
          horizontal += units;
          depth += aim * units;
          return;
        case "up":
          aim -= units;
          return;
        case "down":
          aim += units;
          return;
      }
    });
  return horizontal * depth;
};
