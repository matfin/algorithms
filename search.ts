import fs from 'fs';
import { performance } from 'perf_hooks';
import numbers from './testdata/numbers.json';

enum Experiment {
  FAST = 'fastFindDuplicates',
  SLOWER = 'slowerFindDuplicates',
  SLOWEST = 'slowestFindDuplicates',
}

const randomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

const generateNumbersData = (size: number, uniques: number): Promise<void> =>
  new Promise((resolve: () => void, reject: (err: Error) => void) => {
    const nums: number[] = [...Array(size)].map((): number =>
      randomNumberInRange(0, uniques)
    );

    fs.writeFile(
      './testdata/numbers.json',
      JSON.stringify(nums),
      (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });

/**
 * Go through an array of integers and return those that
 * occur more than once. This has nested loops and will
 * have a higher time complexity.
 *
 * example input: [1,2,3,1,4,5,6,7]
 * returns output: [1]
 *
 * @param {number[]} nums - an array of random integers
 * @return {number[]} - array of unique duplicates found
 */
const slowestFindDuplicates = (nums: number[]): number[] => {
  const dupes: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j] && dupes.indexOf(nums[i]) === -1) {
        dupes.push(nums[i]);
      }
    }
  }

  return dupes;
};

/**
 * Go through an array of integers and return those that
 * occur more than once. This has no nested loops and
 * will have a much lower time complexity.
 *
 * example input: [1,2,3,1,4,5,6,7]
 * returns output: [1]
 *
 * @param {number[]} nums - an array of random integers
 * @return {number[]} - array of unique duplicates found
 */
const slowerFindDuplicates = (nums: number[]): number[] => {
  const sorted = nums.sort((a: number, b: number): number => (a > b ? 1 : -1));
  const dupes: number[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] === sorted[i + 1] && dupes.indexOf(sorted[i]) === -1) {
      dupes.push(sorted[i]);
    }
  }

  return dupes;
};

/**
 * Go through an array of integers and return those that
 * occur more than once. This has less nested loops than
 * the slowest example, but still has high time complexity.
 * With that, it's still the shortest implementation.
 *
 * example input: [1,2,3,1,4,5,6,7]
 * returns output: [1]
 *
 * @param {number[]} nums - an array of random integers
 * @return {number[]} - array of unique duplicates found
 */
const fastFindDuplicates = (nums: number[]): number[] =>
  nums
    .filter((item: number, idx: number): boolean => nums.indexOf(item) === idx);

const measurePerformance = (
  slice: number = 100,
  experiment: Experiment
): number[] => {
  const inputs: number[] = (numbers as number[]).slice(0, slice);
  const start = performance.now();
  let output: number[] = [];

  switch (experiment) {
    case Experiment.SLOWER: {
      output = slowerFindDuplicates(inputs);
      break;
    }
    case Experiment.FAST: {
      output = fastFindDuplicates(inputs);
      break;
    }
    case Experiment.SLOWEST: {
      output = slowestFindDuplicates(inputs);
      break;
    }
  }

  console.info(
    `=====> ${experiment} took ${Math.round(
      performance.now() - start
    )}ms with ${slice} items. <=====`
  );

  return output;
};

// generateNumbersData(1000000, 200);
console.info('Crunching numbers. Hang on.....');
console.log(
  measurePerformance(
    100000,
    Experiment.FAST
  ).sort((a: number, b: number): number => (a > b ? 1 : -1))
);
console.log(
  measurePerformance(
    100000,
    Experiment.SLOWER
  ).sort((a: number, b: number): number => (a > b ? 1 : -1))
);
console.log(
  measurePerformance(
    100000,
    Experiment.SLOWEST
  ).sort((a: number, b: number): number => (a > b ? 1 : -1))
);
