## Algorithms
The purpose of this project is to explore commonly used algorithms, be they ones asked during technical interviews or used in production apps.

I wanted to put togther a series of these and explore the time complexity of each solution, to demonstrate how some small changes can lead to much more scalable and performant solutions.

I will pick out some common algorithms that are interesting and that solve real problems, then apply gradual changes to them so various solutions can be presented and compared.

### Set up and run
- `$ yarn` installs dependencies
- `$ yarn anagrams` runs the demo for anagrams
- `$ yarn search` runs the demo for search

### Anagrams
First up, we have the anagram problem. With this, a collection of three letter words provided as input need to be grouped by those that are anagrams of each other.

Given the following input:

```
['csu', 'kot, 'net', 'tko', 'ucs', 'ten', 'tok', 'ent', 'usc']
```

We should have the output:

```
['kot, 'tko', 'tok', 'usc', 'csu', 'ucs', 'ten', 'net', 'ent']
```

There are three solutions inside `anagram.ts`. Each one has the same output, but one is much faster than the other two.

I have set up some test data - a file that contains 30,000 instances of randomly generated three letter sequences.

For the purpose of this demo, I call each of the functions for these solutions and measure execution time for each by processing 5000 records.

##### First solution: slowerGroup
This solution has the most loops and so the highst time complexity. In here we are:

- creating a map object to store the inputs according to how they should be grouped.
- sorting the letters for each input in a loop and returning an array of strings.
- filtering that array of strings in order to generate unique values.
- using these unique values as keys for our map object, and we assign the three letter sequences to the correct map index by comparing if they match by sorting the value and checking it against the map key.
- we end up with something that looks like this:

```
{
  'tok': ['kto', 'tok', 'kot', ...more],
  'ent': ['ten', 'net', 'ent', ...more],
}
```

We then flatten this back into a one-dimensional array with all items grouped correctly.

##### Second solution: slowGroup
This solution is generally a little faster, but not by much. It is mostly the same as the solution above, with one exception.

Instead of generating unique keys by using an array filter function, we pass a remapped set of inputs into an ES6 Set, which ensures that all inputs occur only once. The optimsations put in by the NodeJS V8 engine might help a little here.

##### Third solution: fasterGroup
This solution is by far the fastest and has less loops and so less time complexity. It works as follows:

- a map object to hold grouped anagrams is created
- each input is looped through and here we:
  - sort the letters in the input
  - check and see if the map has the key (sorted letters)
  - if there is no map key, we create one and assign it an empty array
  - we add the input being looped to the array being pointed to in the map
- finally, we flatten the map object to a one-dimensional array

##### Wrap up
A function was created to measure the performance of each of these solutions with the following results:

- the fasterGroup solution took ~18ms
- the slowGroup solution took ~2259ms
- the slowerGroup solution took ~2322ms

##### Output

```
=====> fasterGroup took 18ms with 5000 items. <=====
[
  'tok', 'okt', 'kto', 'csu', 'suc', 'ucs', 'cus', 'usc',
  'scu', 'yqi', 'qiy', 'iyq', 'yiq', 'iqy', 'qyi', 'qiy',
  'iyq', 'yqi', 'mjd', 'jdm', 'dmj', 'zpj', 'pjz', 'jzp',
  'hsv', 'svh', 'vhs', 'vjx', 'jxv', 'xvj', 'xjv', 'jvx',
  'vxj', 'bja', 'jab', 'abj', 'bja', 'jab', 'abj', 'baj',
  'ajb', 'jba', 'qsv', 'svq', 'vqs', 'sqv', 'qvs', 'vsq',
  'nnn', 'nnn', 'nnn', 'xat', 'atx', 'txa', 'tgy', 'gyt',
  'ytg', 'izr', 'zri', 'riz', 'xma', 'max', 'axm', 'hld',
  'ldh', 'dhl', 'rtk', 'tkr', 'krt', 'one', 'neo', 'eon',
  'eon', 'one', 'neo', 'dod', 'odd', 'ddo', 'ddo', 'dod',
  'odd', 'umh', 'mhu', 'hum', 'mhu', 'hum', 'umh', 'gdj',
  'djg', 'jgd', 'dgj', 'gjd', 'jdg', 'plb', 'lbp', 'bpl',
  'abu', 'bua', 'uab', 'uhl',
  ... 4900 more items
]
=====> slowGroup took 2259ms with 5000 items. <=====
[
  'tok', 'okt', 'kto', 'csu', 'suc', 'ucs', 'cus', 'usc',
  'scu', 'yqi', 'qiy', 'iyq', 'yiq', 'iqy', 'qyi', 'qiy',
  'iyq', 'yqi', 'mjd', 'jdm', 'dmj', 'zpj', 'pjz', 'jzp',
  'hsv', 'svh', 'vhs', 'vjx', 'jxv', 'xvj', 'xjv', 'jvx',
  'vxj', 'bja', 'jab', 'abj', 'bja', 'jab', 'abj', 'baj',
  'ajb', 'jba', 'qsv', 'svq', 'vqs', 'sqv', 'qvs', 'vsq',
  'nnn', 'nnn', 'nnn', 'xat', 'atx', 'txa', 'tgy', 'gyt',
  'ytg', 'izr', 'zri', 'riz', 'xma', 'max', 'axm', 'hld',
  'ldh', 'dhl', 'rtk', 'tkr', 'krt', 'one', 'neo', 'eon',
  'eon', 'one', 'neo', 'dod', 'odd', 'ddo', 'ddo', 'dod',
  'odd', 'umh', 'mhu', 'hum', 'mhu', 'hum', 'umh', 'gdj',
  'djg', 'jgd', 'dgj', 'gjd', 'jdg', 'plb', 'lbp', 'bpl',
  'abu', 'bua', 'uab', 'uhl',
  ... 4900 more items
]
=====> slowerGroup took 2322ms with 5000 items. <=====
[
  'tok', 'okt', 'kto', 'csu', 'suc', 'ucs', 'cus', 'usc',
  'scu', 'yqi', 'qiy', 'iyq', 'yiq', 'iqy', 'qyi', 'qiy',
  'iyq', 'yqi', 'mjd', 'jdm', 'dmj', 'zpj', 'pjz', 'jzp',
  'hsv', 'svh', 'vhs', 'vjx', 'jxv', 'xvj', 'xjv', 'jvx',
  'vxj', 'bja', 'jab', 'abj', 'bja', 'jab', 'abj', 'baj',
  'ajb', 'jba', 'qsv', 'svq', 'vqs', 'sqv', 'qvs', 'vsq',
  'nnn', 'nnn', 'nnn', 'xat', 'atx', 'txa', 'tgy', 'gyt',
  'ytg', 'izr', 'zri', 'riz', 'xma', 'max', 'axm', 'hld',
  'ldh', 'dhl', 'rtk', 'tkr', 'krt', 'one', 'neo', 'eon',
  'eon', 'one', 'neo', 'dod', 'odd', 'ddo', 'ddo', 'dod',
  'odd', 'umh', 'mhu', 'hum', 'mhu', 'hum', 'umh', 'gdj',
  'djg', 'jgd', 'dgj', 'gjd', 'jdg', 'plb', 'lbp', 'bpl',
  'abu', 'bua', 'uab', 'uhl',
  ... 4900 more items
]
```

