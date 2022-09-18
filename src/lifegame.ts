export type State = boolean;

export type X = number;

export type Y = number;

export type Index = number;

export type Position = [X, Y];

export type Table = State[][];

const newTileSrc = (x: X, y: Y, seed: State[]): State[] => {
  const src: boolean[] = [];
  for (let i = 0; i < x * y; i++) {
    if (i < seed.length) {
      src.push(seed[i]);
    } else {
      src.push(false);
    }
  }
  return src;
};

type NewPosition = (x: X, y: Y) => Position;

const up          = (x: X, y: Y): Position => [x, y - 1];
const upperRight  = (x: X, y: Y): Position => [x + 1, y - 1];
const right       = (x: X, y: Y): Position => [x + 1, y];
const bottomRight = (x: X, y: Y): Position => [x + 1, y + 1];
const bottom      = (x: X, y: Y): Position => [x, y + 1];
const bottomLeft  = (x: X, y: Y): Position => [x - 1, y + 1];
const left        = (x: X, y: Y): Position => [x - 1, y];
const upperLeft   = (x: X, y: Y): Position => [x - 1, y - 1];

const newPositions: readonly NewPosition[] = [
  up,
  upperRight,
  right,
  bottomRight,
  bottom,
  bottomLeft,
  left,
  upperLeft,
];

const toNum = (state: State | null): number => {
  return (state ?? false) ? 1 : 0;
}

export class Tile {
  private src: readonly State[];

  constructor(
    public readonly x: X,
    public readonly y: Y,
    seed: State[] = [],
  ) {
    this.src = newTileSrc(this.x, this.y, seed);
  }

  public static fromTable(table: Table): Tile {
    let seed: State[] = []
    table.forEach(row => row.forEach(col => seed.push(col)));
    return new Tile(table[0]?.length ?? 0, table.length, seed);
  }

 public toTable(): Table {
    let table: Table = [];
    for(let y = 0; y < this.y; y++) {
      let row: State[] = [];
      for(let x = 0; x < this.x; x++) {
        row.push(this.src[this.xy2i(x, y)]);
      }
      table.push(row);
    }
   return table;
  }

  public state(x: X, y: Y): State | null {
    if (x >= this.x || x < 0 || y >= this.y || y < 0) {
      return null;
    }

    return this.src[this.xy2i(x, y)];
  }

  private xy2i (x: X, y: Y): Index {
    return x + this.x * y;
  }

  public future(x: X, y: Y): State | null {
    const current = this.state(x, y);
    if (current === null) {
      return null;
    }

    const count: number = newPositions.reduce((count: number, f: NewPosition) => count + toNum(this.state(...f(x, y))), 0);

    if (current) {
      return count === 2 || count === 3;
    } else {
      return count === 3;
    }
  }
}

export type Render = (t: Table) => void;

export class LifeGame {
  constructor(
    private tile: Tile,
  ) {}

  public static fromTable(seed: Table): LifeGame {
    return new LifeGame(Tile.fromTable(seed));
  }

  public next(x: X = this.tile.x, y: Y = this.tile.y): void {
    const seed: State[] = [];
    for (let cy = 0; cy < y; cy++) {
      for (let cx = 0; cx < x; cx++) {
        const state = this.tile.future(cx, cy);
        seed.push(state ?? false);
      }
    }

    this.tile = new Tile(x, y, seed);
  }

  public rendering(render: Render): void {
    render(this.tile.toTable());
  }
}
