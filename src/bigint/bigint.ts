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
  from: Wrapped<bigint>,
  to: Wrapped<bigint>,
): Thunk<bigint> {
  return () => {
    const lower = unwrap(from);
    const upper = unwrap(to);

    const diff = upper - lower;

    if (diff > Number.MAX_SAFE_INTEGER) {
      throw new Error(
        `Range too large: ${lower}...${upper} (${diff} > ${Number.MAX_SAFE_INTEGER})`,
      );
    }

    return BigInt(Math.floor(Math.random() * Number(diff))) + lower;
  };
}
