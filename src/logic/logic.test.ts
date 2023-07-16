import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";
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
  name: "Peach.Logic.mapped | Identical for identity function",
  fn() {

    for (let idx = 0; idx < 1_000; idx++) {
      const chars = hangulChars();

      const transformed = Peach.Logic.mapped((x: string) => x, chars)()

      assertEquals(transformed, chars);
    }
  },
});
