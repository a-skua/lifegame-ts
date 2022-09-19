import { LifeGame, Table } from "../src/lifegame.ts";

const seed: Table = (() => {
  const src = `
......................................
.........................#............
.......................#.#............
.............##......##............##.
............#...#....##............##.
.##........#.....#...##...............
.##........#...#.##....#.#............
...........#.....#.......#............
............#...#.....................
.............##.......................
......................................
`.trim();

  const seed: Table = [[]];
  for (const c of src) {
    if (c === "\n") {
      seed.push([]);
    } else {
      seed[seed.length - 1].push(c === "#");
    }
  }
  return seed;
})();

const render = (table: Table): void => {
  let msg = "";
  table.forEach((row) => {
    row.forEach((col) => {
      msg += col ? "■ " : ". ";
    });
    msg += "\n";
  });
  console.log(msg);
};

// render(seed);
const lifegame = LifeGame.fromTable(seed);

const show = (): void => {
  lifegame.next(48, 32);
  lifegame.rendering(render);
  setTimeout(show, 50);
};
show();
