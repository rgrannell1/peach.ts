import type { Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/**
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

/**
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

/**
 * Return each integer in the chosen range in turn. This fuzzer is unusual,
 * in that it only invokes `from`, `to` ONCE as opposed to per iteration. It is
 * a stateful fuzzer.
 *
 * @param from A wrapped integer that represents the lower bound of the range
 * @param to A wrapped integer that represents the upper bound of the range
 *
 * @returns A thunk that returns a random integer in the chosen range
 */
export function enumerate(
  from: Wrapped<number>,
  to: Wrapped<number>,
): Thunk<number> {
  const concreteFrom = unwrap(from);
  const concreteTo = unwrap(to);

  let idx = concreteFrom;

  return () => {
    const returned = idx;

    idx++;
    if (idx >= concreteTo) {
      idx = concreteFrom;
    }

    return returned;
  };
}
