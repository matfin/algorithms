import { performance } from 'perf_hooks';
import anagrams from './testdata/inputs.json';

enum Experiment {
  FASTER = 'fasterGroup',
  SLOW = 'slowGroup',
  SLOWER = 'slowerGroup',
}

/**
 * Return a random number in range
 * @param {number} min - start from
 * @param {number} max - end at
 */
const randomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

/**
 * Generate an array of three letter anagrams
 * such as: ['pal', 'lap', 'pla']
 * @return {string[]} - an array of anagrams
 */
const generateRandomAnagrams = (): string[] => {
  const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const length = alphabet.length;
  const chars: string[] = [
    alphabet[randomNumberInRange(0, length)],
    alphabet[randomNumberInRange(0, length)],
    alphabet[randomNumberInRange(0, length)],
  ];

  return [
    [chars[0], chars[1], chars[2]].join(''),
    [chars[1], chars[2], chars[0]].join(''),
    [chars[2], chars[0], chars[1]].join(''),
  ];
};

/**
 * This returns a JSON stringified array of random
 * three letter characters given a count. This returns
 * something like ['cab', 'abc', 'bca', ...andMore]
 * @param {number} count = number of items to generate
 * @return {string} - JSON stringified output
 */
const anagramDataSet = (count: number = 100): string => {
  const items: string[] = [];

  for (let i = 0; i < count; i++) {
    items.push(...generateRandomAnagrams())
  }

  return JSON.stringify(items);
};

/**
 * Group input strings by being anagrams of each other.
 * This function has higher time complexity and will be slow.
 *
 * example input:  ['ant', 'bed', 'tan', 'nat', 'deb', 'bde']
 * returns output: ['ant', 'tan', 'nat', 'bed', 'deb', 'bde']
 * @param {string[]} inputs - an array of string inputs
 * @return {string[]} - sorted inputs
 */
const slowGroup = (inputs: string[]): string[] => {
  const resortedString = (input: string): string =>
    input.split('').sort().join('');
  const map: { [index: string]: string[] } = {};
  const keys: string[] = [
    ...new Set(inputs.map((item: string): string => resortedString(item))),
  ];

  keys.forEach((key: string): void => {
    map[key] = inputs.filter(
      // resortedString is another loop
      (input: string): boolean => resortedString(input) === key
    );
  });

  return keys.reduce(
    (acc: string[], k: string) => [...acc, ...map[k]],
    [] as string[]
  );
}; // takes ~7 seconds with 10,000 items

/**
 * Group input strings by being anagrams of each other.
 * This function has a lot of loops and thus a higher
 * time complexity. It will be very slow with large sets.
 * example input:  ['ant', 'bed', 'tan', 'nat', 'deb', 'bde']
 * returns output: ['ant', 'tan', 'nat', 'bed', 'deb', 'bde']
 * @param {string[]} inputs - inputs to be processed
 * @return {string[]} - processed outputs
 */
const slowerGroup = (inputs: string[]): string[] => {
  const resortedString = (input: string): string =>
    input.split('').sort().join('');
  const map: { [index: string]: string[] } = {};
  const sorted: string[] = inputs.map((item: string): string => resortedString(item));
  const keys: string[] = sorted.filter((item: string, idx: number): boolean => sorted.indexOf(item) === idx);

  keys.forEach((key: string): void => {
    map[key] = inputs.filter(
      (input: string): boolean => resortedString(input) === key
    );
  });

  return keys.reduce(
    (acc: string[], k: string) => [...acc, ...map[k]],
    [] as string[]
  );
}; // takes ~25 seconds with 10,000 items

/**
 * Group input strings by being anagrams of each other.
 * This solution will be much faster because it has
 * reduced time complexity.
 * example input:  ['ant', 'bed', 'tan', 'nat', 'deb', 'bde']
 * returns output: ['ant', 'tan', 'nat', 'bed', 'deb', 'bde']
 * @param {string[]} inputs - inputs to be processed
 * @return {string[]} - processed outputs
 */
const fasterGroup = (inputs: string[]): string[] => {
  const map: { [index: string]: string[] } = {};
  const resortedString = (input: string): string =>
    input.split('').sort().join('');

  inputs.forEach((input: string): void => {
    const mapKey = resortedString(input);

    if(!map[mapKey]) {
      map[mapKey] = [];
    }

    map[mapKey].push(input);
  });

  return Object.keys(map).reduce(
    (acc: string[], k: string) => [...acc, ...map[k]],
    [] as string[]
  );
}; // takes ~36ms

const measurePerformance = (slice: number = 100, experiment: Experiment): string[] => {
  const inputs: string[] = anagrams.slice(0, slice);
  const start = performance.now();
  let output: string[];

  switch(experiment) {
    case Experiment.FASTER: {
      output = fasterGroup(inputs);
      break;
    }
    case Experiment.SLOW: {
      output = slowGroup(inputs);
      break;
    }
    case Experiment.SLOWER: {
      output = slowerGroup(inputs);
      break;
    }
  }

  console.info(`=====> ${experiment} took ${Math.round(performance.now() - start)}ms with ${slice} items. <=====`);

  return output;
};

console.info('Crunching numbers. Hang on.....');
console.log(measurePerformance(5000, Experiment.FASTER));
console.log(measurePerformance(5000, Experiment.SLOW));
console.log(measurePerformance(5000, Experiment.SLOWER));
