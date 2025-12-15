import type { Density, Thunk } from "../types.ts";
import * as Logic from "../logic/logic.ts";

/**
 * A fuzzer that always returns true
 */
export function truth(): Thunk<boolean> {
  return (): boolean => {
    return true;
  };
}

/**
 * A fuzzer that always returns false
 */
export function falsity(): Thunk<boolean> {
  return (): boolean => {
    return false;
  };
}

/**
 * A fuzzer that returns a random boolean
 *
 * @param density A discrete density function that determines the probability of a particular element being chosen
 */
export function oneOf(density: Density): Thunk<boolean> {
  return (): boolean => {
    return Logic.oneOf(density, [true, false])();
  };
}
