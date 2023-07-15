import {
  assertEquals,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";

import * as Peach from "../mod.ts";

const hangulChars = Peach.String.from(
  Peach.String.blocks.hangulSyllables(Peach.Number.uniform),
  5,
);

Deno.test({
  name: "Uniform | Choosing 0...0 returns 0",
  fn() {
    assertEquals(Peach.Number.uniform(0, 0)(), 0, "uniform 0...0 must be zero");
  },
});

Deno.test({
  name: "Uniform | Always in range",
  fn() {
    const upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      const sizeTgt = upper();
      const random = Peach.Number.uniform(0, sizeTgt);
      const val = random();

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
    const upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      const sizeTgt = upper();
      const random = Peach.Number.uniformContinuous(0, sizeTgt);
      const val = random();

      if (val < 0 || val > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});
