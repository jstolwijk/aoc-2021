export const sum = (xs: number[]): number => xs.reduce((acc, curr) => acc + curr, 0);

export const min = (xs: number[]): number => xs.reduce((acc, curr) => (curr < acc ? curr : acc), Number.MAX_VALUE);
export const max = (xs: number[]): number => xs.reduce((acc, curr) => (curr > acc ? curr : acc), Number.MIN_VALUE);

export const minAndMax = (xs: number[]): number[] => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  xs.forEach((x) => {
    if (x < min) {
      min = x;
    }
    if (x > max) {
      max = x;
    }
  });
  return [min, max];
};
