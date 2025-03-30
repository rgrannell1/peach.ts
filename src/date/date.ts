import { unwrap, type Thunk, type Wrapped } from "../types.ts";

/**
 * Return a random date in the chosen range. The distribution is
 * uniform (pseudo RNG willing).
 *
 * @param from A wrapped integer that represents the lower bound of the date range
 * @param to A wrapped integer that represents the upper bound of the date range
 *
 * @returns A thunk that returns a random date in the chosen date range
 */
export function uniform(
  from: Wrapped<number>,
  to: Wrapped<number>,
): Thunk<Date> {
  return () => {
    const lower = unwrap(from);
    const upper = unwrap(to);

    return new Date(Math.floor(Math.random() * (upper - lower) + lower));
  };
}

/**
 * Return a random date in the chosen range. The distribution is
 * uniform (pseudo RNG willing).
 *
 * @param from A wrapped integer that represents the lower bound of the date range
 *
 * @returns A thunk that returns a random date in the chosen date range
 */
export function pastUniform(
  from: Wrapped<number>
): Thunk<Date> {
  return () => {
    const lower = unwrap(from);
    const upper = Date.now();

    return new Date(Math.floor(Math.random() * (upper - lower) + lower));
  };
}
