import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";

import * as Peach from "../mod.ts";
import {
  LETTERS,
  LOWERCASE_LETTERS,
  UPPERCASE_LETTERS,
} from "../constants.ts";

Deno.test({
  name: "String.from | Constructs string of expected size",
  fn() {
    const upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      const sizeTgt = upper();
      const random = Peach.String.from("a", sizeTgt);
      const val = random();

      if (val.length > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "String.digit | Construct a single digit",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const random = Peach.String.digit(Peach.Number.uniform);
      const val = random();

      if (val.length > 1) {
        throw new Error("too many digits returned");
      }
    }
  },
});

Deno.test({
  name: "String.nonZeroDigit | Construct a single digit",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const random = Peach.String.nonZeroDigit(Peach.Number.uniform);
      const val = random();

      if (val.length > 1) {
        throw new Error("too many digits returned");
      }
    }
  },
});

Deno.test({
  name: "String.newline | Returns expected characters",
  fn() {
    assertEquals(Peach.String.unixNewline()(), "\n");
    assertEquals(Peach.String.windowsNewline()(), "\r\n");

    const gen = Peach.String.newline(Peach.Number.uniform);
    const char = gen();

    if (char !== "\n" && char !== "\r\n") {
      throw new Error("unexpected return character");
    }
  },
});

Deno.test({
  name: "String.space | Returns space",
  fn() {
    assertEquals(Peach.String.space()(), " ");
  },
});

Deno.test({
  name: "String.tab | Returns tab",
  fn() {
    assertEquals(Peach.String.tab()(), "\t");
  },
});

Deno.test({
  name: "String.lowercaseLetters | runs without error",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const letter = Peach.String.lowercaseLetters(Peach.Number.uniform)();
      assertEquals(letter.length, 1);
      assert(LOWERCASE_LETTERS.includes(letter));
    }
  },
});

Deno.test({
  name: "String.uppercaseLetters | runs without error",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const letter = Peach.String.uppercaseLetters(Peach.Number.uniform)();
      assertEquals(letter.length, 1);
      assert(UPPERCASE_LETTERS.includes(letter));
    }
  },
});

Deno.test({
  name: "String.letters | runs without error",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const letter = Peach.String.letters(Peach.Number.uniform)();
      assertEquals(letter.length, 1);
      assert(LETTERS.includes(letter));
    }
  },
});
