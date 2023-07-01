import type { Density } from "../types.ts";
import { unwrap } from "../types.ts";

/**
 * A fuzzer that returns a random boolean
 *
 * @param density A discrete density function that determines the probability of a particular element being chosen
 */
export function oneOf<T>(density: Density, elems: T[]) {
  return (): T => {
    const data = unwrap(elems);
    const idx = unwrap(density(0, data.length));

    if (data.length === 0) {
      throw new Error("Cannot retrieve value from empty collection");
    }

    return unwrap(data[idx]);
  };
}
