import {describe, expect, test} from '@jest/globals';
import { Tile, LifeGame } from './lifegame';

describe('lifegame module', () => {
  test('tile state: ok', () => {
    /**
     * Y\X|_0_|_1_|_2_
     *  0 | T   F   F
     *  1 | F   F   F
     *  2 | F   F   F
     */
    expect((new Tile(3, 3, [
      true,  false, false,
      false, false, false,
      false, false, false,
    ])).state(0, 0)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   F   F
     *  1 | F   T   F
     *  2 | F   F   F
     */
    expect((new Tile(3, 3, [
      false, false, false,
      false, true,  false,
      false, false, false,
    ])).state(1, 1)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   F   F
     *  1 | F   F   F
     *  2 | F   F   T
     */
    expect((new Tile(3, 3, [
      false, false, false,
      false, false, false,
      false, false, true,
    ])).state(2, 2)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   F   F
     *  1 | F   F   F
     *  2 | T   F   F
     */
    expect((new Tile(3, 3, [
      false, false, false,
      false, false, false,
      true, false, false,
    ])).state(0, 2)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   F   T
     *  1 | F   F   F
     *  2 | F   F   F
     */
    expect((new Tile(3, 3, [
      false, false, true,
      false, false, false,
      false, false, false,
    ])).state(2, 0)).toBe(true);
  });

  test('tile state: ng', () => {
    /**
     * Y\X|-1_|_0_|_1_|_2_|_3_
     * -1 | P
     *  0 |     F   F   F
     *  1 |     F   F   F
     *  2 |     F   F   F
     *  3 |
     */
    expect((new Tile(3, 3)).state(-1, -1)).toBe(null);

    /**
     * Y\X|-1_|_0_|_1_|_2_|_3_
     * -1 |                 P
     *  0 |     F   F   F
     *  1 |     F   F   F
     *  2 |     F   F   F
     *  3 |
     */
    expect((new Tile(3, 3)).state(3, -1)).toBe(null);

    /**
     * Y\X|-1_|_0_|_1_|_2_|_3_
     * -1 |
     *  0 |     F   F   F
     *  1 |     F   F   F
     *  2 |     F   F   F
     *  3 | P
     */
    expect((new Tile(3, 3)).state(-1, 3)).toBe(null);

    /**
     * Y\X|-1_|_0_|_1_|_2_|_3_
     * -1 |
     *  0 |     F   F   F
     *  1 |     F   F   F
     *  2 |     F   F   F
     *  3 |                 P
     */
    expect((new Tile(3, 3)).state(3, 3)).toBe(null);
  });

  test('tile future: new life', () => {
    /**
     * Y\X|_0_|_1_|_2_
     *  0 | T   T   F
     *  1 | T  (F)  F
     *  2 | F   F   F
     */
    expect((new Tile(3, 3, [
      true,  true,  false,
      true,  false, false,
      false, false, false,
    ])).future(1, 1)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   T   T
     *  1 | F  (F)  T
     *  2 | F   F   F
     */
    expect((new Tile(3, 3, [
      false, true,  true,
      false, false, true,
      false, false, false,
    ])).future(1, 1)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   F   F
     *  1 | F  (F)  T
     *  2 | F   T   T
     */
    expect((new Tile(3, 3, [
      false, false, false,
      false, false, true,
      false, true,  true,
    ])).future(1, 1)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   F   F
     *  1 | T  (F)  F
     *  2 | T   T   F
     */
    expect((new Tile(3, 3, [
      false, false, false,
      true,  false, false,
      true,  true,  false,
    ])).future(1, 1)).toBe(true);
  });

  test('tile future: keep life', () => {
    /**
     * Y\X|_0_|_1_|_2_|_3_
     *  0 | F   F   F   F
     *  1 | F  (T)  T   F
     *  2 | F   T   T   F
     *  3 | F   F   F   F
     */
    expect((new Tile(4, 4, [
      false, false, false, false,
      false, true,  true,  false,
      false, true,  true,  false,
      false, false, false, false,
    ])).future(1, 1)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_|_3_
     *  0 | F   F   F   F
     *  1 | F   T  (T)  F
     *  2 | F   T   T   F
     *  3 | F   F   F   F
     */
    expect((new Tile(4, 4, [
      false, false, false, false,
      false, true,  true,  false,
      false, true,  true,  false,
      false, false, false, false,
    ])).future(2, 1)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_|_3_
     *  0 | F   F   F   F
     *  1 | F   T   T   F
     *  2 | F  (T)  T   F
     *  3 | F   F   F   F
     */
    expect((new Tile(4, 4, [
      false, false, false, false,
      false, true,  true,  false,
      false, true,  true,  false,
      false, false, false, false,
    ])).future(1, 2)).toBe(true);

    /**
     * Y\X|_0_|_1_|_2_|_3_
     *  0 | F   F   F   F
     *  1 | F   T   T   F
     *  2 | F   T  (T)  F
     *  3 | F   F   F   F
     */
    expect((new Tile(4, 4, [
      false, false, false, false,
      false, true,  true,  false,
      false, true,  true,  false,
      false, false, false, false,
    ])).future(2, 2)).toBe(true);
  });

  test('tile future: death', () => {
    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   F   F
     *  1 | F  (T)  T
     *  2 | F   F   F
     */
    expect((new Tile(3, 3, [
      false, false, false,
      false, true,  true,
      false, false, false,
    ])).future(1, 1)).toBe(false);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | F   F   F
     *  1 | F   T  (T)
     *  2 | F   F   F
     */
    expect((new Tile(3, 3, [
      false, false, false,
      false, true,  true,
      false, false, false,
    ])).future(2, 1)).toBe(false);

    /**
     * Y\X|_0_|_1_|_2_
     *  0 | T   T   T
     *  1 | T  (T)  F
     *  2 | F   F   F
     */
    expect((new Tile(3, 3, [
      false, false, false,
      false, true,  true,
      false, false, false,
    ])).future(1, 1)).toBe(false);
  });

  test('new tile from table', () => {
    expect(Tile.fromTable([
      [true,  false, false],
      [false, true,  false],
      [false, false, true],
    ])).toEqual(new Tile(3, 3, [
      true,  false, false,
      false, true,  false,
      false, false, true,
    ]));
  });

  test('tile to table', () => {
    expect(new Tile(3, 3, [
      false, false, true,
      false, true,  false,
      true,  false, false,
    ]).toTable()).toEqual([
      [false, false, true],
      [false, true,  false],
      [true,  false, false],
    ]);
  });

  test('lifegame', () => {
    const lifegame = LifeGame.fromTable([
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ]);

    lifegame.rendering(table => expect(table).toEqual([
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ]));

    lifegame.next()
    lifegame.rendering(table => expect(table).toEqual([
      [false, false, false],
      [true,  true,  true],
      [false, false, false],
    ]));

    lifegame.next(4, 5)
    lifegame.rendering(table => expect(table).toEqual([
      [false, true,  false, false],
      [false, true,  false, false],
      [false, true,  false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]));
  });
});
