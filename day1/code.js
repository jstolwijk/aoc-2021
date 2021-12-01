const input = require("fs").readFileSync("./input.txt").toString();

const measurements = input.split("\n").map((it) => Number(it));

const getNumberOfItemsLargerThanPreviousItem = (input) => {
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

// part 1
console.log("Part 1: " + getNumberOfItemsLargerThanPreviousItem(measurements));

// part 2
const sumThreeMeasurements = (input) => {
  let windows = [];
  for (let i = 0; i < input.length - 2; i++) {
    windows.push(input[i] + input[i + 1] + input[i + 2]);
  }

  return windows;
};

console.log(
  "Part 2: " +
    getNumberOfItemsLargerThanPreviousItem(sumThreeMeasurements(measurements))
);
