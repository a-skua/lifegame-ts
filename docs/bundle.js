// ../src/lifegame.ts
var newCellSrc = (x, y, seed2) => {
  const src = [];
  for (let i = 0; i < x * y; i++) {
    if (i < seed2.length) {
      src.push(seed2[i]);
    } else {
      src.push(false);
    }
  }
  return src;
};
var up = (x, y) => [x, y - 1];
var upperRight = (x, y) => [x + 1, y - 1];
var right = (x, y) => [x + 1, y];
var bottomRight = (x, y) => [x + 1, y + 1];
var bottom = (x, y) => [x, y + 1];
var bottomLeft = (x, y) => [x - 1, y + 1];
var left = (x, y) => [x - 1, y];
var upperLeft = (x, y) => [x - 1, y - 1];
var newPositions = [
  up,
  upperRight,
  right,
  bottomRight,
  bottom,
  bottomLeft,
  left,
  upperLeft
];
var toNum = (state) => {
  return state ?? false ? 1 : 0;
};
var Cell = class {
  constructor(x, y, seed2 = []) {
    this.x = x;
    this.y = y;
    this.src = newCellSrc(this.x, this.y, seed2);
  }
  static fromTable(table) {
    const seed2 = [];
    table.forEach((row) => row.forEach((col) => seed2.push(col)));
    return new Cell(table[0]?.length ?? 0, table.length, seed2);
  }
  toTable() {
    const table = [];
    for (let y = 0; y < this.y; y++) {
      const row = [];
      for (let x = 0; x < this.x; x++) {
        row.push(this.src[this.xy2i(x, y)]);
      }
      table.push(row);
    }
    return table;
  }
  state(x, y) {
    if (x >= this.x || x < 0 || y >= this.y || y < 0) {
      return null;
    }
    return this.src[this.xy2i(x, y)];
  }
  xy2i(x, y) {
    return x + this.x * y;
  }
  future(x, y) {
    const current = this.state(x, y);
    if (current === null) {
      return null;
    }
    const count = newPositions.reduce(
      (count2, f) => count2 + toNum(this.state(...f(x, y))),
      0
    );
    if (current) {
      return count === 2 || count === 3;
    } else {
      return count === 3;
    }
  }
};
var LifeGame = class {
  constructor(cell) {
    this.cell = cell;
  }
  static fromTable(seed2) {
    return new LifeGame(Cell.fromTable(seed2));
  }
  next(x = this.cell.x, y = this.cell.y) {
    const seed2 = [];
    for (let cy = 0; cy < y; cy++) {
      for (let cx = 0; cx < x; cx++) {
        const state = this.cell.future(cx, cy);
        seed2.push(state ?? false);
      }
    }
    this.cell = new Cell(x, y, seed2);
  }
  rendering(render2) {
    render2(this.cell.toTable());
  }
};

// web.ts
var seed = (() => {
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
  const seed2 = [[]];
  for (const c of src) {
    if (c === "\n") {
      seed2.push([]);
    } else {
      seed2[seed2.length - 1].push(c === "#");
    }
  }
  return seed2;
})();
var lifegame = LifeGame.fromTable(seed);
var tableElement = document.createElement("canvas");
var render = (table) => {
  for (const y in table) {
    const row = table[y];
    for (const x in row) {
      const state = row[x];
      if (!state)
        continue;
      const col = tableElement.getContext("2d");
      const px = +x * 10;
      const py = +y * 10;
      col.fillRect(px, py, 10, 10);
    }
  }
};
var getX = () => window.innerWidth;
var getY = () => window.innerHeight - 32;
var show = () => {
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
