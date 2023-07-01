import type { Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/*
 * Construct an array from a wrapped element and wrapped array-length
 *
 * @param key A wrapped element that represents the key of the object
 * @param val A wrapped element that represents the value of the object
 * @param size A wrapped integer that represents the size of the object
 *
 * @returns A thunk that returns an object with the chosen keys, values, and number of properties. Note
 *   that size is an upper-limit; if key yields duplicate values, the resulting object will have fewer
 *   properties
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
