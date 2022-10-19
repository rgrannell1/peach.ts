import type { Wrapped, Thunk, Density } from "../types.ts";
import { unwrap } from "../types.ts";

export function from(
  val: Wrapped<string>,
  size: Wrapped<number>,
): Thunk<string> {
  return (): string => {
    const parts: string[] = [];
    const tgt = unwrap(size);

    for (let idx = 0; idx < tgt; idx++) {
      parts.push(unwrap(val));
    }

    return parts.join("");
  };
}

export function digit(density: Density) {
  return (): string => {
    return `${ unwrap(density(0, 10)) }`
  }
}

export function nonZeroDigit(density: Density) {
  return (): string => {
    return `${ unwrap(density(1, 10)) }`
  }
}