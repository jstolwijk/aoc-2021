const input: string = require("fs").readFileSync("./day3/input.txt").toString();

// ##########
// # PART 1 #
// ##########

const countValues = (lines: string[][]): { 0: number; 1: number }[] => {
  return lines.reduce(
    (accumulator, numbers) => {
      numbers.forEach((number, index) => {
        if (number === "0") {
          accumulator[index][0] += 1;
        } else {
          accumulator[index][1] += 1;
        }
      });
      return accumulator;
    },
    lines[0].map((_) => ({ 0: 0, 1: 0 }))
  );
};

export const part1 = () => {
  const lines = input.split("\n").map((line) => line.split(""));

  const count = countValues(lines);

  const gammaRate = count.map((it) => (it[0] > it[1] ? "1" : "0")).join("");
  const epsilonRate = count.map((it) => (it[0] < it[1] ? "1" : "0")).join("");

  return binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate); //gammaRate * epsilonRate;
};

const binaryToDecimal = (binary: string): number => {
  return parseInt(binary, 2);
};

// ##########
// # PART 2 #
// ##########
const findRating = (
  lines: string[][],
  comparator: (zeroCount: number, oneCount: number) => string
): string => {
  let rating = "";

  let remainingLines = lines;
  let index = 0;

  while (remainingLines.length > 1) {
    const count = countValues(remainingLines);

    const char = comparator(count[index][0], count[index][1]);
    rating += char;

    remainingLines = remainingLines.filter((line) => line[index] === char);

    index++;
  }
  return remainingLines[0].join("");
};

export const part2 = () => {
  const lines = input.split("\n").map((line) => line.split(""));

  let oxygenGeneratorRating = findRating(lines, (zeroCount, oneCount) =>
    zeroCount > oneCount ? "0" : "1"
  );
  let c02ScrubberRating = findRating(lines, (zeroCount, oneCount) =>
    zeroCount <= oneCount ? "0" : "1"
  );

  return (
    binaryToDecimal(oxygenGeneratorRating) * binaryToDecimal(c02ScrubberRating)
  );
};
