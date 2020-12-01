import { performance } from 'perf_hooks';
import anagrams from './testdata/anagrams.json';

const randomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

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


const anagramDataSet = (): string[] => {
  const items: string[] = [];

  for (let i = 0; i < 1000; i++) {
    items.push(...generateRandomAnagrams())
  }

  return items;
};

/**
 *  Group input strings by being anagrams of each other
 *  example input:  ['ant', 'bed', 'tan', 'nat', 'deb', 'bde']
 *  returns output: ['ant', 'tan', 'nat', 'bed', 'deb', 'bde']
 *  @param {string[]} inputs - an array of string inputs
 *  @return {string[]} - sorted inputs
 */
const solution = (inputs: string[]): string[] => {
  const resortedString = (input: string): string =>
    input.split('').sort().join('');
  const map: { [index: string]: string[] } = {};
  const keys: string[] = [
    ...new Set(inputs.map((item: string): string => resortedString(item))),
  ];

  keys.forEach((key: string): void => {
    map[key] = inputs.filter(
      (input: string): boolean => resortedString(input) === key
    );
  });

  return keys.reduce(
    (acc: string[], k: string) => [...acc, ...map[k]],
    [] as string[]
  );
};

const measurePerformance = (slice: number = 100): void => {
  const input: string[] = anagrams.slice(0, slice);
  const start = performance.now();

  const output: string[] = solution(input);

  console.info(`Took ${Math.round(performance.now() - start)}ms with ${slice} items.`);
};

measurePerformance(30);
measurePerformance(300);
measurePerformance(3000);

