import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import * as Peach from "../mod.ts";

const hangulChars = Peach.String.from(
  Peach.String.blocks.hangulSyllables(Peach.Number.uniform),
  5,
);

Deno.test({
  name: "Peach.Logic.oneOf | Fails for empty collections",
  fn() {
    try {
      Peach.Logic.oneOf(Peach.Number.uniform, [])();
    } catch (err) {
      if (err.message.includes("Cannot retrieve value from empty collection")) {
        return;
      } else {
        throw err;
      }
    }

    throw new Error("failed to fail!");
  },
});

Deno.test({
  name: "Peach.Logic.allOf | Returns empty list for empty collections",
  fn() {
    const result = Peach.Logic.allOf([])();

    assertEquals(result, []);
  },
});

Deno.test({
  name: "Peach.Logic.allOf | returns as many elements as expected",
  fn() {
    const parts = Peach.Array.from(
      hangulChars,
      Peach.Number.uniform(0, 10),
    );

    for (let idx = 0; idx < 1_00; idx++) {
      const elems = parts();
      const result = Peach.Logic.allOf(elems)();

      assertEquals(result.length, elems.length);
    }
  },
});

Deno.test({
  name: "Peach.Logic.mapped | Identical for identity function",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const chars = hangulChars();

      const transformed = Peach.Logic.mapped((x: string) => x, chars)();

      assertEquals(transformed, chars);
    }
  },
});
