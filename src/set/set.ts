import type { Thunk, Wrapped, DensityBigInt } from "../types.ts";
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


/*
 * Given a list of fuzzers, and a density function, retrieve a subset of elements
 *
 * @param elems A list of fuzzers
 * @param density A function that takes a min and max, and returns a BigInt
 *
 * @returns A thunk that returns a subset of the umwrapped fuzzers
 */
export function choose<T>(elems: Wrapped<Set<T>>, density: DensityBigInt): Thunk<T[]> {
  return () => {
    const concreteElems = Array.from(unwrap(elems));
    const subsetCount = BigInt(2) ^ BigInt(concreteElems.length);
    const index = unwrap(density(BigInt(0), subsetCount));

    // bits correspond to a include-or-don't for each element
    const bits = index
      .toString(2)
      .padStart(concreteElems.length, "0")
      .split("");

    const output: T[] = [];

    for (let idx = 0; idx < bits.length; idx++) {
      if (bits[idx] === "1") {
        output.push(concreteElems[idx]);
      }
    }

    return output;
  }
}