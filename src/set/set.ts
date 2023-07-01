import type { Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/**
 * Construct a set from a wrapped element and wrapped set-size
 *
 * @param elem A wrapped element that represents values in the set
 * @param size A wrapped integer that represents the size of the set
 *
 * @returns A thunk that returns a set with the chosen values and size. Note
 *  that size is an upper-limit; if elem yields duplicate values, the resulting
 *  set will have fewer elements
 */
export function from<T>(
  elem: Wrapped<T>,
  size: Wrapped<number>,
): Thunk<Set<T>> {
  return (): Set<T> => {
    const sizeTgt = unwrap(size);
    const elems: Set<T> = new Set<T>();

    for (let idx = 0; idx < sizeTgt; idx++) {
      elems.add(unwrap(elem));
    }

    return elems;
  };
}
