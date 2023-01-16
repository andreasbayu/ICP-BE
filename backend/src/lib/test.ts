import { held_karp } from './lib';

// sample testing library
console.log(
  held_karp({
    distance: [
      [0, 2, 4, 5],
      [2, 0, 3, 5],
      [4, 4, 0, 6],
      [5, 4, 6, 0],
    ],
  }),
);
