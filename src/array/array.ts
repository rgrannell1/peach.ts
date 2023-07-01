import type { Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/**
 * Construct an array from a wrapped element and wrapped array-length
 */
export function from<T>(elem: Wrapped<T>, size: Wrapped<number>): Thunk<T[]> {
  return (): T[] => {
    const sizeTgt = unwrap(size);
    const elems: T[] = [];

    for (let idx = 0; idx < sizeTgt; idx++) {
      elems[idx] = unwrap(elem);
    }

    return elems;
  };
}

/**
 * Chain several fuzzers into a sequence, without flattening the result
 *
 * @param elems A list of fuzzers
 *
 * @returns A thunk that returns an array of the results of each fuzzer
 */
export function concat<T>(...elems: Wrapped<T>[]): Thunk<T[]> {
  return () => {
    return elems.map((elem) => unwrap(elem));
  };
}
