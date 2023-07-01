import type { Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/*
 * Return a random integer in the chosen range. The distribution is
 * uniform (pseudo RNG willing).
 *
 * @param from A wrapped integer that represents the lower bound of the range
 * @param to A wrapped integer that represents the upper bound of the range
 *
 * @returns A thunk that returns a random integer in the chosen range
 */
export function uniform(
  from: Wrapped<number>,
  to: Wrapped<number>,
): Thunk<number> {
  return () => {
    const lower = unwrap(from);
    const upper = unwrap(to);

    return Math.floor(Math.random() * (upper - lower) + lower);
  };
}

/*
 * Return a random float in the chosen range. The distribution is
 * uniform (pseudo RNG willing).
 *
 * @param from A wrapped float that represents the lower bound of the range
 * @param to A wrapped float that represents the upper bound of the range
 *
 * @returns A thunk that returns a random float in the chosen range
 */
export function uniformContinuous(
  from: Wrapped<number>,
  to: Wrapped<number>,
): Thunk<number> {
  return () => {
    const lower = unwrap(from);
    const upper = unwrap(to);

    return Math.random() * (upper - lower) + lower;
  };
}