### Search
Next, we have the duplicate search problem. Given an array of integers, we need to identify and pick out any duplicates.

Given the following input `[1,2,3,1,4,5,6,7,1,8,4,10]`, we should have the output `[1,4]`;

For the purpose of this demo, I created three functions that produce the same output, but have varying degrees of performance.

I set up some test data - a JSON file `./testdata/numbers.json` which contains an array of a million numbers, each one randomy generated with a value between 0 and 200.

##### First solution: slowestFindDuplicates
This solution has the hightest time complexity given the number of nested loops it contains. It works as follows:

- we create an empty array of type number to store any duplicates found
- we have a first for loop with a second nested loop and both iterate over the array of numbers passed as an argument
  - we start with the first number in the array in the first for loop
  - we then go through each number in turn in the second for loop and check for equality
  - if the numbers are equal, and they haven't been added to the array of duplicates yet, we add the duplicate found
- we then return the array of duplicates found, which should only contain unique values

This would be the first go-to solution and the simplest one on paper but it has a very high time complexity. Passing an input of ten numbers would be barely noticable in terms of performance, but passing in 1000 numbers could see the input array of `nums[]` being iterated over a million times.

#### Second solution: slowerFindDuplicates
This solution still has high time complexity, but not as much as the first. It contains less nested loops and works as follows:

- we first sort the numbers from lowest to highest
- we create an empty array to store any duplicates found
- we create a single for loop to go through each number and
  - we check to see if the current number is equal to the next one in the array
  - if they match and they haven't been added to the array of duplicates, we add them
- we then return the array of duplicates found

This solution is much faste than the first one. We are able to use less nested loops to check if the values match, because they are already sorted.

##### Third solution: fastFindDuplicates
This solution is marginally quicker than the previous one and it leverages the JavaScript array `filter` function. When filtering an array, a callback function is passed in over each iteration, and we check to see if the number already exists in the array using `indexOf`.

The performance of this solution is helped by the optimisations made under the hood in the JavaScript engine used (V8 for NodeJS). It is also the cleanest solution that is easier to read and the one that should be used when writing poduction-ready code.

**Note:** Within this solution, I thought it would be faster if I sorted the numbers first from lowest to highest before attempting to filter for duplicates. I had originally left this in, and the performance was half that of the slowest solution.

I then removed sorting and left filtering in only. The performance jumped even higher and this highlights that some added optimisations might hamper performance significantly. The resulting output was the same, but performance was a thousand times faster.

#### Output

```
=====> fastFindDuplicates took 28ms with 100000 items. <=====
[
   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
  96, 97, 98, 99,
  ... 100 more items
]
=====> slowerFindDuplicates took 39ms with 100000 items. <=====
[
   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
  96, 97, 98, 99,
  ... 100 more items
]
=====> slowestFindDuplicates took 11854ms with 100000 items. <=====
[
   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
  96, 97, 98, 99,
  ... 100 more items
]
```
