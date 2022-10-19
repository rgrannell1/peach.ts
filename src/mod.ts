import type { Thunk } from "../src/types.ts";

export function K<T>(val: T): Thunk<T> {
  return () => val;
}

export * as Array from './array/array.ts'
export * as Logic from './logic/logic.ts'
export * as Number from './number/number.ts'
export * as Set from './set/set.ts'
export * as String from './string/string.ts'
