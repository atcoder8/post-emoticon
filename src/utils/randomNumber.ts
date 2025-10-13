import { RandomNumberError } from "../errors/utils/randomNumberError";

/**
 * 指定された範囲のランダムな整数を生成します。
 * @param start 範囲の下限 (境界値を含む)
 * @param end 範囲の上限 (境界値を含まない)
 * @returns `start`以上`end`未満のランダムな整数
 */
export function generateRandomInteger(start: number, end: number) {
  if (!Number.isInteger(start)) {
    throw new RandomNumberError("`start`が整数ではありません。");
  }
  if (!Number.isInteger(end)) {
    throw new RandomNumberError("`end`が整数ではありません。");
  }
  if (start >= end) {
    throw new RandomNumberError("`start`は`end`より小さくなければなりません。");
  }

  return Math.floor(Math.random() * (end - start)) + start;
}
