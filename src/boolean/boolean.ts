import type { Density } from "../types.ts";
import { unwrap } from "../types.ts";

export function truth() {
  return (): boolean => {
    return true;
  };
}

export function falsity() {
  return (): boolean => {
    return false;
  };
}

export function oneOf(density: Density) {
  return (): boolean => {
    return unwrap(density(0, 1)) === 0;
  };
}
