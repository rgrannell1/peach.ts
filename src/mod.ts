// If you want to use the module, import this file

import type { Thunk } from "../src/types.ts";

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
