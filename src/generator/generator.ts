import type { Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

/**
 * Construct a generator from a wrapped element and wrapped array-length
 *
 * @param elem A wrapped value that represents the element to fill the generator with
 * @param size A wrapped value that represents the size of the generator
 *
 * @returns A generator that yields each element
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
