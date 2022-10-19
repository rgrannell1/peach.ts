import type { Density, Thunk } from "../types.ts";
import { unwrap } from "../types.ts";

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
