import type { Density, Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/**
 * A fuzzer that returns a random element from an array-fuzzer
 *
 * @param density A discrete density function that determines the probability of a particular element being chosen
 * @param elems An array-fuzzer
 *
 * @returns A generator function that returns a random element from an array-fuzzer
 */
export function oneOf<T>(density: Density, elems: Wrapped<(Wrapped<T>)[]>) {
  return (): T => {
    const data = unwrap(elems);
    const idx = unwrap(density(0, data.length));

    if (data.length === 0) {
      throw new Error("Cannot retrieve value from empty collection");
    }

    return unwrap(data[idx]);
  };
}

/**
 * A fuzzer that returns a random key from an object-fuzzer
 *
 * @param density A discrete density function that determines the probability of a particular element being chosen
 * @param elems An object-fuzzer
 *
 * @returns A generator function that returns a random key from an object-fuzzer
 */
export function oneOfKey<K extends string | number | symbol, V>(
  density: Density,
  elems: Wrapped<Record<K, V>>,
) {
  return () => {
    const data = Object.keys(unwrap(elems));
    const idx = unwrap(density(0, data.length));

    if (data.length === 0) {
      throw new Error("Cannot retrieve value from empty dictionary");
    }

    return data[idx];
  };
}

/**
 * A fuzzer that returns a random value from an object-fuzzer
 *
 * @param density A discrete density function that determines the probability of a particular element being chosen
 * @param elems An object-fuzzer
 *
 * @returns A generator function that returns a random value from an object-fuzzer
 */
export function oneOfValue<K extends string | number | symbol, V>(
  density: Density,
  elems: Wrapped<Record<K, V>>,
) {
  return () => {
    const data = Object.values(unwrap(elems));
    const idx = unwrap(density(0, data.length));

    if (data.length === 0) {
      throw new Error("Cannot retrieve value from empty dictionary");
    }

    return data[idx];
  };
}

/*
 * Return a fuzzer that returns transformed values extracted from another fuzzer
 *
 * @param fn A function that transforms a value
 * @param gen A generator function
 *
 * @returns A generator function that returns transformed values extracted from another fuzzer
 */
export function oneOfEntry<K extends string | number | symbol, V>(
  density: Density,
  elems: Wrapped<Record<K, V>>,
) {
  return () => {
    const data = Object.entries(unwrap(elems));
    const idx = unwrap(density(0, data.length));

    if (data.length === 0) {
      throw new Error("Cannot retrieve value from empty dictionary");
    }

    return data[idx];
  };
}

/*
 * Transform a fuzzer using a function
 *
 * @param fn A transformation function to be applied
 * @param gen A generator function
 *
 * @returns A generator function that returns values matching the predicate
 */
export function mapped<A, B>(fn: (a: A) => B, gen: Wrapped<A>): Thunk<B> {
  return () => {
    return fn(unwrap(gen));
  };
}

/*
 * Return a fuzzer that returns values matching a predicate
 *
 * @param pred A predicate function
 * @param gen A generator function
 *
 * @returns A generator function that returns values matching the predicate
 */
export function filtered<T>(
  pred: (a: T) => boolean,
  gen: Wrapped<T>,
): Thunk<T> {
  return () => {
    while (true) {
      const val = unwrap(gen);
      if (pred(val)) {
        return val;
      }
    }
  };
}
