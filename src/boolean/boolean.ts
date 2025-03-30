import type { Density } from "../types.ts";
import * as Logic from "../logic/logic.ts";

/**
 * A fuzzer that always returns true
 */
export function truth() {
  return (): boolean => {
    return true;
  };
}

/**
 * A fuzzer that always returns false
 */
export function falsity() {
  return (): boolean => {
    return false;
  };
}

/**
 * A fuzzer that returns a random boolean
 *
 * @param density A discrete density function that determines the probability of a particular element being chosen
 */
export function oneOf(density: Density) {
  return (): boolean => {
    return Logic.oneOf(density, [true, false])();
  };
}
