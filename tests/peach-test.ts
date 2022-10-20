import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";

import * as Peach from "../src/mod.ts";
import {
  LETTERS,
  LOWERCASE_LETTERS,
  UPPERCASE_LETTERS,
} from "../src/constants.ts";

Deno.test({
  name: "K | Constant-function returns same value supplied",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const val = Peach.Number.uniform(0, 100);

      if (Peach.K(val)() !== val) {
        throw new Error("value not equal");
      }
    }
  },
});

Deno.test({
  name: "Uniform | Choosing 0...0 returns 0",
  fn() {
    assertEquals(Peach.Number.uniform(0, 0)(), 0, "uniform 0...0 must be zero");
  },
});

Deno.test({
  name: "Uniform | Always in range",
  fn() {
    let upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = Peach.Number.uniform(0, sizeTgt);
      let val = random();

      if (val < 0 || val > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "UniformContinuous | Choosing 0...0 returns 0",
  fn() {
    assertEquals(
      Peach.Number.uniformContinuous(0, 0)(),
      0,
      "uniform 0...0 must be zero",
    );
  },
});

Deno.test({
  name: "UniformContinous | Always in range",
  fn() {
    let upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = Peach.Number.uniformContinuous(0, sizeTgt);
      let val = random();

      if (val < 0 || val > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "Array.from | constructs expected size",
  fn() {
    let upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = Peach.Array.from(0, sizeTgt);
      let val = random();

      if (val.length > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "OneOf | Fails for empty collections",
  fn() {
    try {
      Peach.Logic.oneOf(Peach.Number.uniform, [])();
    } catch (err) {
      if (err.message.includes("Cannot retrieve value from empty collection")) {
        return;
      } else {
        throw err;
      }
      return;
    }

    throw new Error("failed to fail!");
  },
});

Deno.test({
  name: "Set.from | Constructs set of expected size",
  fn() {
    const gen = Peach.Set.from(1, Peach.Number.uniform(1, 100));

    for (let idx = 0; idx < 1000; idx++) {
      const val = gen();
      if (val.size !== 1) {
        throw new Error("set too big");
      }
    }
  },
});

Deno.test({
  name: "String.from | Constructs string of expected size",
  fn() {
    let upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = Peach.String.from("a", sizeTgt);
      let val = random();

      if (val.length > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "String.digit | Construct a single digit",
  fn() {
    let upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = Peach.String.digit(Peach.Number.uniform);
      let val = random();

      if (val.length > 1) {
        throw new Error("too many digits returned");
      }
    }
  },
});

Deno.test({
  name: "String.nonZeroDigit | Construct a single digit",
  fn() {
    let upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = Peach.String.nonZeroDigit(Peach.Number.uniform);
      let val = random();

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
  name: "Object.from | Runs",
  fn() {
    const gen = Peach.Object.from(
      Peach.Number.uniform(0, 1000),
      Peach.Number.uniform(0, 1000),
      Peach.Number.uniform(0, 100),
    );

    const val = gen();
  },
});

Deno.test({
  name: "Boolean.truth | Returns true",
  fn() {
    assertEquals(Peach.Boolean.truth()(), true);
  },
});

Deno.test({
  name: "Boolean.falsity | Returns false",
  fn() {
    assertEquals(Peach.Boolean.falsity()(), false);
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
