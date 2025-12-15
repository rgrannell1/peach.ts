/**
 * @fileoverview Main module entry point for the peach.ts library.
 *
 * This module provides the primary exports for the peach.ts functional programming library,
 * including utility functions, type definitions, and organized sub-modules for working with
 * various data types and operations.
 *
 * @example
 * ```typescript
 * import { K, Array, Logic, unwrap } from './mod.ts';
 *
 * ```
 */
// If you want to use the module, import this file

import type { Thunk } from "../src/types.ts";

/**
 * Return a thunk that always returns the given value
 *
 * @param val A value to be wrapped in a thunk
 *
 * @returns A thunk that always returns the given value
 */
export function K<T>(val: T): Thunk<T> {
  return () => val;
}

export * as Array from "./array/array.ts";
export * as Logic from "./logic/logic.ts";
export * as Number from "./number/number.ts";
export * as Set from "./set/set.ts";
export * as String from "./string/string.ts";
export * as Object from "./object/object.ts";
export * as Boolean from "./boolean/boolean.ts";
export * as BigInt from "./bigint/bigint.ts";
export * as Date from "./date/date.ts";


export * as Generator from "./generator/generator.ts";

export type { Density, Thunk, Wrapped } from "./types.ts";

export { unwrap } from "./types.ts";
