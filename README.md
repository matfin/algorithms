## Algorithms
The purpose of this project is to explore commonly used algorithms, be they ones asked during technical interviews or used in production apps.

I wanted to put togther a series of these and explore the time complexity of each solution, to demonstrate how some small changes can lead to much more scalable and performant solutions.

I will pick out some common algorithms that are interesting and that solve real problems, then apply gradual changes to them so various solutions can be presented and compared.

#### Anagrams
First up, we have the anagram problem. With this, a collection of three letter words provided as input need to be grouped by those that are anagrams of each other.

Given the following input:

```
['csu', 'kot, 'net', 'tko', 'ucs', 'ten', 'tok', 'ent', 'usc']
```

We should have the output:

```
['kot, 'tko', 'tok', 'usc', 'csu', 'ucs', 'ten', 'net', 'ent']
```

#### Set up and run
- `$ yarn` installs dependencies
- `$ yarn anagrams` runs the demo

There are three solutions inside `anagram.ts`. Each one has the same output, but one is much faster than the other two.

I have set up some test data - a file that contains 30,000 instances of randomly generated three letter sequences.

For the purpose of this demo, I call each of the functions for these solutions and measure execution time for each by getting them to process 5000 records.

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
