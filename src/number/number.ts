import type { Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

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
