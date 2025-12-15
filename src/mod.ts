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

/**
 * Array fuzzers.
 *
 * @namespace Array
 */
export * as Array from "./array/array.ts";

/**
 * Operations on fuzzers themselves
 *
 * @namespace Logic
 */
export * as Logic from "./logic/logic.ts";

/**
 * Number fuzzers
 *
 * @namespace Number
 */
export * as Number from "./number/number.ts";

/**
 * Set fuzzers
 *
 * @namespace Set
 */
export * as Set from "./set/set.ts";

/**
 * String fuzzers
 *
 * @namespace String
 */
export * as String from "./string/string.ts";

/**
 * Object fuzzers
 *
 * @namespace Object
 */
export * as Object from "./object/object.ts";

/**
 * Boolean fuzzers
 *
 * @namespace Boolean
 */
export * as Boolean from "./boolean/boolean.ts";

/**
 * BigInt fuzzers
 *
 * @namespace BigInt
 */
export * as BigInt from "./bigint/bigint.ts";

/**
 * Date fuzzers
 *
 * @namespace Date
 */
export * as Date from "./date/date.ts";

/**
 * Generator fuzzers
 *
 * @namespace Generator
 */
export * as Generator from "./generator/generator.ts";

export type { Density, Thunk, Wrapped } from "./types.ts";
export { unwrap } from "./types.ts";
