import type { Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/*
 * Construct an array from a wrapped element and wrapped array-length
 * Vv
         */
export function from<K extends string | number | symbol, V>(
  key: Wrapped<K>,
  val: Wrapped<V>,
  size: Wrapped<number>,
): Thunk<Record<K, V>> {
  return () => {
    const sizeTgt = unwrap(size);
    const record = {} as Record<K, V>;

    for (let idx = 0; idx < sizeTgt; idx++) {
      record[unwrap(key)] = unwrap(val);
    }

    return record;
  };
}
