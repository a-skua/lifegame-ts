import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { Cell, LifeGame } from "./lifegame.ts";

Deno.test("tile state: ok", () => {
  /**
   * Y\X|_0_|_1_|_2_
   *  0 | T   F   F
   *  1 | F   F   F
   *  2 | F   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]).state(0, 0),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   F   F
   *  1 | F   T   F
   *  2 | F   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
    ]).state(1, 1),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   F   F
   *  1 | F   F   F
   *  2 | F   F   T
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ]).state(2, 2),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   F   F
   *  1 | F   F   F
   *  2 | T   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
    ]).state(0, 2),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   F   T
   *  1 | F   F   F
   *  2 | F   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ]).state(2, 0),
    true,
  );
});

Deno.test("tile state: ng", () => {
  /**
   * Y\X|-1_|_0_|_1_|_2_|_3_
   * -1 | P
   *  0 |     F   F   F
   *  1 |     F   F   F
   *  2 |     F   F   F
   *  3 |
   */
  assertEquals(new Cell(3, 3).state(-1, -1), null);

  /**
   * Y\X|-1_|_0_|_1_|_2_|_3_
   * -1 |                 P
   *  0 |     F   F   F
   *  1 |     F   F   F
   *  2 |     F   F   F
   *  3 |
   */
  assertEquals(new Cell(3, 3).state(3, -1), null);

  /**
   * Y\X|-1_|_0_|_1_|_2_|_3_
   * -1 |
   *  0 |     F   F   F
   *  1 |     F   F   F
   *  2 |     F   F   F
   *  3 | P
   */
  assertEquals(new Cell(3, 3).state(-1, 3), null);

  /**
   * Y\X|-1_|_0_|_1_|_2_|_3_
   * -1 |
   *  0 |     F   F   F
   *  1 |     F   F   F
   *  2 |     F   F   F
   *  3 |                 P
   */
  assertEquals(new Cell(3, 3).state(3, 3), null);
});

Deno.test("tile future: new life", () => {
  /**
   * Y\X|_0_|_1_|_2_
   *  0 | T   T   F
   *  1 | T  (F)  F
   *  2 | F   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
    ]).future(1, 1),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   T   T
   *  1 | F  (F)  T
   *  2 | F   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    ]).future(1, 1),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   F   F
   *  1 | F  (F)  T
   *  2 | F   T   T
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
    ]).future(1, 1),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   F   F
   *  1 | T  (F)  F
   *  2 | T   T   F
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      true,
      false,
    ]).future(1, 1),
    true,
  );
});

Deno.test("tile future: keep life", () => {
  /**
   * Y\X|_0_|_1_|_2_|_3_
   *  0 | F   F   F   F
   *  1 | F  (T)  T   F
   *  2 | F   T   T   F
   *  3 | F   F   F   F
   */
  assertEquals(
    new Cell(4, 4, [
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
    ]).future(1, 1),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_|_3_
   *  0 | F   F   F   F
   *  1 | F   T  (T)  F
   *  2 | F   T   T   F
   *  3 | F   F   F   F
   */
  assertEquals(
    new Cell(4, 4, [
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
    ]).future(2, 1),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_|_3_
   *  0 | F   F   F   F
   *  1 | F   T   T   F
   *  2 | F  (T)  T   F
   *  3 | F   F   F   F
   */
  assertEquals(
    new Cell(4, 4, [
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
    ]).future(1, 2),
    true,
  );

  /**
   * Y\X|_0_|_1_|_2_|_3_
   *  0 | F   F   F   F
   *  1 | F   T   T   F
   *  2 | F   T  (T)  F
   *  3 | F   F   F   F
   */
  assertEquals(
    new Cell(4, 4, [
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
    ]).future(2, 2),
    true,
  );
});

Deno.test("tile future: death", () => {
  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   F   F
   *  1 | F  (T)  T
   *  2 | F   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
    ]).future(1, 1),
    false,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | F   F   F
   *  1 | F   T  (T)
   *  2 | F   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
    ]).future(2, 1),
    false,
  );

  /**
   * Y\X|_0_|_1_|_2_
   *  0 | T   T   T
   *  1 | T  (T)  F
   *  2 | F   F   F
   */
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
    ]).future(1, 1),
    false,
  );
});

Deno.test("new tile from table", () => {
  assertEquals(
    Cell.fromTable([
      [true, false, false],
      [false, true, false],
      [false, false, true],
    ]),
    new Cell(3, 3, [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
    ]),
  );
});

Deno.test("new tile from empty table", () => {
  assertEquals(
    Cell.fromTable([]),
    new Cell(0, 0, []),
  );
});

Deno.test("tile to table", () => {
  assertEquals(
    new Cell(3, 3, [
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
    ]).toTable(),
    [
      [false, false, true],
      [false, true, false],
      [true, false, false],
    ],
  );
});

Deno.test("lifegame", () => {
  const lifegame = LifeGame.fromTable([
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ]);

  lifegame.rendering((table) =>
    assertEquals(table, [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ])
  );

  lifegame.next();
  lifegame.rendering((table) =>
    assertEquals(table, [
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ])
  );

  lifegame.next(4, 5);
  lifegame.rendering((table) =>
    assertEquals(table, [
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ])
  );
});
