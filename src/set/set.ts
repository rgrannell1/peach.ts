import type { Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

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
