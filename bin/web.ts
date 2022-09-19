/**
 * Running on Browser.
 */
import { LifeGame, Table, X, Y } from "../src/lifegame.ts";

console.log(window.innerHeight);
console.log(window.innerWidth);

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

const lifegame = LifeGame.fromTable(seed);

const tableElement = document.createElement("canvas");

const render = (table: Table): void => {
  for (const y in table) {
    const row = table[y];
    for (const x in row) {
      const state = row[x];
      if (!state) continue;

      const col = tableElement.getContext("2d") as CanvasRenderingContext2D;
      const px = +x * 10;
      const py = +y * 10;
      col.fillRect(px, py, 10, 10);
    }
  }
};

const getX = (): X => window.innerWidth;
const getY = (): Y => window.innerHeight - 32;

const show = (): void => {
  const x = getX();
  const y = getY();
  lifegame.next(Math.floor(x / 10), Math.floor(y / 10));
  tableElement.width = x;
  tableElement.height = y;
  lifegame.rendering(render);
  setTimeout(show, 50);
};
show();

document.getElementById("app")?.appendChild(tableElement);
