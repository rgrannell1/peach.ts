import type { DensityBigInt, Key, Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/**
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
export function from<K extends Key, V>(
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

/*
 * Given a object of keys: fuzzers, and a density function, retrieve a subset of elements
 *
 * @param elems A object of keys: fuzzers
 * @param density A function that takes a min and max, and returns a BigInt
 *
 * @returns A thunk that returns a subset of the umwrapped fuzzers
 */
export function choose<K extends Key, V>(
  obj: Wrapped<Record<K, V>>,
  density: DensityBigInt,
) {
  return () => {
    const concreteElems = Object.entries(unwrap(obj)) as [K, V][];
    const subsetCount = BigInt(2) ^ BigInt(concreteElems.length);
    const index = unwrap(density(BigInt(0), subsetCount));

    // bits correspond to a include-or-don't for each element
    const bits = index
      .toString(2)
      .padStart(concreteElems.length, "0")
      .split("");

    const subset: [K, V][] = [];

    for (let idx = 0; idx < bits.length; idx++) {
      if (bits[idx] === "1") {
        subset.push(concreteElems[idx]);
      }
    }

    return Object.fromEntries(subset);
  };
}
