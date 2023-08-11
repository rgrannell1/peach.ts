// A zero-argument function that returns a value of type T
export type Thunk<T> = () => T;

// A wrapped value is either:
// - A value of type T
// - A thunk that returns a value of type T
export type Wrapped<T> = T | Thunk<T>;

/**
 * Unwrap a wrapped value into its underlying type T
 *
 * Note that the type T cannot by a function, as Peach treats all functions
 * as wrapped values rather than underlying values.
 *
 * @param val A wrapped value
 * @returns The underlying value of type T
 */
export function unwrap<T>(val: Wrapped<T>): T {
  return typeof val === "function" ? (val as Thunk<T>)() : val;
}

/**
 * Given a function that works for the underlying type T, return a function that
 * works for the wrapped type Wrapped<T>
 *
 * @param fn A function that works for the underlying type T
 *
 * @returns A function that works for the wrapped type Wrapped<T>
 */
export function fmap<T, K>(fn: (t0: T) => K): (t1: Wrapped<T>) => K {
  return (t1: Wrapped<T>) => {
    return fn(unwrap(t1));
  };
}

/**
 * Density functions take a lower and upper bound as wrapped values, and return
 * a wrapped value that is a number within that range
 *
 * @param from A wrapped value that represents the lower bound
 * @param to A wrapped value that represents the upper bound
 *
 * @returns A wrapped value that is a number within the range [from, to]
 */
export type Density = (
  from: Wrapped<number>,
  to: Wrapped<number>,
) => Wrapped<number>;

/*
* Density functions take a lower and upper bound as wrapped values, and return
* a wrapped value that is a number within that range
*
* @param from A wrapped value that represents the lower bound
* @param to A wrapped value that represents the upper bound
*
* @returns A wrapped value that is a number within the range [from, to]
*/
export type DensityBigInt = (
  from: Wrapped<bigint>,
  to: Wrapped<bigint>,
) => Wrapped<bigint>;

export type Key = string | number | symbol;
