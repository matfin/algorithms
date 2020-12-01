/**
 * The Problem
 *
 * Return a grouped array of strings that are annagrams
 *
 * Given [
 *  'poh', 'own', 'won', 'cat', 'eti', 'pat',
 *  'hpo', 'apt', 'now', 'tap', 'hop', 'tie'
 * ]
 *
 * Deliver [
 *  'cat', 'pat', 'apt', 'tap', 'eti', 'tie',
 *  'poh', 'hpo', 'hop', 'own', 'won', 'now'
 * ]
 */

const solution = (inputs: string[]): string[] => {
  const resortedString = (input: string): string => input.split('').sort().join('');
  const map: { [index: string]: string[] } = {};
  const keys: string[] = [
    ...new Set(
      inputs.map((item: string): string => resortedString(item))
    ),
  ];

  keys.forEach((key: string): void => {
    map[key] = inputs.filter((input: string): boolean => resortedString(input) === key);
  });

  return keys.reduce((acc: string[], k: string) => [...acc, ...map[k]], [] as string[]);
};

const input: string[] = [
  'poh', 'own', 'won', 'cat', 'eti', 'pat',
  'hpo', 'apt', 'now', 'tap', 'hop', 'tie'
];
const output: string[] = solution(input);

console.log({ input, output });
