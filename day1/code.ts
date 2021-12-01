const input: string = require("fs").readFileSync("./day1/input.txt").toString();

const measurements: number[] = input.split("\n").map((it) => Number(it));

const getNumberOfItemsLargerThanPreviousItem = (input: number[]): number => {
  let last = 0;
  let counter = -1;

  input.forEach((measurement) => {
    if (measurement > last) {
      counter++;
    }

    last = measurement;
  });

  return counter;
};

// ##########
// # PART 1 #
// ##########
export const part1 = () => getNumberOfItemsLargerThanPreviousItem(measurements);

// ##########
// # PART 2 #
// ##########
const sumThreeMeasurements = (input: number[]): number[] => {
  let windows = [];

  // 199  A
  // 200  A B
  // 208  A B C
  // 210    B C D
  // 200  E   C D
  // 207  E F   D
  // 240  E F G
  // 269    F G H
  // 260      G H
  // 263        H
  for (let i = 0; i < input.length - 2; i++) {
    windows.push(input[i] + input[i + 1] + input[i + 2]);
  }

  return windows;
};

export const part2 = () =>
  getNumberOfItemsLargerThanPreviousItem(sumThreeMeasurements(measurements));
