import type { DensityBigInt, Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/**
 * Construct a generator from a wrapped element and wrapped array-length
 */
export function* from<T>(
  elem: Wrapped<T>,
  size: Wrapped<number>,
): Generator<T, void, unknown> {
  const sizeTgt = unwrap(size);

  for (let idx = 0; idx < sizeTgt; idx++) {
    yield unwrap(elem);
  }
}
