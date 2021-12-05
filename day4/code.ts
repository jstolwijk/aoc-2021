import { type } from "os";
import { off } from "process";

const input: string = require("fs").readFileSync("./day4/input.txt").toString();

// ##########
// # PART 1 #
// ##########

/*
Draw: 4,2,1,3

1 2  1 2  1 -
3 4  3 -  3 -     BINGO!

4 5  - 5  - 5
1 3  1 3  1 3



Store all vertices in a hashmap per board
Store the count of non drawn numbers
If one of these vertices is 0, the board wins


Board:
number: row,column
eg:
4: 1,1
5: 1,2
1: 2,1
3: 2,2

rows: {
  2: 0
},
columns: {
  1: 0
}
*/

interface Board {
  numbers: number[][];
  rows: number[];
  columns: number[];
}

const sum = (xs: number[]): number => {
  return xs.reduce((acc, curr) => acc + curr, 0);
};

const difference = (xs: number[], ys: number[]): number[] => {
  console.log("XS: " + xs.join() + " YS: " + ys.join());
  return xs.filter((x) => !ys.includes(x));
};

const getUnmarkedNumbers = (board: Board, drawnNumbers: number[]) => {
  const numbers = difference(
    board.numbers.map((coords, index) => (coords ? index : null)),
    drawnNumbers
  );

  console.log({ numbers });
  return numbers;
};

export const part1 = () => {
  const [draw, newLine, ...rawBoards] = input.split("\n");

  const drawnNumbers = draw.split(",").map((i) => Number(i));

  // Board is 5x5, one newline between the boards
  let boards: Board[] = [];

  for (let i = 0; i < rawBoards.length; i += 6) {
    const row1 = stringToBoardLine(rawBoards[i]);
    const row2 = stringToBoardLine(rawBoards[i + 1]);
    const row3 = stringToBoardLine(rawBoards[i + 2]);
    const row4 = stringToBoardLine(rawBoards[i + 3]);
    const row5 = stringToBoardLine(rawBoards[i + 4]);

    let xs = [];

    row1.forEach((item, index) => (xs[item] = [0, index]));
    row2.forEach((item, index) => (xs[item] = [1, index]));
    row3.forEach((item, index) => (xs[item] = [2, index]));
    row4.forEach((item, index) => (xs[item] = [3, index]));
    row5.forEach((item, index) => (xs[item] = [4, index]));

    boards.push({
      numbers: xs,
      rows: [0, 0, 0, 0, 0],
      columns: [0, 0, 0, 0, 0],
    });
  }

  for (
    let drawnNumbersIndex = 0;
    drawnNumbersIndex < drawnNumbers.length;
    drawnNumbersIndex++
  ) {
    const number = drawnNumbers[drawnNumbersIndex];
    for (let bidx = 0; bidx < boards.length; bidx++) {
      const board = boards[bidx];
      if (board.numbers[number]) {
        const [row, column] = board.numbers[number];

        board.rows[row]++;
        board.columns[column]++;

        if (board.rows[row] === 5 || board.columns[column] === 5) {
          const alreadyDrawn = drawnNumbers.slice(0, drawnNumbersIndex + 1);

          console.log(
            "BINGO!! alreadyDrawn: " + alreadyDrawn + " board " + bidx
          );
          console.log(JSON.stringify({ board }));
          return number * sum(getUnmarkedNumbers(board, alreadyDrawn));
        }
      }
    }
  }

  return 0;
};

const stringToBoardLine = (s: string): number[] => {
  return s
    .split(" ")
    .filter((it) => it !== "")
    .map((x) => Number(x));
};

// ##########
// # PART 2 #
// ##########

export const part2 = () => {
  const [draw, newLine, ...rawBoards] = input.split("\n");

  const drawnNumbers = draw.split(",").map((i) => Number(i));

  // Board is 5x5, one newline between the boards
  let boards: Board[] = [];

  for (let i = 0; i < rawBoards.length; i += 6) {
    const row1 = stringToBoardLine(rawBoards[i]);
    const row2 = stringToBoardLine(rawBoards[i + 1]);
    const row3 = stringToBoardLine(rawBoards[i + 2]);
    const row4 = stringToBoardLine(rawBoards[i + 3]);
    const row5 = stringToBoardLine(rawBoards[i + 4]);

    let xs = [];

    row1.forEach((item, index) => (xs[item] = [0, index]));
    row2.forEach((item, index) => (xs[item] = [1, index]));
    row3.forEach((item, index) => (xs[item] = [2, index]));
    row4.forEach((item, index) => (xs[item] = [3, index]));
    row5.forEach((item, index) => (xs[item] = [4, index]));

    boards.push({
      numbers: xs,
      rows: [0, 0, 0, 0, 0],
      columns: [0, 0, 0, 0, 0],
    });
  }

  let boardsDone = new Set();

  for (
    let drawnNumbersIndex = 0;
    drawnNumbersIndex < drawnNumbers.length;
    drawnNumbersIndex++
  ) {
    const number = drawnNumbers[drawnNumbersIndex];
    for (let bidx = 0; bidx < boards.length; bidx++) {
      const board = boards[bidx];
      if (board.numbers[number]) {
        const [row, column] = board.numbers[number];

        board.rows[row]++;
        board.columns[column]++;

        if (board.rows[row] === 5 || board.columns[column] === 5) {
          boardsDone.add(bidx);
          console.log(boardsDone.size + "  " + boards.length);

          if (boardsDone.size === boards.length) {
            const alreadyDrawn = drawnNumbers.slice(0, drawnNumbersIndex + 1);

            console.log(
              "BINGO!! alreadyDrawn: " + alreadyDrawn + " board " + bidx
            );
            console.log(JSON.stringify({ board }));
            return number * sum(getUnmarkedNumbers(board, alreadyDrawn));
          }
        }
      }
    }
  }
  return 0;
};
