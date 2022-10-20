import type { Density, Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";

import * as Logic from "../logic/logic.ts";

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
    return `${unwrap(density(0, 10))}`;
  };
}

export function nonZeroDigit(density: Density) {
  return (): string => {
    return `${unwrap(density(1, 10))}`;
  };
}

export function unixNewline() {
  return () => `\n`;
}

export function windowsNewline() {
  return () => `\r\n`;
}

export function newline(density: Density): Thunk<string> {
  return () => {
    return Logic.oneOf(density, ["\n", "\r\n"])();
  };
}

export function space(): Thunk<string> {
  return () => ' ';
}
export function tab(): Thunk<string> {
  return () => '\t';
}

const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function lowercaseLetters(density: Density): Thunk<string> {
  return Logic.oneOf(density, LOWERCASE_LETTERS);
}

export function uppercaseLetters(density: Density): Thunk<string> {
  return Logic.oneOf(density, UPPERCASE_LETTERS);
}

export function letters(density: Density): Thunk<string> {
  return Logic.oneOf(density, LETTERS);
}
