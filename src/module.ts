import type { Thunk } from "../src/types.ts";

export function K<T>(val: T): Thunk<T> {
  return () => val;
}
