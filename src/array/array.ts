import type { DensityBigInt, Thunk, Wrapped } from "../types.ts";
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

/*
 * Chain several fuzzers into a sequence, interspersing a separator between each element
 *
 * @param separator A fuzzer that produces the separator element
 * @param elems A list of fuzzers
 *
 * @returns A thunk that returns an array of the results of each fuzzer, with the separator interspersed
 */
export function intersperse<T>(separator: Wrapped<T>, ...elems: Wrapped<T>[]): Thunk<T[]> {
  return () => {
    const result: T[] = [];
    const sep = unwrap(separator);

    elems.forEach((elem, index) => {
      result.push(unwrap(elem));
      if (index < elems.length - 1) {
        result.push(sep);
      }
    });

    return result;
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
export function choose<T>(
  elems: Wrapped<T[]>,
  density: DensityBigInt,
): Thunk<T[]> {
  return () => {
    const concreteElems = unwrap(elems);
    const subsetCount = BigInt(2) ** BigInt(concreteElems.length);
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
  };
}
