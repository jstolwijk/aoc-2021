import { minAndMax } from "../common/sum";

const input: string = require("fs").readFileSync("./day7/input.txt").toString();

// ##########
// # PART 1 #
// ##########
export const part1 = () => {
  const crabs = input.split(",").map((it) => Number(it));

  const [min, max] = minAndMax(crabs);

  let cheapest = Number.MAX_VALUE;

  for (let line = min; line < max; line++) {
    let fuel = 0;
    crabs.forEach((crab) => (fuel += Math.abs(crab - line)));

    if (fuel < cheapest) {
      cheapest = fuel;
    }
  }

  return cheapest;
};

// ##########
// # PART 2 #
// ##########
const calcRequiredFuel = (distanceToLine: number) => (distanceToLine * (distanceToLine + 1)) / 2;

export const part2 = () => {
  const crabs = input.split(",").map((it) => Number(it));

  const [min, max] = minAndMax(crabs);

  let cheapest = Number.MAX_VALUE;

  for (let line = min; line < max; line++) {
    let fuel = 0;
    crabs.forEach((crab) => (fuel += calcRequiredFuel(Math.abs(crab - line))));

    if (fuel < cheapest) {
      cheapest = fuel;
    }
  }

  return cheapest;
};
