import { sum } from "../common/sum";

const input: string = require("fs").readFileSync("./day6/input.txt").toString();

// ##########
// # PART 1 #
// ##########
export const part1 = () => {
  let fish = input.split(",").map((x) => Number(x));
  let numberOfFishToBeBorn = 0;
  let day = 0;
  while (day < 80) {
    for (let i = 0; i < numberOfFishToBeBorn; i++) {
      fish.push(9);
    }

    fish = fish.map((f) => (f === 0 ? 6 : f - 1));

    numberOfFishToBeBorn = fish.filter((f) => f === 0).length;
    day++;
  }

  return fish.length;
};

// ##########
// # PART 2 #
// ##########
const groupFishByTimer = (fish: number[]): number[] => {
  return fish.reduce(
    (acc, curr) => {
      const counter = acc[curr] ?? 0;
      acc[curr] = counter + 1;
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  );
};

export const part2 = () => {
  let fish = input.split(",").map((x) => Number(x));

  let groupedFish = groupFishByTimer(fish);

  let day = 0;

  while (day < 256) {
    groupedFish = [
      groupedFish[1], // 0
      groupedFish[2], // 1
      groupedFish[3], // 2
      groupedFish[4], // 3
      groupedFish[5], // 4
      groupedFish[6], // 5
      groupedFish[7] + groupedFish[0],
      groupedFish[8], // 7
      groupedFish[0], // 8 - newborn fish
    ];

    day++;
  }

  return sum(groupedFish);
};
