const input: string = require("fs").readFileSync("./day1/input.txt").toString();

const measurements: number[] = input.split("\n").map((it) => Number(it));

const getNumberOfItemsLargerThanPreviousItem = (input: number[]): number => {
  let last = 0;
  let i = -1;

  input.forEach((measurement) => {
    if (measurement > last) {
      i++;
    }

    last = measurement;
  });

  return i;
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
  for (let i = 0; i < input.length - 2; i++) {
    windows.push(input[i] + input[i + 1] + input[i + 2]);
  }

  return windows;
};

export const part2 = () =>
  getNumberOfItemsLargerThanPreviousItem(sumThreeMeasurements(measurements));
